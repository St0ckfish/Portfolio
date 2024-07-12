import Image from "next/image";
import Link from "next/link";

const Portfolio = () => {
    return (
        <div className="text-white grid w-full">
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
            <div className="bg-[url('/images/hero1.png')] py-5 bg-auto bg-fixed flex flex-wrap gap-10 w-full h-full justify-center px-[200px] max-[940px]:px-[40px]">

                <div className=" py-5 px-3 grid justify-center items-center rounded-2xl bg-gradient-to-t from-[#2d2833] via-[#3c2d4b] to-[#2a264e]">
                    <Image src="/images/project.png" className="rounded-2xl w-full h-full" height={300} width={300} alt="#" />
                    <div className="flex justify-start text-start items-center px-2 py-4">
                        <p>Education platform</p>
                    </div>
                    <div className="flex justify-between items-center mt-5 px-3">
                        <Link href="http://edu-ai-admin-stockfish.vercel.app/" target="_blank" className="flex gap-2 items-center px-4 py-2 bg-sky-800 rounded-2xl hover:gap-3  duration-200">
                            View <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: '#ffffff' }}><path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path><path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path></svg>
                        </Link>
                        <Link href="https://github.com/M0staphaTaha/EduAI-Admin" target="_blank" className="flex gap-2 items-center px-4 py-2 bg-sky-800 rounded-2xl hover:gap-3  duration-200">
                            GitHub <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: '#ffffff' }}><path d="M20.892 9.889a.664.664 0 0 0-.025-.087l-2.104-6.479a.84.84 0 0 0-.8-.57.822.822 0 0 0-.789.575l-2.006 6.175H8.834L6.826 3.327a.823.823 0 0 0-.786-.575h-.006a.837.837 0 0 0-.795.575L3.133 9.815c0 .005-.005.01-.007.016l-1.067 3.281a1.195 1.195 0 0 0 .435 1.34l9.227 6.706c.167.121.393.12.558-.003l9.229-6.703a1.2 1.2 0 0 0 .435-1.34l-1.051-3.223zM17.97 3.936l1.809 5.566H16.16l1.81-5.566zm-11.94 0 1.812 5.566H4.228L6.03 3.936zm-2.982 9.752a.253.253 0 0 1-.093-.284l.793-2.437 5.817 7.456-6.517-4.735zm1.499-3.239h3.601l2.573 7.916-6.174-7.916zm7.452 8.794-2.856-8.798h5.718l-1.792 5.515-1.07 3.283zm1.282-.877 2.467-7.588.106-.329h3.604l-5.586 7.156-.591.761zm7.671-4.678-6.519 4.733.022-.029 5.794-7.425.792 2.436a.25.25 0 0 1-.089.285z"></path></svg>
                        </Link>
                    </div>
                </div>

            </div>
            <div className="w-full flex text-center justify-center sm:justify-start sm:text-start text-[#c8c8c8] sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px] mt-[20px]">
                <p>
                    These are the Work Experience
                </p>
            </div>
            <div className="grid gap-4 px-[150px] max-[940px]:px-[30px] mt-[70px] ">
                <div className="px-12 py-5 rounded-2xl bg-[#131313] flex justify-between gap-4 w-full max-[1023px]:grid max-[1023px]:justify-center">
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
        </div>
    );
}

export default Portfolio;