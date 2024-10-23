'use client';

import Link from 'next/link';
import { useState } from 'react';

import styles from './auth.module.css';

import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '@/services/authService';
import asyncSubmission from '@/utils/hooks/asyncSubmission';
import Alert from '@/components/ui/alert/Alert';
import handlePropagation from '@/utils/helpers/handlePropagation';

const Register = () => {
  const [register] = useRegisterMutation();
  const { isError, handleSubmission } = asyncSubmission({
    callback: register,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });

  const handleFormSubmission = async (values: any, resetForm: () => void) => {
    const referralCode = localStorage.getItem('referralCode');
    const name = `${values.firstName} ${values.lastName}`;
    const valuesWithName = { ...values, name };
    const payload = referralCode ? { ...valuesWithName, referralCode } : values;

    await handleSubmission(payload, resetForm, '/', () => {
      setAlert({
        show: true,
        type: 'success',
        message: 'Registration successful!',
      });
    });

    if (isError.error) {
      setAlert({ show: true, type: 'error', message: isError.message });
    }
  };

  return (
    <div className={`full-width ${styles.auth}`}>
      <h1>Register</h1>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Must be 8 characters or more')
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await handleFormSubmission(values, resetForm);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <form
            className={`full-width ${styles.form}`}
            onSubmit={(e) => handlePropagation(e, handleSubmit)}
          >
            <div className={`${styles.field}`}>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className={`full-width`}
                placeholder="First Name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </div>

            <div className={`${styles.field}`}>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className={`full-width`}
              />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>

            <div className={`${styles.field}`}>
              <Field
                type="email"
                id="email"
                name="email"
                className={`full-width`}
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className={`${styles.field} ${styles.last}`}>
              <label className="password-label" htmlFor="password">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a Password"
                  className={`full-width`}
                />

                <button
                  type="button"
                  className={`${styles.password_visibility}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </label>

              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button
              type="submit"
              className={`full-width ${styles.submit_button}`}
            >
              Create Account
            </button>

            <p className={`${styles.sub_content}`}>
              By creating an account, you agree to the Terms & Conditions and{' '}
              <Link href="/privacy">Privacy Policy</Link>
            </p>

            <p className={`${styles.cta}`}>
              Don’t have an Account? <Link href="/register">Register</Link>
            </p>
          </form>
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

export default Register;
