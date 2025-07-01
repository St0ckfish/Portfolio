/* eslint-disable @next/next/no-img-element */
"use client"
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import projects from "@/app/portfolio/projects.json";
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

interface ProjectIdParams {
  params: {
    projectId: any;
  };
}

const ViewProject: React.FC<ProjectIdParams> = ({ params }) => {
  const controls = useAnimation()
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const project = useMemo(
    () => projects.find((p: any) => p.id == params.projectId),
    [params.projectId]
  );
  const images = project?.images || [];

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
  }, [controls]);

  const booleanValue = useSelector((state: RootState) => state.boolean.value);

  const openImageModal = (imageSrc: string) => {
    const idx = images.findIndex((img: any) => img.src === imageSrc);
    setCurrentImageIndex(idx === -1 ? 0 : idx);
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const showPrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const newIdx = prev === 0 ? images.length - 1 : prev - 1;
      setSelectedImage(images[newIdx].src);
      return newIdx;
    });
  };

  const showNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const newIdx = prev === images.length - 1 ? 0 : prev + 1;
      setSelectedImage(images[newIdx].src);
      return newIdx;
    });
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImageModal();
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    };
    if (isModalOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
    // eslint-disable-next-line
  }, [isModalOpen, images]);

  return (
    <motion.div className={`text-white grid z-40 ${booleanValue ? "bg-white" : ""} w-full`} initial={{ opacity: 0, y: 20 }} animate={controls}>
      {isModalOpen && selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeImageModal}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                onClick={showPrevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-4xl px-3 py-2 bg-black/40 rounded-full hover:bg-black/70 transition-colors z-10"
                aria-label="Previous image"
                style={{ left: '-2.5rem' }}
              >
                <svg className="h-8 w-8"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="15 6 9 12 15 18" /></svg>
              </button>
            )}
            <button
              onClick={closeImageModal}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {images.length > 1 && (
              <button
                onClick={showNextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-4xl px-3 py-2 bg-black/40 rounded-full hover:bg-black/70 transition-colors z-10"
                aria-label="Next image"
                style={{ right: '-2.5rem' }}
              >
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </motion.div>
        </motion.div>
      )}

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
                    project.images.map((image: any, index: any) => (
                      <motion.img
                        key={index}
                        src={image.src}
                        className="w-[550px] max-[880px]:w-[300px] h-full cursor-pointer rounded-lg hover:scale-105 transition-transform duration-300"
                        height={20}
                        width={20}
                        alt={project.name}
                        onClick={() => openImageModal(image.src)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      />
                    ))
                  }
                </div>
                <h1 className="mt-[50px] font-mono">Technologies</h1>
                <div className="flex flex-wrap px-3 py-4 gap-3 justify-center w-full mt-[20px]">
                  {project.icons.map((icon: any, index: any) => {
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