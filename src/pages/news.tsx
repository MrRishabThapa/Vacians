import { useState } from "react";
import { newsData as initialData } from "../data/mockData";
import { RocketIcon, MessageSquare, Share } from "lucide-react";

type NewsArticle = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  boosts: number;
  comments: number;
  liked: boolean;
};

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>(
    initialData.map((item) => ({
      ...item,
      boosts: 0,
      comments: 0,
      liked: false,
    }))
  );

  const handleLike = (id: number) => {
    setNews((prev) =>
      prev.map((article) =>
        article.id === id
          ? {
              ...article,
              likes: article.liked ? article.boosts - 1 : article.boosts + 1,
              liked: !article.liked,
            }
          : article
      )
    );
  };

  return (
    <div className="bg-green-50 min-h-screen p-4 md:p-10">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-green-900 mb-2">
          Community News
        </h1>
        <p className="text-green-700 text-lg">
          Stay updated with the latest community initiatives and success stories
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col min-h-[500px]"
          >
            {article.image && (
              <div className="w-full flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-56 md:h-64 object-cover"
                />
              </div>
            )}

            <div className="flex-1 p-4 text-green-700 flex flex-col">
              <h3 className="text-green-900 font-semibold mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-green-500 mb-4">{article.date}</p>
              <p className="flex-1">{article.excerpt}</p>
            </div>

            <div className="px-4 pb-2 text-sm text-green-600 flex justify-between">
              <span>{article.boosts} Boost</span>
              <span>{article.comments} Comments</span>
            </div>

            <div className="p-2 border-t border-green-100 flex justify-around text-green-700 text-sm">
              <button
                onClick={() => handleLike(article.id)}
                className={`flex-1 py-2 rounded-lg hover:bg-green-100 transition ${
                  article.liked ? "text-green-800 font-semibold" : ""
                }`}
              >
                <div className="flex items-center space-x-2 justify-center">
                  <RocketIcon />
                  <span>{article.liked ? "Boosted" : "Boost"}</span>
                </div>
              </button>
              <button className="flex-1 py-2 rounded-lg hover:bg-green-100 transition">
                <div className="flex items-center space-x-2 justify-center">
                  <MessageSquare /> Comment
                </div>
              </button>
              <button className="flex-1 py-2 rounded-lg hover:bg-green-100 transition">
                <div className="flex items-center space-x-2 justify-center">
                  <Share /> Share
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
