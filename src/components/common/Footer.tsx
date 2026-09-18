import React from 'react';
import { Link } from 'react-router-dom';
import { MangoLogo } from './MangoLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100 dark:bg-[#121316] text-neutral-500 dark:text-neutral-400 text-xs border-t border-neutral-200 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Footnotes / Disclaimers */}
        <div className="space-y-2.5 pb-8 border-b border-neutral-200 dark:border-neutral-800 text-[11px] leading-relaxed">
          <p>
            * Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for a Mango Gift Card. Trade-in value may be applied toward qualifying new device purchase, or added to a Mango Gift Card.
          </p>
          <p>
            1. Mango Sound requires compatible hardware and software. Offer available to new subscribers with an eligible audio device. Plan renews at $10.99/month until cancelled.
          </p>
          <p>
            2. Mango Care+ benefits are separate from and in addition to the Mango Limited Warranty. Accidental damage protection is subject to service fees per incident.
          </p>
          <p>
            3. Pip AI features are available on devices powered by Mango Neural Silicon M-Core and A-Series chips running the latest MangoOS software.
          </p>
        </div>

        {/* Directory Breadcrumbs / Logo Header */}
        <div className="py-4 flex items-center gap-2 text-xs">
          <Link to="/store" className="hover:text-mango-500 flex items-center gap-1 font-medium text-neutral-800 dark:text-neutral-200">
            <MangoLogo size={16} />
            <span>Mango Store</span>
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-600 dark:text-neutral-400">Online Storefront</span>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-6 border-b border-neutral-200 dark:border-neutral-800">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Shop and Learn</h4>
            <ul className="space-y-2">
              <li><Link to="/store/laptop" className="hover:text-mango-500 transition-colors">Laptop</Link></li>
              <li><Link to="/store/tablet" className="hover:text-mango-500 transition-colors">Tablet</Link></li>
              <li><Link to="/store/phone" className="hover:text-mango-500 transition-colors">Phone</Link></li>
              <li><Link to="/store/wearable" className="hover:text-mango-500 transition-colors">Wearable</Link></li>
              <li><Link to="/store/headset" className="hover:text-mango-500 transition-colors">Headset</Link></li>
              <li><Link to="/store/earbuds" className="hover:text-mango-500 transition-colors">Earbuds</Link></li>
              <li><Link to="/store/screens-home" className="hover:text-mango-500 transition-colors">Screens & Home</Link></li>
              <li><Link to="/store/entertainment" className="hover:text-mango-500 transition-colors">Entertainment</Link></li>
              <li><Link to="/store/accessories" className="hover:text-mango-500 transition-colors">Accessories</Link></li>
              <li><Link to="/store/tracker" className="hover:text-mango-500 transition-colors">Tracker</Link></li>
              <li><Link to="/store/giftcard" className="hover:text-mango-500 transition-colors">Gift Card</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Mango Wallet & Account</h4>
              <ul className="space-y-2">
                <li><Link to="/store" className="hover:text-mango-500 transition-colors">Manage Mango ID</Link></li>
                <li><Link to="/store" className="hover:text-mango-500 transition-colors">Mango Store Account</Link></li>
                <li><Link to="/store/giftcard" className="hover:text-mango-500 transition-colors">Redeem Gift Card</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Entertainment</h4>
              <ul className="space-y-2">
                <li><Link to="/sound" className="hover:text-mango-500 transition-colors">Mango Sound</Link></li>
                <li><Link to="/store/entertainment" className="hover:text-mango-500 transition-colors">Mango TV Stream</Link></li>
                <li><Link to="/store/entertainment" className="hover:text-mango-500 transition-colors">Mango Arcade</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Mango Store</h4>
            <ul className="space-y-2">
              <li><Link to="/store" className="hover:text-mango-500 transition-colors">Find a Store</Link></li>
              <li><Link to="/support" className="hover:text-mango-500 transition-colors">Genius Specialist Bar</Link></li>
              <li><Link to="/store" className="hover:text-mango-500 transition-colors">Today at Mango</Link></li>
              <li><Link to="/bag" className="hover:text-mango-500 transition-colors">Shopping Bag</Link></li>
              <li><Link to="/orders" className="hover:text-mango-500 transition-colors">Order Status & Tracking</Link></li>
              <li><Link to="/support" className="hover:text-mango-500 transition-colors">Shopping Help & FAQ</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">For Business & Campus</h4>
              <ul className="space-y-2">
                <li><Link to="/store" className="hover:text-mango-500 transition-colors">Mango & Business</Link></li>
                <li><Link to="/store" className="hover:text-mango-500 transition-colors">Shop for Business</Link></li>
                <li><Link to="/store" className="hover:text-mango-500 transition-colors">Mango & Education</Link></li>
                <li><Link to="/store" className="hover:text-mango-500 transition-colors">Student Savings Program</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/care" className="hover:text-mango-500 transition-colors">Mango Care+</Link></li>
                <li><Link to="/sound" className="hover:text-mango-500 transition-colors">Lossless Sound</Link></li>
                <li><Link to="/support" className="hover:text-mango-500 transition-colors">Customer Support</Link></li>
                <li><Link to="/orders" className="hover:text-mango-500 transition-colors">Order History</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 5 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">Mango Values</h4>
            <ul className="space-y-2">
              <li><Link to="/store" className="hover:text-mango-500 transition-colors">Accessibility</Link></li>
              <li><Link to="/store" className="hover:text-mango-500 transition-colors">100% Carbon Neutral 2030</Link></li>
              <li><Link to="/store" className="hover:text-mango-500 transition-colors">Privacy First</Link></li>
              <li><Link to="/store" className="hover:text-mango-500 transition-colors">Pip AI Ethics</Link></li>
              <li><Link to="/store" className="hover:text-mango-500 transition-colors">Supply Chain Responsibility</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & links */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>
            Copyright &copy; {new Date().getFullYear()} Mango Inc. All rights reserved. Built for Hackathon Showcase.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="#privacy" className="hover:text-mango-500 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#sales" className="hover:text-mango-500 transition-colors">Sales Policy</a>
            <span>|</span>
            <a href="#legal" className="hover:text-mango-500 transition-colors">Legal Terms</a>
            <span>|</span>
            <a href="#sitemap" className="hover:text-mango-500 transition-colors">Site Map</a>
            <span>|</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">United States</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
