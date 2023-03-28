import React, {useEffect, useState} from 'react';
import {Link, NavLink, Outlet, ScrollRestoration} from "react-router-dom";

function Root() {
    const [showNav, setShowNav] = useState(false);

    const sideNav = () => {
        const width = window.innerWidth;
        if (width < 768) {
            setShowNav(!showNav)
        }
    }
    const resizeNav = () => {
        const width = window.innerWidth;
        if (width > 768) {
            setShowNav(true)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', resizeNav);
        const width = window.innerWidth;
        if (width > 768) {
            setShowNav(true)
        }
    })

    return (
        <>
            <div className={'flex flex-col min-h-screen text-amber-50 overflow-x-hidden'}>
                <div
                    className='flex flex-wrap align-middle items-center justify-between p-5 bg-gradient-to-r from-gray-800 to-black text-amber-50'>
                    <h3 className={'text-3xl font-bold text-amber-500'}><Link to={'home'}>CookIt</Link></h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-8 h-8 md:hidden" onClick={() => sideNav()}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                    {
                        showNav ? (
                            <ul className={'md:flex flex-wrap gap-5 font-bold  bg-gray-600 w-full p-5 text-center md:w-fit md:p-0 md:bg-transparent'}>
                                <NavLink to={'home'} className={({isActive}) => isActive ? "active-route" : ""}
                                         onClick={() => sideNav()}>
                                    <li className={'p-3 px-6 hover:bg-amber-500 hover:bg-opacity-50 rounded-full'}>Home</li>
                                </NavLink>
                                <NavLink to={'cookbook'} className={({isActive}) => isActive ? "active-route" : ""}
                                         onClick={() => sideNav()}>
                                    <li className={'rounded-full hover:bg-amber-500 hover:bg-opacity-50 p-3 px-6'}>CookBook</li>
                                </NavLink>
                                <NavLink to={'about'} className={({isActive}) => isActive ? "active-route" : ""}
                                         onClick={() => sideNav()}>
                                    <li className={'p-3 px-6 hover:bg-amber-500 hover:bg-opacity-50 rounded-full'}>About
                                        Us
                                    </li>
                                </NavLink>
                            </ul>
                        ) : null
                    }

                </div>
                <div className={'px-5 pb-5 bg-gradient-to-r from-gray-800 to-black grow'}>
                    <ScrollRestoration/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Root;
