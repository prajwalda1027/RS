import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Sparkles, Check, ArrowRight, Activity, Flame, Droplet, UserCheck } from 'lucide-react';
import { AssessmentResult } from '../types';
import { BUSINESS_INFO } from '../data';

export default function WorkoutCalculator() {
  const [age, setAge] = useState<string>('24');
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('172');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [activity, setActivity] = useState<string>('Active');
  const [goal, setGoal] = useState<'Weight Loss' | 'Strength & Muscle' | 'Zumba & Cardio' | 'Yoga & Flexibility'>('Strength & Muscle');
  
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    setTimeout(() => {
      const w = parseFloat(weight) || 70;
      const h = (parseFloat(height) || 172) / 100;
      const a = parseInt(age) || 24;
      
      // Calculate BMI
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let bmiCategory = '';
      if (bmi < 18.5) bmiCategory = 'Underweight';
      else if (bmi < 25) bmiCategory = 'Healthy Weight';
      else if (bmi < 30) bmiCategory = 'Overweight';
      else bmiCategory = 'Obese';

      // Base BMR estimate (Mifflin-St Jeor)
      let bmr = 0;
      if (gender === 'Male') {
        bmr = 10 * w + 6.25 * (h * 100) - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * (h * 100) - 5 * a - 161;
      }

      // Activity multiplier
      let multiplier = 1.2;
      if (activity === 'Light') multiplier = 1.375;
      else if (activity === 'Active') multiplier = 1.55;
      else if (activity === 'Athlete') multiplier = 1.725;

      const tdee = Math.round(bmr * multiplier);
      let targetCalories = tdee;

      // Adjust based on goal
      let workoutPlan: string[] = [];
      let dietAdvice: string[] = [];

      if (goal === 'Weight Loss') {
        targetCalories = Math.round(tdee - 450);
        workoutPlan = [
          "Mondays/Fridays: Weight Loss Cardio & Core HIIT class at 05:30 PM",
          "Tuesdays/Thursdays: Group Zumba sessions at 07:30 AM with Trainer Preeti",
          "Saturdays: Extended cardio + high endurance treadmill drills (30-40 mins)",
          "Sundays: Rest & active recovery walk around Hongasandra Begur area"
        ];
        dietAdvice = [
          `Target: Maintain ${targetCalories} kcal per day in a structural deficit.`,
          "Structure: Aim for 120g of high protein (lean chicken, paneer, sprouts) to save muscular integrity.",
          "Cut out simple sugars, soft drinks, and deep-fried carbs.",
          "Adopt 4 liters of clean hydration to flush metabolic waste."
        ];
      } else if (goal === 'Strength & Muscle') {
        targetCalories = Math.round(tdee + 250);
        workoutPlan = [
          "Mondays/Wednesdays/Fridays: Aesthetic Hypertrophy Heavy Lifting classes at 09:00 AM",
          "Tuesdays: CrossFit Conditioning morning session to optimize dynamic power",
          "Saturdays: Heavy Powerlifting squats/deadlifts under Coach Sharath Gowda",
          "Sunday: Fully passive spinal decompression and rest"
        ];
        dietAdvice = [
          `Target: Fuel muscle protein synthesis with ${targetCalories} kcal surplus.`,
          "Structure: Elevate proteins to 1.8g to 2g per kg of bodyweight.",
          "Include high-carbohydrate meals (brown rice, oats, sweet potatoes) 90 mins before heavy lifting.",
          "Incorporate 5g of quality monohydrate creatine with pre/post workouts."
        ];
      } else if (goal === 'Zumba & Cardio') {
        targetCalories = Math.round(tdee - 100);
        workoutPlan = [
          "3 Days a week: Dynamic Zumba Cardio Group sessions at 07:30 AM",
          "2 Days a week: Crossfit HIIT metabolic circuit at 06:00 AM",
          "1 Day a week: Decompress and recover with Power Yoga at 11:00 AM",
          "Maintain daily step count: Aim for 10,000 steps minimum outside active hours"
        ];
        dietAdvice = [
          `Target: Sustained athletic balance at ${targetCalories} kcal.`,
          "Focus on easy-to-digest complex carbs for sustained aerobic endurance.",
          "Drink mineral-rich water or electrolyte systems during high sweating cardio.",
          "Include generous servings of colorful antioxidants (berries, greens, cruciferous veggies)."
        ];
      } else { // Yoga & Flexibility
        targetCalories = Math.round(tdee);
        workoutPlan = [
          "3 Days a week: Power Yoga & Breathe Flow classes at 11:00 AM with Yogi Anand",
          "2 Days a week: Calisthenics bodyweight core routines & posture fixes",
          "1 Day a week: Total body passive stretching & foam rolling class at 06:45 PM",
          "Sundays: Active outdoor breathing, pranayama & meditation"
        ];
        dietAdvice = [
          `Target: Nutritious home-cooked balancing meals of approx ${targetCalories} kcal.`,
          "Integrate healthy micro-nutrients via leafy greens, dry fruits, and healthy seeds.",
          "Keep diet alkaline, high-potassium, low-sodium to reduce stiff joint inflammation.",
          "Prioritize high-quality sleep hygiene (7-8 hours) for structural nervous system repair."
        ];
      }

      // Recommended water
      const water = parseFloat(((w * 0.033) + 0.5).toFixed(1));

      setResult({
        bmi,
        bmiCategory,
        dailyCalories: targetCalories,
        recommendedWater: water,
        workoutPlan,
        dietAdvice
      });
      setIsCalculating(false);
    }, 1200);
  };

  const sendToWhatsApp = () => {
    if (!result) return;
    const text = `Hi RS Fitness! 🏋️‍♂️ I generated my customized physical assessment on your website. 
    
Metrics:
- Age: ${age} yrs
- Weight: ${weight} kg
- Height: ${height} cm
- Goal: ${goal}
- Calculated BMI: ${result.bmi} (${result.bmiCategory})
- Target Daily Intake: ${result.dailyCalories} kcal

I would like to book a *Free Personal Training Trial Session* at your Hongasandra Begur Road Gym. Please connect with me!`;
    
    const url = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noreferrer,noopener');
  };

  return (
    <div id="calculator" className="py-12 bg-neutral-900 border-y border-neutral-800 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute left-10 top-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-600/15 text-orange-500 text-xs font-mono font-bold uppercase tracking-wider mb-3 font-sans">
            <Activity className="w-3.5 h-3.5" />
            Cult Style Fitness Assessment
          </div>
          <h2 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase text-white font-sans">
            Assess Your Body <span className="text-orange-500 font-sans">Structure</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Don't guess your routines. Enter your physical stats below. Our algorithm simulates RS Fitness's signature coaching guidelines to draft your optimal caloric metrics and workout framework.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-5 bg-neutral-950 p-6 sm:p-8 rounded-xl border border-neutral-800 shadow-2xl relative">
            <h3 className="text-xl font-black italic uppercase tracking-tight text-white mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Physical Calculator
            </h3>

            <form onSubmit={calculateAssessment} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Age (years)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    min="10"
                    max="90"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white font-mono transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('Male')}
                      className={`py-3 rounded-sm font-bold text-xs uppercase tracking-wider transition cursor-pointer ${gender === 'Male' ? 'bg-orange-600 text-white font-extrabold' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'}`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Female')}
                      className={`py-3 rounded-sm font-bold text-xs uppercase tracking-wider transition cursor-pointer ${gender === 'Female' ? 'bg-orange-600 text-white font-extrabold' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'}`}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    min="30"
                    max="200"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white font-mono transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    min="100"
                    max="230"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white font-mono transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Daily Lifestyle Habits</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white transition cursor-pointer"
                >
                  <option value="Sedentary">Sedentary (Desk Job/Minimal Motion)</option>
                  <option value="Light">Light Motion (Daily walks/Moderate active)</option>
                  <option value="Active">Active Lifter (Gym 3-5 days/week)</option>
                  <option value="Athlete">Elite Athlete (Heavy conditioning twice daily)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Primary Fitness Goal</label>
                <select
                  value={goal}
                  onChange={(e: any) => setGoal(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white transition cursor-pointer"
                >
                  <option value="Strength & Muscle">Muscle Building & Deep Strength (Zumba & Weights)</option>
                  <option value="Weight Loss">Fat Oxidation & Core Weight Loss</option>
                  <option value="Zumba & Cardio">Aerobic Stamina & Vibrant Fitness Dance</option>
                  <option value="Yoga & Flexibility">Joint Longevity, Spinal Alignment & Power Yoga</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full mt-2 bg-orange-600 hover:bg-orange-550 transition text-white font-extrabold text-sm uppercase tracking-wide h-12 rounded-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isCalculating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Running Bio-Assessment...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Structured Assessment</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[420px] bg-neutral-950/40 rounded-xl border border-neutral-800 border-dashed p-8 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-850 text-orange-500 mb-4">
                    <Activity className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4 className="text-lg font-black italic uppercase text-white mb-2">Ready for Assessment</h4>
                  <p className="max-w-md text-sm text-neutral-400">
                    Input your physiological metrics on the left, and view computed dynamic BMI, caloric formulas, and fully structured workouts instantly.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-neutral-950 p-6 sm:p-8 rounded-xl border border-neutral-800 shadow-2xl space-y-6"
                >
                  {/* Top Stats Bar */}
                  <div className="grid grid-cols-3 gap-4 pb-6 border-b border-neutral-800/60">
                    <div className="text-center p-3 rounded-lg bg-neutral-900 flex flex-col justify-center border border-neutral-850">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-1">Your BMI</span>
                      <span className="text-2xl sm:text-3xl font-black italic text-orange-500 block">{result.bmi}</span>
                      <span className={`text-[9px] font-bold mt-1 inline-block uppercase tracking-widest font-mono ${
                        result.bmiCategory === 'Healthy Weight' ? 'text-green-400' : 'text-amber-500'
                      }`}>
                        {result.bmiCategory}
                      </span>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-neutral-900 flex flex-col justify-center border border-neutral-850">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-1">Target Calories</span>
                      <span className="text-2xl sm:text-3xl font-black italic text-orange-500 block flex items-center justify-center gap-1">
                        {result.dailyCalories}
                        <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                      </span>
                      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-mono mt-1">
                        kcal / day
                      </span>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-neutral-900 flex flex-col justify-center border border-neutral-850">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-1">Daily Hydration</span>
                      <span className="text-2xl sm:text-3xl font-black italic text-orange-500 block flex items-center justify-center gap-1">
                        {result.recommendedWater}
                        <Droplet className="w-5 h-5 text-orange-500" />
                      </span>
                      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-mono mt-1">
                        Liters / day
                      </span>
                    </div>
                  </div>

                  {/* Program and Diet Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Workout column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2 font-mono">
                        <span className="w-1.5 h-3.5 bg-orange-600 rounded-sm"></span>
                        Custom Workout Layout
                      </h4>
                      <ul className="space-y-2.5">
                        {result.workoutPlan.map((plan, i) => (
                          <li key={i} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5 bg-neutral-900 p-3 rounded-sm border border-neutral-800">
                            <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{plan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Diet column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2 font-mono">
                        <span className="w-1.5 h-3.5 bg-orange-500 rounded-sm"></span>
                        Customized Nutrition Formula
                      </h4>
                      <ul className="space-y-2.5">
                        {result.dietAdvice.map((diet, i) => (
                          <li key={i} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5 bg-neutral-900 p-3 rounded-sm border border-neutral-800">
                            <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{diet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-neutral-400 font-medium">Want to run this protocol under certified supervision?</p>
                      <span className="text-[10px] font-mono font-bold text-orange-500 tracking-wider">LOCATED OPPOSITE CNT LIQUOR, HONGASANDRA</span>
                    </div>

                    <button
                      onClick={sendToWhatsApp}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-550 text-white font-extrabold text-xs uppercase tracking-wider px-6 h-12 rounded-full flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>📲 Book Free Trial with Assessment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
