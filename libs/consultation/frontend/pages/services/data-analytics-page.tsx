import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, BarChart3, PieChart, TrendingUp, Activity, Database, Zap } from 'lucide-react';

/**
 * Data & Analytics Service Page
 * Featuring animated data visualization and real-time metrics
 */

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

const DataVisualizationSection: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);

  const dataCodeSnippets = [
    {
      name: 'Python Pandas',
      color: '#150458',
      code: `# Data Analysis with Pandas
import pandas as pd
import numpy as np

# Load and process data
df = pd.read_csv('sales_data.csv')
df['date'] = pd.to_datetime(df['date'])

# Aggregate metrics
monthly_revenue = df.groupby(
  df['date'].dt.month
)['revenue'].sum()

# Statistical insights
print(f"Mean: {df['revenue'].mean():.2f}")
print(f"Median: {df['revenue'].median():.2f}")
print(f"Std Dev: {df['revenue'].std():.2f}")

# Top performers
top_products = df.groupby('product')[
  'revenue'
].sum().nlargest(5)

console.log("[✓] Analysis complete");`
    },
    {
      name: 'SQL Analytics',
      color: '#00758F',
      code: `-- Business Intelligence Query
SELECT 
  DATE_TRUNC('month', order_date) AS month,
  COUNT(DISTINCT user_id) AS active_users,
  SUM(revenue) AS total_revenue,
  AVG(revenue) AS avg_order_value,
  COUNT(*) AS total_orders
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
  AND status = 'completed'
GROUP BY month
ORDER BY month DESC;

-- Customer Segmentation
SELECT 
  customer_segment,
  COUNT(*) AS customers,
  AVG(lifetime_value) AS avg_ltv
FROM customers
GROUP BY customer_segment
HAVING AVG(lifetime_value) > 1000;

-- [✓] Query executed successfully`
    },
    {
      name: 'TensorFlow ML',
      color: '#FF6F00',
      code: `# Predictive Analytics with TensorFlow
import tensorflow as tf
from sklearn.preprocessing import StandardScaler

# Prepare data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)

# Build neural network
model = tf.keras.Sequential([
  tf.keras.layers.Dense(64, 
    activation='relu', input_shape=(X.shape[1],)),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(32, activation='relu'),
  tf.keras.layers.Dense(1)
])

# Compile and train
model.compile(optimizer='adam',
              loss='mse',
              metrics=['mae'])

history = model.fit(X_scaled, y_train,
                    validation_split=0.2,
                    epochs=50,
                    batch_size=32)

print("[✓] Model trained successfully");`
    },
    {
      name: 'Apache Spark',
      color: '#E25A1C',
      code: `# Big Data Processing with Spark
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

# Initialize Spark
spark = SparkSession.builder \
  .appName("DataAnalytics") \
  .config("spark.sql.adaptive.enabled", "true") \
  .getOrCreate()

# Process large dataset
df = spark.read.parquet("hdfs://data/logs/")

# Aggregations
result = df.groupBy("user_id") \
  .agg(
    count("*").alias("events"),
    sum("revenue").alias("total_revenue"),
    avg("session_duration").alias("avg_session")
  ) \
  .filter(col("events") > 10) \
  .orderBy(desc("total_revenue"))

# Write results
result.write.parquet("hdfs://output/")

print("[✓] Spark job completed");`
    },
    {
      name: 'Data Visualization',
      color: '#11557C',
      code: `# Interactive Charts with Plotly
import plotly.graph_objects as go
import plotly.express as px

# Revenue trend
fig = go.Figure()
fig.add_trace(go.Scatter(
  x=df['date'],
  y=df['revenue'],
  mode='lines+markers',
  name='Revenue',
  line=dict(color='#0071E3', width=3)
))

fig.update_layout(
  title='Monthly Revenue Trend',
  xaxis_title='Date',
  yaxis_title='Revenue ($)',
  template='plotly_dark'
)

# Cohort analysis heatmap
cohort_data = calculate_cohort_retention(df)
fig2 = px.imshow(cohort_data,
                 labels=dict(color="Retention"),
                 color_continuous_scale="Blues")

fig.show()
print("[✓] Charts generated");`
    }
  ];

  const [activeSnippet, setActiveSnippet] = useState(0);
  const snippet = dataCodeSnippets[activeSnippet];

  useEffect(() => {
    const lines = snippet.code.split('\n');
    
    if (currentLine < lines.length) {
      const currentLineText = lines[currentLine];
      const chars = currentLineText.split('');
      let charIndex = displayedCode.split('\n').length > currentLine ? 
        displayedCode.split('\n')[currentLine]?.length || 0 : 0;

      const timer = setTimeout(() => {
        if (charIndex < chars.length) {
          const newDisplayedCode = displayedCode.split('\n');
          if (!newDisplayedCode[currentLine]) newDisplayedCode[currentLine] = '';
          newDisplayedCode[currentLine] += chars[charIndex];
          setDisplayedCode(newDisplayedCode.join('\n'));
        } else {
          setCurrentLine(prev => prev + 1);
        }
      }, 30);

      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setDisplayedCode('');
        setCurrentLine(0);
        setActiveSnippet((prev) => (prev + 1) % dataCodeSnippets.length);
      }, 3000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [displayedCode, currentLine, snippet, activeSnippet, dataCodeSnippets.length]);

  return (
    <section style={{
      padding: 'clamp(80px, 15vw, 160px) clamp(20px, 5vw, 40px)',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.4,
        animation: 'gridMove 20s linear infinite'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(32px, 6vw, 56px)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 'clamp(12px, 3vw, 16px)',
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          padding: '0 16px'
        }}>
          Advanced Data Analytics
          </h2>
          <p style={{
          fontSize: 'clamp(14px, 3vw, 18px)',
          textAlign: 'center',
          marginBottom: 'clamp(40px, 8vw, 64px)',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '700px',
          margin: '0 auto',
          padding: '0 16px'
          }}>
          Real-time processing, machine learning, and interactive visualization
          </p>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(12px, 2vw, 24px)'
        }}>
          <MacBrowserWindow url={`analytics-${snippet.name.toLowerCase().replace(/\s+/g, '-')}.py`}>
            <div style={{
              background: '#000000',
              padding: 'clamp(24px, 5vw, 48px)',
              minHeight: 'auto'
            }}>
              {/* Code Display */}
              <div
                ref={codeRef}
                style={{
                  padding: '24px',
                  fontFamily: 'Monaco, "Courier New", monospace',
                  fontSize: 'clamp(11px, 2.5vw, 13px)',
                  lineHeight: '18px',
                  color: '#E8E8E8',
                  minHeight: 'auto',
                  position: 'relative',
                  background: 'rgba(0,0,0,0.4)',
                  transition: 'height 0.3s ease',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <pre style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  <code style={{ color: snippet.color }}>{displayedCode}</code>
                  <span style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '20px',
                    background: snippet.color,
                    marginLeft: '2px',
                    animation: 'blink 1s infinite',
                    verticalAlign: 'middle'
                  }} />
                </pre>
        </div>

              {/* Control Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
                gap: 'clamp(8px, 2vw, 12px)',
                marginTop: '24px',
          flexWrap: 'wrap'
        }}>
                {dataCodeSnippets.map((item, idx) => (
            <button
                    key={idx}
                    onClick={() => {
                      setActiveSnippet(idx);
                      setDisplayedCode('');
                      setCurrentLine(0);
                    }}
              style={{
                      padding: 'clamp(8px, 2vw, 10px) clamp(16px, 3.5vw, 20px)',
                      borderRadius: 'clamp(6px, 1.5vw, 8px)',
                      border: 'none',
                      background: activeSnippet === idx ? item.color : 'rgba(255,255,255,0.05)',
                      color: '#FFFFFF',
                      fontSize: 'clamp(11px, 2.5vw, 13px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSnippet !== idx) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSnippet !== idx) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }
                    }}
                  >
                    {item.name}
            </button>
          ))}
        </div>
            </div>
          </MacBrowserWindow>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </section>
  );
};

export const DataAnalyticsPage: React.FC = () => {
  const analyticsServices = [
    {
      icon: BarChart3,
      title: 'Data Visualization & Business Intelligence',
      color: '#0071E3',
      gradient: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)',
      summary: 'Transform complex data into actionable insights with interactive dashboards and real-time visualization.',
      features: [
        'We build custom interactive dashboards that transform raw data into compelling visual narratives, enabling stakeholders to understand complex metrics at a glance and make data-driven decisions with confidence.',
        'Our BI solutions integrate seamlessly with your existing data infrastructure, providing real-time analytics and automated reporting that keeps your team informed and agile.',
        'From executive summaries to granular operational metrics, we design visualization systems that scale with your business, supporting everything from daily KPI tracking to strategic long-term planning.'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics & Machine Learning',
      color: '#FF6F00',
      gradient: 'linear-gradient(135deg, #FF6F00 0%, #FF8E53 100%)',
      summary: 'Leverage advanced ML algorithms to forecast trends, identify patterns, and automate decision-making processes.',
      features: [
        'Our predictive models analyze historical data and identify patterns that human analysts might miss, providing accurate forecasts for sales, customer behavior, market trends, and operational demands.',
        'We implement machine learning pipelines that continuously learn and adapt, improving prediction accuracy over time and automatically adjusting to changing business conditions and market dynamics.',
        'From customer churn prediction to demand forecasting, our ML solutions are tailored to your specific business challenges, delivering measurable ROI through improved efficiency and strategic foresight.'
      ]
    },
    {
      icon: Activity,
      title: 'User Behavior Analysis & Personalization',
      color: '#34C759',
      gradient: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
      summary: 'Deep dive into user interactions to optimize experiences, increase engagement, and drive conversions.',
      features: [
        'We track and analyze every aspect of user interaction across your digital properties, identifying friction points, drop-off patterns, and opportunities for optimization that directly impact your bottom line.',
        'Our behavioral analytics platform segments users based on actual behavior patterns rather than simple demographics, enabling hyper-targeted marketing campaigns and personalized user experiences that drive engagement.',
        'By combining session replay, heatmaps, funnel analysis, and cohort studies, we provide a complete picture of your user journey, revealing insights that lead to measurable improvements in conversion rates and user satisfaction.'
      ]
    },
    {
      icon: PieChart,
      title: 'A/B Testing & Experimentation',
      color: '#AF52DE',
      gradient: 'linear-gradient(135deg, #AF52DE 0%, #BF5AF2 100%)',
      summary: 'Make evidence-based decisions through rigorous experimentation and statistical analysis.',
      features: [
        'We design and implement comprehensive A/B testing frameworks that allow you to validate hypotheses, optimize user experiences, and maximize key metrics through systematic experimentation rather than guesswork.',
        'Our statistical analysis ensures test results are significant and actionable, preventing false positives and helping you understand not just what works, but why it works and for which user segments.',
        'From simple button color tests to complex multi-variate experiments, we manage the entire testing lifecycle, providing clear recommendations and measurable outcomes that drive continuous improvement.'
      ]
    },
    {
      icon: Database,
      title: 'Big Data Processing & ETL Pipelines',
      color: '#E25A1C',
      gradient: 'linear-gradient(135deg, #E25A1C 0%, #FF8C53 100%)',
      summary: 'Handle massive datasets with scalable infrastructure and efficient data processing pipelines.',
      features: [
        'We architect and implement robust ETL (Extract, Transform, Load) pipelines that efficiently process terabytes of data, ensuring your analytics systems have access to clean, consistent, and timely data from all your sources.',
        'Our big data solutions leverage cutting-edge technologies like Apache Spark, Hadoop, and cloud-native services to handle datasets that traditional databases cannot, enabling analysis at unprecedented scale and speed.',
        'From real-time streaming data to batch processing of historical records, we design data pipelines that are fault-tolerant, scalable, and optimized for performance, ensuring your data infrastructure grows seamlessly with your business.'
      ]
    },
    {
      icon: Zap,
      title: 'Real-Time Metrics & Monitoring',
      color: '#FF3B30',
      gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF6259 100%)',
      summary: 'Monitor your business in real-time with instant alerts and live dashboards.',
      features: [
        'We implement real-time analytics systems that process and visualize data as it happens, giving you immediate visibility into critical business metrics and enabling rapid response to emerging trends or issues.',
        'Our monitoring solutions integrate with tools like Firebase, Google Analytics 4, and Mixpanel, providing unified dashboards that combine data from multiple sources into a single, coherent view of your business performance.',
        'With customizable alerts and anomaly detection, our systems proactively notify you of significant changes or potential issues, ensuring you are always informed and can take action before small problems become major crises.'
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
            <BarChart3 size={16} strokeWidth={2} />
            <span>Data Analytics Solutions</span>
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
            Data & Analytics
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #0071E3 0%, #34C759 100%)',
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
            Transform raw data into actionable insights that drive strategic decisions and unlock your business potential.
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
                Unlock Your Data
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

      {/* Data Visualization Animation */}
      <DataVisualizationSection />

      {/* Services - Full Width Alternating Sections */}
      {analyticsServices.map((service, i) => {
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
                    Analytics Excellence
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
            Ready to unlock your data potential?
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            padding: '0 16px'
          }}>
            Schedule a consultation to discuss your data analytics needs and unlock the power of your data.
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
