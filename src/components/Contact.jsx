import React from 'react';
import { toast } from 'react-toastify';
import '../gradient.css'

export const Contact = (props) => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "6e535c00-b01c-497b-a75a-7abdd0b52865");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully!");
      toast.success("Message sent successfully!")
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message)
      setResult(data.message);
    }
  };

  return (
    <div
      
      className="max-w-2xl md:mx-auto mx-10  my-20 p-8 text-white shadow-lg rounded-lg animated-gradient"
    >

      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <h2 className="bg-gradient-to-r from-pink-500 via-slate-300 to-purple-600 text-transparent  text-3xl lg:text-4xl tracking-tight bg-clip-text  font-bold mb-5 text-center">Feel free to contact Us.</h2>
      <p className="text-center text-gray-300 mb-6">
        Got any question about any of the product, price, order process? Fill out the form below and I’ll get back to you as soon as possible.
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              required
              className="p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              className="p-3 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-300">Your Message</label>
          <textarea
            name="message"
            rows="6"
            required
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-md resize-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Send Message
          </button>
        </div>

        <p className="text-center text-green-400 font-medium">{result}</p>
      </form>
    </div>
  );
};