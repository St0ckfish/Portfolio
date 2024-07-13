/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { useInView } from 'react-intersection-observer';

const cardVariants: Variants = {
    offscreen: {
        y: 100
    },
    onscreen: {
        y: 10,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};


const icons = [
    { src: "/images/nxt.png", alt: "React", delay: 0.5 },
    { src: "/images/react.svg", alt: "NextJS", delay: 0.7 },
    { src: "/images/tailwind.svg", alt: "Tailwind", delay: 0.9 },
    { src: "/images/typescript.svg", alt: "TypeScript", delay: 0.11 },
    { src: "/images/spring.svg", alt: "Spring", delay: 0.13 },
    { src: "/images/js.svg", alt: "JavaScript", delay: 0.15 },
];

const Portfolio = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const controls = useAnimation();
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }, [controls]);
    return (
        <motion.div className={`text-white grid z-40 ${booleanValue ? "bg-white" : ""} w-full`} initial={{ opacity: 0, y: 20 }} animate={controls}>
            {showButton && (
                <motion.button
                onClick={handleClick}
                className={`fixed top-6 right-6 ${booleanValue ? "bg-black " : "bg-white"}  p-1 rounded-full z-50`}
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { duration: 0.5 } }}
                whileHover={{ scale: 1.1 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" style={booleanValue ? {fill: '#ffffff'} : { fill: '#000000' }}>
                    <path d="m12 6.879-7.061 7.06 2.122 2.122L12 11.121l4.939 4.94 2.122-2.122z"></path>
                </svg>
            </motion.button>
            )}
            <div className="mt-[250px] grid gap-4 justify-center text-center px-[200px] max-[940px]:px-[1px] before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:translate-x-full max-[1345px]:before:translate-x-[2px] before:rounded-full before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-[500px] max-[1345px]:after:translate-x-[2px] after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10  after:opacity-40 before:lg:h-[360px] z-40">
                <p className={`text-[27px] z-40 max-[480px]:text-[24px] ${booleanValue ? "text-[#585858]" : "text-[#c8c8c8]"} `}>
                    &lt; Here, you can know me a little more and see my <br /> whole experience as a <span className={`font-semibold ${booleanValue ? "text-black" : "text-[#ffffff]"} `}>Front-End Software Engineer</span>. /&gt;
                </p>
            </div>
            <div className="flex justify-center items-center mt-8">
                <a href="https://flowcv.com/resume/tuqcpijwb6" target="_blank" className={`px-3.5 py-2 ${booleanValue ? "bg-black text-white" : "bg-white"  } rounded-2xl text-black font-semibold hover:-translate-y-1 hover:scale-110 duration-200`}>
                    Download CV
                </a>
            </div>
            <div className={`w-full flex text-center justify-center sm:justify-start sm:text-start ${booleanValue ? "text-[#1d1c1cd2]" : "text-[#c8c8c8]"}  sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px] mt-[20px]`}>
                <p>
                    These are the Projects
                </p>
            </div>
            <div className=" py-5  flex flex-wrap gap-10 w-full h-full justify-center px-[200px] max-[940px]:px-[40px]">

                <motion.div
                    className={`project-one py-5 px-3 grid justify-center items-center rounded-2xl  ${booleanValue ? "bg-white border-[#1414151a]" : "bg-black border-[#141415]"} border  shadow-xl`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={cardVariants}>
                    <div className="w-full">
                        <Image src="/images/project.png" className="rounded-2xl w-[350px] max-[480px]:w-[300px] h-full" height={200} width={200} alt="#" />
                    </div>
                    <div className="flex justify-start text-start items-center px-2 py-4">
                        <p className={`${booleanValue ? "text-black" : "text-[#ffffff]"}`}>Education platform</p>
                    </div>
                    <div className="flex justify-between items-center mt-5 px-3">
                        <Link href="/portfolio/view-project" className={`flex gap-2 items-center px-4 py-2   ${booleanValue ? "bg-[#ececec] text-black" : "bg-[#1b1b1b]"} text-[16px] rounded-2xl hover:gap-3  duration-200`}>
                            View <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={booleanValue ? {fill: '#000000'} : { fill: '#ffffff' }}><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg>
                        </Link>
                        <Link href="https://github.com/M0staphaTaha/EduAI-Admin" target="_blank" className={`flex gap-2 items-center px-4 py-2 ${booleanValue ? "bg-[#ececec] text-black" : "bg-[#1b1b1b]"} text-[16px] rounded-2xl hover:gap-3  duration-200`}>
                            GitHub <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={booleanValue ? {fill: '#000000'} : { fill: '#ffffff' }}><path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>
                        </Link>
                    </div>
                    <div className="flex flex-wrap px-3 py-4 gap-3 w-[350px] max-[480px]:w-[300px]">
                    {icons.map((icon, index) => {
                    const [ref, inView] = useInView({
                        triggerOnce: true,
                        threshold: 0.1,
                    });

                    return (
                        <motion.div
                            key={index}
                            className={`icon border border-[#1b1b1d] ${booleanValue ? " border-[#1414151a]" : " border-[#141415]"} flex text-[#888889] gap-3 font-semibold justify-between rounded-full px-2 py-1 items-center text-[15px]`}
                            ref={ref}
                            initial={{ opacity: 0, y: 100 }}
                            animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: icon.delay } } : {}}
                        >
                            <Image src={icon.src} alt={icon.alt} className="rounded-md " width={20} height={20} />
                            <p>{icon.alt}</p>
                        </motion.div>
                    );
                })}
                    </div>
                </motion.div>
                <motion.div
                    className={`project-one py-5 px-3 grid justify-center items-center rounded-2xl  ${booleanValue ? "bg-white border-[#1414151a]" : "bg-black border-[#141415]"} border  shadow-xl`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={cardVariants}>
                    <div className="w-full">
                        <Image src="/images/vita.png" className="rounded-2xl w-[350px] max-[480px]:w-[300px] h-full" height={200} width={200} alt="#" />
                    </div>
                    <div className="flex justify-start text-start items-center px-2 py-4">
                        <p className={`${booleanValue ? "text-black" : "text-[#ffffff]"}`}>Viaparapharma Dashboard</p>
                    </div>
                    <div className="flex justify-between items-center mt-5 px-3">
                        <Link href="/portfolio/view-project" className={`flex gap-2 items-center px-4 py-2   ${booleanValue ? "bg-[#ececec] text-black" : "bg-[#1b1b1b]"} text-[16px] rounded-2xl hover:gap-3  duration-200`}>
                            View <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={booleanValue ? {fill: '#000000'} : { fill: '#ffffff' }}><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg>
                        </Link>
                        <Link href="https://github.com/M0staphaTaha/EduAI-Admin" target="_blank" className={`flex gap-2 items-center px-4 py-2 ${booleanValue ? "bg-[#ececec] text-black" : "bg-[#1b1b1b]"} text-[16px] rounded-2xl hover:gap-3  duration-200`}>
                            GitHub <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={booleanValue ? {fill: '#000000'} : { fill: '#ffffff' }}><path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>
                        </Link>
                    </div>
                    <div className="flex flex-wrap px-3 py-4 gap-3 w-[350px] max-[480px]:w-[300px]">
                    {icons.map((icon, index) => {
                    const [ref, inView] = useInView({
                        triggerOnce: true,
                        threshold: 0.1,
                    });

                    return (
                        <motion.div
                            key={index}
                            className={`icon border border-[#1b1b1d] ${booleanValue ? " border-[#1414151a]" : " border-[#141415]"} flex text-[#888889] gap-3 font-semibold justify-between rounded-full px-2 py-1 items-center text-[15px]`}
                            ref={ref}
                            initial={{ opacity: 0, y: 100 }}
                            animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: icon.delay } } : {}}
                        >
                            <Image src={icon.src} alt={icon.alt} className="rounded-md " width={20} height={20} />
                            <p>{icon.alt}</p>
                        </motion.div>
                    );
                })}
                    </div>
                </motion.div>
                <motion.div
                    className={`project-one py-5 px-3 grid justify-center items-center rounded-2xl  ${booleanValue ? "bg-white border-[#1414151a]" : "bg-black border-[#141415]"} border  shadow-xl`}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={cardVariants}>
                    <div className="w-full">
                        <Image src="/images/ecommerce.png" className="rounded-2xl w-[350px] max-[480px]:w-[300px] h-full" height={200} width={200} alt="#" />
                    </div>
                    <div className="flex justify-start text-start items-center px-2 py-4">
                        <p className={`${booleanValue ? "text-black" : "text-[#ffffff]"}`}>Ecommerce Website</p>
                    </div>
                    <div className="flex justify-between items-center mt-5 px-3">
                        <Link href="/portfolio/view-project" className={`flex gap-2 items-center px-4 py-2   ${booleanValue ? "bg-[#ececec] text-black" : "bg-[#1b1b1b]"} text-[16px] rounded-2xl hover:gap-3  duration-200`}>
                            View <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={booleanValue ? {fill: '#000000'} : { fill: '#ffffff' }}><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg>
                        </Link>
                        <Link href="https://github.com/M0staphaTaha/EduAI-Admin" target="_blank" className={`flex gap-2 items-center px-4 py-2 ${booleanValue ? "bg-[#ececec] text-black" : "bg-[#1b1b1b]"} text-[16px] rounded-2xl hover:gap-3  duration-200`}>
                            GitHub <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={booleanValue ? {fill: '#000000'} : { fill: '#ffffff' }}><path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>
                        </Link>
                    </div>
                    <div className="flex flex-wrap px-3 py-4 gap-3 w-[350px] max-[480px]:w-[300px]">
                    {icons.map((icon, index) => {
                    const [ref, inView] = useInView({
                        triggerOnce: true,
                        threshold: 0.1,
                    });

                    return (
                        <motion.div
                            key={index}
                            className={`icon border border-[#1b1b1d] ${booleanValue ? " border-[#1414151a]" : " border-[#141415]"} flex text-[#888889] gap-3 font-semibold justify-between rounded-full px-2 py-1 items-center text-[15px]`}
                            ref={ref}
                            initial={{ opacity: 0, y: 100 }}
                            animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: icon.delay } } : {}}
                        >
                            <Image src={icon.src} alt={icon.alt} className="rounded-md " width={20} height={20} />
                            <p>{icon.alt}</p>
                        </motion.div>
                    );
                })}
                    </div>
                </motion.div>


            </div>
            <div className={`w-full flex text-center justify-center sm:justify-start sm:text-start ${booleanValue ? "text-[#1d1c1cd2]" : "text-[#c8c8c8]"}  sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px] mt-[20px]`}>
                <p>
                    These are the Work Experience
                </p>
            </div>
            <div className="grid gap-4 px-[150px] max-[940px]:px-[30px] mt-[70px]  ">
                <div className={`project-one px-12 py-5 rounded-2xl ${booleanValue ? "bg-[#1313131f]" : "bg-[#131313]"}  flex items-center justify-between gap-4 w-full max-[1023px]:grid max-[1023px]:justify-center`}>
                    <div className="grid gap-3 w-full">
                        <h1 className={` ${booleanValue ? "text-black" : ""} font-semibold text-[25px] max-[1277px]:text-[20px] `}>Front-End Software Engineer</h1>
                        <p className={` ${booleanValue ? "text-[#6738d3]" : "text-[#b292ff]"} text-[20px] max-[1277px]:text-[16px]`}>X-Tech</p>
                        <div className="text-[#6e6e6e] flex items-center gap-2 text-[16px]">2024<div className="h-1.5 w-1.5 rounded-full bg-[#5fb9b0] me-2"></div><p className=" -translate-x-1.5">Current</p></div>
                    </div>
                    <div className="flex text-[20px] max-[1277px]:text-[16px]">
                        <p className="text-[#6e6e6e]">
                            I was the leader of <span className={`font-semibold ${booleanValue ? "text-black" : "text-[#ffffffbb]"} `}>Front-End Team</span> in the company, and i undertool many projects, including the <span className={`font-semibold ${booleanValue ? "text-black" : "text-[#ffffffbb]"} `}>Education Platform</span> and <span className={`font-semibold ${booleanValue ? "text-black" : "text-[#ffffffbb]"} `}>Dashboard</span> to manage a huge commercial site in Morocco and other  projects
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Portfolio;