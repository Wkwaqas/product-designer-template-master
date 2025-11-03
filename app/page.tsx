"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import {
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RxArrowTopRight } from "react-icons/rx";

const SkillBar = ({ name, progress }: { name: string; progress: number }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-white text-sm">{name}</span>
      <span className="text-[#FD853A] text-sm font-semibold">{progress}%</span>
    </div>
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#FD853A] rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

const NAV_ITEMS = [
  { name: "Home", id: "home" },
  { name: "Service", id: "service" },
  { name: "Education", id: "education" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [active, setActive] = useState<string>("home");
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateActive = () => {
      const sections = Array.from(
        document.querySelectorAll("section[id], div[id='home']")
      );
      const navHeight = navRef.current?.offsetHeight ?? 60;
      let current = "home";
      const scrollPosition = window.scrollY + navHeight + 5; // Add small offset

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          current = section.id;
        }
      });

      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(id);
    const navHeight = navRef.current?.offsetHeight ?? 60;

    if (!section) return;

    // Get the exact position of the section
    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition + window.pageYOffset - navHeight;

    // Smooth scroll to section
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Update URL and active state
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  const mid = Math.ceil(NAV_ITEMS.length / 2);
  const leftItems = NAV_ITEMS.slice(0, mid);
  const rightItems = NAV_ITEMS.slice(mid);


  const renderLink = (item: { name: string; id: string }) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={(e) => handleNavClick(e, item.id)}
      aria-current={active === item.id ? "page" : undefined}
      className={`shrink-0 px-2 lg:px-4 text-white text-sm md:text-base lg:text-lg transition-all duration-200 min-w-[90px] md:min-w-[110px] lg:min-w-[130px] h-9 md:h-10 lg:h-12 flex items-center justify-center rounded-full truncate ${
        active === item.id
          ? "bg-[#FD853A] shadow-md hover:bg-[#e67731]"
          : "hover:bg-white/10"
      }`}
    >
      {item.name}
    </a>
  );

  return (
    <nav
      ref={navRef}
      className="fixed left-1/2 -translate-x-1/2 top-4 z-50 w-auto max-w-[1200px] h-[60px] lg:h-[70px] bg-[#171717]/95 backdrop-blur-md rounded-full flex items-center justify-between px-4 lg:px-6 shadow-lg border border-white/10 transition-all duration-300"
    >
      {/* Left side */}
      <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto hide-scrollbar">
        {leftItems.map(renderLink)}
      </div>

      {/* Center Logo */}
      <div className="flex mx-12 items-center justify-center px-3 lg:px-4 whitespace-nowrap">
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#FD853A] rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg lg:text-xl transition-all duration-300">
          SA
        </div>
        <p className="uppercase ml-3 hidden sm:block text-white font-bold text-sm md:text-base lg:text-lg truncate max-w-[100px] md:max-w-[140px] lg:max-w-40">
          Subhan
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto hide-scrollbar">
        {rightItems.map(renderLink)}
      </div>
    </nav>
  );
};

const page = () => {
  return (
    <div className="relative bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="w-full h-screen flex flex-col items-center justify-between relative"
      >
        {/* Text */}
        <div className="flex flex-col items-center mt-[120px] relative ">
          <div className="relative">
            <div className="border border-[#171717] text-[#171717] text-[18px] px-[25px] py-[3px] rounded-[40px] font-semibold">
              Hello!
            </div>
            <Image
              src="/curve-stroke.svg"
              alt="Description of image"
              width={30}
              height={30}
              className="w-7 h-7 absolute -top-5 -right-6"
            />
          </div>

          <div className="relative mt-2 text-center">
            <h2 className="text-[#171717] text-7xl font-semibold">
              I'm <span className="text-[#FD853A]">Subhan</span>,
            </h2>
            <h2 className="text-[#171717] text-7xl font-semibold">
              Product Designer
            </h2>

            <Image
              src="/curve-stroke-2.svg"
              alt="Description of image"
              width={71}
              height={74}
              className="w-[71px] h-[74px] absolute -bottom-15 -left-15"
            />
          </div>
        </div>

        {/* Image Container */}
        <div className="relative">
          <div className="w-[710px] h-[355px] bg-[#FEB273] rounded-t-full "></div>

          {/* Profile Image */}
          <Image
            src="/profile-picture.png"
            width={400}
            height={600}
            alt="Profile Picture"
            className="w-auto h-[500px] object-center object-cover absolute bottom-0 left-1/2 -translate-x-1/2 z-2"
          />

          <div className="flex items-center justify-between backdrop-blur-[5px] bg-white/10 border border-white font-semibold rounded-full absolute bottom-10 left-1/2 -translate-x-1/2 z-3 px-2 py-1.5">
            <Link
              href="#portfolio"
              className="flex items-center bg-[#FD853A] px-5 py-2.5 rounded-full"
            >
              <p className="">Portfolio</p>
              <RxArrowTopRight className="w-6 h-6 " />
            </Link>

            <Link href="#hire-me">
              <p className="px-3 text-[#FD853A]">Hire me</p>
            </Link>
          </div>
        </div>
      </section>
      {/* Hero Section */}

      {/* Service Section */}
      <section
        id="service"
        className="w-full h-[750px] relative bg-[#171717] rounded-[50px] pt-16 pb-10 overflow-hidden z-40"
      >
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 bg-[url('/section-bg.png')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-20 flex flex-col gap-16">
          {/* Headings */}
          <div className="flex items-center justify-between mx-[70px]">
            <h5 className="text-[#FCFCFD] text-[48px] font-medium">
              My <span className="text-[#FD853A]">Services</span>
            </h5>
            <p className="w-[575px] text-[17px] text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              lacus nunc, posuere in justo vulputate, bibendum sodales
            </p>
          </div>

          {/* Cards */}
          <div className="w-full px-[70px] flex flex-wrap justify-between">
            {/* Card no 1 */}
            <div className="group relative w-[380px] h-[490px] flex flex-col justify-between bg-[#686868]/20 backdrop-blur-lg border border-white/40 rounded-[35px] overflow-hidden">
              <h5 className="border-b border-white/40 font-medium text-3xl pt-10 pb-6 pl-6 pr-2">
                Web Development
              </h5>

              {/* Image Container */}
              <div className="w-full relative rounded-[35px] flex items-end justify-center">
                <div className="w-[82%] h-[340px] absolute bg-[#757575] rounded-[35px]"></div>
                <div className="w-[92%] h-80 absolute bg-[#9E9D9D] rounded-[35px]"></div>
                {/* Main Image */}
                <Image
                  src="/project.png"
                  alt="Main Image"
                  width={400}
                  height={600}
                  className="w-full h-[300px] z-30 object-cover object-center rounded-[35px]"
                />
              </div>

              {/* Hover Circle Button */}
              <Link
                href="#"
                target="_blank"
                className="absolute bottom-3 right-3 opacity-0 translate-x-1/3 translate-y-1/3 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-40"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1D2939] text-white shadow-md hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 7l-10 10m0-10h10v10"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Card no 2 */}
            <div className="group relative w-[380px] h-[490px] flex flex-col justify-between bg-[#686868]/20 backdrop-blur-lg border border-white/40 rounded-[35px] overflow-hidden">
              <h5 className="border-b border-white/40 font-medium text-3xl pt-10 pb-6 pl-6 pr-2">
                Web Development
              </h5>

              {/* Image Container */}
              <div className="w-full relative rounded-[35px] flex items-end justify-center">
                <div className="w-[82%] h-[340px] absolute bg-[#757575] rounded-[35px]"></div>
                <div className="w-[92%] h-80 absolute bg-[#9E9D9D] rounded-[35px]"></div>
                {/* Main Image */}
                <Image
                  src="/project.png"
                  alt="Main Image"
                  width={400}
                  height={600}
                  className="w-full h-[300px] z-30 object-cover object-center rounded-[35px]"
                />
              </div>

              {/* Hover Circle Button */}
              <Link
                href="#"
                target="_blank"
                className="absolute bottom-3 right-3 opacity-0 translate-x-1/3 translate-y-1/3 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-40"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1D2939] text-white shadow-md hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 7l-10 10m0-10h10v10"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Card no 3 */}
            <div className="group relative w-[380px] h-[490px] flex flex-col justify-between bg-[#686868]/20 backdrop-blur-lg border border-white/40 rounded-[35px] overflow-hidden">
              <h5 className="border-b border-white/40 font-medium text-3xl pt-10 pb-6 pl-6 pr-2">
                Web Development
              </h5>

              {/* Image Container */}
              <div className="w-full relative rounded-[35px] flex items-end justify-center">
                <div className="w-[82%] h-[340px] absolute bg-[#757575] rounded-[35px]"></div>
                <div className="w-[92%] h-80 absolute bg-[#9E9D9D] rounded-[35px]"></div>
                {/* Main Image */}
                <Image
                  src="/project.png"
                  alt="Main Image"
                  width={400}
                  height={600}
                  className="w-full h-[300px] z-30 object-cover object-center rounded-[35px]"
                />
              </div>

              {/* Hover Circle Button */}
              <Link
                href="#"
                target="_blank"
                className="absolute bottom-3 right-3 opacity-0 translate-x-1/3 translate-y-1/3 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-40"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#1D2939] text-white shadow-md hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 7l-10 10m0-10h10v10"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience and Education Section */}
      <section id="education" className="w-full py-20 px-[71px] bg-white">
        {/* Heading */}
        <div className="text-center pt-20 mb-14 ">
          <h5 className="text-[#FD853A] font-bold text-5xl">
            <span className="text-[#344054]">My </span>Education & Experience
          </h5>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative mb-[100px] ">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {/* Experience Item 1 */}
            <div className="relative flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="text-2xl font-semibold text-[#344054] mb-1">
                  Cognizant, Mumbai
                </h3>
                <p className="text-gray-500 mb-3">Sep 2016- July 2020</p>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#FD853A] rounded-full border-4 border-white shadow-md z-10"></div>

              <div className="w-1/2 pl-8">
                <h3 className="text-2xl font-semibold text-[#344054] mb-3">
                  Experience Designer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  lacus nunc, posuere in justo vulputate, bibendum sodales
                </p>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="relative flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="text-2xl font-semibold text-[#344054] mb-1">
                  Sugee Pvt limited, Mumbai
                </h3>
                <p className="text-gray-500 mb-3">Sep 2020- July 2023</p>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#344054] rounded-full border-4 border-white shadow-md z-10"></div>

              <div className="w-1/2 pl-8">
                <h3 className="text-2xl font-semibold text-[#344054] mb-3">
                  UI/UX Designer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  lacus nunc, posuere in justo vulputate, bibendum sodales
                </p>
              </div>
            </div>

            {/* Experience Item 3 */}
            <div className="relative flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="text-2xl font-semibold text-[#344054] mb-1">
                  Cinetstox, Mumbai
                </h3>
                <p className="text-gray-500 mb-3">Sep 2023</p>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#FD853A] rounded-full border-4 border-white shadow-md z-10"></div>

              <div className="w-1/2 pl-8">
                <h3 className="text-2xl font-semibold text-[#344054] mb-3">
                  Lead UX Designer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  lacus nunc, posuere in justo vulputate, bibendum sodales
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hire Me Section */}
      <section
        id="hire-me"
        className="w-full h-screen flex flex-col md:flex-row items-center justify-between rounded-[35px] bg-gray-200 p-8 md:p-12 shadow-sm"
      >
        {/* Left Image */}
        <div className="relative shrink-0 w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Image
            src="/profile-picture.png"
            alt="Happy Woman"
            width={400}
            height={600}
            className="w-auto h-[510px] relative z-20"
          />
          <div className="absolute w-[350px] h-[400px] bg-[#feb173] rounded-xl z-10 bottom-0 justify-self-end"></div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why <span className="text-orange-500">Hire me</span>?
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto md:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus
            nunc, posuere in justo vulputate, bibendum sodales.
          </p>

          <div className="flex justify-center md:justify-start gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">450+</h3>
              <p className="text-gray-500">Project Completed</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">450+</h3>
              <p className="text-gray-500">Project Completed</p>
            </div>
          </div>

          <button className="px-6 py-3 border border-gray-800 rounded-xl font-medium hover:bg-gray-800 text-gray-800 hover:text-white transition">
            Hire me
          </button>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="w-full min-h-screen px-[71px] py-20 rounded-[50px] bg-[#171717] relative overflow-hidden"
      >
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 bg-[url('/section-bg.png')] bg-cover bg-center opacity-20"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-5xl font-bold text-white">
              My <span className="text-[#FD853A]">Skills</span>
            </h2>
            <p className="w-[575px] text-[17px] text-white/80">
              I've specialized in these technologies and tools to create
              exceptional digital experiences
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Design Skills */}
            <div className="bg-[#686868]/20 backdrop-blur-lg border border-white/40 rounded-[35px] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FD853A] rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Design</h3>
              </div>
              <div className="space-y-4">
                <SkillBar name="UI/UX Design" progress={90} />
                <SkillBar name="Figma" progress={85} />
                <SkillBar name="Adobe XD" progress={80} />
                <SkillBar name="Photoshop" progress={75} />
              </div>
            </div>

            {/* Development Skills */}
            <div className="bg-[#686868]/20 backdrop-blur-lg border border-white/40 rounded-[35px] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FD853A] rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Development
                </h3>
              </div>
              <div className="space-y-4">
                <SkillBar name="HTML/CSS" progress={95} />
                <SkillBar name="JavaScript" progress={85} />
                <SkillBar name="React.js" progress={80} />
                <SkillBar name="Next.js" progress={75} />
              </div>
            </div>

            {/* Tools Skills */}
            <div className="bg-[#686868]/20 backdrop-blur-lg border border-white/40 rounded-[35px] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FD853A] rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Tools</h3>
              </div>
              <div className="space-y-4">
                <SkillBar name="Git" progress={85} />
                <SkillBar name="VS Code" progress={90} />
                <SkillBar name="Jira" progress={75} />
                <SkillBar name="Postman" progress={70} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full min-h-screen px-[71px] py-20">
        <div className="flex items-center mb-12">
          <div>
            <h2 className="text-5xl font-bold text-gray-800">
              Let's have a look at
              <br />
              my <span className="text-[#FD853A]">Portfolio</span>
            </h2>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project Card 1 */}
          <div className="col-span-1">
            <Image
              src="/project.png"
              alt="Project Lirante"
              width={600}
              height={400}
              className="w-full h-[400px] object-cover rounded-3xl shadow-2xl overflow-hidden"
            />
            <div className="mt-6 text-gray-800 ">
              <h3 className="text-3xl font-bold mb-2">Lirante (Title)</h3>
              <p className="text-md mt-2 mb-4">UI/UX Design (description)</p>
              <Link href="#" className="text-md">
                Live Link: (link)
              </Link>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="col-span-1">
            <Image
              src="/project.png"
              alt="Project Lirante"
              width={600}
              height={400}
              className="w-full h-[400px] object-cover rounded-3xl shadow-2xl overflow-hidden"
            />
            <div className="mt-6 text-gray-800 ">
              <h3 className="text-3xl font-bold mb-2">Lirante (Title)</h3>
              <p className="text-md mt-2 mb-4">UI/UX Design (description)</p>
              <Link href="#" className="text-md">
                Live Link: (link)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full h-auto text-black ">
        <div className="flex flex-col items-center py-32">
          <h2 className="text-gray-800 text-[64px] font-bold leading-18 text-center w-[60%] mb-24">
            Have an Awesome Project Idea?{" "}
            <span className="text-[#fd853a]">let's Discuss</span>
          </h2>
          <div className="flex items-center justify-center gap-10 text-gray-800 text-xl">
            <div className="flex items-center gap-2">
              <IoLogoWhatsapp className="text-[#fd853a] text-[30px]" />
              <p>Whatsapp Number</p>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail className="text-[#fd853a] text-[30px]" />
              <p>Email Address</p>
            </div>
            <div className="flex items-center gap-2">
              <FaLocationDot className="text-[#fd853a]" />
              <p>Location, Address</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-10 bg-[#272727] rounded-t-4xl text-white text-center ">
          <div className="flex mx-12 items-center justify-center px-3 lg:px-4 whitespace-nowrap">
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#FD853A] rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg lg:text-xl transition-all duration-300">
              SA
            </div>
            <p className="uppercase ml-3 text-white font-bold text-sm md:text-base lg:text-xl truncate max-w-[100px] md:max-w-[140px] lg:max-w-40">
              Subhan
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3 pl-8 text-xl">
              {/* Linkedin */}
              <Link href="#" target="_blank">
                <FaLinkedin />
              </Link>
              {/* Github */}
              <Link href="#" target="_blank">
                <FaGithub />
              </Link>
              {/* Twitter */}
              <Link href="#" target="_blank">
                <FaTwitter />
              </Link>
              <Link href="#" target="_blank">
                <FaBriefcase />
              </Link>
            </div>
          </div>

          <hr className="border-t border-gray-600 my-10" />

          <p className="">
            &copy; {new Date().getFullYear()} All Rights Reserved. Powered by{" "}
            <Link
              href="https://portfolio.internpools.com"
              className="underline"
            >
              InternPools.
            </Link>
          </p>
        </footer>
      </section>
    </div>
  );
};

export default page;
