import React from 'react';
import { CreditCard, Sparkles, Truck, Sliders, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RetailExperienceGridProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const RetailExperienceGrid: React.FC<RetailExperienceGridProps> = ({
  title = "The Mango Store Difference.",
  subtitle = "Even more reasons to make Mango your destination.",
  className = ""
}) => {
  const perks = [
    {
      icon: CreditCard,
      badge: "Flexible Payment",
      title: "0% APR Financing",
      description: "Spread your purchase across 12 or 24 low monthly installments with 0% interest using the Mango Card.",
      actionText: "Explore financing",
      actionUrl: "/store",
      colorClass: "text-mango-600 dark:text-mango-400",
      bgClass: "bg-mango-100 dark:bg-mango-950/60"
    },
    {
      icon: Sliders,
      badge: "Custom Build",
      title: "Tailor-Made Configs",
      description: "Build your dream device with custom memory, ultra-fast SSD upgrades, and specialized glass coatings.",
      actionText: "Configure hardware",
      actionUrl: "/store/laptop",
      colorClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-100 dark:bg-emerald-950/60"
    },
    {
      icon: Truck,
      badge: "Fast Delivery",
      title: "Free Express Courier",
      description: "Enjoy complimentary next-day delivery on all orders, or choose 2-hour pickup at your nearest Mango Store.",
      actionText: "Delivery details",
      actionUrl: "/store",
      colorClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-100 dark:bg-blue-950/60"
    },
    {
      icon: Sparkles,
      badge: "Personal Touch",
      title: "Free Laser Engraving",
      description: "Make your Mango device unmistakably yours. Engrave custom initials, lucky numbers, or emoji for free.",
      actionText: "Personalize yours",
      actionUrl: "/store/earbuds",
      colorClass: "text-mango-600 dark:text-mango-400",
      bgClass: "bg-mango-100 dark:bg-mango-950/60"
    }
  ];

  return (
    <div className={`py-14 px-4 sm:px-6 max-w-7xl mx-auto ${className}`}>
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          {title} <span className="text-neutral-400 dark:text-neutral-500 font-normal">{subtitle}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {perks.map((perk, idx) => {
          const Icon = perk.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-mango-lg bg-white dark:bg-[#16171A] border border-neutral-200/80 dark:border-neutral-800/80 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${perk.bgClass} ${perk.colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {perk.badge}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                  {perk.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                  {perk.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <Link
                  to={perk.actionUrl}
                  className={`text-xs font-semibold ${perk.colorClass} inline-flex items-center gap-1 group-hover:underline`}
                >
                  <span>{perk.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
