// import React from "react";
import Leaderboard from "./leaderboard";
import Maps from "./maps";
import News from "./news";
import Opp from "./opp";
import img from "../assets/landing.jpg";
import about from "../assets/about.webp";
import oppo from "../assets/oppos.jpg";
import location from "../assets/loc.jpg";
import track from "../assets/track.jpg";
import update from "../assets/upda.jpg";
type HomepageProps = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};
export default function Homepage({
  currentPage,
  setCurrentPage,
}: HomepageProps) {
  if (currentPage === "home") {
    const features = [
      {
        icon: oppo,
        title: "Find Opportunities",
        description:
          "Discover volunteer opportunities that match your skills and interests in your community.",
      },
      {
        icon: location,
        title: "Location-Based",
        description:
          "Find volunteer work near you with our interactive map showing urgent needs.",
      },
      {
        icon: track,
        title: "Track Impact",
        description:
          "Earn points for your contributions and see your impact on the community leaderboard.",
      },
      {
        icon: update,
        title: "Stay Updated",
        description:
          "Get the latest news and updates about community initiatives and success stories.",
      },
    ];

    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center">
        <div className="relative w-full h-[95vh] flex items-center justify-center">
          <img
            src={img}
            alt="Volunteering"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 z-0 overflow-hidden">
            {[...Array(24)].map((_, i) => (
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
                {i % 2 === 0 ? "🌿" : "💧"}
              </span>
            ))}
          </div>

          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-7xl md:text-7xl font-bold mb-4 animate-fadeIn">
              Connect. Contribute. Change
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
              Connecting communities through volunteer opportunities. Discover
              opportunities, take action, and leave a lasting impact.
            </p>
            <button
              onClick={() => setCurrentPage("opportunities")}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Make an Impact
            </button>
          </div>
        </div>

        <div className="features-grid grid gap-10 sm:grid-cols-2 lg:grid-cols-2 w-full max-w-5xl px-6 py-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card relative bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-3 hover:scale-105 cursor-pointer text-center overflow-hidden"
            >
              <div className="feature-icon ">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-70 h-50 mx-auto object-contain transition-transform duration-500 hover:scale-110 rounded-2xl"
                />
              </div>

              <h3 className="feature-title text-xl font-bold text-green-900 mb-3">
                {feature.title}
              </h3>
              <p className="feature-description text-green-700">
                {feature.description}
              </p>

              <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-green-100/50 via-green-50/20 to-transparent blur-2xl opacity-30"></div>
            </div>
          ))}
        </div>

        <div className="about-section w-full bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={about}
                alt="Community work"
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
            <div className="text-green-800">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About Volcomm.
              </h2>
              <p className="text-lg text-green-700 mb-4">
                Volcomm. is a platform dedicated to connecting communities
                through meaningful volunteer work. Our mission is to bridge the
                gap between volunteers and organizations in need.
              </p>
              <p className="text-lg text-green-700">
                Whether you’re passionate about helping the environment,
                supporting education, or assisting in disaster relief, Volcomm
                makes it easy to find opportunities and track your impact.
              </p>
            </div>
          </div>
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
  }

  switch (currentPage) {
    case "opportunities":
      return <Opp />;
    case "news":
      return <News />;
    case "map":
      return <Maps />;
    case "leaderboard":
      return <Leaderboard />;
    default:
      return <div>Page not found</div>;
  }
}
