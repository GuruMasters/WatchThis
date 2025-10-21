import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, TrendingUp, BarChart3, LineChart, PieChart, Activity, Search, MousePointer, Share2, Mail, FileText, BarChart, Zap, Target, Users, Globe, Award, Eye, Settings, PlayCircle, Camera } from 'lucide-react';

/**
 * Digital Marketing Service Page
 * Featuring animated growth charts and marketing metrics
 */

// Mac Browser Window Component
const MacBrowserWindow: React.FC<{ children: React.ReactNode; url: string }> = ({ children, url }) => (
  <div style={{
    background: '#1E1E1E',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
    width: '100%',
    maxWidth: 'clamp(300px, 90vw, 1100px)',
    margin: '0 auto'
  }}>
    {/* Browser Toolbar */}
    <div style={{
      background: '#2D2D2D',
      padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px, 2vw, 12px)'
    }}>
      {/* Traffic Lights */}
      <div style={{ display: 'flex', gap: 'clamp(4px, 1vw, 8px)' }}>
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)', borderRadius: '50%', background: '#28C840' }} />
      </div>
      {/* Address Bar */}
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
    {/* Browser Content */}
    <div>
      {children}
    </div>
  </div>
);

const MarketingAnimationSection: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);
  const [particlesVisible, setParticlesVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const marketingMetrics = [
    { 
      name: 'Social Media Growth', 
      value: 320, 
      growth: '+320%', 
      color: '#FF9500',
      icon: TrendingUp,
      chartType: 'line',
      data: [20, 35, 45, 60, 80, 110, 150, 195, 250, 290, 315, 320]
    },
    { 
      name: 'Campaign Performance', 
      value: 285, 
      growth: '+285%', 
      color: '#00FF41',
      icon: BarChart3,
      chartType: 'bar',
      data: [37, 26, 20, 17], // Data array for animation sync (4 items)
      // Campaign goals data - [value, label]
      goals: [
        { label: 'Increase brand awareness and brand health', value: 37, color: '#00FF41' },
        { label: 'Increase the number of new leads/customer prospects', value: 26, color: '#00FF41' },
        { label: 'To deliver a high quality, unified customer experience', value: 20, color: '#00FF41' },
        { label: 'Increase awareness and positive sentiment around new products', value: 17, color: '#00FF41' }
      ]
    },
    { 
      name: 'Audience Distribution', 
      value: 100, 
      growth: '100%', 
      color: '#0071E3',
      icon: PieChart,
      chartType: 'pie',
      data: [35, 25, 20, 20] // Age groups: 18-24, 25-34, 35-44, 45+
    },
    { 
      name: 'Engagement Trends', 
      value: 410, 
      growth: '+410%', 
      color: '#00FF41',
      icon: Activity,
      chartType: 'area',
      // 5 distinct segments: Up → Down → Up → Down → Up
      data: [
        // Segment 1: Sharp rise (6 points)
        15, 45, 85, 120, 155, 180,
        // Segment 2: Dramatic drop (6 points)
        165, 140, 110, 85, 75, 70,
        // Segment 3: Strong recovery and new peak (6 points)
        95, 130, 170, 220, 265, 290,
        // Segment 4: Moderate correction (6 points)
        275, 245, 220, 195, 180, 175,
        // Segment 5: Final surge to peak (6 points)
        210, 260, 310, 355, 385, 410
      ]
    }
  ];

  // Progress animation
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPaused(true);
          return 100;
        }
        return prev + 1; // Increment by 1 for smooth animation
      });
    }, 50); // 50ms * 100 = 5 seconds total
    
    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle metric switching after pause
  useEffect(() => {
    if (!isPaused) return;
    
    const timeout = setTimeout(() => {
      setActiveMetric((current) => (current + 1) % marketingMetrics.length);
      setProgress(0);
      setIsPaused(false);
    }, 2500); // 2.5 second pause at 100%
    
    return () => clearTimeout(timeout);
  }, [isPaused, marketingMetrics.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticlesVisible(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const metric = marketingMetrics[activeMetric];
  const currentDataPoint = Math.floor((progress / 100) * ((metric.data?.length || 1) - 1));

  return (
      <section style={{
      padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Rising Particles */}
      {particlesVisible && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: metric.color,
                bottom: '0',
                left: `${5 + i * 6}%`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.6
              }}
            />
          ))}
        </div>
      )}

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(52,199,89,0.1)',
            border: '1px solid rgba(52,199,89,0.3)',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '24px'
          }}>
            <TrendingUp size={16} color="#34C759" />
            <span style={{
              color: '#34C759',
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              GROWTH ANALYTICS
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Drive Measurable
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #34C759 0%, #0071E3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Growth
            </span>
          </h2>
          
          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Services for online brand growth and promotion
          </p>
        </div>

        {/* Animated Chart */}
        <div style={{
          maxWidth: 'clamp(300px, 90vw, 1100px)',
          margin: '0 auto',
          background: '#000000',
          padding: 'clamp(20px, 4vw, 40px)',
          borderRadius: '16px'
        }}>
          <MacBrowserWindow url="analytics-dashboard.com">
            <div style={{
              background: '#000000',
              padding: 'clamp(32px, 6vw, 48px)'
            }}>
          {/* Metric Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{
                fontSize: 'clamp(14px, 3vw, 16px)',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {React.createElement(metric.icon, { size: 20, color: metric.color })}
                {metric.name}
              </div>
              <div style={{
                fontSize: 'clamp(36px, 8vw, 64px)',
                fontWeight: 700,
                color: metric.color,
                lineHeight: 1,
                textShadow: `0 0 30px ${metric.color}60`
              }}>
                {metric.growth}
              </div>
            </div>
            <div style={{
              padding: '12px 24px',
              background: `${metric.color}20`,
              borderRadius: '12px',
              color: metric.color,
              fontSize: 'clamp(13px, 3vw, 15px)',
                  fontWeight: 600,
              border: `1px solid ${metric.color}40`
            }}>
              Last 12 Months
            </div>
          </div>

          {/* Dynamic Chart Rendering */}
          <div style={{
            position: 'relative',
            minHeight: '350px',
            marginBottom: '24px'
          }}>
            {/* Line Chart */}
            {metric.chartType === 'line' && metric.data && (
              <div style={{ position: 'relative', height: '300px' }}>
                {/* Grid Lines */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute', left: 0, right: 0, top: `${i * 25}%`,
                    height: '1px', background: 'rgba(255,255,255,0.05)'
                  }}>
                    <span style={{
                      fontSize: '10px', color: 'rgba(255,255,255,0.3)',
                      position: 'absolute', left: '-35px'
                    }}>
                      {Math.round(metric.value * (1 - i * 0.25))}
                    </span>
                  </div>
                ))}
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                  <defs>
                    <linearGradient id={`lineGrad${activeMetric}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={metric.color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={metric.data.slice(0, currentDataPoint + 1).map((value, i) => {
                      const x = (i / (metric.data.length - 1)) * 100;
                      const y = 100 - (value / metric.value) * 100;
                      return i === 0 ? `M ${x}% ${y}%` : `L ${x}% ${y}%`;
                    }).join(' ') + ` L ${(currentDataPoint / (metric.data.length - 1)) * 100}% 100% L 0% 100% Z`}
                    fill={`url(#lineGrad${activeMetric})`}
                  />
                  <path
                    d={metric.data.slice(0, currentDataPoint + 1).map((value, i) => {
                      const x = (i / (metric.data.length - 1)) * 100;
                      const y = 100 - (value / metric.value) * 100;
                      return i === 0 ? `M ${x}% ${y}%` : `L ${x}% ${y}%`;
                    }).join(' ')}
                    fill="none" stroke={metric.color} strokeWidth="3" strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 8px ${metric.color})` }}
                  />
                  {metric.data.slice(0, currentDataPoint + 1).map((value, i) => {
                    const x = (i / (metric.data.length - 1)) * 100;
                    const y = 100 - (value / metric.value) * 100;
                    return (
                      <g key={i}>
                        <circle cx={`${x}%`} cy={`${y}%`}
                          r={i === currentDataPoint ? "6" : "4"} fill={metric.color}
                          style={{ filter: i === currentDataPoint ? `drop-shadow(0 0 12px ${metric.color})` : 'none' }}
                        />
                        {/* Value label above point */}
                        <text
                          x={`${x}%`}
                          y={`${y - 5}%`}
                          fill={metric.color}
                          fontSize="11"
                          fontWeight="700"
                          textAnchor="middle"
                          style={{ 
                            textShadow: `0 0 8px ${metric.color}`, 
                            opacity: i === currentDataPoint ? 1 : 0.7 
                          }}
                        >
                          {value}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* Horizontal Bar Chart - Survey Style */}
            {metric.chartType === 'bar' && metric.goals && (
              <div style={{ 
                background: '#000000',
                borderRadius: '12px',
                padding: 'clamp(24px, 5vw, 40px)',
                minHeight: '400px'
              }}>
                {/* Title */}
                <div style={{
                  color: metric.color,
                  fontSize: 'clamp(14px, 3.5vw, 18px)',
                  fontWeight: 700,
                  marginBottom: 'clamp(24px, 5vw, 32px)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  textShadow: `0 0 10px ${metric.color}50`
                }}>
                  What is the primary goal for your digital marketing strategy?
                </div>

                {/* Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 3vw, 24px)' }}>
                  {metric.goals.map((goal, i) => {
                    const maxValue = Math.max(...metric.goals.map(g => g.value));
                    const barWidth = (goal.value / maxValue) * 100;
                    // Show bars progressively based on progress percentage
                    const isVisible = progress >= (i * 25); // Each bar appears at 0%, 25%, 50%, 75%
                    
                    return (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(12px, 3vw, 16px)',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                        transition: `all 0.6s ease-out ${i * 0.15}s`
                      }}>
                        {/* Label - Fixed width for alignment */}
                        <div style={{
                          color: '#FFFFFF',
                          fontSize: 'clamp(10px, 2.2vw, 12px)',
                          fontWeight: 400,
                          width: 'clamp(200px, 30vw, 300px)',
                          textAlign: 'right',
                          lineHeight: '1.3'
                        }}>
                          {goal.label}
                        </div>

                        {/* Bar Container */}
                        <div style={{
                          flex: 1,
                          position: 'relative',
                          height: 'clamp(35px, 7vw, 50px)',
                          background: 'rgba(0, 255, 65, 0.05)',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          {/* Animated Bar */}
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: isVisible ? `${barWidth}%` : '0%',
                            background: `linear-gradient(90deg, ${metric.color}DD 0%, ${metric.color} 100%)`,
                            transition: `width 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.15}s`,
                            boxShadow: `0 0 20px ${metric.color}60, inset 0 0 20px rgba(255,255,255,0.1)`,
                            borderRadius: '4px 0 0 4px'
                          }} />

                          {/* Glow effect */}
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: isVisible ? `${barWidth}%` : '0%',
                            background: metric.color,
                            filter: 'blur(12px)',
                            opacity: 0.3,
                            transition: `width 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.15}s`,
                            pointerEvents: 'none'
                          }} />
                        </div>

                        {/* Percentage - Outside bar on the right */}
                        <div style={{
                          color: metric.color,
                          fontSize: 'clamp(16px, 3.5vw, 24px)',
                          fontWeight: 700,
                          minWidth: 'clamp(40px, 8vw, 60px)',
                          textAlign: 'left',
                          textShadow: `0 0 10px ${metric.color}80`
                        }}>
                          {goal.value}%
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Source */}
                <div style={{
                  marginTop: 'clamp(24px, 5vw, 32px)',
                  fontSize: 'clamp(9px, 2vw, 11px)',
                  color: 'rgba(255,255,255,0.4)',
                  fontStyle: 'italic'
                }}>
                  Source: Altimeter Digital Marketing Survey, Q2 2019; Base: N=500
                </div>
              </div>
            )}

            {/* Pie Chart */}
            {metric.chartType === 'pie' && (
              <div style={{
                display: 'flex', gap: '40px', alignItems: 'center',
                justifyContent: 'center', flexWrap: 'wrap', padding: '20px 0'
              }}>
                <svg width="250" height="250" viewBox="0 0 250 250" style={{ filter: `drop-shadow(0 0 20px ${metric.color}40)` }}>
                  <defs>
                    {metric.data.map((_, idx) => (
                      <linearGradient key={idx} id={`pieGrad${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={['#FF9500', '#34C759', '#0071E3', '#FF375F'][idx]} />
                        <stop offset="100%" stopColor={['#FF9500AA', '#34C759AA', '#0071E3AA', '#FF375FAA'][idx]} />
                      </linearGradient>
                    ))}
                  </defs>
                  {(() => {
                    let startAngle = -90;
                    const total = metric.data.reduce((a, b) => a + b, 0);
                    const visibleSlices = Math.ceil(progress / 25);
                    return metric.data.slice(0, visibleSlices).map((value, idx) => {
                      const percentage = (value / total) * 100;
                      const angle = (percentage / 100) * 360;
                      const endAngle = startAngle + angle;
                      const largeArc = angle > 180 ? 1 : 0;
                      const x1 = 125 + 100 * Math.cos((startAngle * Math.PI) / 180);
                      const y1 = 125 + 100 * Math.sin((startAngle * Math.PI) / 180);
                      const x2 = 125 + 100 * Math.cos((endAngle * Math.PI) / 180);
                      const y2 = 125 + 100 * Math.sin((endAngle * Math.PI) / 180);
                      const path = `M 125 125 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`;
                      startAngle = endAngle;
                      return (
                        <path key={idx} d={path} fill={`url(#pieGrad${idx})`}
                          stroke="rgba(255,255,255,0.1)" strokeWidth="2"
                          style={{ animation: `fadeIn 0.4s ease-out ${idx * 0.15}s both` }}
                        />
                      );
                    });
                  })()}
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['18-24 years', '25-34 years', '35-44 years', '45+ years'].map((label, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      opacity: progress > idx * 25 ? 1 : 0.3,
                      transition: 'opacity 0.3s'
                    }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '4px',
                        background: ['#FF9500', '#34C759', '#0071E3', '#FF375F'][idx],
                        boxShadow: `0 0 8px ${['#FF9500', '#34C759', '#0071E3', '#FF375F'][idx]}60`
                      }} />
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                        {label}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                        {metric.data[idx]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Neon Stock Market Chart - Matrix Style */}
            {metric.chartType === 'area' && metric.data && (
              <div style={{ 
                position: 'relative', 
                height: '350px',
                background: '#000000',
                borderRadius: '12px',
                overflow: 'hidden',
                padding: '20px'
              }}>
                {/* Matrix background effect */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  opacity: 0.03,
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: metric.color,
                  lineHeight: '12px',
                  wordBreak: 'break-all',
                  overflow: 'hidden',
                  pointerEvents: 'none'
                }}>
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i}>010101001011010110100101010010110101101001010100101101011010010101001011010110100101</div>
                  ))}
                </div>

                {/* Grid lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    left: '20px', right: '20px',
                    top: `${20 + i * (310 / 5)}px`,
                    height: '1px',
                    background: 'rgba(0, 255, 65, 0.08)',
                    zIndex: 1
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '-45px',
                      top: '-8px',
                      fontSize: '11px',
                      color: 'rgba(0, 255, 65, 0.4)',
                      fontWeight: 600
                    }}>
                      {Math.round(metric.value * (1 - i * 0.2))}
                    </span>
                  </div>
                ))}

                <svg width="100%" height="310" viewBox="0 0 1000 310" preserveAspectRatio="none" 
                  style={{ position: 'relative', zIndex: 2 }}>
                  <defs>
                    {/* Intense neon gradient for fill */}
                    <linearGradient id={`neonFill${activeMetric}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={metric.color} stopOpacity="0.5" />
                      <stop offset="50%" stopColor={metric.color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
                    </linearGradient>
                    
                    {/* Multiple glow layers */}
                    <filter id={`neonGlow${activeMetric}`}>
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Area fill with gradient */}
                  <path
                    d={(() => {
                      // Faster drawing - use progress squared for acceleration
                      const acceleratedProgress = Math.pow(progress / 100, 0.7) * 100;
                      const visibleData = metric.data.slice(0, Math.ceil((acceleratedProgress / 100) * metric.data.length) + 1);
                      const path = visibleData.map((value, i) => {
                        const x = (i / (metric.data.length - 1)) * 1000;
                        const y = 310 - (value / metric.value) * 280;
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                      }).join(' ');
                      const lastX = ((visibleData.length - 1) / (metric.data.length - 1)) * 1000;
                      return `${path} L ${lastX} 310 L 0 310 Z`;
                    })()}
                    fill={`url(#neonFill${activeMetric})`}
                  />

                  {/* Main neon line with intense glow */}
                  <path
                    d={(() => {
                      const acceleratedProgress = Math.pow(progress / 100, 0.7) * 100;
                      return metric.data.slice(0, Math.ceil((acceleratedProgress / 100) * metric.data.length) + 1).map((value, i) => {
                        const x = (i / (metric.data.length - 1)) * 1000;
                        const y = 310 - (value / metric.value) * 280;
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                      }).join(' ');
                    })()}
                    fill="none"
                    stroke={metric.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ 
                      filter: `drop-shadow(0 0 20px ${metric.color}) drop-shadow(0 0 10px ${metric.color}) drop-shadow(0 0 5px ${metric.color})`
                    }}
                  />

                  {/* Outer glow layer */}
                  <path
                    d={(() => {
                      const acceleratedProgress = Math.pow(progress / 100, 0.7) * 100;
                      return metric.data.slice(0, Math.ceil((acceleratedProgress / 100) * metric.data.length) + 1).map((value, i) => {
                        const x = (i / (metric.data.length - 1)) * 1000;
                        const y = 310 - (value / metric.value) * 280;
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                      }).join(' ');
                    })()}
                    fill="none"
                    stroke={metric.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.2"
                    style={{ filter: `blur(8px)` }}
                  />

                  {/* Peak indicator dots on major peaks */}
                  {(() => {
                    const acceleratedProgress = Math.pow(progress / 100, 0.7) * 100;
                    return metric.data.slice(0, Math.ceil((acceleratedProgress / 100) * metric.data.length) + 1).map((value, i) => {
                      // Show dot if it's a local peak
                      const isPeak = i > 0 && i < metric.data.length - 1 && 
                                     value > metric.data[i - 1] && value > metric.data[i + 1] &&
                                     value > metric.value * 0.6;
                      if (!isPeak && i !== Math.floor((acceleratedProgress / 100) * metric.data.length)) return null;
                      
                      // Add slight randomness to position for "imprecise" look
                      const jitterX = (Math.sin(i * 1.5) * 3); // Small x offset
                      const jitterY = (Math.cos(i * 2.3) * 2); // Small y offset
                      const x = (i / (metric.data.length - 1)) * 1000 + jitterX;
                      const y = 310 - (value / metric.value) * 280 + jitterY;
                      const isActive = i === Math.floor((acceleratedProgress / 100) * metric.data.length);
                      
                      return (
                        <g key={i}>
                          {/* Outer glow - smaller */}
                          <circle cx={x} cy={y} r="6" fill={metric.color} opacity="0.15" 
                            style={{ filter: 'blur(4px)' }} />
                          {/* Main dot - smaller */}
                          <circle cx={x} cy={y} r="2.5" fill={metric.color}
                            style={{ 
                              filter: `drop-shadow(0 0 6px ${metric.color})`,
                            }} />
                        </g>
                      );
                    });
                  })()}
                </svg>

                {/* Value indicator */}
                <div style={{
                  position: 'absolute',
                  top: '20px', right: '20px',
                  background: 'rgba(0, 255, 65, 0.1)',
                  border: `2px solid ${metric.color}`,
                  borderRadius: '8px',
                  padding: '8px 16px',
                  zIndex: 3
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: metric.color, textShadow: `0 0 10px ${metric.color}` }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(0, 255, 65, 0.7)', marginTop: '2px' }}>
                    Peak Engagement
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Labels - Only for line chart */}
          {metric.chartType === 'line' && (
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 'clamp(10px, 2.2vw, 12px)', color: 'rgba(255,255,255,0.4)',
              marginBottom: '24px'
            }}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                <div key={month} style={{ flex: 1, textAlign: 'center', minWidth: '30px' }}>
                  {month}
              </div>
            ))}
            </div>
          )}

          {/* Progress Bar */}
          <div style={{
            height: '6px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: metric.color,
              borderRadius: '3px',
              transition: 'width 0.05s linear',
              boxShadow: `0 0 20px ${metric.color}80`
            }} />
          </div>
            </div>
          </MacBrowserWindow>
        </div>

        {/* Metric Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 16px)',
          marginTop: '40px',
          flexWrap: 'wrap'
        }}>
          {marketingMetrics.map((m, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveMetric(i);
                setProgress(0);
              }}
              style={{
                padding: 'clamp(10px, 2.5vw, 12px) clamp(16px, 4vw, 24px)',
                borderRadius: '12px',
                background: activeMetric === i ? `${m.color}30` : 'rgba(255,255,255,0.05)',
                color: activeMetric === i ? m.color : '#FFFFFF',
                fontSize: 'clamp(12px, 2.8vw, 14px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: activeMetric === i ? `2px solid ${m.color}` : '2px solid transparent',
                boxShadow: activeMetric === i ? `0 4px 12px ${m.color}40` : 'none'
              }}
            >
              {React.createElement(m.icon, { size: 16 })}
              <span>{m.name}</span>
            </button>
          ))}
        </div>

        <style>{`
          @keyframes rise {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.15); opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
};

export const DigitalMarketingPage: React.FC = () => {
  const marketingServices = [
    {
      icon: Search,
      title: 'Search Engine Optimization (SEO)',
      description: 'On-page and off-page optimization, technical SEO, local SEO.',
      color: '#0071E3',
      gradient: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)'
    },
    {
      icon: MousePointer,
      title: 'Pay-Per-Click Advertising (PPC)',
      description: 'Google Ads, Bing Ads, Meta Ads campaigns with ROI focus.',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
    },
    {
      icon: Share2,
      title: 'Social Media Marketing (SMM)',
      description: 'Content creation, community management, growth strategy.',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)'
    },
    {
      icon: Mail,
      title: 'Email Marketing & Automation',
      description: 'Personalized content campaigns and audience segmentation.',
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)'
    },
    {
      icon: FileText,
      title: 'Content Marketing',
      description: 'Blog strategy, copywriting, storytelling, video marketing.',
      color: '#EF4444',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)'
    },
    {
      icon: BarChart,
      title: 'Analytics & Conversion Tracking',
      description: 'GA4 setup, Meta Pixel, heatmap analysis, A/B testing.',
      color: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)'
    }
  ];

  const caseStudies = [
    {
      title: 'E-commerce Brand Growth Campaign',
      client: 'Fashion Retailer',
      challenge: 'Low online visibility and poor conversion rates',
      solution: 'Comprehensive SEO + PPC strategy with content marketing',
      results: ['+250% more website visits', '+40% conversion rate increase', '$125K additional revenue'],
      color: '#0071E3',
      metric: '250%'
    },
    {
      title: 'B2B SaaS Lead Generation',
      client: 'Tech Startup',
      challenge: 'Struggling to generate qualified leads',
      solution: 'LinkedIn campaigns + content marketing + email automation',
      results: ['180% increase in qualified leads', '45% lower cost per acquisition', '3x faster sales cycle'],
      color: '#10B981',
      metric: '180%'
    },
    {
      title: 'Local Business Domination',
      client: 'Restaurant Chain',
      challenge: 'Poor local search visibility',
      solution: 'Local SEO + Google My Business + social media',
      results: ['320% increase in local searches', '85% more reservations', 'Top 3 local search results'],
      color: '#F59E0B',
      metric: '320%'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Research & Audit',
      description: 'Analyze market and competition, audit current digital presence.',
      icon: Eye,
      color: '#0071E3'
    },
    {
      step: '02',
      title: 'Strategy Creation',
      description: 'Define targeted campaigns and optimal marketing channels.',
      icon: Target,
      color: '#10B981'
    },
    {
      step: '03',
      title: 'Content & Design',
      description: 'Create visuals, copy, and advertising materials.',
      icon: FileText,
      color: '#8B5CF6'
    },
    {
      step: '04',
      title: 'Implementation',
      description: 'Launch campaigns and monitor real-time performance.',
      icon: PlayCircle,
      color: '#F59E0B'
    },
    {
      step: '05',
      title: 'Optimization & Reporting',
      description: 'Continuous testing, optimization, and detailed reporting.',
      icon: BarChart,
      color: '#EF4444'
    }
  ];

  const tools = [
    { name: 'Google Analytics 4', icon: BarChart, color: '#E37400' },
    { name: 'Google Ads', icon: MousePointer, color: '#4285F4' },
    { name: 'SEMrush', icon: Search, color: '#FF642D' },
    { name: 'Meta Business Suite', icon: Share2, color: '#4267B2' },
    { name: 'Mailchimp', icon: Mail, color: '#FFE01B' },
    { name: 'Canva', icon: FileText, color: '#00C4CC' },
    { name: 'Ahrefs', icon: Globe, color: '#2A3C4A' },
    { name: 'HubSpot', icon: Target, color: '#FF7A59' }
  ];

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      maxWidth: '100vw',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section style={{
        padding: 'clamp(80px, 15vw, 160px) clamp(16px, 5vw, 24px)',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%' }}>
          {/* Main Content - Centered */}
          <div style={{
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,113,227,0.1)',
              border: '1px solid rgba(0,113,227,0.3)',
              borderRadius: '50px',
              padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 24px)',
              marginBottom: 'clamp(24px, 5vw, 32px)',
              backdropFilter: 'blur(10px)'
            }}>
              <TrendingUp size={16} strokeWidth={2} color="#0071E3" />
              <span style={{
                color: '#0071E3',
                fontSize: 'clamp(12px, 3vw, 14px)',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Digital Marketing Excellence
              </span>
            </div>

            {/* Main Title */}
            <h1 style={{
              fontSize: 'clamp(48px, 10vw, 84px)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#FFFFFF',
              marginBottom: '24px',
              letterSpacing: '-0.03em',
              textShadow: '0 0 40px rgba(255,255,255,0.1)'
            }}>
              We Create
              <span style={{
                background: 'linear-gradient(135deg, #0071E3 0%, #00D4FF 50%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'block',
                marginTop: '8px'
              }}>
                Digital Strategies
              </span>
              That Drive Real Results
        </h1>

            {/* Subtitle */}
        <p style={{
              fontSize: 'clamp(20px, 4vw, 28px)',
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '20px',
              fontWeight: 400
            }}>
              From SEO to Social Media – we help brands grow online visibility and conversion.
            </p>

            {/* Description */}
            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '48px',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Transform your digital presence with data-driven strategies that deliver measurable growth and sustainable results across all marketing channels.
            </p>

            {/* Key Stats Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
              gap: 'clamp(20px, 4vw, 32px)',
              marginBottom: 'clamp(32px, 6vw, 48px)',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {[
                { number: '250%', label: 'Avg. Traffic Growth' },
                { number: '3x', label: 'Lead Generation' },
                { number: '95%', label: 'Client Satisfaction' }
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    animation: `fadeInUp 0.8s ease-out ${i * 0.2}s backwards`
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(28px, 5vw, 36px)',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
        <Link to="/booking">
                <Button
                  variant="luxury"
                  size="lg"
                  rightIcon={<ArrowRight />}
                  style={{
                    boxShadow: '0 20px 40px rgba(0,113,227,0.3)'
                  }}
                >
                  Get a Free Consultation
          </Button>
        </Link>
            </div>
          </div>

        </div>

        {/* Enhanced Animations */}
        <style>{`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(45deg); }
            50% { transform: translateY(-30px) rotate(45deg); }
          }

          @keyframes pulseSlow {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.1); opacity: 0.4; }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes glow {
            from { boxShadow: 0 20px 40px rgba(0,113,227,0.3); }
            to { boxShadow: 0 20px 40px rgba(0,113,227,0.5); }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Services Section */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Digital Marketing Services
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Comprehensive solutions for every aspect of digital marketing
            </p>
          </div>

          {/* Horizontal Marketing Flow */}
          <div style={{
            position: 'relative',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {/* Connection Line */}
            <div style={{
              position: 'absolute',
              top: '120px',
              left: '50px',
              right: '50px',
              height: '3px',
              background: 'linear-gradient(90deg, #0071E3 0%, #10B981 25%, #8B5CF6 50%, #F59E0B 75%, #EF4444 100%)',
              borderRadius: '2px',
              zIndex: 1
            }} />

            {/* Service Items */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              position: 'relative',
              zIndex: 2,
              padding: '0 20px'
            }}>
              {marketingServices.map((service, i) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      animation: `fadeInUp 0.8s ease-out ${i * 0.15}s backwards`
                    }}
                  >
                    {/* Custom Service Node */}
                    <div style={{
                      width: '160px',
                      height: '120px',
                      position: 'relative',
                      marginBottom: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-12px) scale(1.05)';
                      const shapes = e.currentTarget.querySelectorAll('.shape');
                      shapes.forEach((shape, idx) => {
                        (shape as HTMLElement).style.transform = `scale(${1.1 + idx * 0.1}) rotate(${idx * 15}deg)`;
                      });
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      const shapes = e.currentTarget.querySelectorAll('.shape');
                      shapes.forEach((shape, idx) => {
                        (shape as HTMLElement).style.transform = `scale(1) rotate(${idx * 15}deg)`;
                      });
                    }}
                    >
                      {/* Background Shapes */}
                      <div className="shape" style={{
                        position: 'absolute',
                        width: '120px',
                        height: '90px',
                        background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                        border: `2px solid ${service.color}30`,
                        borderRadius: '16px 4px 16px 4px',
                        transform: 'rotate(0deg)',
                        transition: 'all 0.4s ease',
                        zIndex: 1
                      }} />

                      <div className="shape" style={{
                        position: 'absolute',
                        width: '110px',
                        height: '85px',
                        background: `linear-gradient(135deg, ${service.color}15, ${service.color}8)`,
                        border: `2px solid ${service.color}25`,
                        borderRadius: '14px 6px 14px 6px',
                        transform: 'rotate(15deg)',
                        transition: 'all 0.4s ease',
                        zIndex: 2
                      }} />

                      <div className="shape" style={{
                        position: 'absolute',
                        width: '100px',
                        height: '80px',
                        background: service.gradient,
                        border: `3px solid ${service.color}50`,
                        borderRadius: '12px 8px 12px 8px',
                        transform: 'rotate(30deg)',
                        transition: 'all 0.4s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3,
                        boxShadow: `0 8px 24px ${service.color}40`
                      }}>
                        <IconComponent size={28} color="#FFFFFF" />
                      </div>

                      {/* Step Number Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FFFFFF, #F8F9FA)',
                        border: `3px solid ${service.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '900',
                        color: service.color,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 4
                      }}>
                        {i + 1}
                      </div>

                      {/* Connecting Dots */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '4px'
                      }}>
                        {[0, 1, 2].map(dot => (
                          <div
                            key={dot}
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: service.color,
                              opacity: 0.6,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{
                      textAlign: 'center',
                      maxWidth: '180px'
                    }}>
                      <h4 style={{
                        fontSize: 'clamp(16px, 3vw, 18px)',
                        fontWeight: '700',
                        color: '#1D1D1F',
                        marginBottom: '8px',
                        lineHeight: 1.2
                      }}>
                        {service.title}
                      </h4>

                      <p style={{
                        fontSize: 'clamp(13px, 2.6vw, 15px)',
                        color: '#CCCCCC',
                        lineHeight: 1.4,
                        marginBottom: '16px'
                      }}>
                        {service.description}
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Case Studies & Results
              </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Real campaigns, measurable results, proven success
            </p>
          </div>

          {/* Compact Text-Based Case Studies */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '60px'
          }}>
            {[
              {
                title: 'E-commerce Brand Growth Campaign',
                client: 'Fashion Retailer',
                challenge: 'Low online visibility and poor conversion rates',
                solution: 'Comprehensive SEO + PPC strategy with content marketing',
                results: ['+250% more website visits', '+40% conversion rate increase', '$125K additional revenue'],
                metric: '180%',
                color: '#0071E3',
                delay: 0
              },
              {
                title: 'B2B SaaS Lead Generation',
                client: 'Tech Startup',
                challenge: 'Struggling to generate qualified leads',
                solution: 'LinkedIn campaigns + content marketing + email automation',
                results: ['180% increase in qualified leads', '45% lower cost per acquisition', '3x faster sales cycle'],
                metric: '320%',
                color: '#10B981',
                delay: 0.3
              },
              {
                title: 'Local Business Domination',
                client: 'Restaurant Chain',
                challenge: 'Poor local search visibility',
                solution: 'Local SEO + Google My Business + social media',
                results: ['320% increase in local searches', '85% more reservations'],
                metric: '85%',
                color: '#F59E0B',
                delay: 0.6
              }
            ].map((study, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  padding: '24px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
                  borderRadius: '16px',
                  border: `1px solid ${study.color}15`,
                  backdropFilter: 'blur(10px)',
                  animation: `compactReveal 0.8s ease-out ${study.delay}s backwards`
                }}
              >
                {/* Background Elements */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  background: `radial-gradient(circle at 20% 20%, ${study.color}05, transparent 50%)`,
                  borderRadius: '20px',
                  zIndex: -1
                }} />

                {/* Metric Display */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '900',
                  color: study.color,
                  textShadow: `0 0 20px ${study.color}40`,
                  animation: `compactGlow 1.5s ease-in-out ${study.delay + 0.2}s backwards`
                }}>
                  {study.metric}
                </div>

                {/* Content Container */}
                <div style={{
                  width: '100%'
                }}>
                  {/* Main Content */}
                  <div>
                    {/* Title */}
                    <h4 style={{
                      fontSize: 'clamp(20px, 4vw, 28px)',
                      fontWeight: '800',
                      color: '#FFFFFF',
                      marginBottom: '4px',
                      lineHeight: 1.2,
                      animation: `compactSlide 0.6s ease-out ${study.delay + 0.1}s backwards`
                    }}>
                      {study.title}
                    </h4>

                    {/* Client */}
                    <div style={{
                      fontSize: 'clamp(14px, 3vw, 18px)',
                      color: study.color,
                      fontWeight: '600',
                      marginBottom: '20px',
                      animation: `compactSlide 0.6s ease-out ${study.delay + 0.15}s backwards`
                    }}>
                      {study.client}
                    </div>

                    {/* Challenge */}
                    <div style={{
                      marginBottom: '16px',
                      animation: `compactSlide 0.6s ease-out ${study.delay + 0.2}s backwards`
                    }}>
                      <div style={{
                        fontSize: 'clamp(12px, 2.4vw, 14px)',
                        fontWeight: '700',
                        color: '#FF6B6B',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Challenge
                      </div>
                      <div style={{
                        fontSize: 'clamp(14px, 2.8vw, 16px)',
                        color: '#CCCCCC',
                        lineHeight: 1.4
                      }}>
                        {study.challenge}
                      </div>
                    </div>

                    {/* Solution */}
                    <div style={{
                      marginBottom: '16px',
                      animation: `compactSlide 0.6s ease-out ${study.delay + 0.25}s backwards`
                    }}>
                      <div style={{
                        fontSize: 'clamp(12px, 2.4vw, 14px)',
                        fontWeight: '700',
                        color: '#4ECDC4',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Solution
                      </div>
                      <div style={{
                        fontSize: 'clamp(14px, 2.8vw, 16px)',
                        color: '#CCCCCC',
                        lineHeight: 1.4
                      }}>
                        {study.solution}
                      </div>
                    </div>

                    {/* Key Results */}
                    <div style={{
                      animation: `compactSlide 0.6s ease-out ${study.delay + 0.3}s backwards`
                    }}>
                      <div style={{
                        fontSize: 'clamp(12px, 2.4vw, 14px)',
                        fontWeight: '700',
                        color: '#FFD93D',
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Key Results
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
                        gap: '8px'
                      }}>
                        {study.results.map((result, idx) => (
                          <div
                            key={idx}
                            style={{
                              fontSize: 'clamp(13px, 2.6vw, 15px)',
                              color: '#FFFFFF',
                              fontWeight: '600',
                              lineHeight: 1.3,
                              animation: `compactPop 0.4s ease-out ${study.delay + 0.4 + (idx * 0.05)}s backwards`
                            }}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach / Workflow */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
        }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#1D1D1F',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Our Approach
              </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Proven methodology that delivers measurable results
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(32px, 5vw, 48px)'
          }}>
            {workflowSteps.map((step, i) => {
              const StepIcon = step.icon;
              return (
              <div
                key={i}
                style={{
                    textAlign: 'center',
                    position: 'relative',
                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s backwards`
                  }}
                >
                  {/* Step Number */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 12px ${step.color}40`,
                    zIndex: 2
                  }}>
                    <span style={{
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {step.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                    border: `2px solid ${step.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: `0 8px 24px ${step.color}30`
                  }}>
                    <StepIcon size={32} color={step.color} />
                  </div>

                  {/* Content */}
                  <h3 style={{
                    fontSize: 'clamp(18px, 3.6vw, 20px)',
                    fontWeight: 700,
                    color: '#1D1D1F',
                    marginBottom: '12px'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(14px, 2.8vw, 16px)',
                    color: '#6E6E73',
                    lineHeight: 1.5
                  }}>
                    {step.description}
                  </p>

                  {/* Connection Line (except last) */}
                  {i < workflowSteps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      right: '-50%',
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)',
                      zIndex: 1
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginBottom: 'clamp(12px, 3vw, 16px)',
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              padding: '0 16px'
            }}>
              Tools & Technologies
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '0 16px'
            }}>
              Industry-leading platforms and tools we master
            </p>
          </div>

          {/* Technology Flow */}
          <div style={{
            position: 'relative',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {/* Flow Background */}
            <div style={{
              position: 'absolute',
              top: '100px',
              left: '0',
              right: '0',
              height: '6px',
              background: 'linear-gradient(90deg, #0071E3 0%, #10B981 25%, #8B5CF6 50%, #F59E0B 75%, #EF4444 100%)',
              borderRadius: '3px',
              zIndex: 1
            }} />

            {/* Technology Icons Flow */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
              marginBottom: '80px'
            }}>
              {tools.map((tool, i) => {
                const ToolIcon = tool.icon;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `toolSlideIn 0.8s ease-out ${i * 0.1}s backwards`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-15px) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    {/* Icon Container */}
                    <div style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}10)`,
                      border: `3px solid ${tool.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      boxShadow: `0 8px 24px ${tool.color}30`,
                      transition: 'all 0.4s ease',
                      position: 'relative'
                    }}>
                      <ToolIcon size={36} color={tool.color} />

                      {/* Pulsing Ring */}
                      <div style={{
                        position: 'absolute',
                        top: '-4px',
                        left: '-4px',
                        right: '-4px',
                        bottom: '-4px',
                        borderRadius: '50%',
                        border: `2px solid ${tool.color}30`,
                        opacity: 0.6
                      }} />
                    </div>

                    {/* Tool Name */}
                    <div style={{
                      fontSize: 'clamp(14px, 2.8vw, 16px)',
                      fontWeight: '700',
                      color: '#1D1D1F',
                      textAlign: 'center',
                      marginBottom: '8px',
                      lineHeight: 1.2
                    }}>
                      {tool.name}
                    </div>

                    {/* Category Label */}
                    <div style={{
                      fontSize: 'clamp(11px, 2.2vw, 13px)',
                      color: tool.color,
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      background: `${tool.color}15`,
                      padding: '4px 12px',
                      borderRadius: '12px',
                      border: `1px solid ${tool.color}25`
                    }}>
                      {i < 3 ? 'Analytics' : i < 5 ? 'Marketing' : i < 6 ? 'Design' : 'CRM'}
                    </div>

                    {/* Connection Point */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-35px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: tool.color,
                      boxShadow: `0 0 12px ${tool.color}60`,
                    }} />
                  </div>
                );
              })}
            </div>

            {/* Technology Categories */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(20px, 4vw, 40px)',
              marginTop: 'clamp(40px, 8vw, 60px)'
            }}>
              {[
                {
                  title: 'Analytics & Tracking',
                  description: 'Real-time data insights and performance monitoring',
                  tools: ['Google Analytics 4', 'SEMrush', 'Ahrefs'],
                  color: '#0071E3',
                  icon: BarChart,
                  bgPattern: 'radial-gradient(circle at 20% 80%, rgba(0,113,227,0.1) 0%, transparent 50%)'
                },
                {
                  title: 'Marketing Platforms',
                  description: 'Campaign management and audience targeting',
                  tools: ['Google Ads', 'Meta Business Suite'],
                  color: '#10B981',
                  icon: MousePointer,
                  bgPattern: 'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.1) 0%, transparent 50%)'
                },
                {
                  title: 'Design Tools',
                  description: 'Creative content production and branding',
                  tools: ['Canva'],
                  color: '#F59E0B',
                  icon: FileText,
                  bgPattern: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.1) 0%, transparent 50%)'
                },
                {
                  title: 'CRM & Automation',
                  description: 'Customer relationship and marketing automation',
                  tools: ['Mailchimp', 'HubSpot'],
                  color: '#8B5CF6',
                  icon: Users,
                  bgPattern: 'radial-gradient(circle at 70% 30%, rgba(139,92,246,0.1) 0%, transparent 50%)'
                }
              ].map((category, i) => {
                const CategoryIcon = category.icon;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      background: 'rgba(20,20,30,0.95)',
                  borderRadius: '20px',
                      padding: '32px',
                      border: `2px solid ${category.color}20`,
                      backdropFilter: 'blur(15px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `categoryReveal 0.8s ease-out ${i * 0.15}s backwards`,
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 20px 40px ${category.color}25`;
                      e.currentTarget.style.borderColor = category.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = `${category.color}20`;
                    }}
                  >
                    {/* Background Pattern */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: category.bgPattern,
                      opacity: 0.5,
                      zIndex: -1
                    }} />

                    {/* Header with Icon and Title */}
                    <div style={{
                  display: 'flex',
                      alignItems: 'center',
                  gap: '16px',
                      marginBottom: '20px'
                    }}>
                      {/* Icon Container */}
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '14px',
                        background: `linear-gradient(135deg, ${category.color}15, ${category.color}8)`,
                        border: `2px solid ${category.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 20px ${category.color}20`,
                  transition: 'all 0.3s ease'
                      }}>
                        <CategoryIcon size={28} color={category.color} />
                      </div>

                      {/* Title */}
                      <div style={{
                        flex: 1
                      }}>
                        <h4 style={{
                          fontSize: 'clamp(18px, 3.6vw, 22px)',
                          fontWeight: '800',
                          color: '#FFFFFF',
                          marginBottom: '4px',
                          lineHeight: 1.2
                        }}>
                          {category.title}
                        </h4>
                        <div style={{
                          fontSize: 'clamp(12px, 2.4vw, 14px)',
                          color: category.color,
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {category.tools.length} Tools
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: 'clamp(14px, 2.8vw, 16px)',
                      color: '#CCCCCC',
                      lineHeight: 1.5,
                      marginBottom: '24px'
                    }}>
                      {category.description}
                    </p>

                    {/* Tools Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                      gap: '12px'
                    }}>
                      {category.tools.map((tool, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: `${category.color}10`,
                            border: `1px solid ${category.color}25`,
                            borderRadius: '10px',
                            padding: '12px 8px',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${category.color}20`;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 4px 12px ${category.color}30`;
                }}
                onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${category.color}10`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                          {/* Tool Highlight */}
                          <div style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            height: '2px',
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                            opacity: 0.8
                          }} />

                          <div style={{
                            fontSize: 'clamp(12px, 2.4vw, 14px)',
                            color: category.color,
                            fontWeight: '700',
                            marginTop: '8px'
                          }}>
                            {tool}
                          </div>
                </div>
              ))}
                    </div>

                    {/* Decorative Elements */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`,
                      border: `2px solid ${category.color}30`,
                      animation: `miniPulse 2s ease-in-out infinite`
                    }} />

                    <div style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: category.color,
                      opacity: 0.1,
                      animation: `miniPulse 2s ease-in-out infinite ${i * 0.3}s`
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'clamp(80px, 15vw, 120px) clamp(16px, 5vw, 24px)',
        textAlign: 'center',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: '#1D1D1F',
            marginBottom: 'clamp(16px, 4vw, 24px)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            padding: '0 16px'
          }}>
            Ready to Grow Your Digital Presence?
            </h2>
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '0 16px'
        }}>
            Let's create a digital marketing strategy that delivers real results and transforms your online presence.
        </p>
        <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 16px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0 16px'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button variant="luxury" size="xl" rightIcon={<ArrowRight size={22} />}>
                Start Your Campaign
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

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes successFloat {
          0%, 100% {
            transform: translateY(0px) rotate(2deg);
          }
          50% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }

        @keyframes centralPulse {
          0%, 100% {
            boxShadow: 0 20px 60px rgba(0,113,227,0.4);
            transform: scale(1);
          }
          50% {
            boxShadow: 0 30px 80px rgba(0,113,227,0.6);
            transform: scale(1.05);
          }
        }

        @keyframes toolFloatIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        @keyframes legendPulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes toolSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes ringPulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        @keyframes connectionPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        @keyframes categoryFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes categoryReveal {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes miniPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes textReveal {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes metricGlow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
            textShadow: 0 0 30px currentColor;
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
            textShadow: 0 0 50px currentColor, 0 0 70px currentColor;
          }
        }

        @keyframes textSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes resultPop {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes circlePulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes innerCircle {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes compactReveal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes compactGlow {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1);
            textShadow: 0 0 15px currentColor;
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
            textShadow: 0 0 25px currentColor, 0 0 35px currentColor;
          }
        }

        @keyframes compactSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes compactPop {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes compactPulse {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
        }

        @keyframes compactInner {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

      `}</style>

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

export default DigitalMarketingPage;