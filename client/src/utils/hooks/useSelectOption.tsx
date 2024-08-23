import React from 'react';

function useSelectOption() {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const handleSelect = (option: string) => {
    if (selectedOptions.includes(option)) {
      console.log(
        selectedOptions.filter((option) => option !== option),
        option,
        'option',
        selectedOptions
      );

      return setSelectedOptions((prev) =>
        prev.filter((selectedOption) => selectedOption !== option)
      );
    }

    setSelectedOptions([...selectedOptions, option]);
  };

  const populateUrl = (key: string, value: string) => {};

  return { selectedOptions, handleSelect };
}

export default useSelectOption;
