/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { useInView } from 'react-intersection-observer';
import projects from "./projects.json"
import experiences from "./experiences.json"

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" style={booleanValue ? { fill: '#ffffff' } : { fill: '#000000' }}>
                        <path d="m12 6.879-7.061 7.06 2.122 2.122L12 11.121l4.939 4.94 2.122-2.122z"></path>
                    </svg>
                </motion.button>
            )}
            <div className="mt-[250px] grid gap-4 justify-center text-center px-[200px] max-[940px]:px-[1px] before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:translate-x-full max-[1345px]:before:translate-x-[2px] before:rounded-full before:blur-2xl before:content-[''] before:animate-[blob_7s_infinite] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-[500px] max-[1345px]:after:translate-x-[2px] after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10  after:opacity-40 before:lg:h-[360px] z-40">
                <p className={`text-[27px] z-40 max-[480px]:text-[24px] ${booleanValue ? "text-[#585858]" : "text-[#c8c8c8]"} `}>
                    &lt; Here, you can know me a little more and see my <br /> whole experience as a <span className={`font-semibold ${booleanValue ? "text-black" : "text-[#ffffff]"} `}>Software Engineer</span>. /&gt;
                </p>
            </div>
            <div className="flex justify-center items-center mt-8">
                <a href="/Mostapha_Taha.pdf" download='/Mostapha_Taha.pdf' target="_blank" className={`px-3.5 py-2 z-40 ${booleanValue ? "bg-black text-white" : "bg-white"} rounded-2xl text-black font-semibold hover:-translate-y-1 hover:scale-110 duration-200`}>
                    Download CV
                </a>
            </div>
            <div className={`w-full flex text-center justify-center sm:justify-start sm:text-start ${booleanValue ? "text-[#1d1c1cd2]" : "text-[#c8c8c8]"}  sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px] mt-[20px]`}>
                <p>
                    These are the Projects
                </p>
            </div>
            <div className=" py-5  flex flex-wrap gap-10 w-full h-full justify-center px-[200px] max-[940px]:px-[40px]">

                {projects.map(project => (
                    <motion.div
                        key={project.id}
                        className={`project-one py-5 px-3 grid justify-center items-center rounded-2xl  ${booleanValue ? "bg-white border-[#1414151a]" : "bg-black border-[#141415]"} border  shadow-xl`}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.8 }}
                        variants={cardVariants}>
                        <div className="w-full">
                            <img src={project.image} className="rounded-2xl w-[350px] max-[480px]:w-[300px] h-full" height={200} width={200} alt={project.name} />
                        </div>
                        <div className="flex justify-start text-start items-center px-2 py-4">
                            <p className={`${booleanValue ? "text-black" : "text-[#ffffff]"}`}>{project.name}</p>
                        </div>
                        <div className="flex justify-between items-center mt-5 px-3">
                            <Link href={`portfolio/view-project/${project.id}`} className={`flex gap-2 items-center px-4 py-2 ${booleanValue ? "bg-[#ececec] text-black" : "bg-[#1b1b1b]"} text-[16px] rounded-2xl hover:gap-3 duration-200`}>
                                View
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={booleanValue ? { fill: '#000000' } : { fill: '#ffffff' }}>
                                    <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
                                    <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
                                </svg>
                            </Link>
                            {/* <Link href={`${project.link}`} className={`flex gap-2 items-center px-4 py-2 ${booleanValue ? "bg-[#ececec] text-black" : "bg-[#1b1b1b]"} text-[16px] rounded-2xl hover:gap-3 duration-200`}>
                                Code | Live
                                <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21" /></svg>
                            </Link> */}
                        </div>
                        <div className="flex flex-wrap px-3 py-4 gap-3 w-[350px] max-[480px]:w-[300px]">
                            {project.icons.map((icon, index) => {
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
                                        animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: icon.delay } } : {}}>
                                        <Image src={icon.src} alt={icon.alt} className="rounded-md " width={20} height={20} />
                                        <p>{icon.alt}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}


            </div>
            <div className={`w-full flex text-center justify-center sm:justify-start sm:text-start ${booleanValue ? "text-[#1d1c1cd2]" : "text-[#c8c8c8]"}  sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px] mt-[20px]`}>
                <p>
                    These are the Work Experience
                </p>
            </div>
            {experiences.map((experience) => (
                <div key={experience.id} className="grid gap-4 px-[150px] max-[940px]:px-[30px] mt-[70px]">
                    <div className={`project-${experience.id} px-12 py-5 rounded-2xl ${booleanValue ? "bg-[#1313131f]" : "bg-[#131313]"}  flex items-center justify-between gap-4 w-full max-[1023px]:grid max-[1023px]:justify-center`}>
                        <div className="grid gap-3 w-full">
                            <h1 className={` ${booleanValue ? "text-black" : ""} font-semibold text-[25px] max-[1277px]:text-[20px] `}>{experience.title}</h1>
                            {experience.companyUrl ? (
                                <Link href={experience.companyUrl} className={` ${booleanValue ? "text-[#6738d3]" : "text-[#b292ff]"} hover:underline underline-offset-2 flex items-center gap-2 text-[20px] max-[1277px]:text-[16px]`}>
                                    {experience.company} 
                                    <svg className={`${booleanValue ? "text-[#6738d3]" : "text-[#b292ff]"} h-6 w-6`}  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                                        <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l-.5 -.5" />
                                    </svg>
                                </Link>
                            ) : (
                                <p className={` ${booleanValue ? "text-[#6738d3]" : "text-[#b292ff]"} text-[20px] max-[1277px]:text-[16px]`}>
                                    {experience.company}
                                </p>
                            )}
                            <div className="text-[#6e6e6e] flex items-center gap-2 text-[16px]">
                                {experience.startDate}
                                {!experience.current ? (
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#b95f5f] me-2"></div>
                                ) :
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#5fb9b0] me-2 shadow-[0_0_12px_4px_#5fb9b0] animate-pulse" />
                                    }
                                <p className=" -translate-x-1.5">{experience.endDate}</p>
                            </div>
                        </div>
                        <div className="flex text-[20px] max-[1277px]:text-[16px] w-full">
                            <p className="text-[#6e6e6e]" dangerouslySetInnerHTML={{
                                __html: experience.description.replace(
                                    /(Frontend Developer|Svelte|QuraanCore|Front-End Team|Education Platform|Dashboard|full-stack developer|e-commerce platforms|educational tools|database design|API development|user interface implementation)/g,
                                    `<span class="font-semibold ${booleanValue ? 'text-black' : 'text-[#ffffffbb]'}">$1</span>`
                                )
                            }}>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

export default Portfolio;