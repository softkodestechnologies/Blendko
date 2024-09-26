import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './auth.module.css';

import Link from 'next/link';
import { useLogInMutation } from '@/services/authService';
import asyncSubmission from '@/utils/hooks/asyncSubmission';
import handlePropagation from '@/utils/helpers/handlePropagation';
import Alert from '@/components/ui/alert/Alert';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLogInMutation();
  const { isError, handleSubmission } = asyncSubmission({
    callback: login,
  });
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
    await handleSubmission(values, resetForm, '/', () => {
      setAlert({ show: true, type: 'success', message: 'Login successful!' });
    });

    if (isError.error) {
      setAlert({ show: true, type: 'error', message: isError.message });
    }
  };

  return (
    <div className={`full-width ${styles.auth}`}>
      <h1>Log In</h1>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Must be 8 characters or more')
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await handleFormSubmission(values, resetForm);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <form
            onSubmit={(e) => handlePropagation(e, handleSubmit)}
            className={`full-width ${styles.form}`}
          >
            <div className={`${styles.field}`}>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={`full-width`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={`${styles.error}`}
              />
            </div>

            <div className={`${styles.field} ${styles.last}`}>
              <label className="password-label" htmlFor="password">
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password*"
                  className={`full-width`}
                  id="password"
                />

                <button
                  type="button"
                  className={`${styles.password_visibility}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </label>
              <ErrorMessage
                name="password"
                component="div"
                className={`${styles.error}`}
              />
            </div>

            <div className={`flex full-width ${styles.forgot_pass}`}>
              <Link className="forgot" href="/forgot">
                Forgot Your Password?
              </Link>
            </div>

            <button
              className={`full-width ${styles.submit_button}`}
              type="submit"
            >
              Log In
            </button>

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

export default Login;
