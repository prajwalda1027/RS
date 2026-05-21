import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Info, Clock, User, ArrowRight, CheckCircle2, Flame, MapPin } from 'lucide-react';
import { GYM_CLASSES, BUSINESS_INFO } from '../data';
import { GymClass } from '../types';

export default function ClassSchedules() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookingClass, setBookingClass] = useState<GymClass | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [trialDay, setTrialDay] = useState<string>('Tomorrow');

  const categories = ['all', 'strength', 'zumba', 'yoga', 'crossfit', 'cardio'];

  const filteredClasses = selectedCategory === 'all'
    ? GYM_CLASSES
    : GYM_CLASSES.filter(c => c.category === selectedCategory);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingClass) return;

    const messageText = `Hi RS Fitness! 🏋️‍♂️ 
My name is *${userName}* (${userPhone}). 

I am writing from your website to book a *Free Trial Session* for:
- Class: *${bookingClass.name}*
- Instructor: *${bookingClass.trainer}*
- Time: *${bookingClass.timeSlot}* (${trialDay})

Please confirm my spot at your Begur Road branch opposite CNT Liquor!`;

    const url = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank', 'noreferrer,noopener');
    
    // reset form
    setBookingClass(null);
    setUserName('');
    setUserPhone('');
  };

  return (
    <div id="classes" className="py-20 bg-neutral-950 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-600/15 text-orange-500 text-xs font-mono font-bold uppercase tracking-wider mb-4 font-sans">
              <Calendar className="w-3.5 h-3.5" />
              Interactive Workouts
            </div>
            <h2 className="text-3xl sm:text-4xl font-black italic text-white tracking-tighter uppercase font-sans">
              Elite <span className="text-orange-500">Workout sessions</span>
            </h2>
            <p className="mt-2 text-neutral-400 text-sm max-w-xl leading-relaxed">
              Explore dynamic sessions designed for high efficiency. Choose a workout and lock in your priority spot via WhatsApp.
            </p>
          </div>

          {/* Quick Notice */}
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl max-w-sm flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="text-[11px] sm:text-xs text-neutral-400">
              <span className="text-white font-bold block uppercase tracking-wide">First Session is Free!</span>
              New active trainees in Bengaluru get unlimited access to a free trial class under certified coaches.
            </div>
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm transition ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white font-extrabold shadow-lg shadow-orange-600/15'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              } cursor-pointer`}
            >
              {cat === 'all' ? 'show all classes' : `${cat} workouts`}
            </button>
          ))}
        </div>

        {/* Classes List Slider/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((gymClass, i) => {
              // Intensity badge styles
              let intensityColor = 'text-green-400 bg-green-500/10 border-green-500/20';
              if (gymClass.intensity === 'Medium') intensityColor = 'text-yellow-450 bg-yellow-500/10 border-yellow-500/20';
              else if (gymClass.intensity === 'High') intensityColor = 'text-red-400 bg-red-500/10 border-red-500/20';
              else if (gymClass.intensity === 'Elite') intensityColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';

              return (
                <motion.div
                  layout
                  key={gymClass.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition group"
                >
                  <div className="space-y-4">
                    {/* Top tags */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase bg-neutral-950 px-2.5 py-1 rounded-sm border border-neutral-800">
                        {gymClass.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-sm border ${intensityColor}`}>
                        {gymClass.intensity} Intensity
                      </span>
                    </div>

                    {/* Meta info */}
                    <div>
                      <h3 className="text-lg font-black italic uppercase tracking-tight text-white group-hover:text-orange-500 transition">{gymClass.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">{gymClass.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-neutral-800/60">
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <Clock className="w-3.5 h-3.5 text-orange-500" />
                        <span>{gymClass.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 justify-end">
                        <User className="w-3.5 h-3.5 text-orange-500" />
                        <span className="truncate">{gymClass.trainer.split(' ').slice(1).join(' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <div className="text-left font-mono">
                      <span className="text-[10px] text-neutral-500 uppercase block tracking-wider">Remaining capacity</span>
                      <span className="text-xs font-semibold text-orange-500">{gymClass.spots} spots remaining</span>
                    </div>

                    <button
                      onClick={() => setBookingClass(gymClass)}
                      className="bg-neutral-950 hover:bg-orange-600 hover:text-white hover:font-bold text-white border border-neutral-800 text-xs font-semibold px-4 py-2.5 rounded-sm flex items-center gap-1 max-sm:gap-2 active:scale-95 transition cursor-pointer"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

        {/* Interactive Booking Dialogue Modal Overlay */}
        <AnimatePresence>
          {bookingClass && (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-neutral-950 border border-neutral-900 w-full max-w-md p-6 sm:p-8 rounded-sm shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setBookingClass(null)}
                  className="absolute right-4 top-4 hover:bg-neutral-900 p-2 rounded-sm text-neutral-400 hover:text-white transition cursor-pointer font-bold"
                >
                  ✕
                </button>

                {/* Modal Title */}
                <div className="mb-6 flex items-start gap-2.5">
                  <div className="p-2.5 rounded-sm bg-orange-550/10 text-orange-500 shrink-0 border border-orange-500/20">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic uppercase tracking-tight text-white">Book Your Free Trial</h3>
                    <p className="text-xs text-neutral-400 font-mono">RS Fitness • Opposite CNT Liquor</p>
                  </div>
                </div>

                {/* Target Class Info Summary */}
                <div className="bg-neutral-900 p-4 rounded-sm border border-neutral-800 space-y-2 mb-6 text-sm">
                  <div className="flex justify-between items-center text-xs text-neutral-400 uppercase font-mono tracking-wider">
                    <span>Exercise Slot Selection</span>
                    <span className="text-orange-500 font-bold">{bookingClass.category}</span>
                  </div>
                  <div className="font-bold text-white uppercase tracking-tight italic text-base">{bookingClass.name}</div>
                  <div className="flex gap-4 text-xs text-neutral-300 font-mono">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-orange-500" /> {bookingClass.timeSlot}</span>
                    <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-orange-500" /> {bookingClass.trainer}</span>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Gowda"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      required
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Preferred Day</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTrialDay('Today')}
                        className={`py-2 px-3 rounded-sm text-xs font-bold uppercase tracking-wider ${trialDay === 'Today' ? 'bg-orange-600 text-white font-extrabold' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'}`}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => setTrialDay('Tomorrow')}
                        className={`py-2 px-3 rounded-sm text-xs font-bold uppercase tracking-wider ${trialDay === 'Tomorrow' ? 'bg-orange-600 text-white font-extrabold' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'}`}
                      >
                        Tomorrow
                      </button>
                    </div>
                  </div>

                  {/* Submit via WhatsApp */}
                  <button
                    type="submit"
                    className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-extrabold text-sm uppercase tracking-wide h-12 rounded-full flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
                  >
                    <span>🎯 Book via WhatsApp</span>
                  </button>
                  <p className="text-[10px] text-center text-neutral-500 leading-normal font-mono">
                    You will be redirected to chat on WhatsApp. Our admins will instantly register your contact on file.
                  </p>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

    </div>
  );
}
