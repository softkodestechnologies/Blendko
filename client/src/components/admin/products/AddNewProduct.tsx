"use client";
import React, { useState, useRef } from 'react';
import { FaImage } from 'react-icons/fa';
import Image from 'next/image';
import styles from './AddNewProduct.module.css';
import { useCreateProductMutation, useGetCategoriesQuery } from '@/services/userService';
import Alert from '@/components/ui/alert/Alert';

const AddNewProduct: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery({});
  const [createProduct] = useCreateProductMutation();
  
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: '',
  });
  const handleSizeGuideUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('size_guide', file);
      // Handle the size guide upload separately
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
    if (files) {
      const fileArray = Array.from(files);
      console.log("New files selected:", fileArray.length);
      console.log("Current imageFiles:", imageFiles.length);
  
      if (fileArray.length + imageFiles.length > 6) {
        console.log("Too many files selected. Total would be:", fileArray.length + imageFiles.length);
        setAlert({ show: true, type: 'error', message: 'You can only upload up to 6 images in total.' });
        return;
      }
  
      const newImagePreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImageFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...fileArray];
        console.log("Updated imageFiles:", updatedFiles.length);
        return updatedFiles;
      });
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
    }
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    console.log("Number of imageFiles before submission:", imageFiles.length);
  
    // Remove any existing 'images' fields from the formData
    formData.delete('images');
  
    imageFiles.forEach((file, index) => {
      console.log(`Appending file ${index + 1} to formData`);
      formData.append('images', file);
    });
  
    console.log("Number of images in formData after appending:", formData.getAll('images').length);
  
    try {
      console.log("Submitting form with", formData.getAll('images').length, "images");
      await createProduct(formData).unwrap();
  
      setAlert({ show: true, type: 'success', message: 'Product created successfully!' });
      formRef.current?.reset();
      setImagePreviews([]); 
      setImageFiles([]); 
    } catch (error) {
      console.error("Error creating product:", error);
      setAlert({ show: true, type: 'error', message: 'Error creating product. Please try again.' });
    }
  };

  return (
    <div className={styles.container}>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        {/* Product Name */}
        <div className={styles.formGroup}>
          <input name="name" type="text" placeholder="Product Name" required className={styles.input} />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <textarea name="description" placeholder="Description" required className={styles.textarea}></textarea>
        </div>

        {/* Image Upload */}
        <div className={styles.imageUpload}>
          {imagePreviews.map((image, index) => (
            <div key={index} className={styles.imagePreview}>
              <Image src={image} alt={`Product ${index + 1}`} width={80} height={80} objectFit="cover" />
            </div>
          ))}
          <label className={styles.uploadButton}>
            <FaImage />
            <span>Add Image</span>
            <input type="file" name="images" accept="image/*" multiple onChange={handleImageUpload} hidden />
          </label>
        </div>

        {/* Price */}
        <div className={styles.formGroup}>
          <input name="price" type="number" step="0.01" placeholder="Price" required className={styles.input} />
        </div>

        {/* Categories */}
        <div className={styles.formGroup}>
          <select title="category" name="category" required className={styles.select}>
            <option value="">Select Category</option>
            {categoriesData?.categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className={styles.formGroup}>
          <input name="subcategory" type="text" placeholder="Subcategory" required className={styles.input} />
        </div>

        {/* Brand */}
        <div className={styles.formGroup}>
          <input name="brand" type="text" placeholder="Brand" required className={styles.input} />
        </div>

        {/* Measurement */}
        <div className={styles.formGroup}>
          <input name="measurement" type="text" placeholder="Measurement" required className={styles.input} />
        </div>

        {/* Quantity */}
        <div className={styles.formGroup}>
          <input name="quantity" type="number" placeholder="Quantity" required className={styles.input} />
        </div>

        {/* Available Quantity */}
        <div className={styles.formGroup}>
          <input name="available_quantity" type="number" placeholder="Available Quantity" required className={styles.input} />
        </div>

        {/* Discount */}
        <div className={styles.formGroup}>
          <input name="discount" type="number" step="0.01" placeholder="Discount" className={styles.input} />
        </div>

        {/* Features */}
        <div className={styles.formGroup}>
          <input name="features" type="text" placeholder="Features (comma-separated)" className={styles.input} />
        </div>

        {/* Gender */}
        <div className={styles.formGroup}>
          <select title="gender-select" name="gender" required className={styles.select}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Colors */}
        <div className={styles.formGroup}>
          <input name="colors" type="text" placeholder="Colors (comma-separated)" className={styles.input} />
        </div>

        {/* Dress Style */}
        <div className={styles.formGroup}>
          <input name="dress_style" type="text" placeholder="Dress Style (comma-separated)" className={styles.input} />
        </div>

        {/* Sizes */}
        <div className={styles.formGroup}>
          <input name="sizes" type="text" placeholder="Sizes (comma-separated)" className={styles.input} />
        </div>

        {/* Fashion Collection */}
        <div className={styles.formGroup}>
          <input name="fashion_collection" type="text" placeholder="Fashion Collection (comma-separated)" className={styles.input} />
        </div>

        {/* Technology */}
        <div className={styles.formGroup}>
          <input name="technology" type="text" placeholder="Technology (comma-separated)" className={styles.input} />
        </div>

        {/* Is Customizable */}
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input name="isCustomizable" type="checkbox" className={styles.checkbox} />
            Is Customizable
          </label>
        </div>

        {/* Weight */}
        <div className={styles.formGroup}>
          <input name="weight" type="number" step="0.01" placeholder="Weight" required className={styles.input} />
        </div>

        {/* Width */}
        <div className={styles.formGroup}>
          <input name="width" type="number" step="0.01" placeholder="Width" required className={styles.input} />
        </div>

        {/* Height */}
        <div className={styles.formGroup}>
          <input name="height" type="number" step="0.01" placeholder="Height" required className={styles.input} />
        </div>

        {/* Size Guide */}
        <div className={styles.sizeGuide}>
          <h3>Size guide/chart</h3>
          <label className={styles.uploadButton}>
            <FaImage />
            <span>Drag your image or Choose to browse the file</span>
            <input type="file" name="size_guide" accept="image/*" onChange={handleSizeGuideUpload} hidden />
          </label>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>Save</button>
          <button type="button" className={styles.cancelButton}>Cancel</button>
        </div>
      </form>

      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
          duration={5000}
        />
      )}
    </div>
  );
};

export default AddNewProduct;

