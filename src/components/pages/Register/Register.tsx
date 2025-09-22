import { useRegister } from './useRegister';

import styles from './Register.module.scss';

const Register = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useRegister();

  return (
    <div className={styles.register}>
      <div className={styles.register__card}>
        <header>
          <h1 className={styles['register__card--title']}>Register</h1>
        </header>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} role='form'>
          <div className={styles.register__field}>
            <label htmlFor='email' className={styles['register__field--label']}>
              Email
            </label>
            <input
              id='email'
              type='email'
              {...register('email')}
              className={styles['register__field--input']}
              disabled={isSubmitting}
            />
            {errors.email && <p className={styles['register__error']}>{errors.email.message}</p>}
          </div>

          <div className={styles.register__field}>
            <label htmlFor='password' className={styles['register__field--label']}>
              Password
            </label>
            <input
              id='password'
              type='password'
              {...register('password')}
              className={styles['register__field--input']}
              disabled={isSubmitting}
            />
            {errors.password && <p className={styles['register__error']}>{errors.password.message}</p>}
          </div>

          <button
            type='submit'
            className={styles.register__button}
            disabled={isSubmitting}
            aria-label={isSubmitting ? 'Registering...' : 'Register'}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className={styles.register__login}>
          Already have an account? <a href='/login'>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
