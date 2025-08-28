type PerksGuideProps = {
  userPoints: number;
};

export default function PerksGuide({ userPoints }: PerksGuideProps) {
  const tiers = [
    { name: "Seedling", min: 0, max: 999, icon: "🌱", color: "bg-green-100" },
    {
      name: "Sprout",
      min: 1000,
      max: 1999,
      icon: "🌿",
      color: "bg-emerald-100",
    },
    { name: "Blossom", min: 2000, max: 2999, icon: "🌸", color: "bg-lime-100" },
    {
      name: "Kind Soul",
      min: 3000,
      max: 4999,
      icon: "🌳",
      color: "bg-teal-100",
    },
    {
      name: "Community Guardian",
      min: 5000,
      max: Infinity,
      icon: "🍃",
      color: "bg-cyan-100",
    },
  ];
  const currentTier = tiers.find(
    (tier) => userPoints >= tier.min && userPoints <= tier.max
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-900 text-center">
        Your Current Tier:{" "}
        <span className="text-green-700">
          {currentTier?.icon} {currentTier?.name}
        </span>
      </h2>
      <div className="space-y-4">
        {tiers.map((tier) => {
          const isActive = tier.name === currentTier?.name;
          return (
            <div
              key={tier.name}
              className={`p-4 rounded-xl border-2 shadow-sm ${
                isActive
                  ? "bg-green-100 border-green-500"
                  : "bg-white border-green-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tier.icon}</span>
                <div>
                  <h3 className="font-semibold text-green-900">{tier.name}</h3>
                  <p className="text-sm text-gray-600">
                    {tier.min} – {tier.max === Infinity ? "∞" : tier.max} points
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
         
    </div>
  );
}
