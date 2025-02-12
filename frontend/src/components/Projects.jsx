import { useEffect, useState } from "react";
import { assets, projectsData } from "../assets/assets";

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(projectsData.length);
      } else {
        setCardsToShow(1);
      }; }
      updateCardsToShow();

      window.addEventListener("resize", updateCardsToShow);
      return () => window.removeEventListener("resize", updateCardsToShow);
    
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };
  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto py-4 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Projects
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
        Our services include floor installations, floor refinishing, floor
        repair and floor re-coats.{" "}
      </p>

      {/*slider buttons */}
      <div className="flex justify-end items-center mb-8">
        <button
          onClick={prevProject}
          className="p-3 bg-gray-200 rounded mr-2"
          aria-label="Previous Projects"
        >
          <img src={assets.left_arrow} alt="Previous" />
        </button>

        <button
          onClick={nextProject}
          className="p-3 bg-gray-200 rounded mr-2"
          aria-label="Next Projects"
        >
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>

      {/*project slider container */}

      <div className="overflow-hidden">
        <div
          className=" flex gap-8 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
          }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="relative flex-shrink-0 w-full sm:w-1/4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto mb-10"
              />
              <div className=" absolute left-0 right-0 bottom-5 flex justify-center">
                <div className="inline-block bg-white w-3/4 px-4 py-2 shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 flex justify-center">
                    {project.title}
                  </h2>
                  {/*  <p>{project.price}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
