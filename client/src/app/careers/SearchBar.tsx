import styles from './career.module.css';

import { SearchBarIcon } from '../../../public/svg/icon';

function SearchBar({ className }: { className?: string }) {
  return (
    <form
      role="search"
      aria-label="Search for a job"
      className={`grid ${styles.search_bar} ${className}`}
    >
      <input
        id="search"
        name="search"
        type="search"
        placeholder="KEYWORD SEARCH"
      />

      <button
        type="submit"
        className="flex center"
        aria-label="Search for a job"
      >
        <SearchBarIcon />
      </button>
    </form>
  );
}

export default SearchBar;
