import { GymClass, Review, FAQ, BlogPost } from './types';

export const BUSINESS_INFO = {
  name: "RS FITNESS",
  rating: 4.9,
  reviewCount: 209,
  category: "Premium Gym & Fitness Center",
  established: "06-2024",
  phone: "073490 89859",
  whatsapp: "+917349089859",
  instagram: "https://www.instagram.com/rs_fitness_official/?hl=en",
  address: "Begur Main Road, Opposite to CNT Liquor, Hongasandra, Bengaluru, Karnataka 560114",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.3496357564756!2d77.6253683!3d12.8852331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae153eedf9ffbf%3A0xe6bf44bc465cbe5b!2sRS%20FITNESS!5e0!3m2!1sen!2sin!4v1716300000000!5m2!1sen!2sin",
  amenities: [
    "Wide Variety of Modern Equipment",
    "Certified Personal Trainers",
    "Zumba Dance Classes",
    "Power Yoga Sessions",
    "Functional CrossFit Arena",
    "Tailored Weight Loss Programs",
    "Personalized Diet & Nutrition Plans",
    "Showers & Dynamic Change Rooms",
    "Full AC Ventilation & Audio Experience"
  ]
};

export const WEEKLY_HOURS = [
  { day: "Monday", time: "5:00 AM – 11:00 PM" },
  { day: "Tuesday", time: "5:00 AM – 11:00 PM (Eid Al-Adha Hours May Vary)" },
  { day: "Wednesday", time: "5:00 AM – 11:00 PM (Eid Al-Adha Hours May Vary)" },
  { day: "Thursday", time: "5:00 AM – 11:00 PM" },
  { day: "Friday", time: "5:00 AM – 11:00 PM" },
  { day: "Saturday", time: "5:00 AM – 11:00 PM" },
  { day: "Sunday", time: "6:00 AM – 10:00 PM" }
];

export const IMAGES = {
  hero: "/src/assets/images/gym_hero_1779360822503.png",
  zumba: "/src/assets/images/gym_zumba_1779360841562.png",
  yoga: "/src/assets/images/gym_yoga_1779360858210.png",
  strength: "/src/assets/images/gym_strength_1779360877809.png",
  trainer: "/src/assets/images/gym_trainer_1779360900180.png"
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Prasanna Kumar",
    rating: 5,
    date: "1 month ago",
    text: "Infrastructure, surroundings, weights, plates, and trainers are pretty good. This gym features a wide variety of modern, well-maintained equipment and offers structured workout and diet plans.",
    source: "Google Reviews"
  },
  {
    id: "r2",
    author: "Neha Sharma",
    rating: 5,
    date: "2 weeks ago",
    text: "The library of machines is unbelievable! The staff is highly professional, and the overall vibe is very positive and motivating. Perfectly suitable for both beginners and advanced athletes.",
    source: "Google Reviews"
  },
  {
    id: "r3",
    author: "Ananth R.",
    rating: 5,
    date: "3 weeks ago",
    text: "The atmosphere is amazing🤩 great place to work on your fitness goals!💪🏻 Best personal gym trainers for men in Hongasandra Begur Road limit.",
    source: "Google Reviews"
  },
  {
    id: "r4",
    author: "Preeti Patil",
    rating: 5,
    date: "2 months ago",
    text: "Excellent Zumba and power yoga classes. The trainers pay attention to details and provide extremely friendly and motivating personalized attention to every member.",
    source: "Google Reviews"
  },
  {
    id: "r5",
    author: "Vikram Sengupta",
    rating: 4,
    date: "1 month ago",
    text: "Amazing machinery and clean surroundings. The space opposite CNT liquor has easy accessibility, abundant street parking, and highly competent weight loss consultants.",
    source: "Google Reviews"
  }
];

export const FAQS: FAQ[] = [
  {
    question: "How do I locate RS Fitness in Hongasandra, Bengaluru?",
    answer: "Our gym is incredibly easy to locate! We are situated right on Begur Main Road, directly Opposite to CNT Liquor in Hongasandra. Excellent transit modes and landmarks help you locate us effortlessly on the first visit."
  },
  {
    question: "Is this gym open till midnight or very early mornings?",
    answer: "Yes, we support dual-cycle active professionals! We open at 5:00 AM in the morning and remain open until 11:00 PM from Monday to Saturday. On Sundays, we operate from 6:00 AM to 10:00 PM, giving you maximum flexibility to work out whenever fits your lifestyle."
  },
  {
    question: "Will I get a customized diet plan aligned with my specific workout goals?",
    answer: "Absolutely! We do not believe in one-size-fits-all strategies. Our skilled fitness coaches and weight loss consultants evaluate your current health parameters and physical metrics to draft customized daily macro targets and a nutrition plan that directly augments your lifting or weight loss routine."
  },
  {
    question: "What kind of fitness regimens and classes are supported?",
    answer: "We offer an expansive set of classes: classic Power Weightlifting, High-Intensity Crossfit training, interactive Zumba Dance sessions, athletic Power Yoga classes, and scientific Weight Loss regimens. Every workout format is supervised by professional trainers."
  },
  {
    question: "What is the best age to join RS Fitness Begur Road?",
    answer: "As teenage bodies continue to grow very rapidly, the body generally becomes ready for high-intensity lifting regimens around 17 to 18 years. However, our certified trainers can craft specialized functional weightless training or cardio-based programs for adolescent athletes under professional supervision."
  }
];

export const GYM_CLASSES: GymClass[] = [
  {
    id: "c1",
    name: "Morning Blast CrossFit",
    category: "crossfit",
    trainer: "Coach Rajesh Gowda",
    duration: "60 mins",
    spots: 12,
    timeSlot: "06:00 AM - 07:00 AM",
    intensity: "High",
    description: "High-intensity metabolic conditioning combining Olympic lifting, plyometrics, and calisthenics. Maximize calorie burn."
  },
  {
    id: "c2",
    name: "Vibrant Zumba Dance",
    category: "zumba",
    trainer: "ZES Preeti Patil",
    duration: "45 mins",
    spots: 25,
    timeSlot: "07:30 AM - 08:15 AM",
    intensity: "Medium",
    description: "Ditch the workout and join the party! Ultimate cardio dance session combining Latin beats with body sculpting intervals."
  },
  {
    id: "c3",
    name: "Aesthetic Hypertrophy Lifting",
    category: "strength",
    trainer: "Coach Sharath Kumar",
    duration: "75 mins",
    spots: 15,
    timeSlot: "09:00 AM - 10:15 AM",
    intensity: "High",
    description: "Structured progressive overload focused on muscle builder groups, biomechanics, and correct plate mechanics."
  },
  {
    id: "c4",
    name: "Power Yoga & Breathe Flow",
    category: "yoga",
    trainer: "Yogi Anand Dev",
    duration: "60 mins",
    spots: 20,
    timeSlot: "11:00 AM - 12:00 PM",
    intensity: "Medium",
    description: "Athletic yoga poses aimed at boosting core strength, deep flexibility, spinal alignment, and high mental concentration."
  },
  {
    id: "c5",
    name: "Weight Loss Cardio & Core HIIT",
    category: "cardio",
    trainer: "Coach Rajesh Gowda",
    duration: "50 mins",
    spots: 18,
    timeSlot: "05:30 PM - 06:20 PM",
    intensity: "High",
    description: "Scientific fat-burning system focusing on sustained elevated heart rate, core conditioning, and active fat oxidation."
  },
  {
    id: "c6",
    name: "Stretching & Yoga Recovery",
    category: "yoga",
    trainer: "Yogi Anand Dev",
    duration: "45 mins",
    spots: 22,
    timeSlot: "06:45 PM - 07:30 PM",
    intensity: "Beginner",
    description: "Decompress tight muscles and lower cortisol. Highly recommended for daily weightlifters to prevent injuries."
  },
  {
    id: "c7",
    name: "Night Owls Heavy Iron",
    category: "strength",
    trainer: "Coach Sharath Kumar",
    duration: "60 mins",
    spots: 10,
    timeSlot: "08:30 PM - 09:30 PM",
    intensity: "Elite",
    description: "Advanced strength workshop targeting squats, bench press, deadlift variations, and high muscular exertion."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "5 Essential Rules for Progressive Overload in Strength Training",
    excerpt: "Learn how to systematically add weights, repetitions, and sets safely to break muscle platueas and achieve sustainable natural hypertrophy.",
    category: "Strength Training",
    readTime: "5 min read",
    date: "May 18, 2026",
    image: "/src/assets/images/gym_strength_1779360877809.png",
    author: "Coach Sharath Kumar",
    authorTitle: "Head Strength Coach, RS Fitness",
    content: `Strength training is more than just moving weights from point A to point B. To build genuine natural muscle and gain robust biomechanical strength, the single most important scientific principle you must adopt is **Progressive Overload**.

### What is Progressive Overload?
Progressive overload is the gradual increase of stress placed upon your body during exercise over time. When your muscles lift a certain weight, they adapt, repair, and grow stronger. If you continue lifting the same weight for the exact same amount of repetitions month-after-month, your muscles will have no biological reason to adapt further or grow.

Here are the 5 foundational rules enforced daily at RS FITNESS to make your workouts highly effective:

1. **Increase the Load (The Obvious Way):** Systematically stack another 2.5 kg or 5 kg onto the barbell once you consistently hit all reps for your targets. Always write down your numbers so you never guess!
2. **Increase the Reps (Volume Expansion):** If you are doing Squats with 80 kg for 3 sets of 8, try hitting 3 sets of 10 next time before increasing the resistance.
3. **Enhance Lift Quality & Tempo:** Control the eccentric (lowering) phase. A 3-second descent with a 60 kg squad will stimulate far more muscle tissue than a bouncy, fast 80 kg squad with bad form.
4. **Reduce Rest Intervals:** Keep rest tight (e.g., from 90 seconds to 60 seconds) to elevate biological fatigue and boost aerobic endurance.
5. **Add More Sets (Weekly Volume):** Move from 3 sets of an exercise to 4 sets, slowly advancing to accumulate 12-20 hard sets per muscle group weekly.

**Warning:** Always prioritize perfect skeletal alignment over ego lifting! If your joints scream, ask our certified personal trainers at Hongasandra for an assessment of your form.`
  },
  {
    id: "b2",
    title: "The Science of Fat Loss: Caloric Deficits and Metabolic Conditioning",
    excerpt: "Ditch the scam detox teas. Discover the basic mathematical formula of metabolic conditioning, resistance training, and nutritional science.",
    category: "Weight Loss",
    readTime: "7 min read",
    date: "May 14, 2026",
    image: "/src/assets/images/gym_trainer_1779360900180.png",
    author: "Coach Rajesh Gowda",
    authorTitle: "Senior Fitness Consultant, RS Fitness",
    content: `When it comes to fat loss, there is no magic card. The fitness industry is full of misleading products, but the laws of thermodynamics are unbreakable. If you want to burn fat sustainably and build a toned, athletic aesthetic, you need to understand how calorie deficits interact with metabolic conditioning.

### 1. Caloric Deficit is the Core Engine
To lose weight, you must put your body in a negative energy balance (consume fewer calories than your Total Daily Energy Expenditure or TDEE). Our trainers calculate this TDEE using the Mifflin-St Jeor formula, combining your Basal Metabolic Rate with active daily lifestyle factors.
* A calorie deficit of 300 to 500 calories under your maintenance level is the optimal sweet spot to oxidize body fat while fully retaining solid skeletal muscle.

### 2. High-Density Metabolic Conditioning (HIIT)
While general steady-state jogging burns immediate active calories, High-Intensity Interval Training (HIIT) triggers a biological status called **EPOC (Excess Post-exercise Oxygen Consumption)**. 
* This means your body keeps burning fat and consuming oxygen at a significantly elevated rate for up to 24-36 hours *after* you have left our gym floor.

### 3. Maintain Heavy Resistance Training
One huge mistake beginners make is switching exclusively to light pink dumbbells and 2-hour cardio sessions. Doing this signals the body that muscle tissue is an expensive luxury, causing muscle wasting. By maintaining heavy lifts, you force your body to burn fat instead of muscle, retaining an attractive athletic physique.

At RS FITNESS Hongasandra, we assess your lifestyle and body structure to build realistic, delicious eating programs packed with high protein, active fiber, and complex wholesome carbohydrates.`
  },
  {
    id: "b3",
    title: "Zumba Dance: Why It is Much More Than Just a Cardio Party",
    excerpt: "Uncover why Zumba is one of the highest-rated active cardiovascular fat burners that improves coordiation and boosts happy hormones.",
    category: "Zumba & Cardio",
    readTime: "4 min read",
    date: "May 10, 2026",
    image: "/src/assets/images/gym_zumba_1779360841562.png",
    author: "ZES Preeti Patil",
    authorTitle: "Zumba Lead Trainer, RS Fitness",
    content: `Spend five minutes near our Zumba studio during an active evening class, and you will hear booming bass, roaring laughter, and intense rhythmic clapping. Some traditional lifters laugh and think of Zumba as just a casual choreographic dance. However, modern kinesiology says otherwise! Zumba is an unbelievable total-body cardio powerhouse.

Here is why our daily morning and evening Zumba sessions at RS Fitness are completely packed out:

### 1. Full-Body Calorie Incineration
An active, high-intensity Zumba class burns between **500 to 800 calories per hour**. It operates on the principle of interval training—switching rapidly between high-tempo fast movements and slow-tempo active recovery steps, which keeps your cardiovascular system hyper-stimulated.

### 2. Unmatched Endorphin Release
Normal treadmill runs can become repetitive and boring. Zumba, powered by lively Salsa, Merengue, Reggaeton, and EDM tracks, triggers a massive rush of dopamine and endorphins. This makes it an incredibly powerful stressbuster that completely resets your mental space.

### 3. Multi-Planar Core Conditioning
Unlike machines that linearize your movement, dancing requires stepping diagonally, twisting the hips, jumping laterally, and constantly maintaining high balance. This targets neglected stabilizing muscles around your lower back, obliques, and calves.

Whether you are looking to shed weight, improve rhythm, or just find an energetic alternative to cardio, jump in on Wednesday at 7:30 AM!`
  },
  {
    id: "b4",
    title: "How Power Yoga Builds High Joint Stability & Deep mental Focus",
    excerpt: "Explore the modern transition of traditional yoga to athletic Power Yoga, and why heavy weightlifters need flexibility drills inside their routines.",
    category: "Power Yoga",
    readTime: "6 min read",
    date: "May 06, 2026",
    image: "/src/assets/images/gym_yoga_1779360858210.png",
    author: "Yogi Anand Dev",
    authorTitle: "Yoga & Breath Master, RS Fitness",
    content: `Many people view yoga as sitting around humming in a lotus position. While peaceful mindfulness is a highly valuable component, **Power Yoga** is a dynamic, physical, athletic discipline that pushes your endurance, balance, and mechanical stamina to its absolute limits.

### The Power Yoga Difference
Unlike traditional Hatha, Power Yoga is a faster flow sequence in which postures are connected dynamically. You hold bodyweight poses (like planks, side plank extensions, and deep warriors) while focusing on slow nasal breathing.

For our lifting athletes and weight loss clients in Bengaluru, incorporating Power Yoga 2 days a week yields massive athletic dividends:

* **Decompresses the Spine:** Heavy compound barbell squats and standing military presses compress the spine. Dynamic yoga flows create active traction, open the hips, and decompress spinal vertebrae.
* **Builds Bulletproof Joints:** By holding active geometric angles, you build extreme tendon and ligament density in your knees, rotator cuffs, and hips.
* **Supercharges Breath Control (Pranayama):** Control your breath during physical stress! Learning to breathe slowly through tight yoga holds translates directly to keeping your calm during heavy 100 kg deadlifts.

Join our specialized recovery and power flow classes underneath Yogi Anand Dev to upgrade your athletic performance.`
  }
];
