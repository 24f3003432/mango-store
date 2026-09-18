import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    text: "Get $200–$650 in credit when you trade in your previous device for a new Laptop or Phone.",
    linkText: "Estimate Trade-in",
    linkUrl: "/store/laptop"
  },
  {
    text: "Experience high-fidelity lossless streaming. Get 3 months of Mango Sound free with any Mango device.",
    linkText: "Try Mango Sound",
    linkUrl: "/sound"
  },
  {
    text: "Comprehensive accidental protection, battery coverage, and priority Pip support with Mango Care+.",
    linkText: "Explore Care+",
    linkUrl: "/care"
  }
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ANNOUNCEMENTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-neutral-100/90 dark:bg-neutral-900/90 border-b border-neutral-200/60 dark:border-neutral-800 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center text-neutral-600 dark:text-neutral-400 gap-2">
        <Sparkles className="w-3.5 h-3.5 text-mango-500 shrink-0 hidden sm:inline" />
        <span className="font-normal transition-opacity duration-300">
          {current.text}
        </span>
        <Link
          to={current.linkUrl}
          className="font-medium text-mango-600 dark:text-mango-400 hover:text-mango-700 dark:hover:text-mango-300 inline-flex items-center gap-0.5 ml-1 transition-colors group shrink-0"
        >
          {current.linkText}
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
