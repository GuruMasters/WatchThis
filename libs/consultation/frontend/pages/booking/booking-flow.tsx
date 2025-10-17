import React from 'react';
import {
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Users,
  FileText,
  CreditCard
} from 'lucide-react';
import { ServiceSelection } from './service-selection';
import { ConsultantSelection } from './consultant-selection';
import { CalendarSelection } from './calendar-selection';
import { BookingDetails } from './booking-details';
import { BookingConfirmation } from './booking-confirmation';

export interface BookingData {
  service?: {
    id: string;
    name: string;
    duration: number;
    price: number;
    category: string;
  };
  consultant?: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
  };
  dateTime?: {
    date: string;
    time: string;
    timezone: string;
  };
  details?: {
    projectDescription: string;
    goals: string;
    budget: string;
    urgency: 'low' | 'medium' | 'high';
    preferredFormat: 'video' | 'phone' | 'chat';
  };
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

export const BookingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [bookingData, setBookingData] = React.useState<BookingData>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const steps = [
    {
      id: 1,
      name: 'Service',
      description: 'Choose your service',
      icon: FileText,
      component: ServiceSelection
    },
    {
      id: 2,
      name: 'Consultant',
      description: 'Select expert',
      icon: Users,
      component: ConsultantSelection
    },
    {
      id: 3,
      name: 'Schedule',
      description: 'Pick date & time',
      icon: Calendar,
      component: CalendarSelection
    },
    {
      id: 4,
      name: 'Details',
      description: 'Project info',
      icon: FileText,
      component: BookingDetails
    },
    {
      id: 5,
      name: 'Confirm',
      description: 'Review & pay',
      icon: CreditCard,
      component: BookingConfirmation
    }
  ];

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!bookingData.service;
      case 2: return !!bookingData.consultant;
      case 3: return !!bookingData.dateTime;
      case 4: return !!bookingData.details;
      case 5: return !!bookingData.contactInfo;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would submit to your backend
      console.log('Booking submission:', bookingData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success - redirect to dashboard or success page
      alert('Booking confirmed successfully!');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="enterprise-header">
        <button
          onClick={prevStep}
          className="enterprise-btn enterprise-btn--ghost"
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="enterprise-badge enterprise-badge--primary">
            Step {currentStep} of {steps.length}
          </div>
          <div className="enterprise-badge enterprise-badge--info">
            {steps[currentStep - 1].name}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm">
            Save Draft
          </button>
        </div>
      </div>

      <div className="container-max py-8">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const isCompleted = index + 1 < currentStep;
              const isCurrent = index + 1 === currentStep;
              const isClickable = index + 1 < currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => isClickable && setCurrentStep(index + 1)}
                    disabled={!isClickable && !isCurrent}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      isCompleted
                        ? 'bg-primary border-primary text-white'
                        : isCurrent
                        ? 'border-primary text-primary bg-primary/10'
                        : 'border-muted text-muted bg-surface'
                    } ${isClickable ? 'cursor-pointer hover:scale-105' : ''}`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : isCurrent ? (
                      <step.icon className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-sm">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center max-w-32">
                <div className={`font-medium ${
                  index + 1 <= currentStep ? 'text-text' : 'text-muted'
                }`}>
                  {step.name}
                </div>
                <div className="text-muted text-xs mt-1">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <CurrentStepComponent
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            currentStep={currentStep}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          <div>
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="enterprise-btn enterprise-btn--outline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Progress Summary */}
            <div className="hidden md:flex items-center gap-4 text-sm text-muted">
              {bookingData.service && (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  {bookingData.service.name}
                </span>
              )}
              {bookingData.consultant && (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  {bookingData.consultant.name}
                </span>
              )}
              {bookingData.dateTime && (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  {bookingData.dateTime.date} at {bookingData.dateTime.time}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="enterprise-btn enterprise-btn--primary"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="enterprise-btn enterprise-btn--primary enterprise-btn--lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      <span>Confirm Booking</span>
                      <CreditCard className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
