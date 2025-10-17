import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Target,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

export const BookingDetails: React.FC = () => {
  const [formData, setFormData] = React.useState({
    projectTitle: '',
    projectDescription: '',
    goals: '',
    budget: '',
    urgency: 'medium',
    requirements: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.projectTitle.trim()) {
      newErrors.projectTitle = 'Project title is required';
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    }

    if (!formData.goals.trim()) {
      newErrors.goals = 'Project goals are required';
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget range is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // In real implementation, this would proceed to confirmation
    console.log('Booking details submitted:', formData);
  };

  const urgencyOptions = [
    { value: 'low', label: 'Low - Not urgent', color: 'text-success' },
    { value: 'medium', label: 'Medium - Within a few weeks', color: 'text-warning' },
    { value: 'high', label: 'High - ASAP', color: 'text-error' }
  ];

  const budgetRanges = [
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
    'Custom - Let\'s discuss'
  ];

  return (
    <div className="py-8">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-text mb-4">Project Details</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Tell us about your project so we can provide the best consultation experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Project Information */}
          <div className="enterprise-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text">Project Information</h2>
                <p className="text-muted">Basic details about your project or consultation needs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Title */}
              <div className="md:col-span-2">
                <label htmlFor="projectTitle" className="block text-sm font-medium text-text mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  className={`enterprise-form-input ${errors.projectTitle ? 'border-error' : ''}`}
                  placeholder="e.g., E-commerce Website Redesign"
                />
                {errors.projectTitle && (
                  <p className="text-error text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.projectTitle}
                  </p>
                )}
              </div>

              {/* Project Description */}
              <div className="md:col-span-2">
                <label htmlFor="projectDescription" className="block text-sm font-medium text-text mb-2">
                  Project Description *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  rows={4}
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  className={`enterprise-form-input resize-vertical ${errors.projectDescription ? 'border-error' : ''}`}
                  placeholder="Describe your project, current situation, and what you're looking to achieve..."
                />
                {errors.projectDescription && (
                  <p className="text-error text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.projectDescription}
                  </p>
                )}
                <p className="text-muted text-sm mt-1">
                  Provide as much detail as possible to help your consultant prepare effectively.
                </p>
              </div>

              {/* Goals */}
              <div className="md:col-span-2">
                <label htmlFor="goals" className="block text-sm font-medium text-text mb-2">
                  Project Goals & Objectives *
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={3}
                  value={formData.goals}
                  onChange={handleInputChange}
                  className={`enterprise-form-input resize-vertical ${errors.goals ? 'border-error' : ''}`}
                  placeholder="What specific outcomes are you looking to achieve? What success metrics are important to you?"
                />
                {errors.goals && (
                  <p className="text-error text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.goals}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Requirements & Preferences */}
          <div className="enterprise-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text">Requirements & Preferences</h2>
                <p className="text-muted">Specific requirements and timeline preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-text mb-2">
                  Budget Range *
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`enterprise-form-input ${errors.budget ? 'border-error' : ''}`}
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="text-error text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.budget}
                  </p>
                )}
              </div>

              {/* Urgency */}
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-text mb-2">
                  Project Urgency
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="enterprise-form-input"
                >
                  {urgencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Requirements */}
              <div className="md:col-span-2">
                <label htmlFor="requirements" className="block text-sm font-medium text-text mb-2">
                  Specific Requirements (Optional)
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={3}
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="enterprise-form-input resize-vertical"
                  placeholder="Any specific technical requirements, skills needed, or constraints..."
                />
              </div>

              {/* Additional Notes */}
              <div className="md:col-span-2">
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-text mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  className="enterprise-form-input resize-vertical"
                  placeholder="Any other information that might be helpful for your consultant to know..."
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="enterprise-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text">What Happens Next?</h2>
                <p className="text-muted">Understanding the consultation process</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="font-medium text-text mb-2">Consultant Review</h3>
                <p className="text-sm text-muted">
                  Your consultant will review your project details and prepare for the session.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="font-medium text-text mb-2">Confirmation</h3>
                <p className="text-sm text-muted">
                  You'll receive confirmation and any preparation materials needed.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="font-medium text-text mb-2">Consultation</h3>
                <p className="text-sm text-muted">
                  Join your scheduled consultation session with your chosen consultant.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button type="button" className="enterprise-btn enterprise-btn--outline enterprise-btn--lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Consultant
            </button>

            <button type="submit" className="enterprise-btn enterprise-btn--primary enterprise-btn--lg">
              Review Booking
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingDetails;
