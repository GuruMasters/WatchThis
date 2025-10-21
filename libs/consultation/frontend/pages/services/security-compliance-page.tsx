import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, Shield, Lock, Eye, AlertTriangle, CheckCircle, Search, FileCheck, Code, Zap, Key, ShieldCheck } from 'lucide-react';

/**
 * Security & Compliance Service Page
 * Featuring animated security scan, shield protection, and live code typing
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

// Security Code Reveal Section with Live Typing
const SecurityCodeSection: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);

  const securityCodeSnippets = [
    {
      name: 'AWS IAM & CloudWatch',
      color: '#FF9900',
      code: `// AWS Security - IAM & CloudWatch
import { IAMClient } from "@aws-sdk/client-iam";
import { CloudWatch } from "@aws-sdk/client-cloudwatch";

// Least-privilege IAM policy
const policy = {
  Version: "2012-10-17",
  Statement: [{
    Effect: "Allow",
    Action: ["s3:GetObject"],
    Resource: "arn:aws:s3:::secure/*",
    Condition: {
      IpAddress: { "aws:SourceIp": "10.0.0.0/16" }
    }
  }]
};

// Create policy
const iam = new IAMClient({ region: "us-east-1" });
await iam.send(new CreatePolicyCommand({
  PolicyName: "SecureAccess",
  PolicyDocument: JSON.stringify(policy)
}));

// CloudWatch monitoring
const logs = new CloudWatch();
await logs.putLogEvents({
  logGroup: "/aws/security",
  events: [{
    timestamp: Date.now(),
    message: "LOGIN_SUCCESS"
  }]
});

console.log("[✓] AWS security configured");`
    },
    {
      name: 'OWASP Protection',
      color: '#5856D6',
      code: `// OWASP Top 10 Security
import { sanitize } from 'security-middleware';

class OWASPProtection {
  // SQL Injection Prevention
  sanitizeQuery(q: string) {
    return q.replace(/[';--]/g, '');
  }

  // XSS Protection
  escapeHTML(input: string) {
    return input.replace(/[&<>"']/g, 
      c => ({'&':'&amp;','<':'&lt;','>':'&gt;',
            '"':'&quot;',"'":'&#x27;'}[c]));
  }

  // CSRF Token
  validateCSRF(token: string) {
    return crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(process.env.CSRF_SECRET));
  }

  // Security Headers
  setHeaders(res: Response) {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('CSP', "default-src 'self'");
  }
}

console.log("[✓] OWASP active");`
    },
    {
      name: 'JWT Authentication',
      color: '#FF3B30',
      code: `// JWT Authentication
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class JWTAuth {
  secret = process.env.JWT_SECRET;

  async login(email: string, pwd: string) {
    const user = await User.findOne({ email });
    const valid = await bcrypt.compare(pwd, 
                                       user.password);
    if (!valid) throw new Error('Invalid');

    const token = jwt.sign(
      { id: user.id, role: user.role },
      this.secret,
      { expiresIn: '15m' }
    );

    return { token };
  }

  verify(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      throw new Error('Invalid token');
    }
  }
}

console.log("[✓] JWT configured");`
    },
    {
      name: 'AES Encryption',
      color: '#34C759',
      code: `// AES-256-GCM Encryption
import crypto from 'crypto';

class AESEncryption {
  algorithm = 'aes-256-gcm';
  key = crypto.scryptSync(process.env.SECRET, 
                          'salt', 32);

  encrypt(text: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.algorithm, this.key, iv
    );

    let enc = cipher.update(text, 'utf8', 'hex');
    enc += cipher.final('hex');
    
    return JSON.stringify({
      iv: iv.toString('hex'),
      data: enc,
      tag: cipher.getAuthTag().toString('hex')
    });
  }

  decrypt(encrypted: string) {
    const {iv, data, tag} = JSON.parse(encrypted);
    const decipher = crypto.createDecipheriv(
      this.algorithm, this.key, 
      Buffer.from(iv, 'hex')
    );
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
    return decipher.update(data, 'hex', 'utf8') + 
           decipher.final('utf8');
  }
}

console.log("[✓] AES-256 ready");`
    },
    {
      name: 'Firewall Rules',
      color: '#FF9500',
      code: `# Firewall - iptables
#!/bin/bash

# Flush & set defaults
iptables -F && iptables -X
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT

# Established connections
iptables -A INPUT -m state \
  --state ESTABLISHED,RELATED -j ACCEPT

# SSH (rate limited)
iptables -A INPUT -p tcp --dport 22 \
  -m state --state NEW -m recent \
  --set --name SSH
iptables -A INPUT -p tcp --dport 22 \
  -m recent --update --seconds 60 \
  --hitcount 4 -j DROP

# HTTPS
iptables -A INPUT -p tcp --dport 443 \
  -j ACCEPT

# DDoS Protection
iptables -A INPUT -p tcp --syn \
  -m limit --limit 1/s -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP

# Block invalid
iptables -A INPUT -m state \
  --state INVALID -j DROP

echo "[✓] Firewall configured"`
    }
  ];

  const [activeSnippet, setActiveSnippet] = useState(0);
  const snippet = securityCodeSnippets[activeSnippet];

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
        setActiveSnippet((prev) => (prev + 1) % securityCodeSnippets.length);
      }, 3000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [displayedCode, currentLine, snippet, activeSnippet, securityCodeSnippets.length]);

  return (
    <section style={{
      padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0f 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,59,48,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,59,48,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.2
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
            background: 'rgba(255,59,48,0.1)',
            border: '1px solid rgba(255,59,48,0.3)',
            borderRadius: '100px',
            padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 20px)',
            marginBottom: 'clamp(16px, 4vw, 24px)'
          }}>
            <ShieldCheck size={16} color="#FF3B30" strokeWidth={2} />
            <span style={{
              color: '#FF3B30',
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              LIVE SECURITY CODE
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
            Security In
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #FF3B30 0%, #FF9500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Action
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Watch real-time security implementation across different systems
          </p>
        </div>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <MacBrowserWindow url={`security-console.shield.dev/${snippet.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(16px, 3.5vw, 20px) clamp(16px, 4vw, 24px)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              background: '#000000'
            }}>
          <div style={{
              display: 'flex',
              alignItems: 'center',
                gap: '8px',
                color: snippet.color,
                fontSize: 'clamp(12px, 2.8vw, 14px)',
                fontWeight: 600
              }}>
                <Shield size={16} />
                {snippet.name}
            </div>
          </div>

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
                transition: 'height 0.3s ease'
              }}
            >
              <pre style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                <code>{displayedCode}</code>
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

            <div style={{
              display: 'flex',
              gap: 'clamp(4px, 1vw, 8px)',
              padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(0,0,0,0.3)',
              flexWrap: 'wrap',
              overflowX: 'auto'
            }}>
              {securityCodeSnippets.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDisplayedCode('');
                    setCurrentLine(0);
                    setActiveSnippet(idx);
                  }}
                  style={{
                    padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)',
                    borderRadius: 'clamp(6px, 1.5vw, 8px)',
                    border: 'none',
                    background: activeSnippet === idx ? sec.color : 'rgba(255,255,255,0.05)',
                    color: activeSnippet === idx ? '#FFF' : 'rgba(255,255,255,0.7)',
                    fontSize: 'clamp(10px, 2.5vw, 13px)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {sec.name}
                </button>
              ))}
                    </div>
          </MacBrowserWindow>
                      </div>

        <style>{`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
        `}</style>
                      </div>
    </section>
  );
};

const SecurityAnimationSection: React.FC = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [threats, setThreats] = useState<Array<{ id: number; x: number; y: number; blocked: boolean }>>([]);
  const [securityScore, setSecurityScore] = useState(0);

  const securityLayers = [
    { name: 'Perimeter Security', color: '#0071E3', icon: Shield, strength: 95 },
    { name: 'Application Layer', color: '#34C759', icon: Lock, strength: 92 },
    { name: 'Data Encryption', color: '#FF9500', icon: Eye, strength: 98 },
    { name: 'Monitoring & Alerts', color: '#5856D6', icon: AlertTriangle, strength: 90 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          setActiveLayer((current) => (current + 1) % securityLayers.length);
          return 0;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [securityLayers.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat = {
          id: Date.now(),
          x: Math.random() * 100,
          y: -5,
          blocked: false
        };
        setThreats(prev => [...prev, newThreat]);
      }

      setThreats(prev => prev.map(threat => {
        const newY = threat.y + 2;
        if (newY > 45 && !threat.blocked) {
          return { ...threat, blocked: true };
        }
        return { ...threat, y: newY };
      }).filter(t => t.y < 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const avgScore = securityLayers.reduce((sum, layer) => sum + layer.strength, 0) / securityLayers.length;
    setSecurityScore(Math.round(avgScore));
  }, [securityLayers]);

  const layer = securityLayers[activeLayer];

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

      {/* Radial Glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
        width: '100%',
                      height: '100%',
        background: `radial-gradient(circle, ${layer.color}15 0%, transparent 70%)`,
        filter: 'blur(100px)',
        transition: 'background 1s ease'
      }} />

          <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
            <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(40px, 8vw, 80px)'
                  }}>
                    <div style={{
            display: 'inline-flex',
              alignItems: 'center',
            gap: '12px',
            background: `${layer.color}15`,
            border: `1px solid ${layer.color}40`,
            borderRadius: '100px',
            padding: 'clamp(8px, 2vw, 12px) clamp(16px, 3vw, 32px)',
            marginBottom: 'clamp(16px, 4vw, 32px)',
            transition: 'all 0.5s ease'
          }}>
            <Shield size={20} color={layer.color} strokeWidth={2} />
              <span style={{
              color: layer.color,
              fontSize: 'clamp(13px, 3vw, 16px)',
                        fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase'
                      }}>
              Real-Time Security Monitoring
              </span>
                      </div>

          <h2 style={{
            fontSize: 'clamp(48px, 8vw, 80px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: '28px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Enterprise-Grade
            <br />
              <span style={{
              background: 'linear-gradient(90deg, #5856D6 0%, #34C759 50%, #FF9500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 4s ease infinite',
              backgroundSize: '200% 200%'
            }}>
              Protection
              </span>
          </h2>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slideUpFade {
          0% { 
            opacity: 0; 
            transform: translateY(30px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          }
        `}</style>
    </section>
  );
};

export const SecurityCompliancePage: React.FC = () => {
  const securityServices = [
    {
      icon: Shield,
      title: 'Cyber Security Consulting',
      color: '#5856D6',
      gradient: 'linear-gradient(135deg, #5856D6, #7B68EE)',
      features: [
        'Our comprehensive security audits leverage advanced penetration testing methodologies and AI-powered threat analysis to identify vulnerabilities across your entire infrastructure. We conduct thorough assessments of network architecture, application security, and data protection measures, providing detailed reports with actionable remediation strategies tailored to your specific business requirements.',
        'We design and implement multi-layered defense strategies that incorporate zero-trust architecture, advanced firewall configurations, intrusion detection systems, and continuous monitoring protocols. Our security frameworks are customized to protect against evolving cyber threats while ensuring minimal disruption to your business operations and maintaining optimal system performance.',
        'Our risk management services include developing comprehensive incident response plans, establishing robust security governance frameworks, and conducting regular security awareness training programs. We ensure your organization is fully prepared to detect, respond to, and recover from security incidents while maintaining business continuity and protecting critical assets.'
      ],
      summary: 'Expert strategic consultation for building and maintaining robust security infrastructures with continuous protection against emerging cyber threats and comprehensive risk management.'
    },
    {
      icon: Search,
      title: 'Penetration Testing (Pen Test)',
      color: '#FF3B30',
      gradient: 'linear-gradient(135deg, #FF3B30, #FF6B58)',
      features: [
        'We conduct highly controlled, simulated cyber attacks using the exact same advanced techniques employed by sophisticated threat actors. Our ethical hacking team systematically attempts to breach your defenses through network penetration, social engineering tactics, physical security testing, and application exploitation to identify critical weaknesses before malicious hackers can discover and exploit them.',
        'Our comprehensive penetration testing methodology covers all attack surfaces including web applications, mobile applications, RESTful APIs, cloud infrastructure, IoT devices, and internal corporate networks. We meticulously discover and document all security vulnerabilities including SQL injection, cross-site scripting, authentication bypasses, privilege escalation, and configuration weaknesses, complete with working proof-of-concept demonstrations.',
        'Each penetration testing engagement concludes with detailed security reports containing executive summaries for management, technical findings for IT teams, comprehensive risk assessments based on CVSS scoring, and prioritized remediation recommendations. We provide dedicated hands-on support for implementing security patches and conduct thorough re-testing to verify that all identified security issues have been properly addressed and resolved.'
      ],
      summary: 'Advanced penetration testing using industry-standard attack methodologies to systematically expose system weaknesses and provide detailed, actionable security improvements before real threats can materialize.'
    },
    {
      icon: Lock,
      title: 'Data Protection & Privacy',
      color: '#34C759',
      gradient: 'linear-gradient(135deg, #34C759, #30D158)',
      features: [
        'We ensure complete compliance with all major international data protection regulations including GDPR, HIPAA, SOC 2, ISO 27001, CCPA, and emerging privacy laws worldwide. Our compliance experts conduct comprehensive gap analyses, develop customized privacy policies and procedures, implement advanced consent management systems, and thoroughly prepare your organization for regulatory audits with complete documentation packages.',
        'We implement military-grade encryption protocols for protecting data both at rest and in transit using AES-256 encryption, TLS 1.3 secure communications, and enterprise key management systems. Our comprehensive data protection strategies include full database encryption, file-level encryption for sensitive documents, encrypted automated backups, secure data transmission channels, and certified secure data destruction procedures for end-of-life information.',
        'Our privacy-by-design philosophy integrates robust data protection measures into every aspect of your systems from the ground up. We implement strict data minimization practices, granular role-based access controls, comprehensive audit logging and monitoring, intelligent data retention and archival policies, thorough privacy impact assessments, and user consent management frameworks to ensure all personal data is collected, processed, stored, and disposed of in full compliance with applicable regulations.'
      ],
      summary: 'Comprehensive data security and regulatory compliance solutions ensuring your organization meets all legal requirements while protecting sensitive customer and business information across all platforms and jurisdictions.'
    },
    {
      icon: Code,
      title: 'Application Security',
      color: '#007AFF',
      gradient: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
      features: [
        'Our meticulous security code review process combines state-of-the-art automated static analysis tools with in-depth manual code inspection by experienced security engineers. We systematically identify security vulnerabilities in source code, thoroughly review authentication and authorization logic, carefully assess cryptographic implementations for weaknesses, and verify that industry-standard secure coding practices are consistently followed throughout your entire codebase.',
        'We seamlessly integrate comprehensive security testing directly into your DevOps pipeline with automated SAST (Static Application Security Testing), DAST (Dynamic Application Security Testing), IAST (Interactive Application Security Testing), and SCA (Software Composition Analysis). Our advanced CI/CD security integration includes real-time automated vulnerability scanning, continuous dependency checking for known CVEs, license compliance verification, and configurable security quality gates that prevent insecure code from ever reaching production environments.',
        'We specifically address and remediate the OWASP Top 10 most critical security risks including injection attacks, broken authentication mechanisms, sensitive data exposure, XML external entity vulnerabilities, broken access controls, security misconfigurations, cross-site scripting, insecure deserialization, vulnerable components, and insufficient logging. Our comprehensive remediation guidance includes detailed secure code examples, architectural recommendations, implementation support, and ongoing security training for your development teams.'
      ],
      summary: 'End-to-end application security services encompassing secure development practices, automated testing integration, and comprehensive security hardening for web, mobile, and API applications to prevent data breaches and security incidents.'
    },
    {
      icon: Zap,
      title: 'Incident Response & Monitoring',
      color: '#FF9500',
      gradient: 'linear-gradient(135deg, #FF9500, #FFCC00)',
      features: [
        'Our 24/7/365 Security Operations Center (SOC) staffed by certified security analysts provides continuous real-time threat detection and rapid incident response capabilities. We deploy advanced SIEM (Security Information and Event Management) systems, implement intelligent automated alerting for suspicious activities, utilize machine learning for anomaly detection, and maintain a dedicated escalation team of expert security analysts ready to respond to any security incident within minutes of detection.',
        'When security breaches occur, our specialized digital forensic analysis team conducts comprehensive investigations to accurately determine the attack vector used, assess the complete scope of compromise, identify all affected systems and data, preserve digital evidence chains, and collect forensic artifacts for potential legal proceedings. We provide detailed incident response reports with root cause analysis, impact assessments, and documented lessons learned to prevent future incidents.',
        'We implement enterprise-grade continuous monitoring across your entire technology infrastructure including networks, endpoints, servers, applications, databases, and cloud environments. Our advanced monitoring solutions aggregate and correlate logs from thousands of sources, apply sophisticated machine learning algorithms for behavioral anomaly detection, track comprehensive user and entity behavior analytics (UEBA), provide intuitive real-time security dashboards showing your complete security posture, and generate automated compliance reports for regulatory requirements.'
      ],
      summary: 'Rapid incident detection and coordinated response services with round-the-clock monitoring, expert forensic investigation capabilities, and comprehensive security event management to minimize business impact and damage from cyber attacks.'
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
            <ShieldCheck size={16} strokeWidth={2} />
            <span>Enterprise Security Solutions</span>
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
            Security & Compliance
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #5856D6 0%, #34C759 100%)',
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
            Enterprise-grade security solutions that protect your business from cyber threats while ensuring full compliance with industry regulations.
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
                Secure Your Business
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

      {/* Security Code Section */}
      <SecurityCodeSection />

      {/* Security Animation */}
      <SecurityAnimationSection />

      {/* Premium Security Services Sections - Full Width Alternating */}
      {securityServices.map((service, i) => {
        const IconComponent = service.icon;
        const isBlack = i % 2 === 0;
        const isTextLeft = i % 2 === 0;

        return (
          <section
            key={i}
            style={{
              padding: 'clamp(100px, 18vw, 180px) 0',
              background: isBlack 
                ? 'linear-gradient(180deg, #000000 0%, #0a0a0f 100%)' 
                : 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F7 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Animated Background Pattern */}
            {isBlack && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(${service.color}08 1px, transparent 1px), linear-gradient(90deg, ${service.color}08 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
                opacity: 0.4,
                animation: 'gridMove 20s linear infinite'
              }} />
            )}

            {/* Radial Glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: isTextLeft ? '20%' : '80%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              background: `radial-gradient(circle, ${service.color}${isBlack ? '15' : '10'} 0%, transparent 70%)`,
              filter: 'blur(100px)',
              pointerEvents: 'none'
            }} />

            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 clamp(16px, 5vw, 24px)',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                gap: 'clamp(24px, 6vw, 60px)',
                alignItems: 'center'
              }}>
                {/* Content Side */}
                <div style={{
                  order: isTextLeft ? 1 : 2
                }}>
                  {/* Service Number Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: `${service.color}${isBlack ? '20' : '15'}`,
                    border: `2px solid ${service.color}${isBlack ? '40' : '30'}`,
                    borderRadius: '100px',
                    padding: '12px 32px',
                    marginBottom: '40px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 8px 24px ${service.color}20`
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: service.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 12px ${service.color}40`
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
                      Security Excellence
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

                  {/* Subtitle/Summary First */}
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

                  {/* Features as Clean Text */}
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

                {/* Visual Side */}
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

                    {/* Main Circle */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: service.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 20px 60px ${service.color}40, 0 0 80px ${service.color}30, inset 0 0 40px ${service.color}12`,
                      animation: 'float 6s ease-in-out infinite',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Inner Glow Layer */}
                      <div style={{
                        position: 'absolute',
                        inset: '15px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(10px)'
                      }} />
                      
                      {/* Icon */}
                      <IconComponent 
                        size={window.innerWidth < 768 ? 50 : 80}
                        color="#FFFFFF" 
                        strokeWidth={2}
                        style={{ 
                          position: 'relative', 
                          zIndex: 1,
                          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.2))'
                        }}
                      />

                      {/* Animated Shimmer */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                        animation: 'shimmer 3s ease-in-out infinite'
                      }} />
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
                          boxShadow: `0 0 16px ${service.color}`,
                          animation: `orbit${idx} 8s linear infinite`,
                          transformOrigin: 'center',
                          left: '50%',
                          top: '50%',
                          marginLeft: '-5px',
                          marginTop: '-5px'
                        }}
                      />
            ))}
          </div>

                  {/* Background Glow */}
                  <div style={{
                    position: 'absolute',
                    inset: '-40px',
                    background: `radial-gradient(circle, ${service.color}18 0%, transparent 65%)`,
                    pointerEvents: 'none',
                    filter: 'blur(50px)',
                    animation: 'pulse 4s ease-in-out infinite'
                  }} />
        </div>
              </div>
            </div>

            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-25px) scale(1.03); }
              }
              @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes shimmer {
                0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
                50% { transform: translateX(100%) translateY(100%) rotate(30deg); }
              }
              @keyframes orbit0 {
                0% { transform: rotate(0deg) translateX(clamp(80px, 14vw, 135px)) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(clamp(80px, 14vw, 135px)) rotate(-360deg); }
              }
              @keyframes orbit1 {
                0% { transform: rotate(120deg) translateX(clamp(80px, 14vw, 135px)) rotate(-120deg); }
                100% { transform: rotate(480deg) translateX(clamp(80px, 14vw, 135px)) rotate(-480deg); }
              }
              @keyframes orbit2 {
                0% { transform: rotate(240deg) translateX(clamp(80px, 14vw, 135px)) rotate(-240deg); }
                100% { transform: rotate(600deg) translateX(clamp(80px, 14vw, 135px)) rotate(-600deg); }
              }
              @keyframes gridMove {
                0% { background-position: 0 0; }
                100% { background-position: 80px 80px; }
              }
            `}</style>
      </section>
        );
      })}

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
            Ready to Secure Your Infrastructure?
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            padding: '0 16px'
          }}>
            Let's protect your business together and build a fortress around your digital assets.
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

export default SecurityCompliancePage;

