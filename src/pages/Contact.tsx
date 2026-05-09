import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { submitEnquiry } from '../lib/firebase';
import { FIRESTORE_FEATURES_ENABLED } from '../lib/cloudFeatures';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError(null);

    if (!FIRESTORE_FEATURES_ENABLED) {
      setError('Contact storage is not configured yet. Please email support@syllab.in.');
      setLoading(false);
      return;
    }
    
    try {
      await submitEnquiry(form.name, form.email, form.message);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Get in <span className="text-primary italic">Touch</span>.
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Have questions about your preparation? Need help with the platform? Our academic support team is here for you.
          </p>
        </header>

        <div className="space-y-6">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Us</div>
              <div className="font-bold text-slate-900">support@syllab.in</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <MessageSquare size={24} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Community</div>
              <div className="font-bold text-slate-900">Join our Discord</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-white p-10 border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Zap size={120} className="text-primary" />
        </div>
        
        {sent ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Send size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Message Received!</h2>
            <p className="text-slate-500 font-medium">We'll get back to you within 24 hours.</p>
            <button 
              onClick={() => setSent(false)}
              className="text-primary font-black uppercase tracking-widest text-xs hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Your Name</label>
              <input 
                required
                type="text" 
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Student Name"
                className="w-full rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white p-4 outline-none font-bold transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
              <input 
                required
                type="email" 
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="name@email.com"
                className="w-full rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white p-4 outline-none font-bold transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
              <textarea 
                required
                rows={4}
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                placeholder="Tell us what you're looking for..."
                className="w-full rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white p-4 outline-none font-bold transition-all resize-none"
              />
            </div>

            {error && <div className="text-rose-500 text-xs font-bold ml-2">{error}</div>}

            <button 
              disabled={loading}
              className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg font-black shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" /> : <Send size={20} />}
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
