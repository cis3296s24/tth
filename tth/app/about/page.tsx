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
      "https://cdn.discordapp.com/attachments/1222716502462038060/1230547912615002112/IMG_1266.jpg?ex=6633b80c&is=6621430c&hm=6595532b1948e24d71c3723d673bb23bde573e4824375f18df414048bc4ec220&",
  },
  {
    id: 2,
    name: "Timothy Khumpan",
    designation: "",
    image:
      "https://cdn.discordapp.com/attachments/1203874110753738772/1230879201343701084/IMG_1460.JPG?ex=6634ec96&is=66227796&hm=e228f36344155f406dbd728fc8ec1c0b8945b6c5b5a9e4db6c840d3c67330d8f&",
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
      "https://cdn.discordapp.com/attachments/1222716502462038060/1230526319624851527/CFCB2C0D-9F41-41DD-971B-B9E71FE5F40E.jpg?ex=6633a3f0&is=66212ef0&hm=43854d5701ee68aabe814b2762802ef1d6c46c96b5c8146b9043946e35f113e1&",
  },
];

function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
