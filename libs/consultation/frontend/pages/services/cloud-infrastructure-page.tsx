import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, Cloud, Server, Database, Shield, Zap, Lock, Activity, Layers, Box, MessageSquare, BarChart3, Globe, Network, Code, Container, Palette, Eye, Workflow, GitBranch } from 'lucide-react';

/**
 * Cloud & Infrastructure Service Page
 * Featuring animated cloud architecture and data flow
 */

// Cloud Provider Official Logos
const AWSLogo: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
    alt="AWS"
    style={{
      width: `${size}px`,
      height: 'auto',
      maxHeight: `${size * 0.7}px`,
      filter: 'brightness(0) invert(1)', // Makes it white
      objectFit: 'contain'
    }}
  />
);

const GoogleCloudLogo: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <img 
    src="https://www.gstatic.com/images/branding/product/2x/google_cloud_96dp.png"
    alt="Google Cloud"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      objectFit: 'contain'
    }}
  />
);

const AzureLogo: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
    alt="Microsoft Azure"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      objectFit: 'contain'
    }}
  />
);

// Mac Browser Window Component
const MacBrowserWindow: React.FC<{ children: React.ReactNode; url: string }> = ({ children, url }) => (
  <div style={{
    background: '#1E1E1E',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <div style={{
      background: '#2D2D2D',
      padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px, 2vw, 12px)'
    }}>
      <div style={{ display: 'flex', gap: 'clamp(4px, 1vw, 8px)' }}>
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#28C840' }} />
      </div>
      <div style={{
        flex: 1,
        background: '#1E1E1E',
        borderRadius: 'clamp(4px, 1vw, 6px)',
        padding: 'clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px)',
        fontSize: 'clamp(10px, 2.5vw, 13px)',
        color: '#999',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {url}
      </div>
    </div>
    <div>{children}</div>
  </div>
);

const CloudAnimationSection: React.FC = () => {
  const [activeCloud, setActiveCloud] = useState(0);
  const [dataFlow, setDataFlow] = useState(0);
  const [networkPulse, setNetworkPulse] = useState(0);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  const cloudPlatforms = [
    { 
      name: 'AWS', 
      color: '#FF9900',
      gradient: 'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
      services: ['EC2', 'S3', 'Lambda', 'RDS']
    },
    { 
      name: 'Google Cloud', 
      color: '#4285F4',
      gradient: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
      services: ['Compute', 'Storage', 'Functions', 'Firestore']
    },
    { 
      name: 'Azure', 
      color: '#0089D6',
      gradient: 'linear-gradient(135deg, #0089D6 0%, #00BCF2 100%)',
      services: ['VMs', 'Storage', 'Functions', 'Cosmos DB']
    }
  ];

  // Initialize floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkPulse((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCloud((prev) => (prev + 1) % cloudPlatforms.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [cloudPlatforms.length]);

  const platform = cloudPlatforms[activeCloud];

  // Different network topologies for each platform
  const getNetworkTopology = () => {
    switch (activeCloud) {
      case 0: // AWS - Serverless Microservices Architecture
        return {
          nodes: [
            { x: 50, y: 15 },  // API Gateway (Entry Point)
            { x: 30, y: 35 },  // Lambda Functions
            { x: 70, y: 35 },  // Cognito (Auth)
            { x: 20, y: 60 },  // DynamoDB
            { x: 50, y: 60 },  // S3 Storage
            { x: 80, y: 60 },  // Step Functions
            { x: 35, y: 85 },  // SQS Queue
            { x: 65, y: 85 },  // CloudWatch
          ],
          connections: [
            { from: 0, to: 1 }, { from: 0, to: 2 },  // API Gateway to Lambda & Cognito
            { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 1, to: 5 },  // Lambda to DB, S3, Step Functions
            { from: 2, to: 1 },  // Cognito auth to Lambda
            { from: 5, to: 3 }, { from: 5, to: 6 },  // Step Functions to DynamoDB & SQS
            { from: 3, to: 6 }, { from: 4, to: 6 },  // DynamoDB & S3 to SQS
            { from: 1, to: 7 }, { from: 5, to: 7 }  // Lambda & Step Functions to CloudWatch
          ],
          icons: ['loadbalancer', 'zap', 'shield', 'database', 'storage', 'layers', 'messaging', 'monitoring'],
          labels: ['API Gateway', 'Lambda', 'Cognito', 'DynamoDB', 'S3', 'Step Functions', 'SQS', 'CloudWatch']
        };
      
      case 1: // Google Cloud - Cloud-Native App Architecture
        return {
          nodes: [
            { x: 50, y: 15 },  // Cloud Load Balancer
            { x: 30, y: 35 },  // Cloud Run
            { x: 70, y: 35 },  // Firebase Auth
            { x: 20, y: 60 },  // Firestore
            { x: 50, y: 60 },  // Cloud Storage
            { x: 80, y: 60 },  // Pub/Sub
            { x: 35, y: 85 },  // Cloud Functions
            { x: 65, y: 85 },  // BigQuery
          ],
          connections: [
            { from: 0, to: 1 }, { from: 0, to: 2 },  // Load Balancer to Cloud Run & Auth
            { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 1, to: 5 },  // Cloud Run to Firestore, Storage, Pub/Sub
            { from: 2, to: 1 },  // Auth to Cloud Run
            { from: 5, to: 6 },  // Pub/Sub triggers Functions
            { from: 6, to: 3 }, { from: 6, to: 7 },  // Functions to Firestore & BigQuery
            { from: 3, to: 7 }, { from: 4, to: 5 }  // Firestore to BigQuery, Storage to Pub/Sub
          ],
          icons: ['loadbalancer', 'server', 'shield', 'database', 'storage', 'messaging', 'zap', 'analytics'],
          labels: ['Load Balancer', 'Cloud Run', 'Firebase Auth', 'Firestore', 'Storage', 'Pub/Sub', 'Functions', 'BigQuery']
        };
      
      case 2: // Azure - Enterprise Application Architecture
        return {
          nodes: [
            { x: 50, y: 12 },  // Azure Front Door
            { x: 30, y: 30 },  // App Services
            { x: 70, y: 30 },  // Azure Functions
            { x: 20, y: 52 },  // Cosmos DB
            { x: 50, y: 52 },  // Blob Storage
            { x: 80, y: 52 },  // Service Bus
            { x: 20, y: 72 },  // Azure AD B2C
            { x: 50, y: 72 },  // Redis Cache
            { x: 80, y: 72 },  // Event Grid
            { x: 50, y: 90 },  // Application Insights
          ],
          connections: [
            { from: 0, to: 1 }, { from: 0, to: 2 },  // Front Door to App Services & Functions
            { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 1, to: 7 },  // App Services to Cosmos, Storage, Cache
            { from: 2, to: 5 }, { from: 2, to: 8 },  // Functions to Service Bus & Event Grid
            { from: 6, to: 1 }, { from: 6, to: 2 },  // Azure AD to App & Functions
            { from: 5, to: 2 }, { from: 8, to: 2 },  // Service Bus & Event Grid to Functions
            { from: 3, to: 5 }, { from: 4, to: 5 },  // Cosmos & Storage to Service Bus
            { from: 1, to: 9 }, { from: 2, to: 9 }, { from: 7, to: 9 }  // Monitoring to App Insights
          ],
          icons: ['globe', 'server', 'zap', 'database', 'storage', 'messaging', 'shield', 'layers', 'server', 'monitoring'],
          labels: ['Front Door', 'App Services', 'Functions', 'Cosmos DB', 'Blob Storage', 'Service Bus', 'Azure AD', 'Redis Cache', 'Event Grid', 'App Insights']
        };
      
      default:
        return getNetworkTopology();
    }
  };

  const topology = getNetworkTopology();

  return (
    <section style={{
      padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${platform.color}15 1px, transparent 1px),
          linear-gradient(90deg, ${platform.color}15 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        animation: 'gridMove 20s linear infinite'
      }} />

      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden'
      }}>
        {particles.map((particle, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: platform.color,
              boxShadow: `0 0 10px ${platform.color}`,
              animation: `particleFloat ${8 + particle.delay}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Radial Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${platform.color}15 0%, transparent 70%)`,
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite'
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(40px, 8vw, 80px)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: `${platform.color}20`,
            border: `1px solid ${platform.color}50`,
            borderRadius: '100px',
            padding: 'clamp(6px, 2vw, 10px) clamp(12px, 3vw, 24px)',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            backdropFilter: 'blur(10px)'
          }}>
            <Cloud size={16} color={platform.color} strokeWidth={2} />
            <span style={{
              color: platform.color,
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Cloud Infrastructure
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            <span style={{
              color: '#FFFFFF'
            }}>
              Distributed Network
            </span>
            <br />
            <span style={{
              color: platform.color
            }}>
              Architecture
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Real-time cloud infrastructure with global distribution
          </p>
        </div>

        {/* Main Browser Window - Smaller */}
        <div style={{
          maxWidth: 'clamp(280px, 75vw, 700px)',
          margin: '0 auto',
          padding: '0 clamp(8px, 2vw, 16px)'
        }}>
          <MacBrowserWindow url={`${platform.name.toLowerCase()}.cloud-network`}>
            <div style={{
              background: '#0A0A0A',
              padding: 'clamp(20px, 4vw, 40px)',
              position: 'relative',
              minHeight: activeCloud === 2 ? '500px' : '420px',
              transition: 'min-height 0.5s ease'
            }}>
              {/* Network Visualization */}
              <div 
                key={activeCloud}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: activeCloud === 2 ? '440px' : activeCloud === 0 ? '380px' : '350px',
                  transition: 'all 0.5s ease'
                }}
              >
                {/* Connection Lines */}
                <svg style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%'
                }}>
                  {topology.connections.map((conn, i) => (
                    <line
                      key={i}
                      x1={`${topology.nodes[conn.from].x}%`}
                      y1={`${topology.nodes[conn.from].y}%`}
                      x2={`${topology.nodes[conn.to].x}%`}
                      y2={`${topology.nodes[conn.to].y}%`}
                      stroke={platform.color}
                      strokeWidth="2"
                      opacity="0.25"
                      style={{
                        filter: `drop-shadow(0 0 3px ${platform.color})`,
                        transition: 'all 0.5s ease'
                      }}
                    />
                  ))}
                </svg>

                {/* Network Nodes */}
                {topology.nodes.map((node, i) => {
                  const iconType = topology.icons[i];
                  const label = topology.labels[i];
                  const isMainNode = i === 0;
                  
                  // Render appropriate icon based on service type
                  const renderIcon = () => {
                    const size = clamp(16, 3, 20);
                    const mainSize = clamp(50, 8, 70); // Larger logo size
                    const color = isMainNode ? "#FFFFFF" : platform.color;
                    
                    // Main hub logos - larger and visible
                    if (isMainNode) {
                      if (activeCloud === 0) return <AWSLogo size={mainSize} />;
                      if (activeCloud === 1) return <GoogleCloudLogo size={mainSize} />;
                      if (activeCloud === 2) return <AzureLogo size={mainSize} />;
                    }
                    
                    // Service-specific icons
                    const iconMap: { [key: string]: React.ReactElement } = {
                      'server': <Server size={size} color={color} />,
                      'database': <Database size={size} color={color} />,
                      'zap': <Zap size={size} color={color} />,
                      'shield': <Lock size={size} color={color} />,
                      'cloud': <Cloud size={size} color={color} />,
                      'loadbalancer': <Network size={size} color={color} />,
                      'messaging': <MessageSquare size={size} color={color} />,
                      'analytics': <BarChart3 size={size} color={color} />,
                      'monitoring': <Activity size={size} color={color} />,
                      'storage': <Box size={size} color={color} />,
                      'layers': <Layers size={size} color={color} />,
                      'globe': <Globe size={size} color={color} />
                    };
                    
                    return iconMap[iconType] || <Cloud size={size} color={color} />;
                  };

                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                        transition: 'all 0.5s ease'
                      }}
                    >
                      {isMainNode ? (
                        // Main Hub - Logo without circle
                        <>
          <div style={{
            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            filter: `drop-shadow(0 0 20px ${platform.color}80)`,
                            animation: 'mainPulse 3s ease-in-out infinite',
                            padding: '5px'
                          }}>
                            {renderIcon()}
                          </div>
                          <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 5px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: 'clamp(10px, 2.2vw, 12px)',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                          }}>
                            {label}
                          </div>
                        </>
                      ) : (
                        // Service Nodes
                        <>
              <div style={{
                            width: 'clamp(40px, 8vw, 50px)',
                            height: 'clamp(40px, 8vw, 50px)',
                borderRadius: '50%',
                            background: `linear-gradient(135deg, ${platform.color}40 0%, ${platform.color}20 100%)`,
                            border: `2px solid ${platform.color}80`,
                            backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                            boxShadow: `0 0 20px ${platform.color}60`,
                            animation: `nodePulse 2s ease-in-out infinite`,
                            animationDelay: `${i * 0.3}s`
                          }}>
                            {renderIcon()}
              </div>
              <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 4px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: 'clamp(9px, 2vw, 11px)',
                fontWeight: 600,
                            color: platform.color,
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
              }}>
                            {label}
              </div>
                        </>
                      )}
                      
                      {/* Data Flow Particles */}
                      {i > 0 && i <= 3 && (
                  <div
                    style={{
                      position: 'absolute',
                            width: '6px',
                            height: '6px',
                      borderRadius: '50%',
                      background: platform.color,
                            boxShadow: `0 0 10px ${platform.color}`,
                            left: `${-50 + (dataFlow + i * 25) % 100}%`,
                            top: '50%',
                            animation: 'dataFlow 2s linear infinite',
                            animationDelay: `${i * 0.3}s`
                          }}
                        />
                      )}
                </div>
                  );
                })}
            </div>

              {/* Status Bar */}
            <div style={{
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'space-around',
                gap: 'clamp(6px, 1.5vw, 10px)',
                flexWrap: 'wrap'
            }}>
              {[
                { label: 'Uptime', value: '99.99%' },
                  { label: 'Latency', value: '<50ms' },
                  { label: 'Status', value: 'Active' }
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                      flex: 1,
                      minWidth: '80px',
                      textAlign: 'center',
                      padding: 'clamp(8px, 2vw, 12px)',
                    background: `${platform.color}10`,
                    border: `1px solid ${platform.color}30`,
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)'
                  }}
                >
                  <div style={{
                      fontSize: 'clamp(14px, 3vw, 18px)',
                    fontWeight: 700,
                    color: platform.color,
                      marginBottom: '2px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                      fontSize: 'clamp(9px, 2vw, 11px)',
                      color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </MacBrowserWindow>

        {/* Platform Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
            gap: 'clamp(8px, 2vw, 12px)',
            marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          {cloudPlatforms.map((plat, i) => (
            <button
              key={i}
              onClick={() => setActiveCloud(i)}
              style={{
                  padding: 'clamp(8px, 2vw, 10px) clamp(14px, 3vw, 20px)',
                  borderRadius: '10px',
                  background: activeCloud === i ? `${plat.color}25` : 'rgba(255,255,255,0.05)',
                  color: activeCloud === i ? plat.color : 'rgba(255,255,255,0.6)',
                  fontSize: 'clamp(11px, 2.5vw, 13px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                  border: activeCloud === i ? `2px solid ${plat.color}` : '2px solid transparent',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (activeCloud !== i) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCloud !== i) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
              >
                {plat.name}
            </button>
          ))}
        </div>
        </div>
    </div>

    <style>{`
      @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
      }

      @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }

        @keyframes mainPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.95; }
        }

        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.6; }
          25% { transform: translate(20px, -30px); opacity: 0.8; }
          50% { transform: translate(-15px, -60px); opacity: 1; }
          75% { transform: translate(25px, -40px); opacity: 0.8; }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes dataFlow {
          0% { transform: translateX(-100px) translateY(-50%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100px) translateY(-50%); opacity: 0; }
      }
    `}</style>
    </section>
  );
};

// Helper function for responsive sizing
const clamp = (min: number, vw: number, max: number) => {
  if (typeof window === 'undefined') return max;
  const value = (window.innerWidth * vw) / 100;
  return Math.min(Math.max(value, min), max);
};

export const CloudInfrastructurePage: React.FC = () => {
  const cloudServices = [
    {
      icon: Cloud,
      title: 'Cloud Solutions & Migration',
      color: '#FF9900',
      gradient: 'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
      summary: 'Build flexible, secure, and scalable cloud environments that grow together with your business.',
      features: [
        'We architect and execute comprehensive cloud migration strategies that move your existing systems to AWS, Azure, or Google Cloud with zero downtime, ensuring business continuity while unlocking the scalability and cost-efficiency of cloud infrastructure.',
        'Our hybrid and multi-cloud solutions provide the best of both worlds, allowing you to maintain critical on-premise systems while leveraging cloud capabilities for flexibility, disaster recovery, and geographic distribution of your services.',
        'We provide ongoing cloud maintenance and scaling services that automatically adjust resources based on demand, ensuring optimal performance during peak times while minimizing costs during low-traffic periods through intelligent resource management and auto-scaling configurations.'
      ]
    },
    {
      icon: GitBranch,
      title: 'Cloud Infrastructure & DevOps',
      color: '#0089D6',
      gradient: 'linear-gradient(135deg, #0089D6 0%, #00BCF2 100%)',
      summary: 'Automate, accelerate, and stabilize your development process with modern DevOps practices.',
      features: [
        'We implement complete CI/CD pipelines that automate your entire software delivery process from code commit to production deployment, reducing release cycles from weeks to hours while maintaining quality through automated testing, security scanning, and approval workflows.',
        'Our containerization expertise with Docker and Kubernetes transforms your applications into portable, scalable units that run consistently across any environment, enabling seamless deployment, easy scaling, and efficient resource utilization across your entire infrastructure.',
        'We establish comprehensive deployment management and performance monitoring systems that provide real-time insights into application health, automatically detect anomalies, trigger alerts, and even self-heal common issues, ensuring maximum uptime and optimal user experience.'
      ]
    },
    {
      icon: Box,
      title: 'SaaS / PaaS / IaaS Development',
      color: '#4285F4',
      gradient: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
      summary: 'Enable software development that is delivered and used from the cloud.',
      features: [
        'We build custom SaaS platforms from the ground up, handling everything from multi-tenant architecture and subscription management to usage analytics and billing integration, creating scalable products that can serve millions of users worldwide with consistent performance and security.',
        'Our PaaS integration expertise accelerates your development cycle by leveraging managed services for databases, authentication, messaging, and other infrastructure components, allowing your team to focus on business logic rather than infrastructure management.',
        'We provide Infrastructure as a Service solutions that give you complete control over your computing resources with the flexibility to scale instantly as your needs change, eliminating the need for capital investment in hardware while maintaining the customization and control of traditional infrastructure.'
      ]
    },
    {
      icon: Network,
      title: 'API & System Integrations',
      color: '#0F9D58',
      gradient: 'linear-gradient(135deg, #0F9D58 0%, #0F9D58 100%)',
      summary: 'Connect your applications so they mutually understand data and users.',
      features: [
        'We design and implement RESTful and GraphQL APIs that serve as the backbone of your digital ecosystem, enabling seamless communication between your applications, third-party services, and client applications with optimal performance, clear documentation, and versioning strategies.',
        'Our system integration expertise connects disparate business systems including ERP, CRM, and CMS platforms, creating a unified data flow that eliminates manual data entry, reduces errors, and provides a single source of truth across your entire organization.',
        'We implement robust authentication and security layers including OAuth2, JWT, and API key management that protect your services from unauthorized access while providing smooth user experiences, rate limiting to prevent abuse, and comprehensive logging for security auditing and compliance.'
      ]
    },
    {
      icon: Palette,
      title: 'User Interface (UI) Design',
      color: '#DB4437',
      gradient: 'linear-gradient(135deg, #DB4437 0%, #EA4335 100%)',
      summary: 'Design experiences that users love — clear, fast, and simple.',
      features: [
        'We craft intuitive, responsive, and modern interfaces that work flawlessly across all devices and screen sizes, ensuring your users have a consistent and delightful experience whether they are on desktop, tablet, or mobile, with careful attention to typography, spacing, and visual hierarchy.',
        'Our user flow mapping and prototyping process visualizes the complete user journey before a single line of code is written, identifying potential pain points and optimizing paths to conversion, allowing for rapid iteration and validation of design concepts with real users.',
        'We create comprehensive design systems and component libraries that ensure visual and functional consistency across your entire product suite, accelerating development time, reducing bugs, and maintaining brand integrity as your product scales and evolves.'
      ]
    },
    {
      icon: Eye,
      title: 'User Experience (UX) Optimization',
      color: '#F4B400',
      gradient: 'linear-gradient(135deg, #F4B400 0%, #FBBC04 100%)',
      summary: 'Optimize every interaction between users and your product.',
      features: [
        'We conduct deep user behavior analysis using heatmaps, session recordings, and analytics to understand exactly how users interact with your product, identifying friction points, abandoned flows, and opportunities for optimization that directly impact your conversion rates and user satisfaction.',
        'Our prototype testing and user satisfaction analysis involves real users at every stage of development, gathering quantitative metrics and qualitative feedback that guide design decisions, ensuring the final product not only looks great but solves real user problems effectively.',
        'We systematically improve navigation and usability through A/B testing, user interviews, and expert heuristic evaluation, making data-driven recommendations that enhance discoverability, reduce cognitive load, and guide users naturally toward their goals and your business objectives.'
      ]
    },
    {
      icon: Code,
      title: 'Interface Engineering',
      color: '#9C27B0',
      gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
      summary: 'The fusion of beautiful design and solid technology.',
      features: [
        'We transform design mockups into pixel-perfect, performant code using modern HTML5, CSS3, and JavaScript frameworks like React, ensuring the final product matches the designer vision while maintaining accessibility standards, semantic markup, and optimal loading performance.',
        'Our front-end architecture seamlessly connects the UI layer with backend services through well-designed API integrations, state management, and data flow patterns, ensuring smooth real-time updates, optimistic UI interactions, and graceful error handling that maintains user trust.',
        'We prioritize interface performance and security through code optimization, lazy loading, tree shaking, and security best practices including XSS prevention, CSRF protection, and secure data handling, delivering interfaces that are not only beautiful but also fast, accessible, and secure.'
      ]
    }
  ];

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      maxWidth: '100vw',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
      {/* Hero */}
      <section style={{
        padding: 'clamp(60px, 15vw, 140px) clamp(16px, 5vw, 24px) clamp(50px, 12vw, 100px)',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
            backgroundColor: '#F5F5F7',
            borderRadius: '100px',
            marginBottom: 'clamp(20px, 5vw, 32px)',
            fontSize: 'clamp(12px, 3vw, 14px)',
            fontWeight: 500,
            color: '#0071E3'
          }}>
            <Cloud size={16} strokeWidth={2} />
            <span>Cloud Infrastructure Solutions</span>
          </div>

          {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 80px)',
          fontWeight: 600,
          lineHeight: 1.1,
            letterSpacing: '-0.02em',
          color: '#1D1D1F',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
        }}>
          Cloud & Infrastructure
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #0071E3 0%, #4285F4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Excellence
            </span>
        </h1>

          {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(16px, 3.5vw, 24px)',
            lineHeight: 1.6,
          color: '#6E6E73',
            maxWidth: '700px',
            margin: '0 auto',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            fontWeight: 400,
            padding: '0 16px'
          }}>
            Scalable and secure cloud solutions that power modern businesses with enterprise-grade reliability and performance.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 16px'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
              >
            Start Cloud Migration
          </Button>
        </Link>
            <Link to="/services" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cloud Animation */}
      <CloudAnimationSection />

      {/* Services - Full Width Alternating Sections */}
      {cloudServices.map((service, i) => {
        const isBlack = i % 2 === 0;
        const isTextLeft = i % 2 === 0;
        const IconComponent = service.icon;

        return (
          <section
            key={i}
            style={{
              padding: 'clamp(60px, 12vw, 120px) 0',
              background: isBlack ? '#000000' : '#FFFFFF',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 clamp(16px, 5vw, 24px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: 'clamp(24px, 6vw, 60px)',
              alignItems: 'center'
            }}>
              {/* Text Content */}
              <div style={{
                order: isTextLeft ? 1 : 2
              }}>
                {/* Service Number Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: service.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 24px ${service.color}40`
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 900,
                      color: '#FFFFFF'
                    }}>
                      {i + 1}
                    </span>
                  </div>
                  <span style={{
                    color: service.color,
                    fontSize: 'clamp(13px, 3vw, 15px)',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase'
                  }}>
                    Cloud Excellence
                  </span>
                </div>

                {/* Title */}
          <h2 style={{
                  fontSize: 'clamp(32px, 6vw, 48px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: isBlack ? '#FFFFFF' : '#1D1D1F',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {service.title}
          </h2>

                {/* Summary */}
                <p style={{
                  fontSize: 'clamp(14px, 3vw, 17px)',
                  lineHeight: 1.6,
                  color: isBlack ? 'rgba(255,255,255,0.7)' : '#6E6E73',
                  marginBottom: '32px',
                  fontWeight: 400,
                  maxWidth: '600px'
                }}>
                  {service.summary}
                </p>

                {/* Features */}
          <div style={{
                  marginBottom: '32px'
                }}>
                  {service.features.map((feature, idx) => (
                    <p
                      key={idx}
                style={{
                        fontSize: 'clamp(13px, 2.8vw, 15px)',
                        lineHeight: 1.7,
                        color: isBlack ? 'rgba(255,255,255,0.8)' : '#3C3C43',
                        marginBottom: idx === service.features.length - 1 ? '0' : '20px',
                        fontWeight: 400,
                        textAlign: 'justify'
                      }}
                    >
                      {feature}
                    </p>
                  ))}
              </div>
              </div>

              {/* Visual Side - Animated Icon */}
              <div style={{
                order: isTextLeft ? 2 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: 'clamp(220px, 30vw, 350px)'
              }}>
                {/* Main Icon Circle */}
                <div style={{
                  position: 'relative',
                  width: 'clamp(150px, 25vw, 250px)',
                  height: 'clamp(150px, 25vw, 250px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Outer Rings */}
                  <div style={{
                    position: 'absolute',
                    inset: '-20px',
                    borderRadius: '50%',
                    border: `2px solid ${service.color}20`,
                    animation: 'rotate 30s linear infinite'
                  }} />
                  
                  <div style={{
                    position: 'absolute',
                    inset: '-10px',
                    borderRadius: '50%',
                    border: `2px dashed ${service.color}30`,
                    animation: 'rotate 20s linear infinite reverse'
                  }} />

                  {/* Main Circle with Icon */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: service.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 20px 60px ${service.color}50, inset 0 0 60px ${service.color}30`,
                    position: 'relative',
                    zIndex: 1,
                    animation: 'float 6s ease-in-out infinite'
                  }}>
                    <IconComponent
                      size={window.innerWidth < 768 ? 50 : 80}
                      color="#FFFFFF"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Orbiting Particles */}
                  {[0, 120, 240].map((angle, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: service.color,
                        boxShadow: `0 0 20px ${service.color}`,
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${angle}deg) translate(${window.innerWidth < 768 ? '80px' : '135px'}) rotate(-${angle}deg)`,
                        animation: `rotate ${15 + idx * 2}s linear infinite`,
                        opacity: 0.6
                      }}
                    />
                  ))}

                  {/* Background Glow */}
                  <div style={{
                    position: 'absolute',
                    inset: '-40px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                    filter: 'blur(50px)',
                    animation: 'pulse 4s ease-in-out infinite'
                  }} />
                </div>
          </div>
        </div>
      </section>
        );
      })}

      {/* Animations */}
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>

      {/* CTA */}
      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
        textAlign: 'center',
        background: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 56px)',
          fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: '#1D1D1F',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            padding: '0 16px'
        }}>
          Ready for the Cloud?
        </h2>
        <p style={{
          fontSize: 'clamp(16px, 3.5vw, 20px)',
            lineHeight: 1.6,
          color: '#6E6E73',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            padding: '0 16px'
          }}>
            Let's build scalable infrastructure together and unlock the power of cloud computing for your business.
          </p>
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 16px'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="xl" rightIcon={<ArrowRight size={22} />}>
                Book Consultation
          </Button>
        </Link>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .design-browser-wrap { transform: scale(1) !important; padding: 0 12px !important; }
          .design-services-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .why-features-list { gap: 40px !important; }
          .why-feature-item { justify-content: center !important; }
          .feature-content-card { width: 100% !important; margin-left: 0 !important; margin-right: 0 !important; padding: 20px !important; }
          .tools-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .design-browser-wrap img { max-height: 50vh !important; }
          .case-studies-grid,
          .insights-grid,
          .engagement-grid,
          .process-grid,
          .capabilities-grid,
          .features-grid,
          .stats-grid { gap: 16px !important; }
          .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </div>
  );
};

export default CloudInfrastructurePage;

