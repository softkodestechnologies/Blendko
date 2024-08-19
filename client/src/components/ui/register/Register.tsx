'use client';
import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaShoppingCart, FaExchangeAlt, FaUndoAlt } from 'react-icons/fa';
import Link from 'next/link';
import './Register.css';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '@/services/authService';
import asyncSubmission from '@/utils/hooks/asyncSubmission';
import Alert from '@/components/ui/alert/Alert';
import handlePropagation from '@/utils/helpers/handlePropagation';
import BlendkoIcon from './BlendkoIcon';
import FaCheckout from './FaCheckout';

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
    await handleSubmission(values, resetForm, '/', () => {
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
    <div className="reg-form">
      <h1>Register</h1>

      <div className="benefits">
        <ul>
          <li>
            <BlendkoIcon />
            Become a loyalty member to earn points and get exclusive offers and
            rewards
          </li>
          <li>
            <FaShoppingCart />
            Quick order information and tracking
          </li>
          <li>
            <FaExchangeAlt />
            Easier returns and exchanges
          </li>
          <li>
            <FaCheckout />
            Faster checkout
          </li>
        </ul>
      </div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
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
            onSubmit={(e) => handlePropagation(e, handleSubmit)}
            className="full-width"
          >
            <div className="form-group">
              <Field type="text" id="name" name="name" placeholder="Name*" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email Address*"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label className="password-label" htmlFor="password">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password*"
                />
                <span
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </span>
              </label>
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button className="submit-btn mb-10" type="submit">
              Create Account
            </button>
            <div className="flex flex-col center">
              <p className="mb-10">
                By logging in, you agree to the Terms & Conditions and Privacy
                Policy
              </p>
              <p className="login-tag">
                Already have an Account? <Link href="/login">Login</Link>
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

export default Register;
