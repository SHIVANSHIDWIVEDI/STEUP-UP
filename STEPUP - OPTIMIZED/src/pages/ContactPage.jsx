import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Clock, Send, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  const { showToast, navigate } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      showToast('Message sent! Our campus team will reply within 24 hours.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#666666]">
        <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">
          HOME
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
        <span className="text-[#111111] font-semibold">CONTACT</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-6 space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
          Direct Campus Inquiries
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase">
          LET'S TALK.
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] max-w-xl leading-relaxed">
          Questions about sizing, footwear recommendations, campus orders, or style advice? Our student support team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left: Contact Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 bg-white border border-[#E8E2D8] space-y-5">
            <h3 className="font-heading text-base font-semibold text-[#111111] uppercase border-b border-[#E8E2D8] pb-3">
              Customer Support
            </h3>
            
            <div className="space-y-4 text-xs text-[#666666]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-[#FAF9F6] border border-[#E8E2D8] flex items-center justify-center text-[#A52A2A] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#888888] block">Email Us</span>
                  <a href="mailto:support@stepupstudio.com" className="text-[#111111] font-semibold hover:underline">
                    support@stepupstudio.com
                  </a>
                  <p className="text-[11px] text-[#888888] mt-0.5">Average reply time: under 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#F2EDE4]">
                <div className="w-8 h-8 rounded-xs bg-[#FAF9F6] border border-[#E8E2D8] flex items-center justify-center text-[#A52A2A] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#888888] block">Support Hours</span>
                  <strong className="text-[#111111] block">Monday – Friday: 9:00 AM – 7:00 PM IST</strong>
                  <span className="text-[#111111] block">Saturday: 10:00 AM – 4:00 PM IST</span>
                  <span className="text-[11px] text-[#888888]">Closed Sundays & National Holidays</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#F2EDE4]">
                <div className="w-8 h-8 rounded-xs bg-[#FAF9F6] border border-[#E8E2D8] flex items-center justify-center text-[#A52A2A] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#888888] block">Campus Delivery Assistance</span>
                  <span className="text-[#111111] block">Free Delivery across India on orders ₹1,499+</span>
                  <span className="text-[11px] text-[#888888]">Standard shipping: 2–4 business days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#FAF9F6] border border-[#E8E2D8] space-y-2 text-xs text-[#666666]">
            <span className="font-heading font-semibold text-[#111111] uppercase block">
              Student Exchange Guarantee
            </span>
            <p className="leading-relaxed">
              If your shoes don't fit right out of the box, we offer free, seamless size exchanges within 30 days so your campus rotation stays comfortable.
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 border border-[#E8E2D8]">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EFECE5] text-[#A52A2A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#111111]">
                Message Received
              </h3>
              <p className="text-xs text-[#666666] max-w-sm mx-auto">
                Thank you for reaching out, {formData.name}. Our student support team will reply to <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Question', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-[#111111] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-[#111111] uppercase">
                Send A Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#111111] block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Vance"
                    className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#E8E2D8] text-xs text-[#111111] focus:outline-hidden focus:border-[#111111]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#111111] block">
                    Student / Personal Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. elena@university.edu"
                    className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#E8E2D8] text-xs text-[#111111] focus:outline-hidden focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#111111] block">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#E8E2D8] text-xs text-[#111111] focus:outline-hidden focus:border-[#111111] cursor-pointer"
                >
                  <option value="General Question">General Footwear Question</option>
                  <option value="Sizing Help">Sizing & Fit Advice</option>
                  <option value="Order Tracking">Campus Delivery & Tracking</option>
                  <option value="Style Advice">Footwear Styling & Proportions</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#111111] block">
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you need help with..."
                  className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-[#E8E2D8] text-xs text-[#111111] focus:outline-hidden focus:border-[#111111]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
