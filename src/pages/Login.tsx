import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/Alert';

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: '',
    password: '',
  });
  const submit = (e: any) => {
    e.preventDefault();
    if (formDetails.username === 'admin' && formDetails.password === 'admin') {
      localStorage.setItem('token', 'admin');
      notify('login successfully!', { type: 'success' });
      navigate('/dashboard');
    } else {
      notify('Invalid credentials!', { type: 'error' });
    }
  };
  return (
    <>
      <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24  font-serif">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Welcome to HamoyeFlights React
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Sign in to continue to your account
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={submit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={formDetails.username}
                        onChange={(e) =>
                          setFormDetails({
                            ...formDetails,
                            username: e.target.value,
                          })
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="password"
                        name="password"
                        type={show ? 'text' : 'password'}
                        autoComplete="off"
                        value={formDetails.password}
                        onChange={(e) =>
                          setFormDetails({
                            ...formDetails,
                            password: e.target.value,
                          })
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-2">
                        <button
                          type="button"
                          className="hover:bg-gray-400 rounded-full px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"
                          onClick={() => setShow(!show)}
                        >
                          {show ? (
                            <EyeSlashIcon className="h-6 w-6" />
                          ) : (
                            <EyeIcon className="h-6 w-6" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!formDetails.username || !formDetails.password}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1421789497144-f50500b5fcf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
