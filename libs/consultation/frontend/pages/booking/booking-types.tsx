import React from 'react';
import {
  Video,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Users,
  Wifi,
  Shield,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';

interface MeetingType {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  features: string[];
  benefits: string[];
  duration: string;
  availability: string;
  technology: string[];
}

export const BookingTypes: React.FC = () => {
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  const meetingTypes: MeetingType[] = [
    {
      id: 'video',
      name: 'Video Call',
      icon: Video,
      color: 'from-primary to-primary-600',
      description: 'Face-to-face video consultation with screen sharing and collaboration tools.',
      features: [
        'High-definition video and audio',
        'Screen sharing capabilities',
        'Real-time collaboration tools',
        'Recording options available'
      ],
      benefits: [
        'Personal connection and visual cues',
        'Perfect for complex discussions',
        'Screen sharing for demonstrations',
        'Best for detailed consultations'
      ],
      duration: '30-120 minutes',
      availability: 'Most popular choice',
      technology: ['Zoom', 'Google Meet', 'Microsoft Teams']
    },
    {
      id: 'phone',
      name: 'Phone Call',
      icon: Phone,
      color: 'from-secondary to-secondary-600',
      description: 'Traditional phone consultation for focused discussions without visual elements.',
      features: [
        'High-quality audio connection',
        'Call recording available',
        'No internet connection required',
        'Mobile and landline support'
      ],
      benefits: [
        'Simple and straightforward',
        'No technical setup required',
        'Perfect for quick consultations',
        'Works anywhere with phone signal'
      ],
      duration: '15-60 minutes',
      availability: 'Always available',
      technology: ['Phone', 'VoIP', 'Mobile']
    },
    {
      id: 'chat',
      name: 'Live Chat',
      icon: MessageSquare,
      color: 'from-accent to-accent-600',
      description: 'Text-based consultation with real-time messaging and file sharing.',
      features: [
        'Real-time text messaging',
        'File and document sharing',
        'Screenshot and image sharing',
        'Asynchronous option available'
      ],
      benefits: [
        'Perfect for detailed technical questions',
        'Great for documentation sharing',
        'No scheduling conflicts',
        'Can be paused and resumed'
      ],
      duration: 'Flexible timing',
      availability: '24/7 availability',
      technology: ['Web Chat', 'Slack', 'WhatsApp']
    }
  ];

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId);
    // In real implementation, this would proceed to next step or update booking state
  };

  const MeetingTypeCard = ({ type }: { type: MeetingType }) => (
    <div
      className={`enterprise-card p-6 cursor-pointer transition-all ${
        selectedType === type.id
          ? 'ring-2 ring-primary shadow-lg'
          : 'hover-lift'
      }`}
      onClick={() => handleSelectType(type.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-glow`}>
            <type.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text">{type.name}</h3>
            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
              {type.availability}
            </span>
          </div>
        </div>
        {selectedType === type.id && (
          <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
        )}
      </div>

      {/* Description */}
      <p className="text-muted text-sm mb-4 leading-relaxed">{type.description}</p>

      {/* Duration & Technology */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-muted" />
          <span className="text-muted">{type.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi className="w-4 h-4 text-muted" />
          <span className="text-muted">{type.technology.join(', ')}</span>
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text mb-2">Features:</h4>
        <ul className="space-y-1">
          {type.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text mb-2">Benefits:</h4>
        <div className="flex flex-wrap gap-1">
          {type.benefits.map((benefit, index) => (
            <span key={index} className="px-2 py-1 text-xs rounded-full bg-success/10 text-success">
              {benefit}
            </span>
          ))}
        </div>
      </div>

      {/* Technology badges */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text mb-2">Supported Platforms:</h4>
        <div className="flex flex-wrap gap-1">
          {type.technology.map((tech, index) => (
            <span key={index} className="px-2 py-1 text-xs rounded-full bg-surface text-muted border border-border">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const ComparisonTable = () => (
    <div className="enterprise-card mt-8">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text">Meeting Type Comparison</h3>
        <p className="text-sm text-muted">Choose the best option for your consultation needs</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Best For
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Setup Required
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted uppercase tracking-wider">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-hover transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text">Video Call</div>
                    <div className="text-xs text-muted">Most comprehensive</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                30-120 min
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                Complex discussions, presentations
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                Camera & microphone
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                High
              </td>
            </tr>
            <tr className="hover:bg-hover transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-secondary-600 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text">Phone Call</div>
                    <div className="text-xs text-muted">Simple & reliable</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                15-60 min
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                Quick consultations, focused talks
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                Phone connection
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                Always
              </td>
            </tr>
            <tr className="hover:bg-hover transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text">Live Chat</div>
                    <div className="text-xs text-muted">Flexible & detailed</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                Flexible
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                Technical questions, documentation
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                Internet connection
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                24/7
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-text mb-4">Choose Meeting Type</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Select the meeting format that works best for your consultation style and technical setup
          </p>
        </div>

        {/* Meeting Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {meetingTypes.map((type) => (
            <MeetingTypeCard key={type.id} type={type} />
          ))}
        </div>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Technical Requirements */}
        <div className="enterprise-card mt-8">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-text">Technical Requirements</h3>
            <p className="text-sm text-muted">Ensure you have the necessary setup for your chosen meeting type</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Video className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h4 className="font-medium text-text mb-2">Video Call</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• Webcam or camera</li>
                  <li>• Microphone</li>
                  <li>• Stable internet</li>
                  <li>• Modern browser</li>
                </ul>
              </div>
              <div className="text-center">
                <Phone className="w-12 h-12 mx-auto mb-3 text-secondary" />
                <h4 className="font-medium text-text mb-2">Phone Call</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• Phone connection</li>
                  <li>• Mobile or landline</li>
                  <li>• VoIP capability</li>
                  <li>• No internet required</li>
                </ul>
              </div>
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-accent" />
                <h4 className="font-medium text-text mb-2">Live Chat</h4>
                <ul className="text-sm text-muted space-y-1">
                  <li>• Internet connection</li>
                  <li>• Modern browser</li>
                  <li>• File sharing capability</li>
                  <li>• Real-time messaging</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button className="enterprise-btn enterprise-btn--outline enterprise-btn--lg">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>

          <button
            className={`enterprise-btn enterprise-btn--primary enterprise-btn--lg ${
              !selectedType ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!selectedType}
          >
            Select Time & Date
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTypes;
