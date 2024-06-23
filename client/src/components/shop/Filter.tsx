import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Range } from 'react-range';
import { Box, Checkbox, Stack, Text, Button } from '@chakra-ui/react';
import { CgChevronUp, CgChevronDown } from 'react-icons/cg';
import styles from './Filter.module.css';
import { FaSlidersH } from 'react-icons/fa';

interface FilterProps {
  onSearch: (key: string, value: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onSortChange: (value: string) => void;
  onCheckboxChange: (key: string, value: string[]) => void;
}

type ExpandedSections = {
  categories: boolean;
  price: boolean;
  colors: boolean;
  sizes: boolean;
  dressStyles: boolean;
  brand: boolean;
  fashionCollection: boolean;
};

const Filter: React.FC<FilterProps> = ({ onSearch, onPriceRangeChange, onSortChange, onCheckboxChange }) => {
  const { handleSubmit, control, watch } = useForm();
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    categories: true,
    price: true,
    colors: true,
    sizes: true,
    dressStyles: true,
    brand: true,
    fashionCollection: true,
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  // Watch for changes in checkboxes
  const watchColors = watch('colors');
  const watchSizes = watch('sizes');
  const watchDressStyles = watch('dressStyles');
  const watchBrand = watch('brand');
  const watchFashionCollection = watch('fashionCollection');

  // Use useCallback for onCheckboxChange
  const handleCheckboxChange = useCallback(
    (key: string, value: string[]) => {
      onCheckboxChange(key, value);
    },
    [onCheckboxChange]
  );

  useEffect(() => {
    handleCheckboxChange('colors', watchColors || []);
  }, [watchColors, handleCheckboxChange]);

  useEffect(() => {
    handleCheckboxChange('sizes', watchSizes || []);
  }, [watchSizes, handleCheckboxChange]);

  useEffect(() => {
    handleCheckboxChange('dress_style', watchDressStyles || []);
  }, [watchDressStyles, handleCheckboxChange]);

  useEffect(() => {
    handleCheckboxChange('brand', watchBrand || []);
  }, [watchBrand, handleCheckboxChange]);

  useEffect(() => {
    handleCheckboxChange('fashion_collection', watchFashionCollection || []);
  }, [watchFashionCollection, handleCheckboxChange]);

  return (
    <Box as="form"  className={styles.sidebar}>
      <div className="flex space-between">
      <h2>Filters</h2>
      <FaSlidersH size={25} style={{ transform: 'rotate(90deg)', color: 'gray'}}/>
      </div>

      <hr style={{margin: '15px 0', borderColor: 'rgba(0,0,0,0.5)'}}/>

      <div className={styles.filterSection}>
        <div className={`${styles.filterHeader} flex space-between align-y mb-10`} onClick={() => toggleSection('categories')}>
          <h3>Applied Filters</h3>
          {expandedSections.categories ? <CgChevronDown /> : <CgChevronUp />}
        </div>
        {expandedSections.categories && (
          <div className={styles.filterBody}>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={[
                    { value: 'T-shirts', label: 'T-shirts' },
                  ]}
                />
              )}
            />
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={`${styles.filterHeader} flex space-between align-y mb-10`} onClick={() => toggleSection('price')}>
          <h3>Price</h3>
          {expandedSections.price ? <CgChevronDown /> : <CgChevronUp />}
        </div>
        {expandedSections.price && (
          <div className={styles.filterBody}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Range
                {...field}
                step={10}
                min={0}
                max={500}
                values={field.value || priceRange}
                onChange={(values) => {
                  if (values.length === 2) {
                    const newPriceRange: [number, number] = [values[0], values[1]];
                    field.onChange(newPriceRange);
                    setPriceRange(newPriceRange);
                    onPriceRangeChange(newPriceRange);
                  }
                }}
                renderTrack={({ props, children }) => (
                  <div {...props} style={{ height: '2px', background: '#ddd', marginBottom: '10px' }}>
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{ height: '20px', width: '20px', background: '#000', borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}
                  />
                )}
              />
            )}
          />
          <div className={`${styles.priceLabels} flex space-between`}>
            <Text>${priceRange[0]}</Text>
            <Text>${priceRange[1]}</Text>
          </div>
        </div>
        )}
      </div>
      
      <hr style={{marginBottom: '15px', borderColor: 'rgba(0,0,0,0.5)'}}/>

      <div className={styles.filterSection}>
        <div className={`${styles.filterHeader} flex space-between align-y mb-10`} onClick={() => toggleSection('colors')}>
          <h3>Colors</h3>
          {expandedSections.colors ? <CgChevronDown /> : <CgChevronUp />}
        </div>
          {expandedSections.colors && (
          <div className={styles.filterBody}>
            <Controller
              name="colors"
              control={control}
              render={({ field }) => (
                <div className={styles.checkboxGroup}>
                  {['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Orange', 'Purple', 'Pink'].map((color) => (
                    <div key={color} className={styles.checkbox}>
                      <Box
                        as="span"
                        display="inline-block"
                        w="24px"
                        h="24px"
                        bgColor={color}
                        borderRadius="50%"
                        className={styles.colorCircle}
                        onClick={() => {
                          const newValue = field.value?.includes(color)
                            ? field.value.filter((v: string) => v !== color)
                            : [...(field.value || []), color];
                          field.onChange(newValue);
                        }}
                        sx={{
                          border: field.value?.includes(color)
                            ? '2px solid blue'
                            : 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {field.value?.includes(color) && (
                          <Box
                            as="span"
                            display="inline-block"
                            w="8px"
                            h="8px"
                            bgColor="white"
                            borderRadius="50%"
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                          />
                        )}
                      </Box>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        )}
      </div>

      <hr style={{marginBottom: '15px', borderColor: 'rgba(0,0,0,0.5)'}}/>

      <div className={styles.filterSection}>
      <div className={`${styles.filterHeader} flex space-between align-y mb-10`} onClick={() => toggleSection('sizes')}>
        <h3>Sizes</h3>
        {expandedSections.sizes ? <CgChevronDown /> : <CgChevronUp />}
      </div>
      {expandedSections.sizes && (
        <div className={styles.filterBody}>
            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <div className={styles.checkboxGroup}>
                  {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large'].map(
                    (size) => (
                      <button 
                        key={size}
                        className={styles.filterButton} 
                        style={{backgroundColor: field.value?.includes(size) ? 'rgba(0,0,0,0.3)' : 'white'}}
                        onClick={(e) => {
                          e.preventDefault();
                          const newValue = field.value?.includes(size) ? field.value.filter((v: string) => v !== size) : [...(field.value || []), size];
                          field.onChange(newValue);
                        }}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              )}
            />
        </div>
      )}
    </div>

    <hr style={{marginBottom: '15px', borderColor: 'rgba(0,0,0,0.5)'}}/>

    <div className={styles.filterSection}>
      <div className={`${styles.filterHeader} flex space-between align-y mb-10`} onClick={() => toggleSection('dressStyles')}>
        <h3>Dress Styles</h3>
        {expandedSections.dressStyles ? <CgChevronDown /> : <CgChevronUp />}
      </div>
      {expandedSections.dressStyles && (
        <div className={styles.filterBody}>
          <Controller
            name="dressStyles"
            control={control}
            render={({ field }) => (
              <div className={styles.checkboxGroup}>
                {['Formal', 'Casual'].map(style => (
                  <button 
                  key={style}
                  className={styles.filterButton} 
                  style={{backgroundColor: field.value?.includes(style) ? 'rgba(0,0,0,0.3)' : 'white'}}
                  onClick={(e) => {
                    e.preventDefault();
                    const newValue = field.value?.includes(style) ? field.value.filter((v: string) => v !== style) : [...(field.value || []), style];
                    field.onChange(newValue);
                  }}
                >
                  {style}
                </button>
                ))}
              </div>
            )}
          />
        </div>
      )}
    </div>

    <hr style={{marginBottom: '15px', borderColor: 'rgba(0,0,0,0.5)'}}/>

    <div className={styles.filterSection}>
      <div className={`${styles.filterHeader} flex space-between align-y mb-10`} onClick={() => toggleSection('brand')}>
        <h3>Brand</h3>
        {expandedSections.brand ? <CgChevronDown /> : <CgChevronUp />}
      </div>
      {expandedSections.brand && (
        <div className={styles.filterBody}>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <div className={styles.checkboxGroup}>
                {['BrandA', 'BrandB', 'BrandC'].map(brand => (
                  <div key={brand} className={styles.checkbox}>
                    <Checkbox
                      value={brand}
                      isChecked={field.value?.includes(brand)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(field.value || []), brand]
                          : field.value.filter((v: string) => v !== brand);
                        field.onChange(newValue);
                      }}
                    >
                      {brand}
                    </Checkbox>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      )}
    </div>

    <hr style={{marginBottom: '15px', borderColor: 'rgba(0,0,0,0.5)'}}/>

    <div className={styles.filterSection}>
      <div className={`${styles.filterHeader} flex space-between align-y mb-10`} onClick={() => toggleSection('fashionCollection')}>
        <h3>Fashion Collection</h3>
        {expandedSections.fashionCollection ? <CgChevronDown /> : <CgChevronUp />}
      </div>
      {expandedSections.fashionCollection && (
        <div className={styles.filterBody}>
          <Controller
            name="fashionCollection"
            control={control}
            render={({ field }) => (
              <div className={styles.checkboxGroup}>
                {['Summer 2024', 'Winter 2024'].map(collection => (
                  <div key={collection} className={styles.checkbox}>
                    <Checkbox
                      value={collection}
                      isChecked={field.value?.includes(collection)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(field.value || []), collection]
                          : field.value.filter((v: string) => v !== collection);
                        field.onChange(newValue);
                      }}
                    >
                      {collection}
                    </Checkbox>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      )}
    </div>
  </Box>
  );
};

export default Filter;

