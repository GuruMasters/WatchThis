import React from 'react';
import {
  Code,
  Megaphone,
  Brain,
  Headphones,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  ArrowRight,
  Star,
  Calendar
} from 'lucide-react';
import { BookingData } from './booking-flow';

interface ServiceSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  currentStep: number;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  bookingData,
  updateBookingData
}) => {
  const [selectedService, setSelectedService] = React.useState<string | null>(
    bookingData.service?.id || null
  );

  const services = [
    {
      id: 'web-development',
      name: 'Web Application Development',
      category: 'Development',
      icon: Code,
      description: 'Custom web applications built with modern technologies',
      duration: '60-120 minutes',
      price: '$500-$2000',
      rating: 4.9,
      features: [
        'Custom web application development',
        'Modern frontend frameworks (React, Next.js)',
        'Scalable backend architecture',
        'Database design and optimization',
        'API development and integration'
      ],
      consultants: 8,
      availability: 'Available',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing Strategy',
      category: 'Marketing',
      icon: Megaphone,
      description: 'Comprehensive digital marketing strategies and campaigns',
      duration: '45-90 minutes',
      price: '$300-$1500',
      rating: 4.8,
      features: [
        'SEO optimization and strategy',
        'PPC campaign management',
        'Social media marketing',
        'Content marketing planning',
        'Analytics and reporting setup'
      ],
      consultants: 6,
      availability: 'Available',
      color: 'from-accent to-accent-600',
      bgColor: 'from-amber-50 to-amber-100'
    },
    {
      id: 'business-consulting',
      name: 'Business Process Optimization',
      category: 'Consulting',
      icon: Brain,
      description: 'Strategic business consulting and process improvement',
      duration: '60-180 minutes',
      price: '$750-$3000',
      rating: 4.9,
      features: [
        'Business process analysis',
        'Digital transformation strategy',
        'Workflow optimization',
        'Change management planning',
        'Performance metrics setup'
      ],
      consultants: 5,
      availability: 'Limited',
      color: 'from-secondary to-secondary-600',
      bgColor: 'from-teal-50 to-teal-100'
    },
    {
      id: 'technical-support',
      name: 'Technical Architecture Review',
      category: 'Support',
      icon: Headphones,
      description: 'Technical support and infrastructure consultation',
      duration: '30-90 minutes',
      price: '$250-$1200',
      rating: 4.7,
      features: [
        'System architecture review',
        'Infrastructure optimization',
        'Security assessment',
        'Performance tuning',
        'Technology recommendations'
      ],
      consultants: 7,
      availability: 'Available',
      color: 'from-success to-success-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 'mobile-development',
      name: 'Mobile App Development',
      category: 'Development',
      icon: Code,
      description: 'Native and cross-platform mobile applications',
      duration: '60-120 minutes',
      price: '$800-$2500',
      rating: 4.8,
      features: [
        'iOS and Android development',
        'React Native cross-platform',
        'App Store optimization',
        'Push notifications setup',
        'App analytics integration'
      ],
      consultants: 4,
      availability: 'Available',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      id: 'ecommerce-strategy',
      name: 'E-commerce Strategy',
      category: 'Marketing',
      icon: Megaphone,
      description: 'Complete e-commerce strategy and implementation',
      duration: '90-150 minutes',
      price: '$600-$2000',
      rating: 4.9,
      features: [
        'E-commerce platform selection',
        'Conversion optimization',
        'Payment gateway setup',
        'Inventory management',
        'Marketing automation'
      ],
      consultants: 3,
      availability: 'Limited',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100'
    }
  ];

  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service.id);
    updateBookingData({
      service: {
        id: service.id,
        name: service.name,
        duration: parseInt(service.duration.split('-')[0]),
        price: parseInt(service.price.split('-')[0].replace('$', '').replace(',', '')),
        category: service.category
      }
    });
  };

  const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => (
    <div
      className={`enterprise-card p-6 cursor-pointer transition-all animate-fade-in-up ${
        selectedService === service.id
          ? 'ring-2 ring-primary bg-primary/5'
          : 'hover-lift'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => handleServiceSelect(service)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
            <service.icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-text">{service.name}</h3>
              <span className="enterprise-badge enterprise-badge--primary enterprise-badge--sm">
                {service.category}
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{service.description}</p>
          </div>
        </div>

        {selectedService === service.id && (
          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-2 bg-bg-secondary rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-muted" />
            <span className="text-xs text-muted">Duration</span>
          </div>
          <div className="font-medium text-text text-sm">{service.duration}</div>
        </div>

        <div className="text-center p-2 bg-bg-secondary rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign className="w-4 h-4 text-muted" />
            <span className="text-xs text-muted">Price</span>
          </div>
          <div className="font-medium text-text text-sm">{service.price}</div>
        </div>

        <div className="text-center p-2 bg-bg-secondary rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-4 h-4 text-muted" />
            <span className="text-xs text-muted">Experts</span>
          </div>
          <div className="font-medium text-text text-sm">{service.consultants}</div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(service.rating)
                  ? 'text-accent fill-current'
                  : 'text-muted'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-text">{service.rating}</span>
        <span className="text-sm text-muted">•</span>
        <span className={`text-sm font-medium ${
          service.availability === 'Available' ? 'text-success' : 'text-warning'
        }`}>
          {service.availability}
        </span>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <h4 className="font-medium text-text text-sm">What's included:</h4>
        <ul className="space-y-1">
          {service.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-muted">{feature}</span>
            </li>
          ))}
          {service.features.length > 3 && (
            <li className="text-sm text-primary font-medium">
              + {service.features.length - 3} more features
            </li>
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text mb-4">
          Choose Your Service
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Select the service that best fits your needs. Our experts will provide
          personalized guidance tailored to your specific requirements.
        </p>
      </div>

      {/* Service Categories Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {['All', 'Development', 'Marketing', 'Consulting', 'Support'].map((category) => (
          <button
            key={category}
            className="enterprise-btn enterprise-btn--outline enterprise-btn--sm"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Selected Service Summary */}
      {selectedService && (
        <div className="enterprise-card p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                {services.find(s => s.id === selectedService)?.icon && (
                  React.createElement(services.find(s => s.id === selectedService)!.icon, {
                    className: "w-6 h-6 text-white"
                  })
                )}
              </div>
              <div>
                <h3 className="font-semibold text-text">
                  {services.find(s => s.id === selectedService)?.name}
                </h3>
                <p className="text-sm text-muted">
                  {services.find(s => s.id === selectedService)?.duration} •
                  {services.find(s => s.id === selectedService)?.price}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {services.find(s => s.id === selectedService)?.rating}
              </div>
              <div className="text-sm text-muted">Expert Rating</div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="enterprise-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-text mb-2">
          Not sure which service to choose?
        </h3>
        <p className="text-muted mb-6">
          Our team can help you identify the best solution for your specific needs.
        </p>
        <button className="enterprise-btn enterprise-btn--outline">
          <span>Talk to an Expert</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
