"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/features/boolyanSlice";
import { RootState } from "@/GlobalRedux/store";

const NavBar = () => {
  const dispatch = useDispatch();
    const pathname = usePathname();
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const [light, setLight] = useState(false)
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isActive = (href: string) => {
        return pathname === href;
    };

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > 400 && window.scrollY > lastScrollY) {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                timerRef.current = setTimeout(() => setShow(false), 500);
            } else {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <div className={`flex w-full items-center justify-center z-50 top-5 fixed transition-transform duration-300 h-[60px] ${show ? 'translate-y-0' : '-translate-y-full'}`}>
            <nav className={`flex px-8 py-3 inset-x-0 bg-[#211F23]/40 shadow backdrop-blur-lg md:top-6 rounded-3xl ${booleanValue ? "text-black" : "text-white"}  gap-5`}>
                <Link href="/" className={`${booleanValue ? "hover:text-[#613cb8]" : "hover:text-[#b292ff]" } ${isActive("/") && booleanValue  ? "text-[#613cb8]" : isActive("/") && booleanValue == false  ? "text-[#b292ff]" : ""}`}>Home</Link>
                <Link href="/portfolio" className={`${booleanValue ? "hover:text-[#613cb8]" : "hover:text-[#b292ff]" } ${isActive("/portfolio") && booleanValue  ? "text-[#613cb8]" : isActive("/portfolio") && booleanValue == false  ? "text-[#b292ff]" : ""}`}>Portfolio</Link>
                <Link href="/certificates" className={`${booleanValue ? "hover:text-[#613cb8]" : "hover:text-[#b292ff]" } ${isActive("/certificates") && booleanValue  ? "text-[#613cb8]" : isActive("/certificates") && booleanValue == false  ? "text-[#b292ff]" : ""}`}>Certificates</Link>
                <div className="sm:flex gap-2 ml-2 hidden">
                    <a href="https://github.com/St0ckfish" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="svg-icon" style={booleanValue ? {fill: '#000000'} :{ fill: '#b292ff' }} > <path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>
                    </a>
                    <a href="https://linkedin.com/in/stockfish" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="svg-icon" style={booleanValue ? {fill: '#000000'} :{ fill: '#b292ff' }}><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path></svg>
                    </a>
                    <a href="https://twitter.com/m0stapha_" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="svg-icon" style={booleanValue ? {fill: '#000000'} :{ fill: '#b292ff' }}><path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path></svg>
                    </a>
                    <a href="https://facebook.com/profile.php?id=100009001212190" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="svg-icon" style={booleanValue ? {fill: '#000000'} :{ fill: '#b292ff' }}><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path></svg>
                    </a>
                </div>
                <div className=" shadow-xl">
                    <button onClick={()=> {setLight(!light); dispatch(toggle()); }} >
                        {
                            light?(
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: '#f8df1c' }}><path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path></svg>
                            ):(
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: '#ffffff' }}><path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path></svg>
                            )
                        }
                    </button>
                </div>
            </nav>
        </div>
        
    )
}

export default NavBar;
