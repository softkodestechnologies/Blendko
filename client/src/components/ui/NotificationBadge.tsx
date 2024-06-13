import './NotificationBadge.css';
import { IoClose } from 'react-icons/io5';
import { useState, useEffect } from 'react';


const NotificationBadge = () => {
    const [showNotification, setShowNotification] = useState(false)
    const notification = [{
        message: 'LEAP DAY SALE, GET AN EXTRA 40% OFF SALE STYLES, TODAY ONLY!! SHOP NOW'
    }]

    useEffect(()=> {
        const today = new Date().toDateString();
        const closedToday = localStorage.getItem('closedToday')
        if(today === closedToday) {
            setShowNotification(false)
        } else {
            setShowNotification(true)
        }
    }, [])

    const handleCloseNotification = () => {
        const today = new Date().toDateString();
        localStorage.setItem('closedToday', today)
        setShowNotification(false)
    }
    return (
        <div>
        {showNotification && <div className='badge-container '>
            <div className="container flex space-between">
                <div className="badge-title flex center">
                    <h3>{notification[0].message}</h3>
                </div>
                <IoClose size={25} className="close" onClick={handleCloseNotification}/>
            </div>
        </div>}
        </div>
    )
}

export default NotificationBadge