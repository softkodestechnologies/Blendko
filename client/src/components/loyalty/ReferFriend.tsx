"use client";
import React, { useState, useEffect } from 'react';
import styles from './ReferFriend.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/services/userSlice';
import { RootState } from '@/services/store'; 
import { useJoinLoyaltyProgramMutation } from '@/services/userService';
import { ReferMessageIcon, ReferEmailIcon, ReferFacebookIcon, ReferXIcon, ReferInstagramIcon, Logo } from '../../../public/svg/icon';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';

enum Tab {
  REFER = 'refer',
  JOIN = 'join',
}

enum SocialTab {
  MESSAGE = 'message',
  EMAIL = 'email',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram',
}

const socialTabIcons = {
    [SocialTab.MESSAGE]: ReferMessageIcon,
    [SocialTab.EMAIL]: ReferEmailIcon,
    [SocialTab.FACEBOOK]: ReferFacebookIcon,
    [SocialTab.TWITTER]: ReferXIcon,
    [SocialTab.INSTAGRAM]: ReferInstagramIcon,
  };

const ReferFriend: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.REFER);
  const [activeSocialTab, setActiveSocialTab] = useState<SocialTab>(SocialTab.MESSAGE);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [copySuccess, setCopySuccess] = useState('');
  const [joinLoyaltyProgram] = useJoinLoyaltyProgramMutation<{
    message: string;
    referralCode: string;
    user: {
      id: string;
      name: string;
      email: string;
      referralCode: string;
      isLoyaltyMember: boolean;
      points: number;
      dOB?: { day: string; month: string; year: string };
    };
  }>();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const referralLink = `localhost:3000/join/${user?.referralCode}`;

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: ''
  });

  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    if(user) {
        setLoading(false);
    }
  }, [user]);

  const handleShare = async (platform: SocialTab) => {
    const shareData = {
      title: 'Check out BLENDKO!',
      text: 'Get 10% off your first order at BLENDKO!',
      url: referralLink,
    };

    if (navigator.share && platform === SocialTab.MESSAGE) {
      try {
        await navigator.share(shareData);
        console.log('Content shared successfully');
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      let url = '';
      switch (platform) {
        case SocialTab.EMAIL:
          url = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
          break;
        case SocialTab.FACEBOOK:
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
          break;
        case SocialTab.TWITTER:
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
          break;
        case SocialTab.INSTAGRAM:
          alert("Instagram sharing is not directly supported. You can copy the link and share it manually on Instagram.");
          return;
      }
      window.open(url, '_blank');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopySuccess('Failed to copy');
    }
  };
  

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleSocialTabChange = (tab: SocialTab) => {
    setActiveSocialTab(tab);
  };

  const handleGetStarted = () => {
    if(user) {
    setActiveTab(Tab.JOIN);
    } else {
      router.push('/login')
    }
  };

  const handleJoin = async() => {
    if (agreeToTerms) {
        try {
          const response = await joinLoyaltyProgram({ dateOfBirth }).unwrap();
          console.log(response, 'Response')
          dispatch(updateUser(response?.user))
          console.log('Welcome to the Loyalty Programme')
        } catch (error) {
          console.log('Error', error)
        }
      }
  };

  const handleSkip = () => {
    router.push('/')
  };

  const generateDays = () => {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  };
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  };
  

  const renderReferComponent = () => (
    <>
      <h2 className={styles.header}>You get 20% off, your friends get 20% off. Win-win.</h2>
      <div className={styles.referralInfo}>
        <ol className={styles.steps}>
          <li>Share your unique referral link with your friends</li>
          <li>When they use the link, they&apos;ll get 20% off their first order</li>
          <li>Once they&apos;ve shopped we&apos;ll give you 20% off</li>
        </ol>
      </div>
      <hr />
      <button className={styles.button} onClick={handleGetStarted}>GET STARTED</button>
      <div className={styles.privacyInfo}>
        <div>Click here for more information about your <a href="/privacy-policy">Privacy rights.</a></div>
        <div>By accepting this offer you agree to the <a href="/terms">Terms and Conditions</a></div>
      </div>
    </>
  );

  const renderJoinComponent = () => (
    <div className={styles.loyaltyClub}>
      <h1>Join Our Loyalty Club</h1>
      <h3>The more you shop the more you earn. Get <b>10 points for every $1.00 you spend</b>, then when you earn 500, we&apos;ll reward you with $5 of points to spend.</h3>
      <div className={styles.dateOfBirth}>
      <label htmlFor="day-select">Date of birth (Optional)</label>
      <select 
        id="day-select"
        aria-label="Day"
        value={dateOfBirth.day}
        onChange={(e) => setDateOfBirth({...dateOfBirth, day: e.target.value})}
      >
        <option value="">Day</option>
        {generateDays().map(day => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
      <select 
        aria-label="Month"
        value={dateOfBirth.month}
        onChange={(e) => setDateOfBirth({...dateOfBirth, month: e.target.value})}
      >
        <option value="">Month</option>
        {months.map((month, index) => (
          <option key={month} value={index + 1}>{month}</option>
        ))}
      </select>
      <select 
        aria-label="Year"
        value={dateOfBirth.year}
        onChange={(e) => setDateOfBirth({...dateOfBirth, year: e.target.value})}
      >
        <option value="">Year</option>
        {generateYears().map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
      <p>We asked this information to send birthday vouchers to Blendko Club members.</p>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id="joinConfirm"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
        />
        <label htmlFor="joinConfirm">YES, I WANT TO JOIN</label>
      </div>
      <p>Tick to confirm that you are over the age of 16 and that you have read and agreed to the Blendko™ Club Terms and Conditions.</p>
      <div className={styles.buttonGroup}>
        <button className={styles.skipButton} onClick={handleSkip}>SKIP THIS</button>
        <button className={styles.joinButton} onClick={handleJoin}>JOIN</button>
      </div>
    </div>
  );

  const renderRegisteredComponent = () => (
    <>
      <h2 className={styles.header}>{user?.name}, you get 10% off, your friends get 10% off. Win-win.</h2>
      <p>Invite now using:</p>
      <div className={styles.socialIcons}>
        {Object.values(SocialTab).map((tab) => {
          const IconComponent = socialTabIcons[tab];
          return (
            <div
              key={tab}
              className={`${styles.socialIcon} ${activeSocialTab === tab ? styles.active : ''}`}
              onClick={() => handleSocialTabChange(tab)}
            >
              <IconComponent />
            </div>
          );
        })}
      </div>
      <div className={styles.showSection}>
        {activeSocialTab === SocialTab.MESSAGE && (
          <>
            <p className="mb-10">Tell your friends to enter your name, like this, at the checkout:</p>
            <h2 className="flex center mb-10">{user?.name}</h2>
            <p className="flex center mb-10"><a href="">How does it work?</a></p>
            <p className="flex center mb-10">To get their reward, your friends need to click on the &#34;Been referred by a friend?&#34; link at the checkout and simply enter your name. If there is another person registered with the same name, your friends will be asked for your email address.</p>
            <button className={styles.button}>CONGRATS!</button>
          </>
        )}
        {activeSocialTab === SocialTab.EMAIL && (
          <>
            <p className="flex space-between mb-10"><span>From: </span> <span>{user?.email}</span></p>
            <p>How does 10% off your first order at BLENDKO sound? Use the link below and once you&apos;ve shopped, I&apos;ll get you 10% off too.</p>
            <p>Please only share this link with friends you know would be happy to receive it.</p>
            <button className={styles.button} onClick={() => handleShare(SocialTab.EMAIL)}>SEND VIA MY EMAIL</button>
          </>
        )}
        {(activeSocialTab === SocialTab.FACEBOOK || activeSocialTab === SocialTab.TWITTER || activeSocialTab === SocialTab.INSTAGRAM) && (
          <div className="flex flex-col center">
            <Logo />
            <button className={styles.button} onClick={() => handleShare(activeSocialTab)}>
              SEND VIA {activeSocialTab.toUpperCase()}
            </button>
          </div>
        )}
      </div>
      <div className={styles.referralLink}>
        <h4>YOUR REFERRAL LINK:</h4>
        <div>
          <label htmlFor="referralLink">Referral Link:</label>
          <input type="text" id="referralLink" value={referralLink} readOnly aria-label="Your referral link" />
          <button className={styles.copyButton} onClick={copyToClipboard}>
            {copySuccess || 'Copy'}
          </button>
        </div>
      </div>
      <div className={styles.privacyInfo}>
        <div>Click here for more information about your <a href="/privacy-policy">Privacy rights.</a></div>
        <div>By accepting this offer you agree to the <a href="/terms">Terms and Conditions</a></div>
      </div>
    </>
  );

  if(loading) {
    return <LoadingSpinner />
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Refer a friend</h1>
      <div className={styles.mainSection}>
        <div className={styles.leftSection}>
          {isClient && user?.referralCode && user?.isLoyaltyMember ? (
            renderRegisteredComponent()
          ) : (
            activeTab === Tab.REFER ? renderReferComponent() : renderJoinComponent()
          )}
        </div>
        <div className={styles.rightSection}>
          <Image
            src={activeTab === Tab.JOIN ? "/loyalty-image.jpg" : "/refer-image.jpg"}
            alt="Refer a friend"
            className={styles.image}
            width={500}
            height={750}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferFriend;

