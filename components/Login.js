import { signIn } from 'next-auth/react';

function Login({ providers, csrfToken }) {
  console.log('%cLogin.js line:4 csrfToken', 'color: #007acc;', csrfToken);
  return (
    <div
      className='flex sm:flex-col lg:flex-row lg:w-5/12 mx-auto my-auto sm:min-h-screen
    '
    >
      <div className='flex-1 relative flex flex-col items-center justify-center overflow-hidden'>
        <div className='p-6 m-auto bg-slate-900 rounded-md shadow-md lg:max-w-xl'>
          <div className='flex justify-center'>
            {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
            <img
              src='https://rb.gy/ogau5a'
              alt='twitter-logo'
              width={96}
              height={96}
              //
            />
          </div>
          <div>
            {providers &&
              Object.values(providers).map(
                (provider) =>
                  provider.id !== 'credentials' && (
                    <div
                      key={provider.name}
                      className='flex flex-col justify-center'
                    >
                      {/* https://devdojo.com/tailwindcss/buttons#_ */}
                      <button
                        className='relative inline-flex items-center justify-start px-6 py-3 my-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group'
                        onClick={() =>
                          signIn(provider.id, { callbackUrl: '/' })
                        }
                      >
                        <span className='w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
                        <span className='relative w-full text-center text-black transition-colors duration-300 ease-in-out group-hover:text-white'>
                          Sign in with {provider.name}
                        </span>
                      </button>
                    </div>
                  )
              )}
          </div>

          <span className='flex items-center justify-center '>
            <hr className='flex-1 border-sky-600' />
            <span className='text-gray-400 p-1'>or</span>
            <hr className='flex-1 border-sky-600' />
          </span>

          <form
            method='post'
            action='/api/auth/callback/credentials'
            className='mt-6'
          >
            {/* <input name='csrfToken' type='hidden' defaultValue={csrfToken} /> */}
            <div className='mb-2'>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-400'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                className='block w-full px-4 py-2 mt-2 text-[#1d9bf0] bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='password'
                className='block text-sm font-semibold text-gray-400'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                className='block w-full px-4 py-2 mt-2 text-[#1d9bf0] bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </div>
            <div className='mt-6'>
              <button
                type='button'
                className='w-full tracking-wide relative inline-flex items-center justify-start px-6 py-3 my-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group'
                onClick={() => signIn('credentials', { callbackUrl: '/' })}
              >
                <span className='w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
                <span className='relative w-full text-center text-black transition-colors duration-300 ease-in-out group-hover:text-white'>
                  Log in
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
