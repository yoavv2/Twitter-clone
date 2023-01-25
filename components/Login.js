import { signIn } from 'next-auth/react';

function Login({ providers }) {
  console.log(
    '%cMyProject%cline:3%cproviders',
    'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
    'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
    'color:#fff;background:rgb(178, 190, 126);padding:3px;border-radius:2px',
    providers
  );
  return (
    <div className='flex flex-col items-center space-y-20 pt-48'>
      {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
      <img
        src='https://rb.gy/ogau5a'
        alt='twitter-logo'
        width={150}
        height={150}
      />
      <div>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name} className='flex flex-col justify-center'>
              {/* https://devdojo.com/tailwindcss/buttons#_ */}
              <button
                className='relative inline-flex items-center justify-start px-6 py-3 my-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group'
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                <span className='w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
                <span className='relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white'>
                  Sign in with {provider.name}
                </span>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Login;
