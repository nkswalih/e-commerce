import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SimpleFooter from '../components/SimpleFoot';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('/api/contact', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Get in touch with our team. We're here to help you with any questions about our products and services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-10">
              {/* Store Info */}
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-6">EchOo. Store</h3>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-start">
                    <span className="text-gray-900 font-normal mr-3">📍</span>
                    <span>123 Tech Boulevard<br />San Francisco, CA 94102</span>
                  </p>
                  <p className="flex items-center">
                    <span className="text-gray-900 font-normal mr-3">📞</span>
                    <span>1-800-ECHOO-00</span>
                  </p>
                  <p className="flex items-center">
                    <span className="text-gray-900 font-normal mr-3">✉️</span>
                    <span>hello@echoo.com</span>
                  </p>
                </div>
              </div>

              {/* Store Hours */}
              <div>
                <h4 className="text-lg font-normal text-gray-900 mb-4">Store Hours</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-normal">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-normal">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-normal">11:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Support Categories */}
              <div>
                <h4 className="text-lg font-normal text-gray-900 mb-4">Quick Support</h4>
                <div className="space-y-3">
                  <Link to="/support/technical" className="block text-gray-700 hover:text-gray-900 transition-colors">
                    Technical Support
                  </Link>
                  <Link to="/support/orders" className="block text-gray-700 hover:text-gray-900 transition-colors">
                    Order Status
                  </Link>
                  <Link to="/support/returns" className="block text-gray-700 hover:text-gray-900 transition-colors">
                    Returns & Exchanges
                  </Link>
                  <Link to="/support/business" className="block text-gray-700 hover:text-gray-900 transition-colors">
                    Business Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-light text-gray-900 mb-2">Send us a message</h3>
              <p className="text-gray-600 mb-8 font-light">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-green-800 font-normal">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-800 font-normal">Sorry, there was an error sending your message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-normal text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-normal text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-normal text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 bg-white transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="order-support">Order Support</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="business">Business Sales</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-normal text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 transition-colors resize-vertical"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-base font-normal text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            {/* Additional Support Options */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors">
                <div className="text-3xl mb-4">💬</div>
                <h4 className="text-lg font-normal text-gray-900 mb-2">Live Chat</h4>
                <p className="text-gray-600 text-sm font-light">
                  Chat with our support team in real-time
                </p>
                <button className="mt-4 text-gray-900 font-normal text-sm hover:text-gray-700 transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors">
                <div className="text-3xl mb-4">📞</div>
                <h4 className="text-lg font-normal text-gray-900 mb-2">Phone Support</h4>
                <p className="text-gray-600 text-sm font-light">
                  Call us directly for immediate assistance
                </p>
                <a href="tel:1-800-ECHOO-00" className="mt-4 text-gray-900 font-normal text-sm hover:text-gray-700 transition-colors block">
                  1-800-ECHOO-00
                </a>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors">
                <div className="text-3xl mb-4">🛠️</div>
                <h4 className="text-lg font-normal text-gray-900 mb-2">Service & Repair</h4>
                <p className="text-gray-600 text-sm font-light">
                  Schedule device service and repairs
                </p>
                <Link to="/services" className="mt-4 text-gray-900 font-normal text-sm hover:text-gray-700 transition-colors block">
                  Book Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SimpleFooter/>
    </div>
  );
};

export default Contact;