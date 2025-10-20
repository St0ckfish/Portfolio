/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextEditor } from 'stockfish-components';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        title: 'Front-end Engineer Design',
        items: [
            { name: 'React', src: '/images/react.svg', delay: 0.4 },
            { name: 'Next JS', src: '/images/nxt.png', delay: 0.6 },
            { name: 'Vite', src: '/images/vite.svg', delay: 0.8 },
            { name: 'Svelte', src: '/images/Svelte.png', delay: 1 },
            { name: 'Jest', src: '/images/jest.png', delay: 1.2 },
            { name: 'Bun', src: '/images/bun.png', delay: 1.4 },
            { name: 'Tailwind', src: '/images/tailwind.svg', delay: 1.6 },
            { name: 'Figma', src: '/images/figma.svg', delay: 1.8 },
        ],
        height: 'auto',
    },
    {
        title: 'Dev-Ops',
        items: [{ name: 'Docker', src: '/images/docker.png', delay: 0.4 }],
        height: '150px',
    },
    {
        title: 'Languages',
        items: [
            { name: 'JavaScript', src: '/images/js.png', delay: 0.6 },
            { name: 'TypeScript', src: '/images/typescript.svg', delay: 0.8 },
            { name: 'C++', src: '/images/cpp.svg', delay: 1 },
            { name: 'Python', src: '/images/py.svg', delay: 1.2 },
        ],
        height: '320px',
    },
    {
        title: 'Back End',
        items: [
            { name: 'NodeJS', src: '/images/node.svg', delay: 0.4 },
            { name: 'Nest', src: '/images/nest.png', delay: 0.6 },
            { name: 'Express', src: '/images/ex.png', delay: 0.8 },
            { name: 'MongoDB', src: '/images/mongo.svg', delay: 1 },
        ],
        height: '320px',
    },
];

const Landing = () => {
    const textRef = useRef<HTMLHeadingElement[]>([]);

    const addToRefs = (el: HTMLHeadingElement) => {
        if (el && !textRef.current.includes(el)) {
            textRef.current.push(el);
        }
    };

    useEffect(() => {
        textRef.current.forEach((el, index) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 50, scale: 0.8, rotation: 10 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: true,
                        toggleActions: "play none none reverse",
                    },
                    delay: index * 0.2,
                }
            );
        });
    }, []);

    const booleanValue = useSelector((state: RootState) => state.boolean.value);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.8,
    });

    const [showButton, setShowButton] = useState(false);
    const controls = useAnimation();

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

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const slideRefs = useRef<HTMLDivElement[]>([]);

    const slides = [
        {
            src: "/images/js.png",
            title: "JavaScript",
            bgColor: "#c3c99e",
        },
        {
            src: "/images/react.svg",
            title: "React",
            bgColor: "#7d9ca5",
        },
        {
            src: "/images/next.png",
            title: "Next.js",
            bgColor: "#c2c2c2",
        },
        {
            src: "/images/Svelte.png",
            title: "Svelte",
            bgColor: "#ffffff",
        },
        {
            src: "/images/redux.png",
            title: "Redux",
            bgColor: "#462b70",
        },
        {
            src: "/images/github.svg",
            title: "GitHub",
            bgColor: "#ffffff",
        },
        {
            src: "/images/typescript.svg",
            title: "TypeScript",
            bgColor: "#123c81",
        },
        {
            src: "/images/tailwind.svg",
            title: "TailwindCSS",
            bgColor: "#38b2ac",
        },
        {
            src: "/images/node.svg",
            title: "Node",
            bgColor: "#2a562a",
        },
    ];

    const startDragging = (e: React.MouseEvent) => {
        if (sliderRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - sliderRef.current.offsetLeft);
            setScrollLeft(sliderRef.current.scrollLeft);
        }
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const handleDragging = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    useEffect(() => {
        const slider = sliderRef.current;
        const handleScroll = () => {
            if (!slider) return;
            const slideWidth = slideRefs.current[0]?.offsetWidth || 0;
            const gap = 12; // gap-3 is 12px
            const totalSlideWidth = slideWidth + gap;
            const newIndex = Math.round(slider.scrollLeft / totalSlideWidth);
            setCurrentIndex(newIndex);
        };

        if (slider) {
            slider.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (slider) {
                slider.removeEventListener("scroll", handleScroll);
            }
        };
    }, [slides.length]);

    useEffect(() => {
        controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }, [controls]);

    // Function to scroll to a specific slide
    const scrollToSlide = (index: number) => {
        if (sliderRef.current && slideRefs.current[index]) {
            const slide = slideRefs.current[index];
            const slideLeft = slide.offsetLeft;
            sliderRef.current.scrollTo({
                left: slideLeft,
                behavior: 'smooth'
            });
        }
    };

    // Handle click on a slide
    const handleSlideClick = (index: number) => {
        scrollToSlide(index);
        setCurrentIndex(index);
    };
    const [content, setContent] = useState('');

    return (
        <motion.div className={` ${booleanValue ? "bg-white text-black" : "text-white"} grid w-full`} initial={{ opacity: 0, y: 20 }} animate={controls}>
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
            <div className="mt-[250px] z-40 flex max-[1240px]:grid justify-between max-[1240px]:justify-center flex-row-reverse px-[200px] max-[940px]:px-[1px]">
                <div className="flex justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-['']  before:animate-[blob_7s_infinite] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] after:animate-[blob_11s_infinite] z-[-1]">
                    <Image src="/images/me2.jpg" alt="#" className=" rounded-2xl h-[320px] w-[250px] max-[1332px]:h-[300px] max-[1332px]:w-[220px] z-40 " width={240} height={100} />
                </div>
                <div className="grid gap-10 max-[1240px]:justify-center max-[1240px]:text-center">
                    <motion.h1 className="text-[52px] max-[575px]:text-[40px]" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 } }}>
                        Hi, I’m Mostapha
                    </motion.h1>
                    <motion.p className="text-[#6e6e6e] text-[24px] max-[690px]:text-[20px] max-[575px]:text-[14px] px-4" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}>
                        During these <span className={`${booleanValue ? "text-black" : "text-[#ffffff]"} font-semibold`}>4 years </span> as <span className={`${booleanValue ? "text-black" : "text-[#ffffff]"} font-semibold`}>Full-Stack Software Engineer</span>. My <br /> role has extended beyond coding to effective <br /> communication with various departments, to define new <br /> features and spearheading the development of new apps.
                    </motion.p>
                    <motion.div className="flex items-center max-[1240px]:justify-center flex-wrap gap-8 text-[18px]" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1, delay: 1.5 } }}>
                        <a href="/Mostapha_Taha.pdf" download='/Mostapha_Taha.pdf' target="_blank" className={`px-3.5 py-2  ${booleanValue ? "text-white bg-black" : "text-black bg-white"} rounded-2xl  font-semibold hover:-translate-y-1 hover:scale-110 duration-200`}>
                            Download CV
                        </a>
                        <Link href="/certificates" className={`${booleanValue ? "hover:text-[#623bbd]" : "hover:text-[#b292ff]"}  font-semibold`}>See Experience</Link>
                    </motion.div>
                    <motion.div className="flex items-center max-[1240px]:justify-center flex-wrap gap-8 text-[18px]">
                        <a className="font-semibold font-mono" href="mailto:m0stapha1@hotmail.com" target="_blank" rel="noopener noreferrer"> m0stapha1@hotmail.com </a>
                    </motion.div>
                </div>
            </div>
            {/* <TextEditor
        value={content}
        onChange={setContent}
        placeholder="Start typing..."
      /> */}
            <div className="grid z-40">
                <div className="flex px-[200px] max-[812px]:grid max-[940px]:px-[1px] mt-[200px] justify-between gap-20 overflow-hidden">
                    <motion.div className={`z-40 pl-7 flex justify-center items-center max-[812px]:text-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial ${booleanValue ? "before:from-black" : "before:from-white"} before:to-transparent before:blur-2xl before:content-[''] before:animate-[blob_8s_infinite] after:absolute after:-z-20 after:h-[180px] after:w-[140px] after:translate-x-1/3 after:bg-gradient-conic ${booleanValue ? "after:from-gray-800 after:via-[#363538]" : "after:from-sky-200 after:via-[#e6dff7]"} after:blur-2xl after:content-[''] after:animate-[blob_9s_infinite] before:dark:bg-gradient-to-br before:dark:from-transparent ${booleanValue ? "before:dark:to-[#888888] after:dark:via-[#50505098]" : "before:dark:to-[#ffffff] after:dark:via-[#ffffff6e]"}  before:dark:opacity-10 after:dark:opacity-40 before:lg:h-[360px] z-[-1] `}>
                        <p className="text-[#6e6e6e] text-[15px] z-40">4 Years <br /> <span className={`${booleanValue ? "text-black" : "text-[#ffffff]"} text-[50px] font-semibold`}>XP</span> <br /> with the most popular ecosystem frontend </p>
                    </motion.div>
                    <motion.div
                        className="slider relative grid gap-5 hide-scrollbar"
                        ref={sliderRef}
                        onMouseDown={startDragging}
                        onMouseLeave={stopDragging}
                        onMouseUp={stopDragging}
                        onMouseMove={handleDragging}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab', overflow: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
                        initial={{ x: '100vw' }}
                        animate={{ x: 0, transition: { duration: 1 } }}
                    >
                        <div className="flex gap-3" style={{ scrollSnapAlign: 'center' }}>
                            {slides.map((slide, index) => (
                                <motion.div
                                    key={index}
                                    ref={el => {
                                        if (el) {
                                            slideRefs.current[index] = el;
                                        }
                                    }}
                                    onClick={() => handleSlideClick(index)}
                                    className={`px-5 py-3 h-[200px] w-[300px] grid items-center gap-3 rounded-3xl `}
                                    style={{ backgroundColor: slide.bgColor }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.5, delay: index * 0.2 } }}
                                >
                                    <Image src={slide.src} alt={slide.title} className=" rounded-md" width={50} height={50} />
                                    <p className="text-black font-semibold text-[25px]">{slide.title}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <div className="slider relative grid gap-5 mt-10">
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 mt-10">
                        {Array.from({ length: slides.length }).map((_, index) => (
                            <motion.div
                                key={index}
                                className={`h-2 transition ease-in duration-300 rounded-full ${currentIndex === index && booleanValue == true ? 'bg-black w-8' : currentIndex === index && booleanValue == false ? 'bg-white w-8' : 'bg-gray-500 w-3'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    handleSlideClick(index);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.5, delay: index * 0.2 } }}
                            ></motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <motion.div className="grid gap-36 bg-[url('/images/hero1.png')] bg-auto bg-fixed" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1, delay: 2 } }}>
                <div className="grid justify-center text-center gap-24 sm:text-[100px] text-[50px] font-semibold mt-[200px]">
                    <h1
                        ref={addToRefs}
                        className="bg-clip-text text-transparent bg-gradient-to-t from-[#9e7bcc] via-[#c69aff] to-[#c7aceb]"
                    >
                        TypeScript
                    </h1>
                    <h1
                        ref={addToRefs}
                        className="bg-clip-text text-transparent bg-gradient-to-t from-[#7f42cc] via-[#9e52ff] to-[#b07af7]"
                    >
                        NextJS
                    </h1>
                    <h1
                        ref={addToRefs}
                        className="bg-clip-text text-transparent bg-gradient-to-t from-[#6104d6] via-[#8303ff] to-[#8f23fa]"
                    >
                        Coffee
                    </h1>
                </div>
                <div className={`w-full flex text-center justify-center sm:justify-start sm:text-start ${booleanValue ? "text-[#1d1c1cd2]" : "text-[#c8c8c8]"}  sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px] mt-[20px]`}>
                    <p>
                        These are the <br />
                        technologies I’ve been using
                    </p>
                </div>
            </motion.div>
            <motion.div className="grid mt-[200px] px-[200px] max-[940px]:px-[1px] w-full overflow-x-auto" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1, delay: 3 } }}>
                <div className={`flex gap-20  ${booleanValue ? "text-black" : "text-[#ffffff]"} w-full`}>
                    <div className="flex gap-20 w-max">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`px-6 py-4 rounded-3xl border ${booleanValue
                                    ? 'border-x-[#adadada4] border-y-[#d6d6d6]'
                                    : 'border-x-[#4343438e] border-y-[#232323]'
                                    } grid gap-5 w-[300px] h-[${category.height}]`}
                            >
                                <h1>{category.title}</h1>
                                {category.items.map((item, idx) => {
                                    const [ref, inView] = useInView({
                                        triggerOnce: true,
                                        threshold: 0.1,
                                    });

                                    return (
                                        <motion.div
                                            key={idx}
                                            className="flex gap-2 items-center"
                                            ref={ref}
                                            initial={{ opacity: 0, x: 200 }}
                                            animate={
                                                inView
                                                    ? { opacity: 1, x: 0, transition: { duration: 0.27, delay: item.delay } }
                                                    : {}
                                            }
                                        >
                                            <div className="p-2 bg-[#272727] rounded-full">
                                                <Image src={item.src} alt={item.name} className="rounded-md" width={30} height={30} />
                                            </div>
                                            <p>{item.name}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Landing;
