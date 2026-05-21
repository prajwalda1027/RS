import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, Award, Compass, ThumbsUp, Users, Sparkles } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../data';

export default function ReviewSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high'>('all');

  const filteredReviews = activeFilter === 'all' 
    ? REVIEWS 
    : REVIEWS.filter(r => r.rating === 5);

  return (
    <div id="reviews" className="py-20 bg-neutral-950 border-t border-neutral-800 relative">
      {/* Background Decorative Element */}
      <div className="absolute right-10 bottom-10 w-72 h-72 bg-orange-600/5 blur-[90px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-600/15 text-orange-500 text-xs font-mono font-bold uppercase tracking-wider mb-4 font-sans">
            <Star className="w-3 h-3 fill-current" />
            Social Proof & Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase text-white font-sans">
            Loved By <span className="text-orange-500 font-sans">200+ Athletes</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Rated 4.9 out of 5 from over 209 real local reviews in Hongasandra, Bengaluru. Verified customer feedback.
          </p>
        </div>

        {/* Rating Overview Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Scorecard */}
          <div className="lg:col-span-4 bg-neutral-900 rounded-xl p-6 sm:p-8 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-neutral-400 text-sm font-semibold uppercase tracking-widest font-mono mb-4">
                <Compass className="w-4 h-4 text-orange-500" />
                Google Business Score
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-extrabold text-white font-sans">{BUSINESS_INFO.rating}</span>
                <span className="text-2xl text-neutral-500 font-mono">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-mono">
                Based on <span className="text-white font-bold">{BUSINESS_INFO.reviewCount}</span> verified ratings on Google Maps.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-neutral-800/60 flex gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Award className="w-4 h-4 text-orange-500" />
                <span>Top #1 Gym</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Users className="w-4 h-4 text-orange-500" />
                <span>Local favorite</span>
              </div>
            </div>
          </div>

          {/* AI Summarized Insights */}
          <div className="lg:col-span-5 bg-neutral-900 rounded-xl p-6 sm:p-8 border border-neutral-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-orange-600/5 blur-[40px] rounded-full"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 px-2.5 rounded-sm bg-orange-600/15 text-orange-500 text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current animate-pulse" />
                Summarised by Google AI
              </div>
            </div>
            
            <h3 className="text-lg font-black italic uppercase tracking-tight text-white mb-2">What People Love Most:</h3>
            <p className="text-sm text-neutral-450 leading-relaxed mb-4">
              "People say this gym features a wide variety of modern, well-maintained equipment and offers structured workout and diet plans. They also highlight the motivating and friendly atmosphere, which is suitable for both beginners and advanced athletes. Others also mention the knowledgeable and supportive trainers who provide personalized attention."
            </p>

            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-semibold bg-neutral-950/60 p-2.5 rounded-sm border border-neutral-805">
                <span className="text-orange-500 font-bold">“</span>Infrastructure, surroundings, weights & plates are pretty good. <span className="text-orange-500 font-bold">”</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300 font-semibold bg-neutral-950/60 p-2.5 rounded-sm border border-neutral-805">
                <span className="text-orange-500 font-bold">“</span>The staff is highly professional with an amazing positive atmosphere. <span className="text-orange-500 font-bold">”</span>
              </div>
            </div>
          </div>

          {/* Quick Filters / Stats Breakdown */}
          <div className="lg:col-span-3 bg-neutral-900 rounded-xl p-6 sm:p-8 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-3.5">
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest font-mono mb-2">Rating Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-8 text-neutral-400">5 Star</span>
                  <div className="flex-1 bg-neutral-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full w-[96%]"></div>
                  </div>
                  <span className="w-8 text-right text-neutral-400">96%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-8 text-neutral-400">4 Star</span>
                  <div className="flex-1 bg-neutral-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full w-[4%]"></div>
                  </div>
                  <span className="w-8 text-right text-neutral-400">4%</span>
                </div>
                <div className="flex items-center gap-2 text-xs select-none opacity-40">
                  <span className="w-8 text-neutral-400">3 Star</span>
                  <div className="flex-1 bg-neutral-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full w-0"></div>
                  </div>
                  <span className="w-8 text-right text-neutral-400">0%</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <span className="block text-xs text-neutral-400 mb-2 font-mono uppercase tracking-wider">Filter Testimonials</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`py-2 text-xs rounded-sm transition font-bold uppercase tracking-wider cursor-pointer ${
                    activeFilter === 'all' 
                      ? 'bg-orange-650 text-white font-bold' 
                      : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
                  }`}
                >
                  All Reviews
                </button>
                <button
                  onClick={() => setActiveFilter('high')}
                  className={`py-2 text-xs rounded-sm transition font-bold uppercase tracking-wider cursor-pointer ${
                    activeFilter === 'high' 
                      ? 'bg-orange-650 text-white font-bold' 
                      : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
                  }`}
                >
                  5-Star Only
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Individual Comments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-orange-600/15 border border-orange-500/20 text-orange-500 font-bold flex items-center justify-center text-sm uppercase">
                      {review.author.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{review.author}</h4>
                      <span className="text-[10px] text-neutral-500 font-mono">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star 
                        key={idx} 
                        className={`w-3.5 h-3.5 ${
                          idx < review.rating ? 'fill-orange-500 text-orange-500' : 'text-neutral-800'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1 text-[10px] text-neutral-500">
                  <ThumbsUp className="w-3 h-3 text-orange-500" />
                  Helpful verified user
                </span>
                <span className="text-neutral-500">{review.source}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
