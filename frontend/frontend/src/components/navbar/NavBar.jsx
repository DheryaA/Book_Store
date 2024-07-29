import { Link } from "react-router-dom"
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from 'react-redux'



const NavBar = () => {

    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All-Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    // console.log(isLoggedIn)
    const role = useSelector((state) => state.auth.role);

    if (isLoggedIn === false) {
        links.splice(2, 2);
    }

    if (isLoggedIn === true && role === "user") {
        links.splice(4, 1);
    }

    if (isLoggedIn === true && role === "admin") {
        links.splice(3, 1);
    }


    const [MobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className='z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between'>
                <Link to="/" className='flex items-center'>
                    <img className='h-7 w-7 me-4' src="https://www.svgrepo.com/show/125863/books.svg" alt="logo" />
                    <h1 className='text-2xl cursor-pointer font-semibold'>Book-Heaven</h1>
                </Link>
                <div className="nav-link-bookheaven block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-6 cursor-pointer">

                        {links.map((items, i) => (
                            <div className="flex items-center" key={i}>
                                {items.title === "Profile" ||
                                items.title==="Admin Profile"
                                ? <Link
                                    to={items.link}
                                    className=" border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 px-4 py-1 bordre-blue-500 rounded"
                                    key={i}
                                >
                                    {items.title}
                                </Link> : <Link
                                    to={items.link}
                                    className="hover:text-blue-500 transition-all duration-300"
                                    key={i}
                                >
                                    {items.title}
                                </Link>
                                }
                            </div>
                        ))}
                    </div>

                    {isLoggedIn === false && (
                        <div className="hidden md:flex gap-4">
                            <Link to="/LogIn" className=" hover:bg-white hover:text-zinc-800 transition-all duration-300 px-4 py-1 bordre-blue-500 rounded">LogIn</Link>
                            <Link to="/SignUp" className="hover:bg-white hover:text-zinc-800 transition-all duration-300  px-4 py-1 bg-blue-500 rounded">SignUp</Link>
                        </div>
                    )}

                    <button onClick={() => MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} className=" md:hidden block text-white text-2xl hover:text-zinc-400">
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            <div className={`${MobileNav} flex flex-col items-center justify-center bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40`}>
                {links.map((items, i) => <Link to={items.link}
                    className={`${MobileNav} mb-8 text-white text-4xl font-semibold hover:text-blue-500 transition-all duration-300`} key={i}
                    onClick={() => MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}
                >{items.title}

                </Link>)}

                {isLoggedIn === false ? (
                    <>
                        <Link to="/LogIn"
                            className={` ${MobileNav} text-3xl font-semibold mb-8 hover:bg-white hover:text-zinc-800 transition-all duration-300 px-8 text-white hover:bg-white hover:text-zinc-800 py-2 bordre-blue-500 rounded`}>LogIn</Link>
                        <Link to="/SignUp"
                            className={` ${MobileNav} text-3xl font-semibold mb-8 hover:bg-white hover:text-zinc-800 transition-all duration-300  px-8 py-2 bg-blue-500 rounded`}>SignUp</Link>
                    </>
                ) :
                    <></>
                }

            </div>

        </>
    )
}

export default NavBar
