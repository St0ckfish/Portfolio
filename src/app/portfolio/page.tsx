"use client"
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
        <motion.div className="text-white grid w-full" initial={{ opacity: 0, y: 20 }} animate={controls}>
            {showButton && (
                <motion.button
                    onClick={handleClick}
                    className="fixed top-6 right-6 bg-white p-1 rounded-full z-50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { duration: 0.5 } }}
                    whileHover={{ scale: 1.1 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" style={{ fill: '#000000' }}>
                        <path d="m12 6.879-7.061 7.06 2.122 2.122L12 11.121l4.939 4.94 2.122-2.122z"></path>
                    </svg>
                </motion.button>
            )}
            <div className="mt-[250px] grid gap-4 justify-center text-center px-[200px] max-[940px]:px-[1px] before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:translate-x-full max-[1345px]:before:translate-x-[2px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-[500px] max-[1345px]:after:translate-x-[2px] after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <p className="text-[27px] text-[#c8c8c8]">
                    &lt; Here, you can know me a little more and see my <br /> whole experience as a <span className="text-white font-semibold">Front-End Software Engineer</span>. /&gt;
                </p>
            </div>
            <div className="flex justify-center items-center mt-8">
                <a href="https://flowcv.com/resume/tuqcpijwb6" target="_blank" className="px-3.5 py-2 bg-white rounded-2xl text-black font-semibold hover:-translate-y-1 hover:scale-110 duration-200">
                    Download CV
                </a>
            </div>
            <div className="w-full flex text-center justify-center sm:justify-start sm:text-start text-[#c8c8c8] sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px] mt-[20px]">
                <p>
                    These are the Projects
                </p>
            </div>
            <div className=" py-5  flex flex-wrap gap-10 w-full h-full justify-center px-[200px] max-[940px]:px-[40px]">

                <motion.div
                    className="project-one py-5 px-3 grid justify-center items-center rounded-2xl bg-black border border-[#141415] shadow-xl"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={cardVariants}>
                    <div className="w-full">
                        <Image src="/images/project.png" className="rounded-2xl w-[350px] h-full" height={200} width={200} alt="#" />
                    </div>
                    <div className="flex justify-start text-start items-center px-2 py-4">
                        <p>Education platform</p>
                    </div>
                    <div className="flex justify-between items-center mt-5 px-3">
                        <Link href="http://edu-ai-admin-stockfish.vercel.app/" target="_blank" className="flex gap-2 items-center px-4 py-2 bg-[#1b1b1b] text-[16px] rounded-2xl hover:gap-3  duration-200">
                            View <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ fill: '#ffffff' }}><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg>
                        </Link>
                        <Link href="https://github.com/M0staphaTaha/EduAI-Admin" target="_blank" className="flex gap-2 items-center px-4 py-2 bg-[#1b1b1b] text-[16px] rounded-2xl hover:gap-3  duration-200">
                            GitHub <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ fill: '#ffffff' }}><path d="M20.892 9.889a.664.664 0 0 0-.025-.087l-2.104-6.479a.84.84 0 0 0-.8-.57.822.822 0 0 0-.789.575l-2.006 6.175H8.834L6.826 3.327a.823.823 0 0 0-.786-.575h-.006a.837.837 0 0 0-.795.575L3.133 9.815c0 .005-.005.01-.007.016l-1.067 3.281a1.195 1.195 0 0 0 .435 1.34l9.227 6.706c.167.121.393.12.558-.003l9.229-6.703a1.2 1.2 0 0 0 .435-1.34l-1.051-3.223zM17.97 3.936l1.809 5.566H16.16l1.81-5.566zm-11.94 0 1.812 5.566H4.228L6.03 3.936zm-2.982 9.752a.253.253 0 0 1-.093-.284l.793-2.437 5.817 7.456-6.517-4.735zm1.499-3.239h3.601l2.573 7.916-6.174-7.916zm7.452 8.794-2.856-8.798h5.718l-1.792 5.515-1.07 3.283zm1.282-.877 2.467-7.588.106-.329h3.604l-5.586 7.156-.591.761zm7.671-4.678-6.519 4.733.022-.029 5.794-7.425.792 2.436a.25.25 0 0 1-.089.285z"></path></svg>
                        </Link>
                    </div>
                    <div className="flex flex-wrap px-3 py-4 gap-3">
                        <motion.div className="border border-[#1b1b1d] flex text-[#888889] gap-3 font-semibold justify-between rounded-full px-2 py-1 items-center text-[15px]" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } }} viewport={{ once: true }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#ffffff' }}><circle cx="12" cy="11.245" r="1.785"></circle><path d="m7.002 14.794-.395-.101c-2.934-.741-4.617-2.001-4.617-3.452 0-1.452 1.684-2.711 4.617-3.452l.395-.1.111.391a19.507 19.507 0 0 0 1.136 2.983l.085.178-.085.178c-.46.963-.841 1.961-1.136 2.985l-.111.39zm-.577-6.095c-2.229.628-3.598 1.586-3.598 2.542 0 .954 1.368 1.913 3.598 2.54.273-.868.603-1.717.985-2.54a20.356 20.356 0 0 1-.985-2.542zm10.572 6.095-.11-.392a19.628 19.628 0 0 0-1.137-2.984l-.085-.177.085-.179c.46-.961.839-1.96 1.137-2.984l.11-.39.395.1c2.935.741 4.617 2 4.617 3.453 0 1.452-1.683 2.711-4.617 3.452l-.395.101zm-.41-3.553c.4.866.733 1.718.987 2.54 2.23-.627 3.599-1.586 3.599-2.54 0-.956-1.368-1.913-3.599-2.542a20.683 20.683 0 0 1-.987 2.542z"></path><path d="m6.419 8.695-.11-.39c-.826-2.908-.576-4.991.687-5.717 1.235-.715 3.222.13 5.303 2.265l.284.292-.284.291a19.718 19.718 0 0 0-2.02 2.474l-.113.162-.196.016a19.646 19.646 0 0 0-3.157.509l-.394.098zm1.582-5.529c-.224 0-.422.049-.589.145-.828.477-.974 2.138-.404 4.38.891-.197 1.79-.338 2.696-.417a21.058 21.058 0 0 1 1.713-2.123c-1.303-1.267-2.533-1.985-3.416-1.985zm7.997 16.984c-1.188 0-2.714-.896-4.298-2.522l-.283-.291.283-.29a19.827 19.827 0 0 0 2.021-2.477l.112-.16.194-.019a19.473 19.473 0 0 0 3.158-.507l.395-.1.111.391c.822 2.906.573 4.992-.688 5.718a1.978 1.978 0 0 1-1.005.257zm-3.415-2.82c1.302 1.267 2.533 1.986 3.415 1.986.225 0 .423-.05.589-.145.829-.478.976-2.142.404-4.384-.89.198-1.79.34-2.698.419a20.526 20.526 0 0 1-1.71 2.124z"></path><path d="m17.58 8.695-.395-.099a19.477 19.477 0 0 0-3.158-.509l-.194-.017-.112-.162A19.551 19.551 0 0 0 11.7 5.434l-.283-.291.283-.29c2.08-2.134 4.066-2.979 5.303-2.265 1.262.727 1.513 2.81.688 5.717l-.111.39zm-3.287-1.421c.954.085 1.858.228 2.698.417.571-2.242.425-3.903-.404-4.381-.824-.477-2.375.253-4.004 1.841.616.67 1.188 1.378 1.71 2.123zM8.001 20.15a1.983 1.983 0 0 1-1.005-.257c-1.263-.726-1.513-2.811-.688-5.718l.108-.391.395.1c.964.243 2.026.414 3.158.507l.194.019.113.16c.604.878 1.28 1.707 2.02 2.477l.284.29-.284.291c-1.583 1.627-3.109 2.522-4.295 2.522zm-.993-5.362c-.57 2.242-.424 3.906.404 4.384.825.47 2.371-.255 4.005-1.842a21.17 21.17 0 0 1-1.713-2.123 20.692 20.692 0 0 1-2.696-.419z"></path><path d="M12 15.313c-.687 0-1.392-.029-2.1-.088l-.196-.017-.113-.162a25.697 25.697 0 0 1-1.126-1.769 26.028 26.028 0 0 1-.971-1.859l-.084-.177.084-.179c.299-.632.622-1.252.971-1.858.347-.596.726-1.192 1.126-1.77l.113-.16.196-.018a25.148 25.148 0 0 1 4.198 0l.194.019.113.16a25.136 25.136 0 0 1 2.1 3.628l.083.179-.083.177a24.742 24.742 0 0 1-2.1 3.628l-.113.162-.194.017c-.706.057-1.412.087-2.098.087zm-1.834-.904c1.235.093 2.433.093 3.667 0a24.469 24.469 0 0 0 1.832-3.168 23.916 23.916 0 0 0-1.832-3.168 23.877 23.877 0 0 0-3.667 0 23.743 23.743 0 0 0-1.832 3.168 24.82 24.82 0 0 0 1.832 3.168z"></path></svg>
                            <p>React</p>
                        </motion.div>
                        <motion.div className="border border-[#1b1b1d] flex text-[#888889] gap-3 font-semibold justify-between rounded-full px-2 py-1 items-center text-[15px]" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.2 } }} viewport={{ once: true }}>
                            <Image src="/images/nxt.png" alt="#" className="rounded-md" width={20} height={20} />
                            <p>NextJS</p>
                        </motion.div>
                        <motion.div className="border border-[#1b1b1d] flex text-[#888889] gap-3 font-semibold justify-between rounded-full px-2 py-1 items-center text-[15px]" initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.4 } }} viewport={{ once: true }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#ffffff' }}><path d="M19.24 3H4.76A1.76 1.76 0 0 0 3 4.76v14.48A1.76 1.76 0 0 0 4.76 21h14.48A1.76 1.76 0 0 0 21 19.24V4.76A1.76 1.76 0 0 0 19.24 3zm-5.8 10h-2.25v6.44H9.4V13H7.15v-1.46h6.29zm5.8 5.28a1.71 1.71 0 0 1-.67.74 3 3 0 0 1-1 .39 5.81 5.81 0 0 1-1.2.12 7 7 0 0 1-1.23-.11 4.52 4.52 0 0 1-1-.33v-1.71l-.06-.06h.06v.07a3.41 3.41 0 0 0 1 .54 3.06 3.06 0 0 0 1.13.2 2.58 2.58 0 0 0 .6-.06 1.47 1.47 0 0 0 .42-.17.75.75 0 0 0 .25-.25.69.69 0 0 0-.06-.74 1.24 1.24 0 0 0-.35-.33 3.12 3.12 0 0 0-.53-.3l-.67-.28a3.57 3.57 0 0 1-1.37-1 2 2 0 0 1-.46-1.33 2.16 2.16 0 0 1 .24-1.06 2.09 2.09 0 0 1 .66-.71 2.88 2.88 0 0 1 1-.42 5.11 5.11 0 0 1 1.19-.13 7 7 0 0 1 1.09.07 4.53 4.53 0 0 1 .88.23v1.65a2.42 2.42 0 0 0-.42-.24 3.58 3.58 0 0 0-.49-.17 3 3 0 0 0-.49-.1 2.45 2.45 0 0 0-.46 0 2.29 2.29 0 0 0-.56.06 1.54 1.54 0 0 0-.43.16.78.78 0 0 0-.26.25.63.63 0 0 0-.09.33.62.62 0 0 0 .1.35 1.19 1.19 0 0 0 .3.29 2.15 2.15 0 0 0 .46.28l.63.28a6.56 6.56 0 0 1 .84.42 2.65 2.65 0 0 1 .64.49 1.79 1.79 0 0 1 .42.63 2.48 2.48 0 0 1 .14.85 2.68 2.68 0 0 1-.25 1.08z"></path></svg>
                            <p>TypeScript</p>
                        </motion.div>
                    </div>
                </motion.div>


            </div>
            <div className="w-full flex text-center justify-center sm:justify-start sm:text-start text-[#c8c8c8] sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px] mt-[20px]">
                <p>
                    These are the Work Experience
                </p>
            </div>
            <div className="grid gap-4 px-[150px] max-[940px]:px-[30px] mt-[70px]  ">
                <div className="project-one px-12 py-5 rounded-2xl bg-[#131313] flex items-center justify-between gap-4 w-full max-[1023px]:grid max-[1023px]:justify-center">
                    <div className="grid gap-3 w-full">
                        <h1 className="font-semibold text-[25px] max-[1277px]:text-[20px]">Front-End Software Engineer</h1>
                        <p className="text-[#b292ff] text-[20px] max-[1277px]:text-[16px]">X-Tech</p>
                        <div className="text-[#6e6e6e] flex items-center gap-2 text-[16px]">2024<div className="h-1.5 w-1.5 rounded-full bg-[#5fb9b0] me-2"></div><p className=" -translate-x-1.5">Current</p></div>
                    </div>
                    <div className="flex text-[20px] max-[1277px]:text-[16px]">
                        <p className="text-[#6e6e6e]">
                            I was the leader of <span className="font-semibold text-[#ffffffbb]">Front-End Team</span> in the company, and i undertool many projects, including the <span className="font-semibold text-[#ffffffbb]">Education Platform</span> and <span className="font-semibold text-[#ffffffbb]">Dashboard</span> to manage a huge commercial site in Morocco and other  projects
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Portfolio;