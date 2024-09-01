type ArgType = {
  key: string;
  value: string | null | string[];
};

function checkURL(entries: ArgType[]) {
  const hash: { [key: string]: string } = {};

  entries.forEach((entry) => {
    if (entry.value !== null && entry.value !== '') {
      // Handle array of strings by joining them into a single string
      if (Array.isArray(entry.value)) {
        hash[entry.key] = entry.value.join(',');
      } else {
        hash[entry.key] = entry.value;
      }
    }
  });

  const search = Object.keys(hash)
    .map((key) => {
      const value = hash[key];
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join('&');

  const url = search ? `?${search}` : '';

  return {
    url,
    hash,
  };
}

export default checkURL;

