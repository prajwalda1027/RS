import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Clock, User, MessageCircle, PenTool, Sparkles, Filter, X, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  // New tip / post drafting state
  const [showDraftModal, setShowDraftModal] = useState<boolean>(false);
  const [draftTitle, setDraftTitle] = useState<string>('');
  const [draftCategory, setDraftCategory] = useState<string>('Strength Training');
  const [draftExcerpt, setDraftExcerpt] = useState<string>('');
  const [draftContent, setDraftContent] = useState<string>('');
  const [draftAuthor, setDraftAuthor] = useState<string>('');

  // Hydrate local posts
  useEffect(() => {
    const local = localStorage.getItem('rs_fitness_blogs');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        setPosts([...BLOG_POSTS, ...parsed]);
      } catch (e) {
        setPosts(BLOG_POSTS);
      }
    } else {
      setPosts(BLOG_POSTS);
    }
  }, []);

  const handleDraftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: BlogPost = {
      id: `custom_${Date.now()}`,
      title: draftTitle,
      excerpt: draftExcerpt,
      content: draftContent,
      category: draftCategory,
      readTime: `${Math.ceil(draftContent.split(' ').length / 150)} min read`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: draftCategory === 'Strength Training' 
        ? "/src/assets/images/gym_strength_1779360877809.png" 
        : draftCategory === 'Power Yoga' 
        ? "/src/assets/images/gym_yoga_1779360858210.png"
        : draftCategory === 'Zumba & Cardio'
        ? "/src/assets/images/gym_zumba_1779360841562.png"
        : "/src/assets/images/gym_trainer_1779360900180.png",
      author: draftAuthor || 'Guest Trainee',
      authorTitle: 'RS Fitness Community Member'
    };

    const currentCustom = localStorage.getItem('rs_fitness_blogs');
    let updatedCustom = [];
    if (currentCustom) {
      try {
        updatedCustom = JSON.parse(currentCustom);
      } catch (err) {}
    }
    updatedCustom.unshift(newPost);
    localStorage.setItem('rs_fitness_blogs', JSON.stringify(updatedCustom));
    
    setPosts([newPost, ...posts]);
    
    // Reset form
    setDraftTitle('');
    setDraftExcerpt('');
    setDraftContent('');
    setDraftAuthor('');
    setShowDraftModal(false);
  };

  const categories = ['All', 'Strength Training', 'Weight Loss', 'Zumba & Cardio', 'Power Yoga'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="blog" className="py-20 bg-neutral-950 border-t border-neutral-800 relative font-sans">
      <div className="absolute left-1/3 top-10 w-80 h-80 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-600/15 text-orange-500 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Fitness & Bio hacking Knowledge
            </div>
            <h2 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase text-white font-sans">
              The RS FITNESS <span className="text-orange-500 font-sans">Knowledge Hub</span>
            </h2>
            <p className="mt-2 text-neutral-400 text-sm max-w-xl leading-relaxed">
              Scientific advice, workout systems, and nutrition checklists written by our certified personal coaches and consultants in Bengaluru.
            </p>
          </div>

          {/* Quick Create CTA */}
          <div>
            <button
              onClick={() => setShowDraftModal(true)}
              className="px-5 py-3 rounded-full bg-orange-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 hover:bg-orange-550 shadow-lg shadow-orange-600/10 active:scale-95 transition cursor-pointer uppercase tracking-wider"
            >
              <PenTool className="w-4 h-4" />
              <span>Share a Fitness Tip</span>
            </button>
          </div>
        </div>

        {/* Searching and Categorization Toolbar */}
        <div className="bg-neutral-900 border border-neutral-800 p-4 sm:p-5 rounded-xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 text-xs rounded-sm font-bold uppercase tracking-wider transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white font-extrabold'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-805'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search fitness tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-805 focus:border-orange-500 outline-none rounded-sm pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500"
            />
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-neutral-905 rounded-xl border border-neutral-800 border-dashed">
            <Filter className="w-12 h-12 text-neutral-650 mx-auto mb-3" />
            <h4 className="text-white font-bold mb-1 uppercase tracking-wide">No Articles Found</h4>
            <p className="text-xs text-neutral-400">Try adjusting your search query or selecting another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-neutral-900 rounded-xl border border-neutral-805 overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition shadow-xl"
              >
                <div>
                  {/* Aspect Ratio 16:9 Image container */}
                  <div className="aspect-[16/9] w-full bg-neutral-950 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/85 backdrop-blur-md text-[9px] font-mono font-bold uppercase tracking-wider text-orange-500 border border-neutral-805">
                      {post.category}
                    </div>
                  </div>
 
                  {/* Body Info */}
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] text-neutral-500 font-mono block uppercase">
                      {post.date} • {post.readTime}
                    </span>
                    <h3 className="text-lg font-black italic uppercase leading-snug line-clamp-2 hover:text-orange-500 transition cursor-pointer" onClick={() => setReadingPost(post)}>
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-6 pt-0 border-t border-neutral-805/40 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-7 h-7 bg-orange-600/15 text-orange-500 rounded-sm font-black text-[10px] flex items-center justify-center border border-orange-500/10 uppercase">
                      {post.author.slice(0, 2)}
                    </div>
                    <div className="truncate text-[10.5px]">
                      <span className="text-neutral-300 font-semibold block leading-tight">{post.author}</span>
                      <span className="text-[9px] text-neutral-500 block leading-tight">{post.authorTitle}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setReadingPost(post)}
                    className="text-xs font-bold uppercase tracking-wider text-orange-500 hover:text-white transition flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Read Post</span>
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Cinematic Reader Modal Overlay */}
        <AnimatePresence>
          {readingPost && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
              {/* Outer clicking space to dismiss */}
              <div className="absolute inset-0 cursor-pointer" onClick={() => setReadingPost(null)} />
              
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                className="bg-neutral-950 border border-neutral-900 w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
              >
                {/* Header controls */}
                <div className="sticky top-0 bg-neutral-950 p-4 border-b border-neutral-900/60 flex items-center justify-between z-10">
                  <button
                    onClick={() => setReadingPost(null)}
                    className="text-neutral-400 hover:text-white flex items-center gap-1 text-xs font-bold uppercase tracking-wider font-mono transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-orange-500" />
                    <span>back to all tips</span>
                  </button>

                  <button
                    onClick={() => setReadingPost(null)}
                    className="w-8 h-8 rounded-sm bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white transition cursor-pointer font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* Main scrollable body */}
                <div className="overflow-y-auto p-6 sm:p-10 space-y-6 scrollbar-thin">
                  {/* Hero banner for topic */}
                  <div className="aspect-[21/9] w-full rounded-sm overflow-hidden bg-neutral-900">
                    <img
                      src={readingPost.image}
                      alt={readingPost.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Top metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono">
                    <span className="px-2.5 py-1 rounded bg-orange-600/15 text-orange-500 border border-orange-500/20 font-bold uppercase tracking-wide">
                      {readingPost.category}
                    </span>
                    <span>{readingPost.date}</span>
                    <span>•</span>
                    <span>{readingPost.readTime}</span>
                  </div>

                  {/* Title & Description formatting */}
                  <h1 className="text-2xl sm:text-4xl font-black italic uppercase text-white leading-tight tracking-tight">
                    {readingPost.title}
                  </h1>

                  {/* Author profile slug */}
                  <div className="flex items-center gap-3 bg-neutral-900 p-4 rounded-sm border border-neutral-800">
                    <div className="w-10 h-10 rounded-sm bg-orange-600 text-white font-black flex items-center justify-center text-sm uppercase">
                      {readingPost.author.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">{readingPost.author}</h4>
                      <span className="text-xs text-neutral-400 font-mono mt-1 block">{readingPost.authorTitle}</span>
                    </div>
                  </div>

                  {/* HTML formatted body */}
                  <div className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4 white-space-pre-wrap select-text selection:bg-orange-600 selection:text-white">
                    {readingPost.content.split('\n\n').map((para, idx) => {
                      if (para.startsWith('###')) {
                        return <h3 key={idx} className="text-lg sm:text-xl font-black italic text-white uppercase pt-4 flex items-center gap-2"><span className="w-1 h-4 bg-orange-500 rounded-xs"></span>{para.replace('###', '').trim()}</h3>;
                      }
                      if (para.startsWith('*')) {
                        return (
                          <ul key={idx} className="space-y-1 pl-4 list-disc text-neutral-400">
                            <li>{para.replace('*', '').trim()}</li>
                          </ul>
                        );
                      }
                      // Parse bold items in markdown
                      const boldRegex = /\*\*(.*?)\*\*/g;
                      if (boldRegex.test(para)) {
                        const parts = para.split(boldRegex);
                        return (
                          <p key={idx}>
                            {parts.map((p, i) => i % 2 === 1 ? <strong key={i} className="text-orange-500 font-bold">{p}</strong> : p)}
                          </p>
                        );
                      }
                      return <p key={idx}>{para}</p>;
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Share tip/post Creator Modal */}
        <AnimatePresence>
          {showDraftModal && (
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
                  onClick={() => setShowDraftModal(false)}
                  className="absolute right-4 top-4 text-neutral-400 hover:text-white p-2 rounded-sm transition cursor-pointer font-bold animate-pulse"
                >
                  ✕
                </button>

                <div className="mb-6">
                  <h3 className="text-xl font-black italic uppercase tracking-tight text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    Share a Fitness Tip
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 font-mono">Contribute knowledge to the RS FITNESS trainee portal</p>
                </div>

                <form onSubmit={handleDraftSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Tip Title</label>
                    <input
                      type="text"
                      placeholder="e.g. My secret to recovering from leg day"
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      required
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Category</label>
                      <select
                        value={draftCategory}
                        onChange={(e) => setDraftCategory(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-3 py-2.5 text-white text-xs cursor-pointer"
                      >
                        <option value="Strength Training">Strength</option>
                        <option value="Weight Loss">Weight Loss</option>
                        <option value="Zumba & Cardio">Zumba</option>
                        <option value="Power Yoga">Power Yoga</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Your Name</label>
                      <input
                        type="text"
                        placeholder="Ramesh G."
                        value={draftAuthor}
                        onChange={(e) => setDraftAuthor(e.target.value)}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-3 py-2.5 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Short Summary (Excerpt)</label>
                    <input
                      type="text"
                      placeholder="One-sentence hook about your tip..."
                      value={draftExcerpt}
                      onChange={(e) => setDraftExcerpt(e.target.value)}
                      required
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-mono">Full Tip Details</label>
                    <textarea
                      placeholder="Write your advice here... Include steps or tips in detail."
                      value={draftContent}
                      onChange={(e) => setDraftContent(e.target.value)}
                      required
                      rows={4}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none rounded-sm px-4 py-3 text-white text-sm font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-550 text-white font-black text-sm uppercase tracking-wide h-12 rounded-full flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
                  >
                    <span>Publish to Portal</span>
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
