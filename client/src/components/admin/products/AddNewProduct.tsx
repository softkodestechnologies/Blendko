"use client";
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaImage, FaPlus } from 'react-icons/fa';
import styles from './AddNewProduct.module.css';
import Image from 'next/image';

const AddNewProductSchema = Yup.object().shape({
  productName: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().positive('Price must be positive').required('Price is required'),
  discountPercentage: Yup.number().min(0).max(100, 'Discount must be between 0 and 100'),
  inventory: Yup.number().integer('Quantity must be an integer').min(0, 'Quantity must be positive'),
  weight: Yup.number().positive('Weight must be positive'),
  width: Yup.number().positive('Width must be positive'),
  height: Yup.number().positive('Height must be positive'),
  length: Yup.number().positive('Length must be positive'),
});

const AddNewProduct: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [trackInventory, setTrackInventory] = useState(true);
  const [requiresShipping, setRequiresShipping] = useState(true);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          productName: '',
          description: '',
          category: '',
          price: '',
          discountPercentage: '',
          inventory: '',
          weight: '',
          width: '',
          height: '',
          length: '',
        }}
        validationSchema={AddNewProductSchema}
        onSubmit={(values) => {
          console.log(values);
          // Handle form submission
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <Field name="productName" placeholder="Product Name" className={styles.input} />
              {errors.productName && touched.productName && <div className={styles.error}>{errors.productName}</div>}
            </div>

            <div className={styles.formGroup}>
              <Field as="textarea" name="description" placeholder="Description" className={styles.textarea} />
              {errors.description && touched.description && <div className={styles.error}>{errors.description}</div>}
            </div>

            <div className={styles.imageUpload}>
              {images.map((image, index) => (
                <div key={index} className={styles.imagePreview}>
                  <Image src={image} alt={`Product ${index + 1}`} layout="fill" />
                </div>
              ))}
              <label className={styles.uploadButton}>
                <FaImage />
                <span>Add Image</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} hidden />
              </label>
            </div>

            <div className={styles.formGroup}>
              <Field as="select" name="category" className={styles.select}>
                <option value="">Select Category</option>
                <option value="shorts">Shorts</option>
              </Field>
              {errors.category && touched.category && <div className={styles.error}>{errors.category}</div>}
            </div>

            <div className={styles.formGroup}>
              <Field name="price" type="number" placeholder="Price" className={styles.input} />
              {errors.price && touched.price && <div className={styles.error}>{errors.price}</div>}
            </div>

            <div className={styles.formGroup}>
              <Field name="discountPercentage" type="number" placeholder="Discount Percentage" className={styles.input} />
              {errors.discountPercentage && touched.discountPercentage && <div className={styles.error}>{errors.discountPercentage}</div>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={trackInventory}
                  onChange={() => setTrackInventory(!trackInventory)}
                  className={styles.checkbox}
                />
                Track inventory
              </label>
            </div>

            {trackInventory && (
              <div className={styles.formGroup}>
                <Field name="inventory" type="number" placeholder="Quantity" className={styles.input} />
                {errors.inventory && touched.inventory && <div className={styles.error}>{errors.inventory}</div>}
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={requiresShipping}
                  onChange={() => setRequiresShipping(!requiresShipping)}
                  className={styles.checkbox}
                />
                Requires shipping
              </label>
            </div>

            {requiresShipping && (
              <div className={styles.shippingInfo}>
                <div className={styles.formGroup}>
                  <Field name="weight" type="number" placeholder="Weight (kg)" className={styles.input} />
                  {errors.weight && touched.weight && <div className={styles.error}>{errors.weight}</div>}
                </div>
                <div className={styles.formGroup}>
                  <Field name="width" type="number" placeholder="Width (cm)" className={styles.input} />
                  {errors.width && touched.width && <div className={styles.error}>{errors.width}</div>}
                </div>
                <div className={styles.formGroup}>
                  <Field name="height" type="number" placeholder="Height (cm)" className={styles.input} />
                  {errors.height && touched.height && <div className={styles.error}>{errors.height}</div>}
                </div>
                <div className={styles.formGroup}>
                  <Field name="length" type="number" placeholder="Length (cm)" className={styles.input} />
                  {errors.length && touched.length && <div className={styles.error}>{errors.length}</div>}
                </div>
              </div>
            )}

            <div className={styles.sizeGuide}>
              <h3>Size guide/chart</h3>
              <label className={styles.uploadButton}>
                <FaImage />
                <span>Drag your image or Choose to browse the file</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
              </label>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>Save</button>
              <button type="button" className={styles.cancelButton}>Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewProduct;