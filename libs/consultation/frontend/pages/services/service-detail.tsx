import React from 'react';
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Clock,
  Award,
  Target,
  Zap,
  Shield,
  Cloud,
  Smartphone,
  Globe,
  Database,
  Code,
  TrendingUp,
  Building2
} from 'lucide-react';

interface ServiceDetailProps {
  serviceId: string;
  onBack: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, onBack }) => {
  // Mock service data - in real implementation, this would be fetched based on serviceId
  const service = {
    id: serviceId,
    name: 'Custom Web Application Development',
    category: 'Web Development',
    icon: Code,
    fullDescription: 'We specialize in developing custom web applications that perfectly align with your business processes. We use modern technologies like React, Node.js, and cloud solutions for scalability and performance.',
    features: [
      'Custom UI/UX design',
      'Integration with existing systems',
      'Performance and security optimization',
      'Continuous support and maintenance',
      'API development and integration',
      'Database design and optimization',
      'Mobile-responsive design',
      'SEO optimization'
    ],
    benefits: [
      'Tailored to your specific needs',
      'Scalable architecture',
      'High performance and reliability',
      'Security-first approach',
      'Ongoing support and updates'
    ],
    deliverables: [
      'Complete source code',
      'Technical documentation',
      'User manuals',
      'Training sessions',
      '90-day warranty period'
    ],
    pricing: [
      { name: 'Basic Package', price: '$15,000', duration: '8 weeks', features: ['Core functionality', 'Basic UI/UX', 'Database setup'] },
      { name: 'Professional Package', price: '$35,000', duration: '16 weeks', features: ['Advanced features', 'Custom integrations', 'Performance optimization'] },
      { name: 'Enterprise Package', price: '$75,000+', duration: '24 weeks', features: ['Full customization', 'Advanced security', '24/7 support'] }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'],
    caseStudies: [
      {
        client: 'Manufacturing Corp',
        project: 'Digital Transformation',
        results: ['60% reduction in operational costs', '90% improvement in process efficiency', 'Complete digital workflow'],
        rating: 5
      },
      {
        client: 'Professional Services',
        project: 'Process Optimization',
        results: ['40% increase in productivity', '25% reduction in errors', 'Improved client satisfaction scores'],
        rating: 5
      }
    ]
  };

  return (
    <div className="py-8">
      <div className="container-max">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm mb-8"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Service Overview */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-glow">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text mb-2">{service.name}</h1>
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                  {service.category}
                </span>
              </div>
            </div>

            <p className="text-lg text-muted mb-8 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-text">4.9</span>
                </div>
                <p className="text-sm text-muted">Client Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-text">50+</span>
                </div>
                <p className="text-sm text-muted">Projects Completed</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text mb-4">Key Features</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text mb-4">Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-muted">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Image */}
          <div>
            <img
              src="https://via.placeholder.com/600x400?text=Web+Application+Development"
              alt={service.name}
              className="rounded-xl shadow-card-lg w-full h-auto object-cover transform-3d hover-lift"
            />

            {/* Technologies */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-text mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-surface text-muted border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="enterprise-card mb-12">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-text">Pricing Packages</h2>
            <p className="text-muted">Choose the package that best fits your needs and budget</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.pricing.map((tier, index) => (
                <div
                  key={index}
                  className={`enterprise-card p-6 ${
                    index === 1 ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-text mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-1">{tier.price}</div>
                    <div className="text-sm text-muted">{tier.duration}</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted">
                        <CheckCircle className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full enterprise-btn ${
                    index === 1
                      ? 'enterprise-btn--primary'
                      : 'enterprise-btn--outline'
                  } enterprise-btn--lg`}>
                    Choose This Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="enterprise-card mb-12">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-text">Success Stories</h2>
            <p className="text-muted">See how we've helped other clients achieve their goals</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.caseStudies.map((study, index) => (
                <div key={index} className="enterprise-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text">{study.client}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(study.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-medium text-primary mb-3">{study.project}</h4>
                  <ul className="space-y-2">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted">
                        <CheckCircle className="w-4 h-4 text-success" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="enterprise-card enterprise-card--glass p-12 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create a custom solution that drives your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="enterprise-btn enterprise-btn--primary enterprise-btn--lg">
              Schedule Free Consultation
            </button>
            <button className="enterprise-btn enterprise-btn--outline enterprise-btn--lg">
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
