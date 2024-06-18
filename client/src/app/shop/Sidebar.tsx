"use client";
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Range } from 'react-range';
import { Box, Checkbox, Stack, Text, Button } from '@chakra-ui/react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} className={styles.sidebar}>
      <h2>Filters</h2>
      
      <div className={styles.filterSection}>
        <h3>Categories</h3>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={[
                { value: 'Men', label: 'Men' },
                { value: 'Women', label: 'Women' },
                // Add more options as needed
              ]}
            />
          )}
        />
      </div>

      <div className={styles.filterSection}>
        <h3>Price</h3>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Range
              {...field}
              step={10}
              min={0}
              max={500}
              values={field.value || [0, 500]}
              onChange={(values) => field.onChange(values)}
              renderTrack={({ props, children }) => (
                <div {...props} style={{ height: '6px', background: '#ddd' }}>
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    height: '20px',
                    width: '20px',
                    backgroundColor: '#999',
                  }}
                />
              )}
            />
          )}
        />
      </div>

      <div className={styles.filterSection}>
        <h3>Colors</h3>
        <Controller
          name="colors"
          control={control}
          render={({ field }) => (
            <Stack direction="row">
              {['green', 'red', 'blue', 'yellow', 'pink', 'orange', 'black', 'white'].map(color => (
                <Checkbox key={color} value={color} {...field}>
                  <Box
                    as="span"
                    display="inline-block"
                    w="16px"
                    h="16px"
                    bgColor={color}
                    borderRadius="50%"
                  />
                </Checkbox>
              ))}
            </Stack>
          )}
        />
      </div>

      <div className={styles.filterSection}>
        <h3>Size</h3>
        <Controller
          name="sizes"
          control={control}
          render={({ field }) => (
            <Stack>
              {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large'].map(size => (
                <Checkbox key={size} value={size} {...field}>
                  {size}
                </Checkbox>
              ))}
            </Stack>
          )}
        />
      </div>

      <div className={styles.filterSection}>
        <h3>Dress Style</h3>
        <Controller
          name="dressStyles"
          control={control}
          render={({ field }) => (
            <Stack>
              {['Casual', 'Formal', 'Party', 'Gym'].map(style => (
                <Checkbox key={style} value={style} {...field}>
                  {style}
                </Checkbox>
              ))}
            </Stack>
          )}
        />
      </div>

      <Button type="submit" colorScheme="blue" mt={4}>
        Apply Filters
      </Button>
    </Box>
  );
}
