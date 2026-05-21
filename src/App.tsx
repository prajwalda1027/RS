import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Phone, Instagram, MapPin, Clock, Star, 
  ArrowUpRight, Award, Trophy, Dumbbell, ShieldCheck, 
  Sparkles, HelpCircle, Navigation, ChevronDown, Check,
  Activity, Zap, Compass, Flame, Users
} from 'lucide-react';

import { BUSINESS_INFO, WEEKLY_HOURS, IMAGES } from './data';
import WorkoutCalculator from './components/WorkoutCalculator';
import ClassSchedules from './components/ClassSchedules';
import ReviewSection from './components/ReviewSection';
import BlogSection from './components/BlogSection';

// Custom Reusable Logo Component Recreating the Gym's circular Logo in pure SVG
function GymLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Circle Ring */}
      <circle cx="100" cy="100" r="92" stroke="#ffffff" strokeWidth="3" />
      
      {/* Inner Active Green Ring */}
      <circle cx="100" cy="100" r="82" stroke="#ea580c" strokeWidth="6" strokeDasharray="30 10 20 10" />
      
      {/* Barbell passing behind */}
      <path d="M 24 100 L 176 100" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      {/* Barbell Weights Left */}
      <rect x="24" y="84" width="8" height="32" rx="2" fill="#ffffff" />
      <rect x="14" y="80" width="8" height="40" rx="3" fill="#ffffff" />
      <rect x="4" y="86" width="8" height="28" rx="2" fill="#ffffff" />
      {/* Barbell Weights Right */}
      <rect x="168" y="84" width="8" height="32" rx="2" fill="#ffffff" />
      <rect x="178" y="80" width="8" height="40" rx="3" fill="#ffffff" />
      <rect x="188" y="86" width="8" height="28" rx="2" fill="#ffffff" />

      {/* Center Black Circle masking */}
      <circle cx="100" cy="100" r="58" fill="#000000" stroke="#ea580c" strokeWidth="2" />

      {/* Center Stylized "RS" Text */}
      <text x="100" y="112" fill="#ffffff" fontSize="42" fontWeight="900" fontFamily='"Space Grotesk", sans-serif' textAnchor="middle" letterSpacing="-2">
        RS
      </text>

      {/* Top Text Arc (Simulated via helper elements) */}
      <path id="textPathTop" d="M 40 100 A 60 60 0 0 1 160 100" fill="none" />
      <text fill="#ffffff" fontSize="10.5" fontWeight="800" fontFamily="monospace" letterSpacing="5" wordSpacing="1">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          REPS & SETS
        </textPath>
      </text>

      {/* Bottom Text Arc */}
      <path id="textPathBottom" d="M 160 100 A 60 60 0 0 1 40 100" fill="none" />
      <text fill="#ea580c" fontSize="11" fontWeight="800" fontFamily="monospace" letterSpacing="4">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          RS FITNESS
        </textPath>
      </text>
    </svg>
  );
}

export default function App() {
  const [gymStatus, setGymStatus] = useState<{ isOpen: boolean; text: string }>({ isOpen: false, text: "Computing status..." });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Compute Indian Standard Time Gym Open Status actively
  useEffect(() => {
    function calculateGymStatus() {
      const now = new Date();
      // Get IST epoch using minutes offset
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utcTime + (3600000 * 5.5)); // IST is UTC+5.30
      
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const day = istDate.getDay(); // Sunday = 0, Mon = 1, etc

      // Sunday Timings: 6:00 AM - 10:00 PM
      if (day === 0) {
        if (hours >= 6 && hours < 22) {
          setGymStatus({ isOpen: true, text: `Open Today • Closes 10:00 PM` });
        } else {
          setGymStatus({ isOpen: false, text: `Closed • Opens Sunday 6:00 AM` });
        }
      } else {
        // Monday-Saturday Timings: 5:00 AM - 11:00 PM
        if (hours >= 5 && hours < 23) {
          setGymStatus({ isOpen: true, text: `Open Today • Closes 11:00 PM` });
        } else {
          setGymStatus({ isOpen: false, text: `Closed • Opens Tomorrow 5:00 AM` });
        }
      }
    }

    calculateGymStatus();
    const interval = setInterval(calculateGymStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const triggerCall = () => {
    window.open(`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`, '_self');
  };

  const openInstagram = () => {
    window.open(BUSINESS_INFO.instagram, '_blank', 'noopener,noreferrer');
  };

  const navLinks = [
    { text: "Dynamic Programs", href: "#facilities" },
    { text: "Daily Workouts", href: "#classes" },
    { text: "Free Assessment", href: "#calculator" },
    { text: "Athletes Reviews", href: "#reviews" },
    { text: "Fitness tips", href: "#blog" },
    { text: "Gym Location", href: "#location" }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans antialiased overflow-x-hidden selection:bg-orange-600 selection:text-white">

      {/* HEADER / NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Slug */}
            <a href="#home" className="flex items-center gap-3 group">
              <GymLogo className="w-11 h-11 group-hover:rotate-12 transition duration-300" />
              <div className="font-sans flex items-center gap-3">
                <div>
                  <span className="text-xl font-black tracking-tighter text-white block italic leading-none">
                    RS <span className="text-orange-500">FITNESS</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase block mt-1 leading-none">
                    REPS & SETS
                  </span>
                </div>
                <div className="bg-orange-600 px-2.5 py-1 text-[10px] font-bold rounded-sm uppercase tracking-wider">EST. 06.2024</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="text-sm font-semibold text-neutral-400 hover:text-white transition tracking-wide"
                >
                  {link.text}
                </a>
              ))}
            </div>

            {/* Action Group */}
            <div className="hidden sm:flex items-center gap-6">
              {/* Google Reviews rating summarizer */}
              <div className="hidden xl:flex flex-col items-end leading-none">
                <span className="text-orange-500 font-black text-lg">4.9/5.0</span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold mt-0.5">209 Google Reviews</span>
              </div>

              {/* Gym Live status badge */}
              <div className="flex items-center gap-2 bg-neutral-950 px-3.5 py-1.5 rounded-full border border-neutral-800">
                <span className={`w-2 h-2 rounded-full ${gymStatus.isOpen ? 'bg-orange-500 animate-pulse' : 'bg-red-500'}`}></span>
                <span className="text-[10px] font-mono text-neutral-300 font-semibold uppercase tracking-wider whitespace-nowrap">
                  {gymStatus.text}
                </span>
              </div>

              <a
                href="#classes"
                className="bg-green-600 hover:bg-green-500 text-white font-extrabold text-xs uppercase tracking-wide px-6 py-3 rounded-full flex items-center gap-1.5 transition active:scale-95"
              >
                BOOK WORKOUT
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu expansion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black border-b border-neutral-900 overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base font-semibold text-neutral-300 hover:bg-neutral-900 rounded-xl"
                  >
                    {link.text}
                  </a>
                ))}
                
                <div className="pt-4 border-t border-neutral-900/60 flex flex-col gap-3">
                  <div className="flex items-center gap-2 justify-center py-2 text-xs font-mono text-neutral-400">
                    <span className={`w-2.5 h-2.5 rounded-full ${gymStatus.isOpen ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                    {gymStatus.text}
                  </div>
                  
                  <a
                    href="#classes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-full bg-green-600 text-white font-extrabold text-sm uppercase tracking-wider hover:bg-green-500 transition-colors"
                  >
                    BOOK WORKOUT
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION - SLEEK & CINEMATIC SPLIT */}
      <section id="home" className="relative pt-32 pb-20 sm:pb-28 lg:pt-40 lg:pb-36 bg-neutral-950 overflow-hidden select-none border-b border-neutral-800">
        {/* Background Light Leaks */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute left-10 bottom-0 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Texts */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              {/* Review Badge */}
              <div className="inline-flex items-center gap-2 bg-neutral-900/80 border border-neutral-800 p-1.5 pr-4 rounded-sm">
                <div className="bg-orange-600 text-white text-[11px] font-black px-3 py-1 rounded-sm uppercase font-sans italic">
                  ★ {BUSINESS_INFO.rating} Rating
                </div>
                <span className="text-xs text-neutral-300 font-bold">
                  ({BUSINESS_INFO.reviewCount} Reviews)
                </span>
                <span className="hidden sm:inline text-neutral-700">•</span>
                <span className="hidden sm:inline text-xs text-orange-500 font-mono uppercase tracking-wider font-semibold">Opp. CNT Liquor, Hongasandra</span>
              </div>

              {/* Mega Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tighter leading-none text-white uppercase font-sans">
                REDEFINE<br />
                <span className="text-orange-500">
                  STRENGTH
                </span>
              </h1>

              {/* Subheading excerpt */}
              <p className="max-w-xl mx-auto lg:mx-0 text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
                Experience Bengaluru's premium athletic ecosystem. Fully stocked with highly advanced machinery, customized structural body assessments, motivating trainers, and group high-intensity Zumba & Power Yoga streams. Inspired by the best, built for your progression.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#classes"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-green-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-green-500 shadow-xl shadow-green-600/15 transition flex items-center justify-center gap-2"
                >
                  <span>BOOK WORKOUT</span>
                  <Zap className="w-4 h-4 text-white fill-current" />
                </a>

                <a
                  href="#calculator"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 text-neutral-300 font-bold text-sm uppercase tracking-wider hover:text-white border border-neutral-800 hover:bg-neutral-805 transition flex items-center justify-center gap-2"
                >
                  <span>Analyze Your Body Metric</span>
                </a>
              </div>

              {/* Mini Features Checklist */}
              <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0 border-t border-neutral-800">
                <div className="text-center lg:text-left">
                  <span className="text-xs font-bold uppercase text-neutral-500 block leading-none">Daily Schedule</span>
                  <span className="text-base sm:text-lg font-mono tracking-tighter text-white block mt-1.5">05:00 — 23:00</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="text-xs font-bold uppercase text-neutral-500 block leading-none">Location</span>
                  <span className="text-base sm:text-lg tracking-tighter text-orange-500 block mt-1.5">HSR Layout, BLR</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="text-xs font-bold uppercase text-neutral-500 block leading-none">Coaches</span>
                  <span className="text-base sm:text-lg tracking-tighter text-white block mt-1.5">100% Certified</span>
                </div>
              </div>

            </div>

            {/* Cinematic Hero Image Frame Mockup */}
            <div className="lg:col-span-5 relative">
              
              {/* Backglow ring */}
              <div className="absolute inset-0 bg-orange-600/10 blur-[60px] rounded-3xl"></div>

              {/* Main Image Frame container */}
              <div className="relative bg-neutral-950 border border-neutral-800 p-3 sm:p-4 rounded-3xl shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-square">
                <img
                  src={IMAGES.hero}
                  alt="RS Fitness premium interior"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition mix-blend-luminosity"
                />
                
                {/* Embedded Floating Metrics Widget */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/95 backdrop-blur-md p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shadow-inner">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 font-mono block uppercase">EQUIPMENT LIMIT</span>
                      <span className="text-xs sm:text-sm text-white font-bold">Premium Heavy Weights & Plates</span>
                    </div>
                  </div>
                  <Check className="w-5 h-5 text-orange-500" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FACILITIES BENTO GRID */}
      <section id="facilities" className="py-24 bg-neutral-950 border-t border-neutral-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-600/15 text-orange-500 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5" />
              Unmatched Specializations
            </div>
            <h2 className="text-3xl sm:text-4xl font-black italic text-white tracking-tighter uppercase font-sans">
              A Complete <span className="text-orange-500">Fitness Ecosystem</span>
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base leading-relaxed">
              Explore specialized workout structures customized for your individual body targets. Certified personal coaches oversee every zone.
            </p>
          </div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Box 1: Zumba classes (Large horizontal box) */}
            <div className="md:col-span-8 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden group hover:border-neutral-700 transition flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-orange-500 uppercase bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-sm">
                      Zumba Dance Classes
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white mt-4 tracking-tighter">
                      Vibrant cardio salsa party
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
                      Ditch the boring elliptical sessions! Our high-tempo Zumba sessions combine Latin dance elements with heavy active fat loss intervals, guaranteeing explosive calorie burns in an extremely lively, supportive studio.
                    </p>
                  </div>
                  <a href="#classes" className="text-xs font-bold text-orange-500 flex items-center gap-1 hover:text-white transition uppercase tracking-wider">
                    Explore Zumba Timings <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="aspect-[4/3] sm:aspect-auto h-full min-h-[220px] relative overflow-hidden bg-neutral-950">
                  <img
                    src={IMAGES.zumba}
                    alt="RS Fitness Zumba studio"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Box 2: Power Yoga (Small vertical box) */}
            <div className="md:col-span-4 bg-neutral-900 rounded-2xl border border-neutral-805 overflow-hidden group hover:border-neutral-700 transition flex flex-col justify-between">
              <div className="aspect-[16/10] relative overflow-hidden bg-neutral-950">
                <img
                  src={IMAGES.yoga}
                  alt="Power Yoga session"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 mix-blend-luminosity"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-sm">
                    Power Yoga classes
                  </span>
                  <h3 className="text-lg font-black italic uppercase text-white mt-3 leading-tight">Athletic balance & stability</h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Improve flexibility, core activation, and release nervous system tension under Yogi Anand Dev. Excellent for overall skeletal posture.
                  </p>
                </div>
                <a href="#classes" className="text-xs font-bold text-neutral-300 flex items-center gap-1 hover:text-orange-500 transition pt-2 uppercase tracking-wider">
                  View Yoga times <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Box 3: Weight Loss Centre (Small vertical box) */}
            <div className="md:col-span-4 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden group hover:border-neutral-700 transition flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <span className="text-[10px] font-mono font-bold tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/10 px-2.5 py-1 rounded-sm">
                  Weight Loss Centers
                </span>
                <h3 className="text-lg font-black italic uppercase text-white mt-3">Targeted scale reduction</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Join our result-focused weight loss consultants. We audit your biological maintenance calories and build highly cohesive target workouts.
                </p>
                <div className="space-y-1.5 pt-2 text-xs font-mono text-neutral-400">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-500" /> TDEE Macro assessments</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-500" /> High intensity core fat reduction</div>
                </div>
              </div>
              <div className="p-6 bg-neutral-950/40 border-t border-neutral-850 text-center">
                <a href="#calculator" className="text-xs font-bold text-white hover:text-orange-500 transition inline-flex items-center gap-1 uppercase tracking-wider">
                  Run Deficit Calculator <ArrowUpRight className="w-4 h-4 text-orange-500" />
                </a>
              </div>
            </div>

            {/* Box 4: CrossFit & Strength (Large horizontal box) */}
            <div className="md:col-span-8 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden group hover:border-neutral-700 transition flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                <div className="aspect-[4/3] sm:aspect-auto h-full min-h-[220px] relative overflow-hidden bg-neutral-950 order-last sm:order-first">
                  <img
                    src={IMAGES.strength}
                    alt="RS Fitness dumbbells plates weights"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 mix-blend-luminosity"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-rose-500 uppercase bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-sm">
                      Powerlifting & CrossFit Gym
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white mt-4 tracking-tighter">
                      Heavy metal mechanics
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
                      Equipped with high-end barbell setups, structural cages, bumper plates, and cast irons. Built to support heavy compound lifters, deadlifters, and explosive athletic power.
                    </p>
                  </div>
                  <a href="#classes" className="text-xs font-bold text-orange-500 flex items-center gap-1 hover:text-white transition uppercase tracking-wider">
                    Book heavy barbell slot <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RENDER INJECTED MODULAR SECTIONS */}
      <ClassSchedules />
      <WorkoutCalculator />
      <ReviewSection />
      <BlogSection />

      {/* FAQ INTERACTIVE ACCORDION */}
      <section className="py-20 bg-neutral-950 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black italic text-white uppercase tracking-tighter">
              Have <span className="text-orange-500">Questions?</span> We have answers.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Frequently asked statements about RS Fitness, located opposite CNT Liquor in Hongasandra.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do I locate RS Fitness in Hongasandra, Bengaluru?",
                a: "Our gym is incredibly easy to locate! We are situated right on Begur Main Road, Opposite CNT Liquor, in Hongasandra, Bengaluru (560114). Key transit routes make commuting here straightforward."
              },
              {
                q: "Is this gym open till midnight or very early mornings?",
                a: "Yes! We operate from 5:00 AM to 11:00 PM from Mondays to Saturdays, offering ultimate flexibility for late night or early morning training. On Sundays, we are open from 6:00 AM to 10:00 PM."
              },
              {
                q: "Will I get a customized diet plan aligned with my specific workout goals?",
                a: "Absolutely! Certified personal coaches and consultants at the gym evaluate your body metrics, skeletal guidelines, lifestyle active habits, and primary goals to draft a tailored macro layout."
              },
              {
                q: "What is the best age to join RS Fitness Begur Road?",
                a: "Our body undergoes massive muscular transformations up to the late-teen era. Generally, around 17 or 18 years, the skeletal system becomes ready for powerlifting routines. However, younger kids can do calisthenics or cardio under supervision."
              },
              {
                q: "Are Zumba and power yoga classes included, or separate?",
                a: "We support crossfit, power yoga, and Zumba packages with full integration permissions. Please connect with our team on WhatsApp to understand the pricing metrics of combined plans!"
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-orange-500 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-orange-500' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-neutral-800 bg-neutral-950/40"
                    >
                      <p className="p-5 sm:p-6 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans select-text">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & FOOTER WITH INTERACTIVE OPEN MAPS */}
      <section id="location" className="py-20 bg-neutral-950 border-t border-neutral-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Direct Details Card */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-2 text-orange-500 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping font-semibold"></span>
                  Official Location & Reach
                </div>
                <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
                  Find RS <span className="text-orange-500">FITNESS</span>
                </h2>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed font-sans">
                  We occupy a prominent location in Hongasandra Begur Road, Bengaluru, Opposite CNT liquor. Easily reachable with massive street parking. Same premium hardware as commercial gym systems.
                </p>
              </div>

              {/* Specific Listing Info */}
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 items-start">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs text-neutral-500 uppercase font-mono tracking-wider font-bold">Physical Address</h4>
                    <span className="text-sm text-neutral-100 font-semibold block mt-1">
                      {BUSINESS_INFO.address}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 items-start">
                  <Clock className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs text-neutral-500 uppercase font-mono tracking-wider font-bold">Active Slots (Hours)</h4>
                    <div className="mt-2 text-xs text-neutral-400 space-y-1">
                      {WEEKLY_HOURS.map((h, i) => (
                        <div key={i} className="flex justify-between font-mono gap-4 py-0.5 border-b border-neutral-800/40">
                          <span className="text-neutral-300 font-bold">{h.day}</span>
                          <span className="text-neutral-400 text-right">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi Contact CTA */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={triggerCall}
                  className="px-6 py-3.5 bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 text-xs sm:text-sm font-bold flex items-center gap-2 hover:text-white transition cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>Call: {BUSINESS_INFO.phone}</span>
                </button>

                <button
                  onClick={openInstagram}
                  className="px-6 py-3.5 bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 text-xs sm:text-sm font-bold flex items-center gap-2 hover:text-white transition cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-rose-500" />
                  <span>Instagram</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20RS%20Fitness%21%20I%20am%20enquiring%20about%20gym%20memberships%20from%20your%20website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-green-600 hover:bg-green-500 rounded-full text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Embedded maps Iframe Card */}
            <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 p-2 sm:p-4 rounded-3xl h-[400px] w-full relative">
              <iframe
                title="RS Fitness Hongasandra Maps Location"
                src={BUSINESS_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl grayscale invert h-full hover:grayscale-0 transition duration-500"
              />
              <div className="absolute top-6 right-6 bg-black/90 p-3 rounded-xl border border-neutral-800 flex items-center gap-2 text-xs font-mono">
                <Navigation className="w-4 h-4 text-orange-500" />
                <span className="text-white">Opposite CNT Liquor</span>
              </div>
            </div>

          </div>

          {/* Subfooter and Copy Disclaimer */}
          <div className="pt-16 mt-16 border-t border-neutral-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <div>
              <p>© {new Date().getFullYear()} RS FITNESS. All rights reserved.</p>
              <p className="mt-1 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
                begur Road Branch opposite cnt liquor, bangalore, india
              </p>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-neutral-400 transition cursor-help font-mono text-[10px]">
                Holiday timings (Eid al-Adha etc) might differ from listed metrics
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Ticker */}
      <footer className="bg-orange-600 text-white py-2.5 whitespace-nowrap overflow-hidden border-t border-orange-500 select-none">
        <div className="flex gap-12 font-black text-xs uppercase animate-marquee">
          <span>Personal Trainers</span> • <span>Weight Loss Centres</span> • <span>Zumba Classes</span> • <span>Modern Equipment</span> • <span>Diet Plans</span> • <span>Elite Powerlifting</span> • <span>Cardio salsa party</span> • <span>Yogi Stretch flows</span> • <span>Certified Coaches</span>
          <span>Personal Trainers</span> • <span>Weight Loss Centres</span> • <span>Zumba Classes</span> • <span>Modern Equipment</span> • <span>Diet Plans</span> • <span>Elite Powerlifting</span> • <span>Cardio salsa party</span> • <span>Yogi Stretch flows</span> • <span>Certified Coaches</span>
        </div>
      </footer>

    </div>
  );
}
