import * as Yup from 'yup';
import Link from 'next/link';
import { Formik } from 'formik';

import styles from './returns.module.css';

import { ButtonArrow } from '../../../public/svg/icon';

function ReturnStep2({
  aria,
  onStepChange,
}: {
  aria: string;
  onStepChange: (step: number) => void;
}) {
  return (
    <div className={`section_container ${styles.content}`}>
      <h2 aria-labelledby={aria}>ORDERS AND RETURNS</h2>

      <p>
        Enter your order number to track your order. You can also log in track
        your order directly from your account
      </p>

      <Link href="/login">LOG IN</Link>

      <Formik
        initialValues={{ orderNumber: '' }}
        validationSchema={Yup.object({
          orderNumber: Yup.string().required('Required'),
        })}
        onSubmit={(values) => {
          console.log(values);
          onStepChange(3);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col ${styles.form}`}
          >
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.orderNumber}
              placeholder="Order number*"
            />

            {errors.orderNumber && touched.orderNumber && (
              <div className={`${styles.error}`}>{errors.orderNumber}</div>
            )}

            <small>Sent you your confirmation email</small>

            <button type="submit" className={`flex center`}>
              Continue <ButtonArrow />
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ReturnStep2;
