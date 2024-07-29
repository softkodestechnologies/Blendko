"use client";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Settings.module.css';
import { useUpdateUserDetailsMutation } from '@/services/userService';
import useAsyncSubmission from '@/utils/hooks/asyncSubmission';
import Alert from '@/components/ui/alert/Alert';
import { RootState } from '@/services/store';
import { updateUser } from '@/services/userSlice';

const AccountDetails: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [updateUserProfile] = useUpdateUserDetailsMutation();
  const { isError, handleSubmission } = useAsyncSubmission({
    callback: updateUserProfile,
  });
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: '',
  });

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().required('Required'),
    dateOfBirth: Yup.date().required('Required'),
    country: Yup.string().required('Required'),
    province: Yup.string(),
    city: Yup.string().required('Required'),
    postcode: Yup.string().required('Required'),
  });

  const handleFormSubmission = async (values: any, resetForm: () => void) => {
    await handleSubmission(
      values,
      resetForm,
      undefined,
      (response) => {
        setAlert({ show: true, type: 'success', message: 'Profile updated successfully!' });
        dispatch(updateUser(response.user));
      }
    );

    if (isError.error) {
      setAlert({ show: true, type: 'error', message: isError.message });
    }
  };

  return (
    <div className={styles.accountDetails}>
      <h2>Account Details</h2>
      <Formik
        initialValues={{
          email: user?.email || '',
          phone: user?.phone || '',
          dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
          country: user?.country || '',
          province: user?.province || '',
          city: user?.city || '',
          postcode: user?.postcode || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await handleFormSubmission(values, resetForm);
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <Field type="tel" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" className={styles.error} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="dateOfBirth">Date of Birth*</label>
              <Field type="date" id="dateOfBirth" name="dateOfBirth" />
              <ErrorMessage name="dateOfBirth" component="div" className={styles.error} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="country">Country/Region*</label>
              <Field type="text" id="country" name="country" />
              <ErrorMessage name="country" component="div" className={styles.error} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="province">Province</label>
              <Field type="text" id="province" name="province" />
              <ErrorMessage name="province" component="div" className={styles.error} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city">Town/City*</label>
              <Field type="text" id="city" name="city" />
              <ErrorMessage name="city" component="div" className={styles.error} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="postcode">Postcode*</label>
              <Field type="text" id="postcode" name="postcode" />
              <ErrorMessage name="postcode" component="div" className={styles.error} />
            </div>
            <div className={styles.deleteAccount}>
              <hr />
              <div className="flex space-between align-y gap-10 pt-10 pb-10">
                <p>Delete Account</p>
                <button type="button" className={styles.deleteButton}>Delete</button>
              </div>
              <hr />
            </div>
            <div className={styles.saveButtonParent}>
              <button type="submit" className={styles.saveButton} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
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

export default AccountDetails;

