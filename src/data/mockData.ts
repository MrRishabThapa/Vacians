import money from "../assets/money.jpg";
import food from "../assets/food.jpg";
import beach from "../assets/beach.jpg";
import leader from "../assets/leadership.jpg";
import volunter from "../assets/women-volunteers.jpg";
import snow from "../assets/snow.jpg";
export const opportunitiesData = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    description:
      "Help us clean and maintain the community garden. Tasks include weeding, planting, and general maintenance.",
    location: "Central Park Community Garden",
    urgency: "high",
    date: "2024-01-15",
    duration: "3-4 hours",
  },
  {
    id: 2,
    title: "Food Bank Volunteer",
    description:
      "Assist with sorting, packing, and distributing food to families in need. No experience necessary.",
    location: "Downtown Food Bank",
    urgency: "high",
    date: "2024-01-12",
    duration: "2-3 hours",
  },
  {
    id: 3,
    title: "Beach Cleanup Drive",
    description:
      "Join us for a monthly beach cleanup to protect marine life and keep our coastline beautiful.",
    location: "Sunset Beach",
    urgency: "medium",
    date: "2024-01-20",
    duration: "2 hours",
  },
  {
    id: 4,
    title: "Senior Center Reading Program",
    description:
      "Read to elderly residents and help with recreational activities. Bring joy to senior community members.",
    location: "Sunrise Senior Center",
    urgency: "low",
    date: "2024-01-18",
    duration: "1-2 hours",
  },
  {
    id: 5,
    title: "Youth Mentorship Program",
    description:
      "Mentor local youth in academic and life skills. Help shape the next generation of community leaders.",
    location: "Community Youth Center",
    urgency: "medium",
    date: "2024-01-22",
    duration: "2 hours weekly",
  },
  {
    id: 6,
    title: "Animal Shelter Support",
    description:
      "Help care for rescued animals including feeding, cleaning, and socializing with pets.",
    location: "Happy Paws Animal Shelter",
    urgency: "high",
    date: "2024-01-14",
    duration: "3 hours",
  },
  {
    id: 7,
    title: "Koshi river Cleanup Site",
    description:
      "river Cleanup to protect local wildlife and improve water quality.",
    location: "koshi tappu bank",
    urgency: "high",
    date: "2024-02-14",
    duration: "6 hours",
  },
];

export const newsData = [
  {
    id: 1,
    title: "Community Garden Project Receives Rs.50K Grant",
    excerpt:
      "Local community garden initiative receives major funding to expand operations and serve more families in need.",
    date: "January 8, 2024",
    image: money,
  },
  {
    id: 2,
    title: "Record-Breaking Food Drive Results",
    excerpt:
      "This year's holiday food drive collected over 10,000 items, the highest amount in the program's history.",
    date: "January 5, 2024",
    image: food,
  },
  {
    id: 3,
    title: "Beach Cleanup Removes 500 Pounds of Trash",
    excerpt:
      "Volunteers came together last weekend to remove hundreds of pounds of debris from our local beaches.",
    date: "January 3, 2024",
    image: beach,
  },
  {
    id: 4,
    title: "New Youth Mentorship Program Launches",
    excerpt:
      "Connecting at-risk youth with positive role models through our new comprehensive mentorship initiative.",
    date: "December 30, 2023",
    image: leader,
  },
  {
    id: 5,
    title: "Volunteer Appreciation Gala Announced",
    excerpt:
      "Join us in February to celebrate our amazing volunteers and their contributions to the community.",
    date: "December 28, 2023",
    image: volunter,
  },
  {
    id: 6,
    title: "Winter Coat Drive Exceeds Goal",
    excerpt:
      "Thanks to generous donations, we've collected 1,200 winter coats for families in need this season.",
    date: "December 25, 2023",
    image: snow,
  },
];

export const mapLocations = [
  {
    id: 1,
    name: "Community Garden Cleanup",
    coordinates: [26.669, 87.28], // near Itahari
    urgency: "high",
  },
  {
    id: 2,
    name: "Food Bank Volunteer",
    coordinates: [26.6645, 87.2875],
    urgency: "high",
  },
  {
    id: 3,
    name: "Beach Cleanup Drive",
    coordinates: [26.6702, 87.285],
    urgency: "medium",
  },
  {
    id: 4,
    name: "Senior Center Reading Program",
    coordinates: [26.6675, 87.2901],
    urgency: "low",
  },
  {
    id: 5,
    name: "Youth Mentorship Program",
    coordinates: [26.662, 87.281],
    urgency: "medium",
  },
  {
    id: 6,
    name: "Animal Shelter Support",
    coordinates: [26.6688, 87.2785],
    urgency: "high",
  },
  {
    id: 7,
    name: "Koshi River Cleanup Site",
    coordinates: [26.6655, 87.2865],
    urgency: "medium",
  },
];
