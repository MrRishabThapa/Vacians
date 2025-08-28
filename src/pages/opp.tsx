import { useState } from "react";
import Card from "../components/card";
import { opportunitiesData } from "../data/mockData";
import img from "../assets/volunteer.jpg";
import { Locate, Calendar, Timer, X, Plus } from "lucide-react";

type Opportunity = (typeof opportunitiesData)[number];

export default function Opportunities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [mode, setMode] = useState<"physical" | "donation">("physical");

  // New state to store campaigns (initially load existing opportunities)
  const [campaigns, setCampaigns] = useState<Opportunity[]>(opportunitiesData);

  const openModal = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOpportunity(null);
    setMode("physical");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for contributing!");
    closeModal();
  };

  const openAddCampaign = () => setIsAddCampaignOpen(true);
  const closeAddCampaign = () => setIsAddCampaignOpen(false);

  const handleAddCampaign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const newCampaign: Opportunity = {
      id: campaigns.length + 1,
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      location: (form.elements.namedItem("location") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      duration: (form.elements.namedItem("duration") as HTMLInputElement).value,
      description: (
        form.elements.namedItem("description") as HTMLTextAreaElement
      ).value,
      urgency: "medium", // default urgency
    };

    setCampaigns([...campaigns, newCampaign]); // add new campaign
    alert("Your campaign has been submitted!");
    closeAddCampaign();
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-16 px-8 md:px-20 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-lg">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">
            Empower Your Community
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Join hands with local organizations and contribute to causes that
            truly matter. Discover opportunities that align with your passion
            and skills.
          </p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition">
            Explore Opportunities
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={img}
            alt="Professional Volunteering"
            className="rounded-2xl shadow-2xl max-h-[450px] object-cover"
          />
        </div>
      </div>

      {/* Page Header */}
      <div className="page-header text-center py-8 bg-gradient-to-r from-green-100 to-green-50">
        <h1 className="page-title text-3xl font-bold text-gray-800">
          Available Campaigns
        </h1>
        <p className="page-subtitle text-gray-600 mt-2">
          Find meaningful ways to contribute to your community
        </p>
      </div>

      {/* Campaign Grid */}
      <div className="opportunities-grid grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 relative">
        {campaigns.map((opportunity) => (
          <Card
            key={opportunity.id}
            className="p-5 rounded-xl shadow-md bg-white"
          >
            <div className="card-header flex justify-between items-center mb-3">
              <h3 className="card-title text-xl font-semibold text-gray-800">
                {opportunity.title}
              </h3>
              <span
                className={`urgency-badge px-3 py-1 text-sm rounded-full font-medium ${
                  opportunity.urgency === "high"
                    ? "bg-red-100 text-red-700"
                    : opportunity.urgency === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {opportunity.urgency} urgency
              </span>
            </div>

            <div className="card-meta text-gray-600 text-sm space-y-1 mb-3">
              <p className="flex items-center gap-2">
                <Locate /> {opportunity.location}
              </p>
              <p className="flex items-center gap-2">
                <Calendar /> {opportunity.date}
              </p>
              <p className="flex items-center gap-2">
                <Timer /> {opportunity.duration}
              </p>
            </div>

            <p className="card-description text-gray-700 mb-4">
              {opportunity.description}
            </p>

            {/* Dummy info bar */}
            <div className="mb-3 p-3 bg-gray-100 rounded-lg text-gray-700 text-sm flex justify-between">
              <span>Applied: {Math.floor(Math.random() * 50) + 1} people</span>
              <span>Points: {Math.floor(Math.random() * 100) + 10}</span>
            </div>

            <button
              onClick={() => openModal(opportunity)}
              className="btn-primary w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Apply Now
            </button>
          </Card>
        ))}

        {/* Add Campaign Button */}
        <div className="flex flex-col items-center justify-center mx-auto mt-6">
          <div
            onClick={openAddCampaign}
            className="flex flex-col items-center justify-center w-32 h-32 rounded-full bg-gray-300 text-gray-800 cursor-pointer p-4 hover:bg-gray-400 transition"
          >
            <Plus size={68} className="text-red-500" />
          </div>
          <p className="text-center text-xl text-gray-600 mt-2 mb-10">
            Have a campaign? Add yours!
          </p>
        </div>
      </div>

      {/* Apply Modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50`}
          style={{
            backgroundColor:
              mode === "donation" ? "transparent" : "rgba(0,0,0,0.5)",
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              {selectedOpportunity?.title}
            </h2>
            <div className="flex mb-6 gap-4">
              <button
                onClick={() => setMode("physical")}
                className={`flex-1 py-2 rounded-lg ${
                  mode === "physical"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Physical Contribution
              </button>
              <button
                onClick={() => setMode("donation")}
                className={`flex-1 py-2 rounded-lg ${
                  mode === "donation"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Monetary Donation
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {mode === "physical" && (
                <input
                  type="text"
                  placeholder="Availability / Schedule"
                  required
                  className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
              {mode === "donation" && (
                <>
                  <input
                    type="number"
                    placeholder="Amount to Donate"
                    required
                    className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select
                    required
                    className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="esewa">eSewa</option>
                    <option value="khalti">Khalti</option>
                    <option value="mobilebanking">Mobile Banking</option>
                  </select>
                </>
              )}
              <textarea
                placeholder="Additional Notes"
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Campaign Modal */}
      {isAddCampaignOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative shadow-2xl">
            <button
              onClick={closeAddCampaign}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Add Your Campaign
            </h2>
            <form onSubmit={handleAddCampaign} className="space-y-4">
              <input
                name="title"
                type="text"
                placeholder="Campaign Title"
                required
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="location"
                type="text"
                placeholder="Location"
                required
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="date"
                type="date"
                required
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                name="duration"
                type="text"
                placeholder="Duration"
                required
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit Campaign
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
