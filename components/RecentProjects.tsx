"use client";

import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { client, urlFor } from "../sanityClient"; // Adjust the path based on your setup
import { PinContainer } from "./ui/Pin";
import MagicButton from "./MagicButton";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  des: string;
  img: any; // You can be more specific with the type if needed
  icons: any[]; // Array of icon objects or strings
  link: string;
}

const RecentProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(4); // Initially show 4 projects
  const [showMore, setShowMore] = useState(false); // Track if more projects are shown
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] | order(_createdAt desc){
        _id,
        title,
        des,
        img,
        link,
        // Fetch the icons as references and grab the icon image URL
        icons[]->{
          title,
          iconImage
        }
      }`;

      const sanityProjects = await client.fetch(query);
      setProjects(sanityProjects);
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  const toggleProjects = () => {
    if (showMore) {
      setVisibleProjects(4); // Show only 4 projects
    } else {
      setVisibleProjects(projects.length); // Show all projects
    }
    setShowMore(!showMore); // Toggle the state
  };

  return (
    <div id="projects" className="py-20">
      <h1 className="heading">
        My <span className="text-purple">recent projects</span>
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center mt-10">
          <ImSpinner2 className="text-purple text-4xl animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[80px] xl:gap-x-[450px] gap-y-[90px] lg:gap-y-[50px] lg:-ml-8 mt-10">
          {projects.slice(0, visibleProjects).map((item) => (
            <div
              className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center"
              key={item._id}
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <PinContainer title={item.link} href={item.link}>
                  <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                    <div
                      className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <Image
                        src="/bg.png"
                        alt="bgimg"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    {item.img ? (
                      <Image
                        src={urlFor(item.img).url() + "?w=800&h=600&fit=clip"}
                        alt="cover"
                        className="z-10 absolute bottom-0"
                        height={500}
                        width={500}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Image
                        src="/placeholder.png" // Use a default placeholder image
                        alt="no-image"
                        className="z-10 absolute bottom-0"
                        height={500}
                        width={500}
                      />
                    )}
                  </div>

                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                    {item.title}
                  </h1>

                  <p
                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                    style={{
                      color: "#BEC1DD",
                      margin: "1vh 0",
                    }}
                  >
                    {item.des}
                  </p>
                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center">
                      {/* Display each icon */}
                      {item.icons.map((icon: any, index: number) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                          style={{
                            transform: `translateX(-${5 * index + 2}px)`,
                          }}
                        >
                          {/* Render the icon image using urlFor */}
                          <Image
                            src={urlFor(icon.iconImage).url()}
                            alt={icon.title}
                            className="p-2"
                            height={200}
                            width={200}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center items-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                          See Demo
                        </p>
                      </a>
                      <FaLocationArrow className="ms-3" color="#CBACF9" />
                    </div>
                  </div>
                </PinContainer>
              </a>
            </div>
          ))}
        </div>
      )}
      {projects.length > 4 && (
        <div className="flex justify-center mt-10">
          <MagicButton
            title={showMore ? "Show Less" : "Show More"}
            handleClick={toggleProjects}
            icon={undefined}
            position={""}
          />
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
