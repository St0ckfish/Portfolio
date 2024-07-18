/* eslint-disable @next/next/no-img-element */
"use client"
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import projects from "@/app/portfolio/projects.json";
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface ProjectIdParams {
  params: {
    projectId: any;
  };
}

const ViewProject: React.FC<ProjectIdParams> = ({ params }) => {
  const controls = useAnimation()
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
}, [controls]);
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  return (
    <motion.div className={`text-white grid z-40 ${booleanValue ? "bg-white" : ""} w-full`} initial={{ opacity: 0, y: 20 }} animate={controls}>
        <div className={`grid justify-center mt-[250px] mb-[150px] ${booleanValue ? "text-black" : "text-[#ffffff]"} text-wrap`}>
          {
            projects.map((project: any) => (
              project.id == params.projectId && (
                <div key={project.id} className="text-center">
                  <div className="px-5 text-wrap w-full">
                    <h1 className={`${booleanValue ? "text-black" : "text-[#ffffff]"} font-semibold text-[22px]`}>{project.name}</h1>
                    <p className={`${booleanValue ? "text-black" : "text-[#ffffff]"}`}>{project.description}</p>
                  </div>
                  <h1 className="mt-[50px] font-mono">Some Images</h1>
                  <div className="w-full flex flex-wrap justify-center gap-10 mt-[20px]">
                    {
                      project.images.map((image:any, index:any) => (

                        <img key={index} src={image.src} className=" w-[550px] max-[880px]:w-[300px] h-full" height={20} width={20} alt={project.name} />
                      ))
                    }
                  </div>
                    <h1 className="mt-[50px] font-mono">Technologies</h1>
                  <div className="flex flex-wrap px-3 py-4 gap-3 justify-center w-full mt-[20px]">
                            {project.icons.map((icon:any, index:any) => {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
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
                </div>
              )
            ))
          }
        </div>
    </motion.div>
  );
}

export default ViewProject;