import React from 'react';
import ShurikenIcon from '../../components/ui/ShurikenIcon';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'TechFlow Solutions',
      image: '/api/placeholder/80/80',
      content: 'Working with this team transformed our entire digital infrastructure. Their expertise in enterprise solutions is unmatched, and they delivered results that exceeded our expectations.',
      rating: 5,
      metrics: {
        roi: '+180%',
        timeframe: '6 months',
        satisfaction: '98%'
      }
    },
    {
      name: 'Michael Chen',
      position: 'CEO',
      company: 'InnovateFirst Corp',
      image: '/api/placeholder/80/80',
      content: 'The strategic guidance and technical execution were flawless. Our revenue increased by 150% within the first year of partnership. Highly recommend their services.',
      rating: 5,
      metrics: {
        roi: '+150%',
        timeframe: '12 months',
        satisfaction: '95%'
      }
    },
    {
      name: 'Emily Rodriguez',
      position: 'VP of Marketing',
      company: 'GrowthMax Enterprises',
      image: '/api/placeholder/80/80',
      content: 'Their marketing strategies revolutionized our digital presence. The ROI was immediate and substantial. Professional, reliable, and results-driven.',
      rating: 5,
      metrics: {
        roi: '+220%',
        timeframe: '8 months',
        satisfaction: '97%'
      }
    }
  ];

  const companies = [
    'TechFlow Solutions',
    'InnovateFirst Corp',
    'GrowthMax Enterprises',
    'Digital Dynamics',
    'Future Systems Inc',
    'CloudTech Partners'
  ];

  const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
    const initials = testimonial.name.split(' ').map(n => n[0]).join('');

    return (
      <div
        className="p-8 animate-fade-in-up bg-gray-800 text-white border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-700 rounded-2xl"
        style={{ animationDelay: `${0.3 + index * 0.15}s` }}
      >
        {/* Header with avatar and info */}
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar */}
          <div className="relative w-16 h-16 mb-4 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30"></div>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">{initials}</span>
            </div>
          </div>

          {/* Identity */}
          <div className="flex-1 min-w-0">
            <h3 className="wt-heading-card text-white mb-1 truncate">{testimonial.name}</h3>
            <p className="text-gray-300 text-sm mb-1">{testimonial.position}</p>
            <p className="text-white text-sm font-medium">{testimonial.company}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <ShurikenIcon key={i} size={16} filled={i < (testimonial.rating || 0)} />
            ))}
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-white/95 text-lg leading-relaxed mb-6 italic">
          "{testimonial.content}"
        </blockquote>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-wt-orange mb-1">{testimonial.metrics.roi}</div>
            <div className="text-xs text-white/70 uppercase tracking-wide">ROI</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-wt-blue mb-1">{testimonial.metrics.timeframe}</div>
            <div className="text-xs text-white/70 uppercase tracking-wide">Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-wt-yellow mb-1">{testimonial.metrics.satisfaction}</div>
            <div className="text-xs text-white/70 uppercase tracking-wide">Satisfaction</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-20 bg-[#FBC314] overflow-hidden">
      {/* Background Elements - subtle for yellow section */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="wt-heading-section text-wt-black mb-4">
            Client Success Stories
          </h2>

          <h3 className="text-3xl font-bold text-wt-black mb-6">
            Proven Results Across <span className="text-wt-blue">Industries</span>
          </h3>

          <p className="wt-body-lg text-wt-black/80">
            Don't just take our word for it. See how we've helped businesses
            like yours achieve extraordinary growth and transformation.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Company Logos - with shurikens */}
        <div className="text-center mb-16">
          <p className="text-wt-black/60 mb-12 text-lg font-medium">Trusted by industry leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {companies.map((company, index) => (
              <div
                key={index}
                className="group relative p-6 bg-gray-800 text-white border border-white/20 rounded-2xl hover:bg-gray-700 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-wt-yellow/5 to-wt-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  {/* Company name */}
                  <span className="font-bold text-base text-center leading-tight text-white group-hover:text-wt-yellow transition-colors duration-300">
                    {company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="mt-16">
          <div className="relative p-12 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-wt-yellow/10 to-transparent rounded-full blur-3xl animate-pulse opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-wt-blue/10 to-transparent rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}></div>

            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-all duration-500"></div>

            {/* Content */}
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="group/stat animate-fade-in-up">
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-wt-yellow/20 to-wt-orange/20 rounded-full blur-lg opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative text-5xl font-black group-hover/stat:scale-110 transition-all duration-500" style={{ color: '#C76A18' }}>98%</div>
                </div>
                <div className="text-wt-black font-medium group-hover/stat:text-wt-black transition-colors duration-300">Client Retention</div>
              </div>
              <div className="group/stat animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-wt-yellow/20 to-wt-orange/20 rounded-full blur-lg opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative text-5xl font-black group-hover/stat:scale-110 transition-all duration-500" style={{ color: '#C76A18' }}>150+</div>
                </div>
                <div className="text-wt-black font-medium group-hover/stat:text-wt-black transition-colors duration-300">Projects Delivered</div>
              </div>
              <div className="group/stat animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-wt-yellow/20 to-wt-orange/20 rounded-full blur-lg opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative text-5xl font-black group-hover/stat:scale-110 transition-all duration-500" style={{ color: '#C76A18' }}>4.9/5</div>
                </div>
                <div className="text-wt-black font-medium group-hover/stat:text-wt-black transition-colors duration-300">Average Rating</div>
              </div>
              <div className="group/stat animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-wt-yellow/20 to-wt-orange/20 rounded-full blur-lg opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative text-5xl font-black group-hover/stat:scale-110 transition-all duration-500" style={{ color: '#C76A18' }}>24/7</div>
                </div>
                <div className="text-wt-black font-medium group-hover/stat:text-wt-black transition-colors duration-300">Support Available</div>
              </div>
            </div>

            {/* Hover overlay effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-wt-yellow/5 via-transparent to-wt-blue/5 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
