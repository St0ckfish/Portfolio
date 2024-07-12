const Certificates = () => {
    return (
        <div className="text-white grid w-full gap-10 justify-center px-[200px] max-[940px]:px-[40px] mt-[150px] before:absolute before:h-[300px] before:w-[200px] sm:before:w-[100px] before:translate-x-1/2 max-[1345px]:before:translate-x-[2px] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl opa before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-[500px] max-[1345px]:after:translate-x-[2px] after:bg-gradient-conic after:from-sky-200 after:via-[#b292ff] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-40 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

            <div className="px-12 py-5 rounded-3xl border border-[#272727] flex justify-between items-center gap-[350px] w-full max-[1023px]:grid max-[1023px]:justify-center max-[1023px]:gap-4">
                <div className="grid gap-3 ">
                    <h1 className="font-semibold text-[25px] max-[1277px]:text-[20px]">React & Next From Maximilian</h1>
                    <p className="text-[#b292ff] text-[20px] max-[1277px]:text-[16px]">Udemy</p>
                    <div className="text-[#6e6e6e] flex items-center gap-2 text-[16px]">2024<div className="h-1.5 w-1.5 rounded-full bg-[#b95f5f] me-2"></div><p className=" -translate-x-1.5">End</p></div>
                </div>
                <div className="flex text-[18px] max-[1277px]:text-[16px]">
                    <a href="/" className="text-[#5fb9b0]">
                        View Certificate
                    </a>
                </div>
            </div>
            <div className="px-12 py-5 rounded-3xl border border-[#272727] flex justify-between items-center gap-[350px] w-full max-[1023px]:grid max-[1023px]:justify-center max-[1023px]:gap-4">
                <div className="grid gap-3 ">
                    <h1 className="font-semibold text-[25px] max-[1277px]:text-[20px]">Networks From Hussien Nasser</h1>
                    <p className="text-[#b292ff] text-[20px] max-[1277px]:text-[16px]">Udemy</p>
                    <div className="text-[#6e6e6e] flex items-center gap-2 text-[16px]">2024<div className="h-1.5 w-1.5 rounded-full bg-[#b95f5f] me-2"></div><p className=" -translate-x-1.5">End</p></div>
                </div>
                <div className="flex text-[18px] max-[1277px]:text-[16px]">
                    <a href="/" className="text-[#5fb9b0]">
                        View Certificate
                    </a>
                </div>
            </div>

        </div>
    );
}

export default Certificates;