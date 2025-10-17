import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  MessageSquare,
  Phone,
  Video,
  CheckCircle,
  User,
  Award,
  MapPin
} from 'lucide-react';

interface Consultant {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  specialties: string[];
  experience: string;
  availability: string;
  responseTime: string;
  bio: string;
  meetingTypes: string[];
  location: string;
}

export const ConsultantSelection: React.FC = () => {
  const [selectedConsultant, setSelectedConsultant] = React.useState<string | null>(null);

  const consultants: Consultant[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Business Consultant',
      avatar: 'SJ',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 150,
      specialties: ['Business Strategy', 'Digital Transformation', 'Leadership'],
      experience: '8+ years',
      availability: 'Available now',
      responseTime: '< 1 hour',
      bio: 'Experienced business consultant with a proven track record in helping companies scale and optimize their operations.',
      meetingTypes: ['video', 'phone'],
      location: 'New York, NY'
    },
    {
      id: '2',
      name: 'Mike Wilson',
      title: 'Technical Consultant',
      avatar: 'MW',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 120,
      specialties: ['Software Development', 'System Architecture', 'DevOps'],
      experience: '6+ years',
      availability: 'Available in 2 hours',
      responseTime: '< 2 hours',
      bio: 'Technical expert specializing in modern software development practices and cloud architecture.',
      meetingTypes: ['video', 'phone', 'chat'],
      location: 'San Francisco, CA'
    },
    {
      id: '3',
      name: 'Lisa Chen',
      title: 'HR Consultant',
      avatar: 'LC',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 100,
      specialties: ['Talent Management', 'Organizational Development', 'Training'],
      experience: '10+ years',
      availability: 'Available tomorrow',
      responseTime: '< 4 hours',
      bio: 'HR specialist focused on building strong teams and developing effective organizational structures.',
      meetingTypes: ['video', 'phone'],
      location: 'Chicago, IL'
    }
  ];

  const handleSelectConsultant = (consultantId: string) => {
    setSelectedConsultant(consultantId);
    // In real implementation, this would navigate to next step or update booking state
  };

  const ConsultantCard = ({ consultant }: { consultant: Consultant }) => (
    <div
      className={`enterprise-card p-6 cursor-pointer transition-all ${
        selectedConsultant === consultant.id
          ? 'ring-2 ring-primary shadow-lg'
          : 'hover-lift'
      }`}
      onClick={() => handleSelectConsultant(consultant.id)}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">{consultant.avatar}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-text">{consultant.name}</h3>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">${consultant.hourlyRate}</div>
              <div className="text-sm text-muted">per hour</div>
            </div>
          </div>
          <p className="text-muted mb-2">{consultant.title}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent" />
              <span className="font-medium text-text">{consultant.rating}</span>
              <span className="text-muted">({consultant.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted" />
              <span className="text-muted">{consultant.responseTime}</span>
            </div>
          </div>
        </div>
        {selectedConsultant === consultant.id && (
          <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
        )}
      </div>

      {/* Bio */}
      <p className="text-muted text-sm mb-4 leading-relaxed">{consultant.bio}</p>

      {/* Specialties */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text mb-2">Specialties:</h4>
        <div className="flex flex-wrap gap-2">
          {consultant.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Meeting Types & Location */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-text mb-2">Meeting Types:</h4>
          <div className="flex gap-2">
            {consultant.meetingTypes.map((type) => (
              <div key={type} className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center">
                {type === 'video' && <Video className="w-4 h-4 text-primary" />}
                {type === 'phone' && <Phone className="w-4 h-4 text-secondary" />}
                {type === 'chat' && <MessageSquare className="w-4 h-4 text-accent" />}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-text mb-2">Location:</h4>
          <div className="flex items-center gap-1 text-sm text-muted">
            <MapPin className="w-4 h-4" />
            <span>{consultant.location}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="font-semibold text-text">{consultant.experience}</div>
          <div className="text-xs text-muted">Experience</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-text">{consultant.reviews}</div>
          <div className="text-xs text-muted">Reviews</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-success">{consultant.availability}</div>
          <div className="text-xs text-muted">Status</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-text mb-4">Choose Your Consultant</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Select the consultant who best matches your needs and expertise requirements
          </p>
        </div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {consultants.map((consultant) => (
            <ConsultantCard key={consultant.id} consultant={consultant} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button className="enterprise-btn enterprise-btn--outline enterprise-btn--lg">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>

          <button
            className={`enterprise-btn enterprise-btn--primary enterprise-btn--lg ${
              !selectedConsultant ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!selectedConsultant}
          >
            Continue to Schedule
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantSelection;