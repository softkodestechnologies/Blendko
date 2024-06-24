const handlePropagation = (
    e:
      | React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>,
    callBack: () => void
  ) => {
    e.stopPropagation();
    e.preventDefault();
    callBack();
  };
  
  export default handlePropagation;