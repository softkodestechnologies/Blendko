type ArgType = {
    key: string;
    value: string | null;
  };
  
  function checkURL(entries: ArgType[]) {
    const hash: { [key: string]: string } = {};
  
    entries.forEach((entry) => {
      if (entry.value !== null && entry.value !== '') {
        hash[entry.key] = entry.value;
      }
    });
  
    const search = Object.keys(hash)
      .map((key) => {
        const value = hash[key];
        return `${key}=${value}`;
      })
      .join('&');
  
    const url = search ? `?${search}` : '';
  
    return {
      url,
      hash,
    };
  }
  
  export default checkURL;