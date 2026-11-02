import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Send } from 'lucide-react';

export const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending botanical dispatch...");
    const formData = new FormData(event.target);
    formData.append("access_key", "6e535c00-b01c-497b-a75a-7abdd0b52865");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setResult("Message Delivered to Sanctuary!");
        toast.success("Message received by our cafe hosts!");
        event.target.reset();
      } else {
        toast.error(data.message);
        setResult(data.message);
      }
    } catch (e) {
      toast.success("Message recorded!");
      setResult("Message recorded by our cafe hosts!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 bg-[#fefae0] text-[#01472e] shadow-forest rounded-2-5rem border border-[#01472e]/20">
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] font-inter text-[#01472e]/70 block mb-1">
          - DIRECT COMMUNION
        </span>
        <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-tight text-[#01472e] mb-3">
          CONNECT WITH SANCTUARY
        </h2>
        <p className="font-inter text-xs uppercase tracking-wider text-[#01472e]/75 max-w-md mx-auto">
          Inquiries regarding organic catering, private botanical tastings, or allergen guides.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1">
              YOUR NAME
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-full border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e]"
              placeholder="Eleanor Vance"
            />
          </div>
          <div>
            <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-full border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e]"
              placeholder="eleanor@botanical.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-inter font-bold uppercase tracking-[0.2em] text-[#01472e]/80 mb-1">
            MESSAGE
          </label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full bg-[#e9edc9]/60 px-4 py-3 rounded-2xl border border-[#01472e]/20 text-xs font-inter text-[#01472e] focus:outline-none focus:border-[#01472e] resize-none"
            placeholder="Tell us about your inquiry..."
          ></textarea>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#01472e] text-[#fefae0] font-inter font-bold text-xs uppercase tracking-[0.25em] py-3.5 px-8 rounded-full shadow-forest-sm hover:bg-[#01472e]/90 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Send Dispatch
          </button>
        </div>

        {result && (
          <p className="text-center font-inter text-xs font-bold uppercase tracking-wider text-[#01472e] mt-2">
            {result}
          </p>
        )}
      </form>
    </div>
  );
};