import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { convertUnixToDate } from '../utils/functions';
import SignOutModal from './signoutModal';

const user = {
  name: 'Sally Flyer',
  email: 'sally@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1634896941598-b6b500a502a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80',
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
const Header = ({ end, begin }: { end: number; begin: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-indigo-600 pb-32">
      <Disclosure
        as="nav"
        className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0 font-bold tracking-tight text-white text-2xl font-mono">
                    HamoyeFlights
                  </div>
                  <div className="hidden lg:ml-10 lg:block">
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="bg-indigo-700 text-white rounded-md py-2 px-3 text-sm font-medium"
                        aria-current="page"
                      >
                        Dashboard
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => setOpen(true)}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="bg-indigo-700 text-white block rounded-md py-2 px-3 text-base font-medium"
                  aria-current="page"
                >
                  Dashboard
                </Disclosure.Button>
              </div>
              <div className="border-t border-indigo-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-indigo-300">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as="button"
                    onClick={() => setOpen(true)}
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-mono tracking-tight text-white text-center mb-4">
            Dashboard
          </h1>
          <p className="text-white max-w-2xl text-center mx-auto font-serif">
            Dashboard showing total number of flights arriving and departing
            from all airports on{' '}
            {convertUnixToDate(begin).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}{' '}
            within two hours interval from{' '}
            {convertUnixToDate(begin).toLocaleTimeString()} to{' '}
            {convertUnixToDate(end).toLocaleTimeString()}, give or take 10mins.
          </p>
        </div>
      </header>
      <SignOutModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
