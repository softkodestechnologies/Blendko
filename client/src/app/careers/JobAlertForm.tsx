'use client';

import * as Yup from 'yup';
import { Formik } from 'formik';

import styles from './career.module.css';

import { MailIcon } from '../../../public/svg/icon';

function JobAlertForm({ onCancel }: { onCancel: () => void }) {
  return (
    <Formik
      initialValues={{ email: '', terms: false }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        terms: Yup.boolean()
          .oneOf([true], 'You must accept the terms of the privacy policy')
          .required('You must accept the terms of the privacy policy'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <form
          className={`$flex flex-col full-width ${styles.form}`}
          onSubmit={formik.handleSubmit}
        >
          <div
            className={`full-width flex align-y space-between ${styles.email}`}
          >
            <input
              type="email"
              id="email"
              className="full-width"
              placeholder="YOUR EMAIL ADDRESS"
              {...formik.getFieldProps('email')}
            />

            <MailIcon />
          </div>

          {formik.touched.email && formik.errors.email ? (
            <div className={`${styles.error}`}>{formik.errors.email}</div>
          ) : null}

          <label
            htmlFor="terms"
            className={`full-width flex align-y space-between`}
          >
            I accept the terms of the privacy policy.
            <input
              type="checkbox"
              id="terms"
              {...formik.getFieldProps('terms')}
            />
            {}
          </label>

          {formik.touched.terms && formik.errors.terms ? (
            <div className={`${styles.error}`}>{formik.errors.terms}</div>
          ) : null}

          <p>
            By submitting your information, you acknowledge that you have read
            our privacy policy and consent to receive email communication from
            Blendko.
          </p>

          <div className={`full-width flex ${styles.action}`}>
            <button
              type="button"
              className="full-width"
              onClick={() => {
                formik.handleReset();
                onCancel();
              }}
            >
              CANCEL
            </button>

            <button type="submit" className="full-width">
              SIGN UP
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default JobAlertForm;
