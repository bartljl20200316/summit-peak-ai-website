import React, { useState } from 'react';
import { Brain, Code, Users, Lightbulb, CheckCircle, ArrowRight, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

function AIBusinessWebsite() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'consulting',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Send form data to Cloudflare Pages Function
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            service: 'consulting',
            message: ''
          });
        }, 5000);
      } else {
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SummitPeak AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-300 hover:text-purple-400 transition">Services</a>
              <a href="#about" className="text-gray-300 hover:text-purple-400 transition">About</a>
              <a href="#contact" className="text-gray-300 hover:text-purple-400 transition">Contact</a>
              <a href="#repo" className="text-gray-300 hover:text-purple-400 transition">GitHub</a>
            </div>
            <a href="#contact" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Transform Your Business with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              AI Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Expert AI outsourcing, consulting, and training services to accelerate your digital transformation journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 flex items-center justify-center">
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#services" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition backdrop-blur-sm">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Our Services</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to your business needs
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition transform hover:scale-105">
              <Code className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">AI Outsourcing</h3>
              <p className="text-gray-300 mb-6">
                Scale your team with our expert AI developers and engineers. From ML models to production deployment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom AI model development</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>MLOps & infrastructure setup</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>24/7 support & maintenance</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-900/50 to-slate-900/50 p-8 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition transform hover:scale-105">
              <Users className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">AI Consulting</h3>
              <p className="text-gray-300 mb-6">
                Strategic guidance to navigate your AI transformation journey with confidence and clarity.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>AI strategy & roadmap planning</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Use case identification</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-pink-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>ROI analysis & feasibility</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition transform hover:scale-105">
              <Lightbulb className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">AI Training</h3>
              <p className="text-gray-300 mb-6">
                Empower your team with cutting-edge AI skills through hands-on workshops and courses.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Corporate training programs</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Hands-on workshops</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom curriculum design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Why Choose SummitPeak AI?</h2>
              <p className="text-gray-300 mb-6">
                We're a team of passionate AI experts dedicated to helping businesses unlock the full potential of artificial intelligence. With years of experience in machine learning, deep learning, and AI deployment, we deliver solutions that drive real business value.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-600 rounded-full p-2 mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Proven Track Record</h4>
                    <p className="text-gray-400">Successfully delivered 200+ AI projects across various industries</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-600 rounded-full p-2 mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Expert Team</h4>
                    <p className="text-gray-400">PhDs and industry veterans with cutting-edge expertise</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-600 rounded-full p-2 mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">End-to-End Support</h4>
                    <p className="text-gray-400">From strategy to deployment and beyond</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">200+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-2">50+</div>
                  <div className="text-gray-400">Enterprise Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                  <div className="text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
                  <div className="text-gray-400">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-300 mb-8">
                Ready to transform your business with AI? Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-purple-400 mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-400">contact@summitpeak.ai</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-purple-400 mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-purple-400 mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Office</h4>
                    <p className="text-gray-400">123 AI Street, Tech Valley, CA 94025</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 p-8 rounded-xl border border-purple-500/20">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-300">We've received your request and will contact you shortly.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-white font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                      placeholder="Your Company Inc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Service Interest *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                    >
                      <option value="consulting">AI Consulting</option>
                      <option value="outsourcing">AI Outsourcing</option>
                      <option value="training">AI Training</option>
                      <option value="all">All Services</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition transform hover:scale-105 disabled:transform-none flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Request
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Repo Section */}
      <section id="repo" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Github className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Open Source Projects</h2>
          <p className="text-gray-300 mb-8">
            Check out our open-source AI tools and frameworks. Star us on GitHub and contribute to the community!
          </p>
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 p-8 rounded-xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">SummitPeak AI Framework</h3>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">Public</span>
            </div>
            <p className="text-gray-400 mb-6">
              A comprehensive framework for building and deploying AI models in production. Includes MLOps tools, model versioning, and automated deployment pipelines.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-sm">Python</span>
              <span className="bg-green-600/30 text-green-300 px-3 py-1 rounded-full text-sm">TensorFlow</span>
              <span className="bg-orange-600/30 text-orange-300 px-3 py-1 rounded-full text-sm">PyTorch</span>
              <span className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm">MLOps</span>
            </div>
            <a 
              href="https://github.com/summit-peak-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-xl font-bold text-white">SummitPeak AI</span>
              </div>
              <p className="text-gray-400">
                Empowering businesses with cutting-edge AI solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-purple-400 transition">AI Outsourcing</a></li>
                <li><a href="#services" className="hover:text-purple-400 transition">AI Consulting</a></li>
                <li><a href="#services" className="hover:text-purple-400 transition">AI Training</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-purple-400 transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-purple-400 transition">Contact</a></li>
                <li><a href="#repo" className="hover:text-purple-400 transition">Open Source</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/summit-peak-ai" target="_blank" rel="noopener noreferrer" className="bg-purple-600/20 hover:bg-purple-600/40 p-2 rounded-lg transition" aria-label="GitHub">
                  <Github className="w-6 h-6 text-purple-400" />
                </a>
                <a href="https://linkedin.com/company/summit-peak-ai" target="_blank" rel="noopener noreferrer" className="bg-purple-600/20 hover:bg-purple-600/40 p-2 rounded-lg transition" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6 text-purple-400" />
                </a>
                <a href="https://twitter.com/summit-peak-ai" target="_blank" rel="noopener noreferrer" className="bg-purple-600/20 hover:bg-purple-600/40 p-2 rounded-lg transition" aria-label="Twitter">
                  <Twitter className="w-6 h-6 text-purple-400" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-500/20 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SummitPeak AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AIBusinessWebsite;