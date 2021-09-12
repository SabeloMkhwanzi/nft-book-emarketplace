/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'


const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Create', href: '/create', current: false },
  { name: 'Collection', href: '/collection', current: false },
  { name: 'Dashboard', href: '/dashboard', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function navbar() {
    return (
        <div>
              <Disclosure as="nav" className="bg-gray-800">
                 {({ open }) => (
                          <>
                          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                  <span className="sr-only">Open main menu</span>
                                  {open ? (
                                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                                  ) : (
                                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                  )}
                                </Disclosure.Button>
                              </div>
                              <div className="flex-1 flex items-center justify-center  pr-20 sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                  <h1 className="text-white text-sm text-2xl font-bold">SCRIPTO</h1>
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                  <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                      <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                          'px-3 py-2 rounded-md text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                      >
                                        {item.name}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                               <button type="button" className="bg-gray-800 px-7 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-gray-800 focus:ring-white"
                                  >
                                <span className="sr-only">Connect Wallet</span>
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                              </svg>
                              </button>

                                <button type="button" className="bg-gray-800 px-7 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-gray-800 focus:ring-white"
                                >
                                 <span className="sr-only">Profile</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                             
                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                              
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                      >
                                        Your Profile
                                      </a>
                                    )}
                                  </Menu.Item>

                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                      >
                                        Settings
                                      </a>
                                    )}
                                  </Menu.Item>

                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                      >
                                        Sign out
                                      </a>
                                    )}
                                  </Menu.Item>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                      </div>

                    <Disclosure.Panel className="sm:hidden">
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'block px-3 py-2 rounded-md text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                        
                      </div>
                    </Disclosure.Panel>        
                  </> 
      )}
    </Disclosure>
        </div>
    )
}
