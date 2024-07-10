"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

const Landing = () => {
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
            src: "/images/typescript.svg",
            title: "TypeScript",
            bgColor: "#123c81",
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
            src: "/images/tailwind.svg",
            title: "TailwindCSS",
            bgColor: "#38b2ac",
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
        const walk = (x - startX) * 2; // The number 2 can be adjusted to increase/decrease the scroll speed
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="text-white">
            <div className="mt-[250px] flex max-[1240px]:grid justify-between max-[1240px]:justify-center flex-row-reverse px-[200px] max-[940px]:px-[1px]">
                <div className="flex justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                    <Image src="/images/Me.jpg" alt="#" className=" rounded-2xl" width={300} height={300} />
                </div>
                <div className="grid gap-10 max-[1240px]:justify-center max-[1240px]:text-center">
                    <h1 className="text-[52px] max-[575px]:text-[42px]">Hi, I’m Mostapha</h1>
                    <p className="text-[#6e6e6e] text-[24px] max-[690px]:text-[20px] max-[575px]:text-[15px]">During these <span className="text-white font-semibold">4 years </span> as <span className="text-white font-semibold">Front-End Software Engineer</span> . My <br /> role has extended beyond coding to effective <br /> communication with various departments, to define new <br /> features and spearheading the development of new apps.</p>
                    <div className="flex items-center max-[1240px]:justify-center flex-wrap gap-8 text-[18px]">
                        <button className="px-3 py-1 bg-white rounded-2xl text-black font-semibold">Download CV</button>
                        <Link href="/experience" className="hover:text-[#b292ff]">Experience</Link>
                    </div>
                </div>
            </div>
            <div className="flex px-[200px] max-[812px]:grid max-[940px]:px-[1px] mt-[200px] justify-between gap-20">
                <div className="pl-7 flex justify-center items-center max-[812px]:text-center">
                    <p className="text-[#6e6e6e] text-[15px]">4 Years <br /> <span className="text-white text-[50px] font-semibold">XP</span> <br /> with the most popular ecosystem frontend </p>
                </div>
                <div
                    className="slider relative grid gap-5"
                    ref={sliderRef}
                    onMouseDown={startDragging}
                    onMouseLeave={stopDragging}
                    onMouseUp={stopDragging}
                    onMouseMove={handleDragging}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab', overflow: 'hidden' }}
                >
                    <div className="flex transition-transform duration-500 gap-3" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
                        {slides.map((slide, index) => (
                            <div key={index} className={`px-5 py-3 h-[200px] w-[300px] grid items-center gap-3 rounded-3xl`} style={{ backgroundColor: slide.bgColor }}>
                                <Image src={slide.src} alt={slide.title} className=" rounded-md" width={50} height={50} />
                                <p className="text-black font-semibold text-[25px]">{slide.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className=" absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 mt-10">
                        {Array.from({ length: slides.length - 1 }).map((_, index) => (
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
        </div>
    );
}

export default Landing;
