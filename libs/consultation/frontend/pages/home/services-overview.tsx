import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Megaphone,
  Brain,
  Headphones,
  ArrowRight,
  CheckCircle,
  Clock
} from 'lucide-react';
import { SectionAngle } from '../../components/layout/SectionAngle';
import { Button } from '../../components/ui/button';

export const ServicesOverview: React.FC = () => {
  const services = [
    {
      category: 'Application Development',
      icon: Code,
      description: 'Custom software solutions built with cutting-edge technologies',
      features: [
        'Web & Mobile Applications',
        'Enterprise Software',
        'API Development',
        'System Integration'
      ]
    },
    {
      category: 'Marketing & Promotion',
      icon: Megaphone,
      description: 'Data-driven marketing strategies to boost your online presence',
      features: [
        'Digital Marketing Campaigns',
        'SEO & SEM Optimization',
        'Social Media Management',
        'Content Marketing'
      ]
    },
    {
      category: 'Business Consulting',
      icon: Brain,
      description: 'Strategic guidance to optimize operations and drive growth',
      features: [
        'Business Process Optimization',
        'Digital Transformation',
        'Market Analysis',
        'Strategic Planning'
      ]
    },
    {
      category: 'Support & Outsourcing',
      icon: Headphones,
      description: 'Comprehensive support services to maintain and scale your operations',
      features: [
        '24/7 Technical Support',
        'Infrastructure Management',
        'Team Augmentation',
        'Maintenance Services'
      ]
    }
  ];

  const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => (
    <div
      className="glass-card p-8 animate-fade-in-up bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30"></div>
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <service.icon className="w-8 h-8 text-wt-black" />
          </div>
        </div>
        <h3 className="wt-heading-card text-white mb-3">{service.category}</h3>
        <p className="text-white/90 leading-relaxed">{service.description}</p>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h4 className="font-semibold text-white mb-4">What we deliver:</h4>
        <ul className="space-y-3">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-wt-yellow rounded-full flex-shrink-0"></div>
              <span className="text-white/80">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-4 pt-6 border-t border-white/20">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Clock className="w-4 h-4 text-wt-yellow" />
          <span style={{ color: '#DD5E23' }}>Free initial consultation</span>
        </div>
        <Button asChild variant="secondary" size="default" className="w-full">
          <Link to="/booking" className="flex items-center justify-center gap-2">
            Schedule Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <SectionAngle
      color="black"
      cut="top"
      paddingClass="py-20"
      container={false}
      className="relative"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="wt-heading-section text-white mb-6">
            Our Expertise Areas
          </h2>
          <h3 className="text-3xl font-bold text-wt-yellow mb-6">
            Comprehensive Digital Solutions
          </h3>
          <p className="wt-body-lg text-white/90">
            From concept to deployment, we provide end-to-end digital services
            that transform businesses and deliver measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
            <h3 className="wt-heading-card text-white mb-4">
              Ready to Transform <span style={{ color: '#DD5E23' }}>Your</span> Business?
            </h3>
            <p className="text-white/90 mb-6">
              Let's discuss your project and explore how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl">
                <Link to="/booking" className="flex items-center gap-3">
                  Start <span style={{ color: '#DD5E23' }}>Your</span> Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="neutral" size="xl">
                <Link to="/about/case-studies" className="flex items-center gap-3">
                  View Case Studies
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionAngle>
  );
};

export default ServicesOverview;
