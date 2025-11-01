import { useLogin } from './useLogin';

const Login = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white ">
      <div className="bg-[#FCFBFB] rounded-lg shadow-md w-full max-w-[1080px] min-h-[80vh] grid grid-cols-[60%_40%] border border-gray-100">
        <section className="relative flex items-center justify-center bg-[url('/images/login_bg.png')] bg-cover p-8 text-white after:content-[''] after:absolute after:inset-0 after:bg-black/30 after:rounded-tl-xl after:rounded-bl-xl">
          <div className="z-99">
            <h4 className="font-bold text-[64px] max-w-[500px] mb-12">Welcome to the Manager's Lounge</h4>
            <p className="text-2xl max-w-[500px]">Your key to running a stress-free and memorable hotel experience.</p>
          </div> 
        </section>
        <section className="flex flex-col items-stretch justify-center p-6">
          <h1 className="font-medium text-[32px] mb-8">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                id='email'
                type='email'
                placeholder="Your Email"
                {...register('email')}
                className="rounded-xl border border-gray-300 shadow px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-green focus:border-transparent w-full bg-white"
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <input
                id='password'
                type='password'
                placeholder="Your Password"
                {...register('password')}
                className="rounded-xl border border-gray-300 shadow px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-green focus:border-transparent w-full bg-white"
                disabled={isSubmitting}
              />
              {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
            </div>

            <button type='submit' className="mt-4 rounded-xl bg-hotel-green-hover text-hotel-gold-light py-2 px-4 w-full cursor-pointer active:scale-99" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
