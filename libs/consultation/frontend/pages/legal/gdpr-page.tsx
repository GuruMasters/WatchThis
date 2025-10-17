import { SectionAngle } from '../../components/layout/SectionAngle';
import React from 'react';
import { PageLayout } from '../../components/layout/page-layout';
import {
  Shield,
  Eye,
  Lock,
  Database,
  Mail,
  Phone,
  Globe,
  Users,
  CheckCircle,
  AlertTriangle,
  Calendar,
  FileText,
  Settings,
  Clock
} from 'lucide-react';

const GdprPage: React.FC = () => {
  const lastUpdated = 'January 15, 2024';

  const gdprPrinciples = [
    {
      title: 'Lawfulness, Fairness and Transparency',
      description: 'We process personal data lawfully, fairly and in a transparent manner in relation to the data subject.',
      icon: Shield,
      details: [
        'Clear privacy notices and policies',
        'Explicit consent where required',
        'Legitimate business purposes',
        'Transparent data processing activities'
      ]
    },
    {
      title: 'Purpose Limitation',
      description: 'We collect personal data for specified, explicit and legitimate purposes and do not process it in a manner incompatible with those purposes.',
      icon: Eye,
      details: [
        'Data collected for specific purposes only',
        'No repurposing without consent',
        'Clear purpose specification',
        'Limited data retention periods'
      ]
    },
    {
      title: 'Data Minimization',
      description: 'We ensure that personal data is adequate, relevant and limited to what is necessary in relation to the purposes for which it is processed.',
      icon: Database,
      details: [
        'Collect only necessary data',
        'Regular data audits',
        'Data deletion when no longer needed',
        'Privacy by design principles'
      ]
    },
    {
      title: 'Accuracy',
      description: 'We take every reasonable step to ensure that personal data is accurate and kept up to date.',
      icon: CheckCircle,
      details: [
        'Data accuracy verification',
        'Regular data quality checks',
        'User correction mechanisms',
        'Timely updates and corrections'
      ]
    },
    {
      title: 'Storage Limitation',
      description: 'We keep personal data in a form which permits identification of data subjects for no longer than necessary.',
      icon: Clock,
      details: [
        'Defined retention periods',
        'Automatic data deletion',
        'Regular cleanup processes',
        'Legal hold capabilities'
      ]
    },
    {
      title: 'Integrity and Confidentiality',
      description: 'We process personal data in a manner that ensures appropriate security of the personal data.',
      icon: Lock,
      details: [
        'Encryption in transit and at rest',
        'Access controls and authentication',
        'Regular security assessments',
        'Incident response procedures'
      ]
    }
  ];

  const userRights = [
    {
      title: 'Right to Access',
      description: 'You have the right to obtain confirmation about whether we process your personal data and access to that data.',
      icon: Eye
    },
    {
      title: 'Right to Rectification',
      description: 'You have the right to have inaccurate personal data corrected and incomplete data completed.',
      icon: Settings
    },
    {
      title: 'Right to Erasure',
      description: 'You have the right to have your personal data deleted in certain circumstances (right to be forgotten).',
      icon: FileText
    },
    {
      title: 'Right to Restriction',
      description: 'You have the right to restrict the processing of your personal data in certain situations.',
      icon: Shield
    },
    {
      title: 'Right to Data Portability',
      description: 'You have the right to receive your personal data in a structured, commonly used format.',
      icon: Database
    },
    {
      title: 'Right to Object',
      description: 'You have the right to object to the processing of your personal data for direct marketing purposes.',
      icon: Users
    }
  ];

  const dataProcessing = [
    {
      category: 'Service Provision',
      purpose: 'Delivering our consulting and development services',
      legalBasis: 'Contract performance',
      dataTypes: ['Contact information', 'Project details', 'Communication history'],
      retention: 'Duration of service agreement + 3 years'
    },
    {
      category: 'Marketing',
      purpose: 'Sending promotional materials and newsletters',
      legalBasis: 'Consent (opt-in)',
      dataTypes: ['Email address', 'Name', 'Marketing preferences'],
      retention: 'Until consent withdrawal'
    },
    {
      category: 'Analytics',
      purpose: 'Improving our services and user experience',
      legalBasis: 'Legitimate interest',
      dataTypes: ['Usage data', 'Performance metrics', 'User behavior'],
      retention: '26 months'
    },
    {
      category: 'Legal Compliance',
      purpose: 'Meeting legal and regulatory requirements',
      legalBasis: 'Legal obligation',
      dataTypes: ['Transaction records', 'Legal documents', 'Compliance data'],
      retention: 'As required by law (up to 7 years)'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Data Protection Officer',
      value: 'dpo@consultationpro.com',
      description: 'For GDPR-related inquiries'
    },
    {
      icon: Phone,
      title: 'EU Representative',
      value: '+44 20 7123 4567',
      description: 'For EU data subjects'
    }
  ];

  return (
    <PageLayout
      title="GDPR Compliance"
      description="Learn about our GDPR compliance measures and your data protection rights under European privacy law."
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-lg opacity-30"></div>
                <div className="relative w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              GDPR <span className="text-primary-600">Compliance</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR).
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Overview */}
      <SectionAngle color="yellow" cut="top" paddingClass="py-16">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                GDPR <span className="text-primary-600">Principles</span>
              </h2>
              <p className="text-lg text-gray-600">
                We process personal data in accordance with the six core principles of the GDPR.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gdprPrinciples.map((principle, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{principle.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{principle.description}</p>
                  <ul className="space-y-1">
                    {principle.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        </div>
      </SectionAngle>

      {/* User Rights */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6">
                Your <span className="text-primary-600">Rights</span>
              </h2>
              <p className="text-xl text-gray-600">
                Under GDPR, you have comprehensive rights regarding your personal data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userRights.map((right, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <right.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{right.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{right.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Processing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6">
                Data <span className="text-primary-600">Processing</span>
              </h2>
              <p className="text-xl text-gray-600">
                Overview of how we process personal data and the legal basis for each processing activity.
              </p>
            </div>

            <div className="space-y-6">
              {dataProcessing.map((processing, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{processing.category}</h3>
                      <p className="text-gray-600 mb-3">{processing.purpose}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                          Legal Basis: {processing.legalBasis}
                        </span>
                        <span className="text-gray-500">Retention: {processing.retention}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Data Types</h4>
                      <ul className="space-y-1">
                        {processing.dataTypes.map((type, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6">
                Contact Our <span className="text-primary-600">DPO</span>
              </h2>
              <p className="text-xl text-gray-600">
                Our Data Protection Officer is available to assist with GDPR-related inquiries and requests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{contact.title}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{contact.value}</p>
                  <p className="text-gray-600 text-sm">{contact.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black mb-6 text-gray-900">GDPR Compliance Statement</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              WatchThis is committed to full compliance with the General Data Protection Regulation (GDPR).
              We have implemented comprehensive data protection measures and maintain transparency in all our data processing activities.
            </p>
            <div className="bg-white shadow-sm p-6 rounded-xl border border-gray-200">
              <p className="text-gray-600">
                We regularly review and update our privacy practices to ensure continued compliance with GDPR requirements and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GdprPage;
