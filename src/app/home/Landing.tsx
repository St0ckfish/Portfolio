"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const Landing = () => {
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

        // Clean up the event listener on component unmount
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
        const walk = (x - startX) * 2; // Adjust scroll speed
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    useEffect(() => {
        const slider = sliderRef.current;
        const handleScroll = () => {
            if (!slider) return;
            const newIndex = Math.round(slider.scrollLeft / (slider.scrollWidth / slides.length));
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

    return (
        <div className="text-white grid w-full">
            {

                showButton && (
                    <button
                        onClick={handleClick}
                        className="fixed top-6 right-6 bg-white p-1 rounded-full z-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" style={{ fill: '#000000' }}><path d="m12 6.879-7.061 7.06 2.122 2.122L12 11.121l4.939 4.94 2.122-2.122z"></path></svg>
                             
                    </button>
                )
            }
            <div className="mt-[250px] flex max-[1240px]:grid justify-between max-[1240px]:justify-center flex-row-reverse px-[200px] max-[940px]:px-[1px]">
                <div className="flex justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                    <Image src="/images/Me.jpg" alt="#" className=" rounded-2xl h-[320px] w-[250px] max-[1332px]:h-[300px] max-[1332px]:w-[220px] " width={240} height={10} />
                </div>
                <div className="grid gap-10 max-[1240px]:justify-center max-[1240px]:text-center">
                    <h1 className="text-[52px] max-[575px]:text-[40px] ">Hi, I’m Mostapha</h1>
                    <p className="text-[#6e6e6e] text-[24px] max-[690px]:text-[20px] max-[575px]:text-[14px] px-4">During these <span className="text-white font-semibold">4 years </span> as <span className="text-white font-semibold">Front-End Software Engineer</span> . My <br /> role has extended beyond coding to effective <br /> communication with various departments, to define new <br /> features and spearheading the development of new apps.</p>
                    <div className="flex items-center max-[1240px]:justify-center flex-wrap gap-8 text-[18px]">
                        <a href="https://flowcv.com/resume/tuqcpijwb6" target="_blank" className="px-3.5 py-2 bg-white rounded-2xl text-black font-semibold hover:-translate-y-1 hover:scale-110 duration-200">Download CV</a>
                        <Link href="/experience" className="hover:text-[#b292ff]">See Experience</Link>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="flex px-[200px] max-[812px]:grid max-[940px]:px-[1px] mt-[200px] justify-between gap-20 overflow-hidden">
                    <div className="pl-7 flex justify-center items-center max-[812px]:text-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[140px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-[#e6dff7] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#ffffff] before:dark:opacity-10 after:dark:from-[#ffffff] after:dark:via-[#ffffff6e] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                        <p className="text-[#6e6e6e] text-[15px]">4 Years <br /> <span className="text-white text-[50px] font-semibold">XP</span> <br /> with the most popular ecosystem frontend </p>
                    </div>
                    <div
                        className="slider relative grid gap-5 hide-scrollbar"
                        ref={sliderRef}
                        onMouseDown={startDragging}
                        onMouseLeave={stopDragging}
                        onMouseUp={stopDragging}
                        onMouseMove={handleDragging}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab', overflow: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
                    >
                        <div className="flex gap-3" style={{ scrollSnapAlign: 'center' }}>
                            {slides.map((slide, index) => (
                                <div key={index} className={`px-5 py-3 h-[200px] w-[300px] grid items-center gap-3 rounded-3xl`} style={{ backgroundColor: slide.bgColor }}>
                                    <Image src={slide.src} alt={slide.title} className=" rounded-md" width={50} height={50} />
                                    <p className="text-black font-semibold text-[25px]">{slide.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="slider relative grid gap-5 mt-10">
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 mt-10">
                        {Array.from({ length: slides.length }).map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full ${currentIndex === index ? 'bg-white w-8' : 'bg-gray-500 w-3'}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setCurrentIndex(index)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid gap-36 bg-[url('/images/hero1.png')] bg-auto bg-fixed">
                <div className="grid justify-center text-center gap-24 sm:text-[100px] text-[50px] font-semibold mt-[200px]">
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-t from-[#9e7bcc] via-[#c69aff] to-[#c7aceb]">TypeScript</h1>
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-t from-[#7f42cc] via-[#9e52ff] to-[#b07af7]">NextJS</h1>
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-t from-[#6104d6] via-[#8303ff] to-[#8f23fa]">Coffee</h1>
                </div>
                <div className="flex text-center justify-center sm:justify-start sm:text-start text-[#c8c8c8] sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px]">
                    <p>
                        These are the <br />
                        technologies I’ve been using
                    </p>
                </div>
            </div>
            <div className="grid mt-[200px] px-[200px] max-[940px]:px-[1px] w-full overflow-x-auto">
                <div className="flex gap-20 text-white w-full">
                    <div className="flex gap-20 w-max">
                        <div className="px-6 py-4 rounded-3xl border border-x-[#4343438e] border-y-[#232323] grid gap-5 w-[300px]">
                            <h1>Front-end Engineer Design</h1>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/react.svg" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>React</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/next.png" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>Next JS</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/vite.svg" alt="#" className="rounded-md" width={25} height={25} />
                                </div>
                                <p>Vite</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/jest.png" alt="#" className="rounded-md" width={25} height={25} />
                                </div>
                                <p>Jest</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/bun.png" alt="#" className="rounded-md" width={25} height={25} />
                                </div>
                                <p>Bun</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/tailwind.svg" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>Tailwind</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 h-[45px] w-[45px] flex items-center justify-center bg-[#272727] rounded-full">
                                    <Image src="/images/figma.svg" alt="#" className="rounded-md" width={20} height={10} />
                                </div>
                                <p>Figma</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 rounded-3xl border border-x-[#4343438e] border-y-[#232323] grid gap-2 h-[150px] w-[300px]">
                            <h1>Dev-Ops</h1>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 w-[45px] h-[45px] flex items-center justify-center bg-[#272727] rounded-full">
                                    <Image src="/images/docker.png" alt="#" className="rounded-md" width={25} height={25} />
                                </div>
                                <p>Docker</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 rounded-3xl border border-x-[#4343438e] border-y-[#232323] grid gap-3 h-[300px] w-[300px]">
                            <h1>Languages</h1>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/js.png" alt="#" className="rounded-md" width={25} height={25} />
                                </div>
                                <p>JavaScript</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/typescript.svg" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>TypeScript</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/cpp.svg" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>C++</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/py.svg" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>Python</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 rounded-3xl border border-x-[#4343438e] border-y-[#232323] grid gap-3 h-[300px] w-[300px]">
                            <h1>Back End</h1>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/node.svg" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>NodeJS</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/nest.png" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>Nest</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/ex.png" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>Express</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="p-2 bg-[#272727] rounded-full">
                                    <Image src="/images/mongo.svg" alt="#" className="rounded-md" width={30} height={30} />
                                </div>
                                <p>MongoDB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
