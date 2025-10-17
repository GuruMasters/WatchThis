import React from 'react';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  Target,
  Zap
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  currency: string;
  rating: number;
  bookingsCount: number;
  consultantCount: number;
  features: string[];
  benefits: string[];
  deliverables: string[];
  icon: React.ElementType;
  color: string;
}

export const BookingService: React.FC = () => {
  const [selectedService, setSelectedService] = React.useState<string | null>(null);

  const services: Service[] = [
    {
      id: '1',
      name: 'Business Strategy Consultation',
      category: 'Business',
      description: 'Comprehensive business strategy planning and execution guidance for growth and optimization.',
      duration: 60,
      price: 150,
      currency: 'USD',
      rating: 4.9,
      bookingsCount: 245,
      consultantCount: 8,
      features: [
        'Market analysis and competitive research',
        'Strategic planning and roadmap development',
        'Business model optimization',
        'Growth strategy implementation'
      ],
      benefits: [
        'Clear strategic direction',
        'Increased market competitiveness',
        'Optimized business processes',
        'Measurable growth objectives'
      ],
      deliverables: [
        'Comprehensive strategy document',
        'Actionable implementation plan',
        'Performance metrics dashboard',
        'Follow-up consultation session'
      ],
      icon: Target,
      color: 'from-primary to-primary-600'
    },
    {
      id: '2',
      name: 'Technical Interview Preparation',
      category: 'Technical',
      description: 'Intensive preparation for technical interviews with mock sessions and personalized feedback.',
      duration: 90,
      price: 120,
      currency: 'USD',
      rating: 4.8,
      bookingsCount: 189,
      consultantCount: 12,
      features: [
        'Mock technical interviews',
        'Algorithm and data structure review',
        'System design discussions',
        'Behavioral interview preparation'
      ],
      benefits: [
        'Improved interview performance',
        'Enhanced technical confidence',
        'Better problem-solving skills',
        'Higher success rate'
      ],
      deliverables: [
        'Personalized preparation plan',
        'Practice interview recordings',
        'Feedback summary report',
        'Resource recommendations'
      ],
      icon: Award,
      color: 'from-accent to-accent-600'
    },
    {
      id: '3',
      name: 'Career Coaching',
      category: 'Career',
      description: 'Personal career development coaching to accelerate your professional growth.',
      duration: 45,
      price: 100,
      currency: 'USD',
      rating: 4.7,
      bookingsCount: 156,
      consultantCount: 6,
      features: [
        'Career assessment and planning',
        'Skill gap analysis',
        'Professional development roadmap',
        'Job search strategy'
      ],
      benefits: [
        'Clear career direction',
        'Enhanced professional skills',
        'Better job opportunities',
        'Increased earning potential'
      ],
      deliverables: [
        'Career development plan',
        'Skill assessment report',
        'Professional goals roadmap',
        'Resource guide'
      ],
      icon: TrendingUp,
      color: 'from-success to-success-600'
    }
  ];

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
    // In real implementation, this would proceed to next step
  };

  const ServiceCard = ({ service }: { service: Service }) => (
    <div
      className={`enterprise-card p-6 cursor-pointer transition-all ${
        selectedService === service.id
          ? 'ring-2 ring-primary shadow-lg'
          : 'hover-lift'
      }`}
      onClick={() => handleSelectService(service.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-glow`}>
            <service.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text mb-1">{service.name}</h3>
            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
              {service.category}
            </span>
          </div>
        </div>
        {selectedService === service.id && (
          <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
        )}
      </div>

      {/* Description */}
      <p className="text-muted text-sm mb-4 leading-relaxed">{service.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-muted" />
            <span className="font-semibold text-text">{service.duration}min</span>
          </div>
          <p className="text-xs text-muted">Duration</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign className="w-4 h-4 text-muted" />
            <span className="font-semibold text-text">${service.price}</span>
          </div>
          <p className="text-xs text-muted">per session</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-4 h-4 text-accent" />
            <span className="font-semibold text-text">{service.rating}</span>
          </div>
          <p className="text-xs text-muted">{service.bookingsCount} bookings</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-4 h-4 text-muted" />
            <span className="font-semibold text-text">{service.consultantCount}</span>
          </div>
          <p className="text-xs text-muted">consultants</p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text mb-2">What you'll get:</h4>
        <ul className="space-y-1">
          {service.features.slice(0, 2).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              {feature}
            </li>
          ))}
          {service.features.length > 2 && (
            <li className="text-sm text-primary font-medium">
              +{service.features.length - 2} more features
            </li>
          )}
        </ul>
      </div>

      {/* Benefits */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text mb-2">Benefits:</h4>
        <div className="flex flex-wrap gap-1">
          {service.benefits.slice(0, 2).map((benefit, index) => (
            <span key={index} className="px-2 py-1 text-xs rounded-full bg-success/10 text-success">
              {benefit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Zap className="w-4 h-4" />
            <span>Choose Your Service</span>
          </div>
          <h1 className="text-3xl font-bold text-text mb-4">What type of consultation do you need?</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Select the service that best matches your needs. All our consultations are personalized
            and tailored to your specific goals and challenges.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Service Comparison Table */}
        <div className="enterprise-card mb-8">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text">Service Comparison</h3>
            <p className="text-sm text-muted">Compare features and pricing across all services</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                    Bookings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className={`cursor-pointer hover:bg-hover transition-colors ${
                      selectedService === service.id ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => handleSelectService(service.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                          <service.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text">{service.name}</div>
                          <div className="text-xs text-muted">{service.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                      {service.duration}min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                      ${service.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent" />
                        <span className="text-sm text-text">{service.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                      {service.bookingsCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end">
          <button
            className={`enterprise-btn enterprise-btn--primary enterprise-btn--lg ${
              !selectedService ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!selectedService}
          >
            Choose Consultant
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingService;
