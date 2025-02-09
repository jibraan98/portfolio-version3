"use client";

import React, { useEffect, useState } from "react";
import { client, urlFor } from "@/sanityClient";
import { Button } from "./ui/MovingBorders";
import Image from "next/image";

// Define the TypeScript interface for the experience data
interface ExperienceItem {
  _id: string;
  title: string;
  desc: string;
  icons: any;
  startDate: string;
  endDate: string;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      const query = `*[_type == "experience"] | order(endDate desc){
        _id,
        title,
        desc,
        startDate,
        endDate,
        icons[]->{
          title,
          iconImage
        }
      }`;

      const sanityExperiences = await client.fetch(query);
      setExperiences(sanityExperiences);
      setIsLoading(false);
    };

    fetchExperiences();
  }, []);

  return (
    <div className="py-20 w-full">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center mt-10">
          <p className="text-lg text-purple animate-pulse">Loading...</p>
        </div>
      ) : (
        <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
          {experiences.map((exp) => (
            <Button
              key={exp._id}
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                borderRadius: `calc(1.75rem* 0.96)`,
              }}
              className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                {exp.icons &&
                  exp.icons.map((icon: any, index: any) => (
                    <Image
                      key={index}
                      src={urlFor(icon.iconImage).url()}
                      alt={icon.title}
                      className="lg:w-32 md:w-20 w-16"
                      width={80}
                      height={80}
                    />
                  ))}
                <div className="lg:ms-5">
                  <h1 className="text-start text-xl md:text-2xl font-bold">
                    {exp.title}
                  </h1>
                  <p className="text-start text-white-100 mt-3 font-semibold">
                    {exp.desc}
                  </p>
                  <p className="text-start text-white-200 text-sm mt-2">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString()
                      : "Present"}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
