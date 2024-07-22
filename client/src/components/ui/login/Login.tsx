import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
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
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: '',
  });

  const handleFormSubmission = async (values: any, resetForm: () => void) => {
    await handleSubmission(
      values,
      resetForm,
      '/',
      () => {
        setAlert({ show: true, type: 'success', message: 'Login successful!' });
      }
    );

    if (isError.error) {
      setAlert({ show: true, type: 'error', message: isError.message });
    }
  };

  return (
    <div className="login-form">
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
          <form onSubmit={(e) => handlePropagation(e, handleSubmit)} className="full-width">
            <div className="form-group">
              <Field name="email" type="email" placeholder="Email Address*" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label className="password-label" htmlFor="password">
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password*"
                  id="password"
                />
                <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </span>
                <ErrorMessage name="password" component="div" className="error" />
              </label>
            </div>
            <div className="flex space-between mb-10">
              <div className="checkbox">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link className="forgot" href="/forgot">Forgot Your Password?</Link>
            </div>
            <button className="submit-btn mb-10" type="submit">Log In</button>
            <div className="flex flex-col center">
              <p className="mb-10">
                By logging in, you agree to the Terms & Conditions and Privacy Policy
              </p>
              <p className="register-tag">
                New to Blendko? <Link href="/register">Register</Link>
              </p>
            </div>
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
