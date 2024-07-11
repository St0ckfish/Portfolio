const Portfolio = () => {
    return (
        <div className="text-white grid w-full">
            <div className="mt-[250px] grid gap-4 justify-center text-center px-[200px] max-[940px]:px-[1px] before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:translate-x-full max-[1345px]:before:translate-x-[2px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-[500px] max-[1345px]:after:translate-x-[2px] after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <p className="text-[27px] text-[#c8c8c8]">
                    &lt; Here, you can know me a little more and see my <br /> whole experience as a <span className="text-white font-semibold">Front-End Software Engineer</span>. /&gt;
                </p>
            </div>
            <div className="flex justify-center items-center mt-8">
                <a href="https://flowcv.com/resume/tuqcpijwb6" target="_blank" className="z-40 px-3.5 py-2 bg-white rounded-2xl text-black font-semibold hover:-translate-y-1 hover:scale-110 duration-200">
                    Download CV
                </a>
            </div>
            <div className="w-full flex text-center justify-center sm:justify-start sm:text-start text-[#c8c8c8] sm:text-[40px] text-[20px] sm:pl-[70px] pl-[1px]">
                    <p>
                        These are the Certificates
                    </p>
                </div>
            <div className="bg-[url('/images/hero1.png')] bg-auto bg-fixed grid gap-10 w-full h-full justify-center px-[200px] max-[940px]:px-[1px]">
                <div className="px-5 py-3 rounded-2xl bg-[#131313]">

                </div>
            </div>
        </div>
    );
}

export default Portfolio;