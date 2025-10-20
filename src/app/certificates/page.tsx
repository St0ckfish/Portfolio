/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const Certificates = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

    const certificates = [
        {
            title: "Git & GitHub",
            issuer: "Elmadrasa",
            year: "2024",
            link: "https://drive.google.com/file/u/0/d/1kqRrJEOHFyTSzaDt84iiixZ13zJeo2oG/view?usp=drivesdk&pli=1",
            variant: "left"
        },
        {
            title: "ICPC Contest",
            issuer: "ICPC",
            year: "2023",
            link: "/certificates",
            variant: "right"
        },
        {
            title: "JavaScript",
            issuer: "Hacker Rank",
            year: "2024",
            link: "https://www.hackerrank.com/certificates/83d903b1593d",
            variant: "left"
        },
        {
            title: "Networks From Hussien Nasser",
            issuer: "Udemy",
            year: "2024",
            link: "/certificates",
            variant: "right"
        },
        {
            title: "React & Next From Maximilian",
            issuer: "Udemy",
            year: "2024",
            link: "/",
            variant: "left"
        },
    ];

    const certificateVariant = (direction: string) => ({
        hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    });

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
        <motion.div className={` grid ${booleanValue ? "bg-white text-black" : "text-white"} w-full gap-10 justify-center px-[200px] max-[940px]:px-[40px]  before:absolute before:h-[300px] before:w-[200px] sm:before:w-[100px] before:translate-x-1/2 max-[1345px]:before:translate-x-[2px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl opa before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-[500px] max-[1345px]:after:translate-x-[2px] after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-40 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]`}>
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
            <div className="mt-[150px] grid gap-10">

            {certificates.map((certificate, index) => {
                const { ref, inView } = useInView({
                    triggerOnce: true,
                    threshold: 0.1
                });
                return (
                    <motion.div
                        ref={ref}
                        key={index}
                        className={`px-12  py-5 rounded-3xl border ${booleanValue ? "border-x-[#adadada4] border-y-[#d6d6d6]" : "border-x-[#4343438e] border-y-[#232323]"} flex justify-between items-center gap-[350px] w-full max-[1023px]:grid max-[1023px]:justify-center max-[1023px]:gap-4`}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={certificateVariant(certificate.variant)}
                        >
                        <div className="grid gap-3">
                            <h1 className="font-semibold text-[25px] max-[1277px]:text-[20px]">{certificate.title}</h1>
                            <p className="text-[#b292ff] text-[20px] max-[1277px]:text-[16px]">{certificate.issuer}</p>
                            <div className="text-[#6e6e6e] flex items-center gap-2 text-[16px]">{certificate.year}<div className="h-1.5 w-1.5 rounded-full bg-[#b95f5f] me-2"></div><p className=" -translate-x-1.5">End</p></div>
                        </div>
                        <div className="flex text-[18px] max-[1277px]:text-[16px]">
                            <a href={certificate.link} className={`${booleanValue ? "text-[#428079]" : "text-[#5fb9b0]"}`}>
                                View Certificate
                            </a>
                        </div>
                    </motion.div>
                );
            })}
            </div>
        </motion.div>
    );
};

export default Certificates;
