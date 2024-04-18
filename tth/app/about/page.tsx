"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <br></br>
      <br></br>
      <br></br>
      <h1 className="text-3xl font-bold mb-8">Temple Trading Hub (TTH)</h1>
      <p className="text-lg text-white-700 mb-8">
        Temple Trading Hub (TTH) is a specialized web application tailored
        specifically for the Temple University community, offering a secure and
        convenient platform for trading various items within the campus
        environment, such as textbooks, electronics, furniture, clothes, and
        more.
      </p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
        <p className="text-lg text-white-700">Frontend:</p>
        <ul className="list-disc list-inside text-lg text-white-700">
          <li>
            Next.js - A React framework for building server-rendered and
            statically generated web applications.
          </li>
          <li>
            Tailwind CSS - A utility-first CSS framework for rapidly building
            custom designs.
          </li>
        </ul>
        <p className="text-lg text-white-700 mt-4">Backend:</p>
        <ul className="list-disc list-inside text-lg text-white-700">
          <li>
            Firebase - A comprehensive platform provided by Google for building
            web and mobile applications, including real-time databases and
            authentication services.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">GitHub Repositories</h2>
        <p className="text-lg text-white-700">
          Explore our GitHub repositories to view the source code:
        </p>
        <ul className="list-disc list-inside text-lg text-white-700">
          <li>
            <a
              href="https://github.com/cis3296s24/tth"
              className="underline hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github REPO
            </a>
          </li>
        </ul>
        <br></br>
      </div>
      <AnimatedTooltipPreview />
    </div>
  );
};

export default AboutPage;

const people = [
  {
    id: 1,
    name: "Fariha Jahin",
    designation: "",
    image:
      "https://media.licdn.com/dms/image/D4D03AQEhQFXtS_nToA/profile-displayphoto-shrink_800_800/0/1704762749099?e=1718841600&v=beta&t=SfjFnOYs5N0paHrVtLFZknhWa9fiqmLu1NtqTkykZZY",
  },
  {
    id: 2,
    name: "Timothy Khumpan",
    designation: "",
    image:
      "https://media.licdn.com/dms/image/D5603AQGbxja6F1WDhg/profile-displayphoto-shrink_400_400/0/1665499408876?e=1718236800&v=beta&t=EKw8fFiXYtpMEhqKsAGOFBI113FklJI3w3d_WkIKzG4",
  },
  {
    id: 3,
    name: "Estelee Eng",
    designation: "",
    image: "/vicea_cat.jpeg",
  },
  {
    id: 4,
    name: "Bryan Li",
    designation: "",
    image:
      "https://media.licdn.com/dms/image/D4E03AQFLv54xOgjLuw/profile-displayphoto-shrink_400_400/0/1675457099898?e=1718236800&v=beta&t=Ve0RFVKOOa4Sg_6T7MGPCI_5RDufj0GdxMshRGMDjwM",
  },
];

function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
