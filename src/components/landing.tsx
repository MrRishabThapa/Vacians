import React from "react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Landing: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-green-950 via-black-900 to-green-800 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className={`absolute text-xl md:text-2xl ${
              i % 2 === 0 ? "text-green-400" : "text-blue-500"
            } animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            {i % 2 === 0 ? "🍃" : "💧"}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 sm:px-12">
        <h1 className="absolute top-[3%] text-6xl sm:text-7xl md:text-8xl font-extrabold text-white drop-shadow-2xl tracking-wide">
          Volcomm.
        </h1>

        <p className="absolute top-[15%] text-center text-lg sm:text-xl md:text-2xl text-green-100 max-w-3xl drop-shadow-md leading-relaxed">
          Bridging communities with volunteers to create meaningful impact.
          Small acts of kindness become collective movements, transforming lives
          and strengthening bonds.
        </p>

        <div className="w-[400px] h-[380px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] mt-36 sm:mt-40 md:mt-48">
          <Spline scene="https://prod.spline.design/I2sOEtZMa4A4ORAZ/scene.splinecode" />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link
            to="/signup"
            className="bg-green-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg"
          >
            Join as Volunteer
          </Link>
          <Link
            to="/login"
            className="bg-white/10 backdrop-blur-md text-green-200 border border-green-400 px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-md"
          >
            Login
          </Link>
        </div>

        <p className="mt-8 text-sm sm:text-base text-green-200 opacity-80 max-w-md">
          Already part of our community? Login to track your impact and explore
          new opportunities.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
          100% { transform: translateY(0) rotate(360deg); opacity: 0.7; }
        }
        .animate-float {
          position: absolute;
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Landing;
