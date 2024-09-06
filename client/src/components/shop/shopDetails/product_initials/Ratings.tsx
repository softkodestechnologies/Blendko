import styles from './productInitials.module.css';

import { FullRating, HalfRating } from '../../../../../public/svg/icon';

function StarRating({ rating }: { rating: number }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FullRating key={i} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<HalfRating key={i} />);
    } else {
      stars.push(<></>);
    }
  }

  return (
    <span
      aria-label={`Rating: ${rating} out of 5`}
      className={`flex align-y ${styles.rating}`}
    >
      {stars}
    </span>
  );
}

export default StarRating;
