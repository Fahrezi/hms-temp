import { useLogin } from './useLogin';

import styles from './Login.module.scss';

const Login = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLogin();

  return (
    <div className={styles.login}>
      <div className={styles.login__card}>
        <h1 className={styles['login__card--title']}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.login__field}>
            <label htmlFor='email' className={styles['login__field--label']}>
              Email
            </label>
            <input
              id='email'
              type='email'
              {...register('email')}
              className={styles['login__field--input']}
              disabled={isSubmitting}
            />
            {errors.email && <p className={styles['login__error']}>{errors.email.message}</p>}
          </div>

          <div className={styles.login__field}>
            <label htmlFor='password' className={styles['login__field--label']}>
              Password
            </label>
            <input
              id='password'
              type='password'
              {...register('password')}
              className={styles['login__field--input']}
              disabled={isSubmitting}
            />
            {errors.password && <p className={styles['login__error']}>{errors.password.message}</p>}
          </div>

          <button type='submit' className={styles.login__button} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className={styles.login__register}>
          Don&apos;t have an account? <a href='/register'>Register now!</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
