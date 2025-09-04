import React from "react";
import { FaBullseye, FaClipboardList, FaClock } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineBarChart, AiOutlineCheck } from "react-icons/ai";

export default function LandingPage({ setPage }) {
  const benefits = [
    {
      icon: <FaBullseye className="mx-auto text-4xl text-blue-600 mb-4" />,
      title: "Stay Focused",
      text: "Keep your daily goals clear and manageable.",
      delay: 100,
    },
    {
      icon: <FaClipboardList className="mx-auto text-4xl text-blue-600 mb-4" />,
      title: "Simple Organization",
      text: "Create tasks in one place without distractions.",
      delay: 200,
    },
    {
      icon: <FaClock className="mx-auto text-4xl text-blue-600 mb-4" />,
      title: "Beat Procrastination",
      text: "Track progress and stay motivated every day.",
      delay: 300,
    },
  ];

  const steps = [
    {
      icon: <AiOutlinePlus className="mx-auto text-4xl text-blue-600 mb-4" />,
      title: "Add Tasks",
      text: "Quickly capture everything you need to do.",
      delay: 100,
    },
    {
      icon: <AiOutlineBarChart className="mx-auto text-4xl text-blue-600 mb-4" />,
      title: "Track Progress",
      text: "See what’s done and what’s left at a glance.",
      delay: 200,
    },
    {
      icon: <AiOutlineCheck className="mx-auto text-4xl text-blue-600 mb-4" />,
      title: "Mark Complete",
      text: "Enjoy the satisfaction of checking off tasks.",
      delay: 300,
    },
  ];

  const Card = ({ icon, title, text, delay }) => (
    <div
      className="transition-transform hover:scale-105"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {icon}
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative text-center py-20 px-6 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50"
        data-aos="fade-up"
      >
        <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Your Personal Task Manager
        </span>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Stay organized, stay focused <br /> with TaskSprint
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          A simple and personal way to manage your daily tasks, track progress,
          and boost your productivity.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPage("dashboard")}
            className="px-6 py-3 text-white font-semibold bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition-transform hover:scale-105"
            aria-label="Get started with TaskSprint"
          >
            Get Started
          </button>
          <a
            href="#benefits"
            className="px-6 py-3 font-semibold text-blue-600 border border-blue-600 rounded-xl shadow-sm hover:bg-blue-50 transition"
          >
            Learn More
          </a>
        </div>

        <div className="mt-16 max-w-5xl mx-auto" data-aos="zoom-in">
          <img
            src="/screenshot.png"
            alt="TaskSprint Preview"
            className="rounded-2xl shadow-xl border"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-6 bg-white text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Why TaskSprint?</h2>
        <div className="grid gap-10 md:grid-cols-3 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <Card key={i} {...b} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 text-center bg-gray-50" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-3 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <Card key={i} {...s} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-6 text-center text-gray-500 text-sm border-t bg-white overflow-hidden"
        data-aos="fade-up"
      >
        {/* Animated Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[gradient-move_6s_linear_infinite]" />

        {/* Footer Content */}
        <p className="relative z-10 transition-colors duration-300 hover:text-blue-600">
          © {new Date().getFullYear()} <span className="font-semibold">TaskSprint</span>. Built for personal productivity.
        </p>
      </footer>

      {/* Gradient Animation */}
      <style>
        {`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}
