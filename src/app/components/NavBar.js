import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import from next/navigation

const NavBar = () => {

    const [pathname, setPathname] = useState("/");

    const handleLinkClick = (newPathname) => {
        setPathname(newPathname);
    };

    useEffect(() => {
        console.log("pathname :  ",pathname);

    }, [handleLinkClick]);

    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                <Link
                    onClick={() => handleLinkClick('/')}
                    className={`border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200  mx-1.5 sm:mx-6 ${
                        pathname === '/' ? 'text-blue-500' : ''
                    }`}
                    href="/"
                    >
                    الرئيسية

                </Link>

                <Link
                    onClick={() => handleLinkClick('/Notification')}

                    className={`border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200  mx-1.5 sm:mx-6 ${
                        pathname === '/Notification' ? 'text-blue-500' : ''
                    }`}
                    href="/Notification">



                        إشعار

                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
