import { useState } from "react";
import PerksGuide from "./perksGuide";

// TYPES
type User = {
  id: number;
  name: string;
  points: number;
  avatar: string;
};

// MOCK DATA
const mockUsers: User[] = [
  { id: 1, name: "Alex Chauhan", points: 2450, avatar: "AC" },
  { id: 2, name: "Marina Karki", points: 2180, avatar: "MR" },
  { id: 3, name: "David Khadka", points: 1950, avatar: "DK" },
  { id: 4, name: "Sarah Ban", points: 1720, avatar: "SJ" },
  { id: 5, name: "Michael Luitel", points: 1580, avatar: "MB" },
  { id: 6, name: "Eshan Limbu", points: 1420, avatar: "EW" },
  { id: 7, name: "Arjun Shah", points: 1250, avatar: "AS" },
  { id: 8, name: "Ganesh Dulal", points: 1100, avatar: "GD" },
  { id: 9, name: "Utsav Raj Ojha", points: 950, avatar: "URO" },
  { id: 10, name: "Ronik Koirala", points: 820, avatar: "RK" },
  { id: 11, name: "Khushi Karn", points: 680, avatar: "KK" },
  { id: 12, name: "Samriddhi Khadgi", points: 540, avatar: "SK" },
  { id: 13, name: "Haris Ali Khan", points: 420, avatar: "HAK" },
  { id: 14, name: "Hitesh Chaudhary", points: 310, avatar: "HC" },
  { id: 15, name: "Keshab Kumar Chauhan", points: 180, avatar: "KKC" },
];

// UTILITY FUNCTIONS
function getTier(points: number) {
  if (points >= 5000)
    return { name: "Community Guardian", color: "#4CAF50", icon: "👑" };
  if (points >= 3000)
    return { name: "Kind Soul", color: "#00C0FF", icon: "🌳" };
  if (points >= 2000) return { name: "Blossom", color: "#FFD700", icon: "🌸" };
  if (points >= 1000) return { name: "Sprout", color: "#C0C0C0", icon: "🌿" };
  return { name: "Seedling", color: "#CD7F32", icon: "🌱" };
}

function getProgressToNext(points: number) {
  if (points >= 5000) return { current: points, max: points, percentage: 100 };
  if (points >= 3000)
    return {
      current: points - 3000,
      max: 2000,
      percentage: ((points - 3000) / 2000) * 100,
    };
  if (points >= 2000)
    return {
      current: points - 2000,
      max: 1000,
      percentage: ((points - 2000) / 1000) * 100,
    };
  if (points >= 1000)
    return {
      current: points - 1000,
      max: 1000,
      percentage: ((points - 1000) / 1000) * 100,
    };
  return { current: points, max: 1000, percentage: (points / 1000) * 100 };
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-green-500 to-green-400 text-white flex items-center justify-center font-bold text-lg md:text-xl lg:text-2xl mx-auto">
      {initials}
    </div>
  );
}

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-green-100 rounded-full mb-1">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function TopThreeCard({ user, position }: { user: User; position: number }) {
  const tier = getTier(user.points);
  const progress = getProgressToNext(user.points);

  const scaleClass =
    position === 1 ? "scale-115 z-30 mb-5" : "scale-95 z-20 mt-8";
  const borderColor =
    position === 1
      ? "border-yellow-400"
      : position === 2
      ? "border-gray-300"
      : "border-orange-700";

  return (
    <div
      className={`bg-white p-6 text-center rounded-xl shadow-md border-4 ${borderColor} transform ${scaleClass} relative`}
    >
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-xs md:text-sm lg:text-base">
        {position}
      </div>
      <Avatar initials={user.avatar} />
      <h3 className="mt-3 text-green-900 font-semibold text-base md:text-lg lg:text-xl">
        {user.name}
      </h3>
      <p className="text-green-800 font-bold text-lg md:text-xl lg:text-2xl">
        {user.points.toLocaleString()} pts
      </p>
      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-green-900 bg-white border-2 border-green-100 shadow-sm mt-2 text-sm md:text-base">
        <span>{tier.icon}</span>
        <span className="font-semibold">Current Tier: {tier.name}</span>
      </div>
      <ProgressBar percentage={progress.percentage} />
      <span className="text-gray-600 text-xs md:text-sm">
        {progress.current}/{progress.max}
      </span>
    </div>
  );
}

function LeaderboardRow({ user }: { user: User }) {
  const tier = getTier(user.points);
  const progress = getProgressToNext(user.points);

  return (
    <div className="flex items-center gap-4 p-4 mb-2 bg-white border-2 border-green-100 rounded-xl shadow-sm hover:bg-green-50 transition cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-400 text-white flex items-center justify-center font-bold text-sm">
        {user.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
          <span className="text-green-900 font-semibold text-sm md:text-base">
            {user.name}
          </span>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-white border-2 border-green-100 rounded-full">
            Current Tier: {tier.name}
          </div>
        </div>
        <ProgressBar percentage={progress.percentage} />
      </div>
      <span className="text-green-800 font-bold text-sm md:text-base">
        {user.points.toLocaleString()}
      </span>
    </div>
  );
}

function Profile({ user, onBack }: { user: User; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-green-50 p-5">
      <div className="max-w-3xl mx-auto bg-white border-4 border-green-500 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative text-center py-6 bg-gradient-to-r from-green-500 to-green-400 text-white">
          <button
            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition"
            onClick={onBack}
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        </div>
        <div className="text-center p-8">
          <Avatar initials={user.avatar} />
          <h2 className="mt-4 text-green-900 font-semibold text-xl md:text-2xl">
            {user.name}
          </h2>
          <p className="text-green-800 font-bold text-lg md:text-xl">
            {user.points.toLocaleString()} points
          </p>
        </div>
        <div className="p-8">
          <PerksGuide userPoints={user.points} />
        </div>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPerks, setShowPerks] = useState(false);

  const topThree = mockUsers.slice(0, 3);
  const remaining = mockUsers.slice(3);

  if (selectedUser) {
    return <Profile user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  if (showPerks) {
    return (
      <div className="min-h-screen bg-green-50 p-5">
        <div className="max-w-3xl mx-auto bg-white border-4 border-green-500 rounded-2xl shadow-lg overflow-hidden">
          <div className="relative text-center py-6 bg-gradient-to-r from-green-500 to-green-400 text-white">
            <button
              className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition"
              onClick={() => setShowPerks(false)}
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold tracking-tight">Perks Guide</h1>
          </div>
          <div className="p-8">
            <PerksGuide userPoints={0} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-5 font-sans">
      <div className="max-w-3xl mx-auto bg-white border-4 border-green-500 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative text-center py-8 bg-gradient-to-r from-green-500 to-green-400 text-white">
          <h1 className="text-2xl font-bold tracking-tight">Eco Leaderboard</h1>
          <button
            className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition"
            onClick={() => setShowPerks(true)}
          >
            View Perks Guide
          </button>
        </div>

        <div className="flex justify-center items-end gap-5 p-10 bg-green-50 relative">
          {topThree.map((user, index) => (
            <div key={user.id} onClick={() => setSelectedUser(user)}>
              <TopThreeCard user={user} position={index + 1} />
            </div>
          ))}
        </div>

        <div className="p-5">
          {remaining.map((user) => (
            <LeaderboardRow key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
