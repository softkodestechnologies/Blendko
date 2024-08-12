import * as Yup from 'yup';
import { Formik } from 'formik';

import styles from './returns.module.css';

import { ButtonArrow } from '../../../public/svg/icon';

function ReturnStep3({
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
        You can exchange or return an item within 30 days after receiving your
        order
      </p>

      <section className={`${styles.sub_section} ${styles.form_block}`}>
        <h3>CONFIRMATION EMAIL</h3>

        <Formik
          initialValues={{ email: '', purpose: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required('Required')
              .email('Invalid email address'),

            purpose: Yup.string().required('Select an option.'),
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
                id="email"
                type="text"
                name="email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                placeholder="Enter confirmation email*"
              />

              {errors.email && touched.email && (
                <div className={`${styles.error}`}>{errors.email}</div>
              )}

              <div className={`flex flex-col ${styles.form_sub_section}`}>
                <h4>WHAT DO YOU WANT TO DO</h4>

                <label className={`flex align-y`}>
                  <input
                    type="radio"
                    name="purpose"
                    value="exchange"
                    onChange={handleChange}
                  />
                  Exchange
                </label>

                <label className={`flex align-y`}>
                  <input
                    type="radio"
                    name="purpose"
                    value="return"
                    onChange={handleChange}
                  />
                  Return
                </label>

                {errors.purpose && touched.purpose && (
                  <div className={`${styles.error}`}>{errors.purpose}</div>
                )}
              </div>

              <button type="submit" className={`flex center`}>
                Continue <ButtonArrow />
              </button>
            </form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default ReturnStep3;
