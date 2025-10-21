import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, Code, TrendingUp, Lightbulb, Shield, X, Zap, Sparkles } from 'lucide-react';

/**
 * COMPLETE APPLE REDESIGN - Services Overview Page
 * 
 * Professional, clean services overview with:
 * - Hero section
 * - 4 service cards
 * - Benefits section
 * - Stats section
 * - CTA section
 */

// Code Reveal Animation Component
const CodeRevealSection: React.FC = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const codeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const codeSnippets = [
    { language: 'NestJS', color: '#E0234E', code: `// Enterprise-grade backend framework
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}
  
  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }
}` },
    { language: 'Spring Boot', color: '#6DB33F', code: `// Building scalable applications
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<User> createUser(
        @RequestBody @Valid UserDTO dto) {
        User user = userService.createUser(dto);
        return ResponseEntity.ok(user);
    }
}` },
    { language: '.NET Core', color: '#512BD4', code: `// Modern enterprise solutions
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    
    [HttpPost]
    public async Task<ActionResult<User>> Create(
        [FromBody] CreateUserDto dto)
    {
        var user = await _userService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), user);
    }
}` },
    { language: 'FastAPI', color: '#009688', code: `# Python web framework powerhouse
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

@app.post("/api/users")
async def create_user(user: UserCreate):
    new_user = await db.users.create({
        "email": user.email,
        "verified": True
    })
    return new_user` },
    { language: 'SQL', color: '#4479A1', code: `-- Database magic at work
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT false
);

CREATE INDEX idx_users_email ON users(email);
SELECT * FROM users WHERE verified = true;` },
    { language: 'React', color: '#61DAFB', code: `// Crafting beautiful interfaces
function Dashboard() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return (
    <Layout>
      <Charts data={data} />
      <Analytics metrics={stats} />
    </Layout>
  );
}` },
    { language: 'Angular', color: '#DD0031', code: `// Building powerful SPAs
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  users$: Observable<User[]>;
  
  constructor(private service: UserService) {}
  
  ngOnInit() {
    this.users$ = this.service.getUsers();
  }
}` },
    { language: 'Swift', color: '#FA7343', code: `// iOS development made elegant
class UserViewModel: ObservableObject {
    @Published var users: [User] = []
    
    func fetchUsers() async {
        do {
            users = try await apiService.getUsers()
        } catch {
            print("Error: \\(error)")
        }
    }
}` },
    { language: 'Kotlin', color: '#7F52FF', code: `// Android development powerhouse
class UserRepository(
    private val api: ApiService
) {
    suspend fun getUsers(): List<User> {
        return withContext(Dispatchers.IO) {
            api.fetchUsers().map { 
                it.toUser() 
            }
        }
    }
}` }
  ];

  const [activeSnippet, setActiveSnippet] = useState(0);
  const snippet = codeSnippets[activeSnippet];

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
          
          // Add sparkle effect
          if (codeRef.current && Math.random() > 0.7) {
            const rect = codeRef.current.getBoundingClientRect();
            setSparkles(prev => [...prev, {
              id: Date.now(),
              x: (charIndex * 9) + Math.random() * 20,
              y: (currentLine * 24) + Math.random() * 10
            }]);
          }
        } else {
          setCurrentLine(prev => prev + 1);
        }
      }, 30);

      return () => clearTimeout(timer);
    } else {
      // Reset and move to next snippet
      const resetTimer = setTimeout(() => {
        setDisplayedCode('');
        setCurrentLine(0);
        setActiveSnippet((prev) => (prev + 1) % codeSnippets.length);
      }, 3000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [displayedCode, currentLine, snippet, activeSnippet]);

  // Clean up old sparkles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setSparkles(prev => prev.filter(s => Date.now() - s.id < 1000));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <section style={{
      padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0f 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,113,227,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.3
      }} />

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
            background: 'rgba(0,113,227,0.1)',
            border: '1px solid rgba(0,113,227,0.3)',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '24px'
          }}>
            <Zap size={16} color="#0071E3" />
            <span style={{
              color: '#0071E3',
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              LIVE DEVELOPMENT
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
            Watch Code Come to
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #0071E3 0%, #34C759 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Life
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Experience the magic of development in real-time
          </p>
        </div>

        {/* Code Editor Window */}
        <div style={{
          background: 'rgba(20, 20, 25, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 100px ${snippet.color}20`,
          overflow: 'hidden',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Window Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(16px, 3.5vw, 20px) clamp(16px, 4vw, 24px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28CA42' }} />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: snippet.color,
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 600
            }}>
              <Code size={16} />
              {snippet.language}
            </div>
          </div>

          {/* Code Content */}
          <div
            ref={codeRef}
            style={{
              padding: '32px',
              fontFamily: 'Monaco, "Courier New", monospace',
              fontSize: 'clamp(13px, 3vw, 15px)',
              lineHeight: '24px',
              color: '#E8E8E8',
              minHeight: '300px',
              position: 'relative',
              background: 'rgba(0,0,0,0.4)'
            }}
          >
            {/* Sparkles */}
            {sparkles.map(sparkle => (
              <Sparkles
                key={sparkle.id}
                size={12}
                style={{
                  position: 'absolute',
                  left: `${sparkle.x}px`,
                  top: `${sparkle.y}px`,
                  color: snippet.color,
                  animation: 'sparkle 1s ease-out forwards',
                  pointerEvents: 'none'
                }}
              />
            ))}

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

          {/* Language Tabs */}
          <div style={{
            display: 'flex',
            gap: 'clamp(4px, 1vw, 8px)',
            padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.3)',
            flexWrap: 'wrap',
            overflowX: 'auto'
          }}>
            {codeSnippets.slice(0, isMobile ? 4 : codeSnippets.length).map((lang, idx) => (
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
                  background: activeSnippet === idx ? lang.color : 'rgba(255,255,255,0.05)',
                  color: activeSnippet === idx ? '#000' : '#FFF',
                  fontSize: 'clamp(10px, 2.5vw, 13px)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
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
                {lang.language}
              </button>
            ))}
          </div>
        </div>

        {/* Add CSS animation styles */}
        <style>{`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          @keyframes sparkle {
            0% { opacity: 1; transform: scale(1) translateY(0); }
            100% { opacity: 0; transform: scale(0.5) translateY(-20px); }
          }
        `}</style>
      </div>
    </section>
  );
};

export const ServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Web & App Development',
      description: 'Custom software solutions built with cutting-edge technologies. We create scalable, performant applications tailored to your business needs.',
      icon: <Code size={48} strokeWidth={1.5} />,
      color: '#0071E3',
      features: [
        'React & Next.js Applications',
        'Mobile Apps (iOS & Android)',
        'RESTful API Development',
        'Cloud Infrastructure & DevOps',
        'Database Design & Optimization',
        'Third-party Integrations'
      ],
      href: '/services/application-development'
    },
    {
      title: 'SEO & Paid Media',
      description: 'Data-driven digital marketing strategies that drive qualified traffic and convert visitors into customers. Grow your online presence.',
      icon: <TrendingUp size={48} strokeWidth={1.5} />,
      color: '#34C759',
      features: [
        'Search Engine Optimization',
        'Google Ads & Social Media Ads',
        'Content Marketing Strategy',
        'Analytics & Reporting',
        'Conversion Rate Optimization',
        'Email Marketing Campaigns'
      ],
      href: '/services/digital-marketing'
    },
    {
      title: 'Business Consulting',
      description: 'Strategic guidance to help your business leverage technology and optimize operations. Expert advice for digital transformation.',
      icon: <Lightbulb size={48} strokeWidth={1.5} />,
      color: '#FF9500',
      features: [
        'Digital Strategy Planning',
        'Process Optimization',
        'Technology Advisory',
        'Growth & Scaling Strategies',
        'Change Management',
        'Vendor Selection & Management'
      ],
      href: '/services/business-consulting'
    },
    {
      title: 'Support & Maintenance',
      description: 'Keep your systems running smoothly with 24/7 support, proactive monitoring, and regular updates. Peace of mind guaranteed.',
      icon: <Shield size={48} strokeWidth={1.5} />,
      color: '#5856D6',
      features: [
        '24/7 Technical Support',
        'Regular Security Updates',
        'Performance Monitoring',
        'Bug Fixes & Improvements',
        'Backup & Disaster Recovery',
        'Monthly Reports & Analytics'
      ],
      href: '/services/support-maintenance'
    }
  ];

  const benefits = [
    {
      title: 'Expert Team',
      description: 'Work with experienced professionals who stay current with the latest technologies and best practices.'
    },
    {
      title: 'Proven Methodology',
      description: 'We follow agile development practices and industry standards to ensure project success.'
    },
    
    {
      title: 'Long-term Partnership',
      description: "We're committed to your success beyond project delivery with ongoing support and guidance."
    },
    {
      title: 'Transparent Communication',
      description: 'Regular updates, clear timelines, and open communication throughout the entire project.'
    }
  ];

  const stats = [
    { value: '200+', label: 'Projects Completed' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Happy Clients' }
  ];

    return (
    <div style={{ 
      background: '#FFFFFF',
      maxWidth: '100vw',
      overflowX: 'hidden',
      minHeight: '100vh'
    }}>
      {/* ===========================
          HERO SECTION
          =========================== */}
      <section style={{
        padding: 'clamp(60px, 15vw, 140px) clamp(16px, 5vw, 24px) clamp(50px, 12vw, 100px)',
        background: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: 'clamp(48px, 7vw, 72px)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Services That Drive
            <br />
            <span style={{ 
              background: 'linear-gradient(90deg, #0071E3 0%, #34C759 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Real Results
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            maxWidth: '700px',
            margin: '0 auto 48px',
            fontWeight: 400
          }}>
            From development to marketing, we offer comprehensive solutions tailored to your business needs.
          </p>

          <Link to="/booking" style={{ textDecoration: 'none' }}>
            <Button 
              variant="primary" 
              size="lg"
              rightIcon={<ArrowRight size={20} />}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* ===========================
          SERVICES GRID
          =========================== */}
      <section style={{
        padding: 'clamp(50px, 10vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#F5F5F7'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '32px'
          }}>
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                style={{
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '48px',
                    height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 24px 48px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = service.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    color: service.color,
                    marginBottom: '24px'
                  }}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 'clamp(20px, 5vw, 28px)',
                    fontWeight: 600,
                    color: '#1D1D1F',
                    marginBottom: '16px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                  }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: 'clamp(14px, 3.3vw, 17px)',
                    lineHeight: 1.6,
                    color: '#6E6E73',
                    marginBottom: '32px',
                    flex: 1
                  }}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 32px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: 'clamp(13px, 3vw, 15px)',
                        color: '#6E6E73'
                      }}>
                        <Check size={16} color={service.color} strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: service.color,
                    fontSize: 'clamp(14px, 3.3vw, 17px)',
                    fontWeight: 500,
                    transition: 'gap 0.2s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.gap = '10px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.gap = '6px';
                    }}
                  >
                    Learn more
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          STATS SECTION
          =========================== */}
      <section style={{
        padding: 'clamp(50px, 10vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF',
        borderTop: '1px solid #D2D2D7',
        borderBottom: '1px solid #D2D2D7'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
            <h2 style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
              color: '#1D1D1F',
            textAlign: 'center',
            marginBottom: '80px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
            Trusted by Businesses Worldwide
            </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: '60px',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <div style={{
                  fontSize: 'clamp(36px, 10vw, 64px)',
                  fontWeight: 700,
                  color: '#0071E3',
                  marginBottom: '8px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {stat.value}
            </div>
                <div style={{
                  fontSize: 'clamp(15px, 3.5vw, 18px)',
                  color: '#6E6E73',
                  fontWeight: 500
                }}>
                  {stat.label}
          </div>
          </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          BENEFITS SECTION
          =========================== */}
      <section style={{
        padding: 'clamp(50px, 10vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#F5F5F7'
      }}>
              <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
                <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
                    fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              Why Work With Us
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: 1.6,
              color: '#6E6E73',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We're committed to your success every step of the way
            </p>
          </div>

                    <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: '48px'
          }}>
            {benefits.map((benefit, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#0071E3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <Check size={32} color="#FFFFFF" strokeWidth={3} />
          </div>

                <h3 style={{
                  fontSize: 'clamp(18px, 4.5vw, 22px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '12px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {benefit.title}
                </h3>

                <p style={{
                  fontSize: 'clamp(14px, 3.2vw, 16px)',
                  lineHeight: 1.6,
                  color: '#6E6E73'
                }}>
                  {benefit.description}
                </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          OUR PROCESS - Timeline Section
          =========================== */}
      <section style={{
        padding: 'clamp(50px, 10vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              Our Development Process
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: 1.6,
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              From concept to launch, we guide you through every step
            </p>
          </div>

          {/* Process Steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '48px'
          }}>
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Understanding your vision, goals, and requirements through in-depth consultation.',
                icon: <Lightbulb size={32} />,
                color: '#FF9500'
              },
              {
                step: '02',
                title: 'Design',
                description: 'Creating intuitive user experiences and stunning visual designs that captivate.',
                icon: <Sparkles size={32} />,
                color: '#0071E3'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Building robust, scalable applications with clean code and best practices.',
                icon: <Code size={32} />,
                color: '#34C759'
              },
              {
                step: '04',
                title: 'Launch',
                description: 'Deploying to production with comprehensive testing and support.',
                icon: <Zap size={32} />,
                color: '#FF3B30'
              }
            ].map((process, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  padding: 'clamp(28px, 6vw, 48px) clamp(20px, 5vw, 32px)',
                  background: '#F5F5F7',
                  borderRadius: '24px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = `0 24px 48px ${process.color}30`;
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = '#F5F5F7';
                }}
              >
                {/* Step Number */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  fontSize: 'clamp(40px, 12vw, 80px)',
                  fontWeight: 800,
                  color: `${process.color}15`,
                  lineHeight: 1,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {process.step}
                </div>

                {/* Icon */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `${process.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  color: process.color
                }}>
                  {process.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 'clamp(20px, 5vw, 28px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {process.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: 'clamp(14px, 3.2vw, 16px)',
                  lineHeight: 1.6,
                  color: '#6E6E73',
                  marginBottom: 0
                }}>
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          CODE REVEAL ANIMATION - Development Showcase
          =========================== */}
      <CodeRevealSection />

      {/* ===========================
          TOOLS & TECHNOLOGIES - WITH REAL LOGOS
          =========================== */}
      <section style={{
        padding: 'clamp(50px, 10vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#1D1D1F',
              marginBottom: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              Technologies We Master
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: 1.6,
              color: '#6E6E73',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Cutting-edge tools and frameworks for superior solutions
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))',
            gap: '32px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
              { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#000000' },
              { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
              { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
              { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
              { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900' },
              { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
              { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#4169E1' },
              { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
              { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', color: '#E10098' },
              { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#FFCA28' },
              { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', color: '#06B6D4' }
            ].map((tech, index) => (
              <div
                key={index}
                style={{
                  background: '#F5F5F7',
                  borderRadius: '24px',
                  padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 24px)',
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${tech.color}30`;
                  e.currentTarget.style.borderColor = tech.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F5F5F7';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    marginBottom: '16px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div style={{
                  fontSize: 'clamp(14px, 3.3vw, 17px)',
                  fontWeight: 600,
                  color: '#1D1D1F',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          FEATURE COMPARISON TABLE - COMPACT & STYLED
          =========================== */}
      <section style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 24px)',
        background: 'linear-gradient(180deg, #F5F5F7 0%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(52,199,89,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '950px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0,113,227,0.1)',
              border: '1px solid rgba(0,113,227,0.2)',
              borderRadius: '100px',
              padding: '6px 16px',
              marginBottom: '20px'
            }}>
              <Check size={14} color="#0071E3" strokeWidth={3} />
              <span style={{
                color: '#0071E3',
                fontSize: 'clamp(11px, 2.7vw, 13px)',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                FEATURES OVERVIEW
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#1D1D1F',
              marginBottom: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
            }}>
              What's Included
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 3.5vw, 18px)',
              lineHeight: 1.5,
              color: '#6E6E73',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Compare our service tiers and find the perfect fit
            </p>
          </div>

          {/* Comparison Table - Compact & Styled with Mobile Scroll */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.8)',
            WebkitOverflowScrolling: 'touch'
          }}>
            {/* Table Header - Compact */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
              minWidth: '600px',
              gap: '16px',
              padding: 'clamp(16px, 3.5vw, 20px) clamp(16px, 4vw, 24px)',
              background: 'linear-gradient(135deg, #0071E3 0%, #00A8E8 100%)',
              color: '#FFFFFF',
              position: 'relative'
            }}>
              <div style={{
                fontSize: 'clamp(13px, 3vw, 15px)',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                Feature
              </div>
              <div style={{
                fontSize: 'clamp(12px, 2.8vw, 14px)',
                fontWeight: 600,
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                Starter
              </div>
              <div style={{
                fontSize: 'clamp(12px, 2.8vw, 14px)',
                fontWeight: 600,
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '0',
                  background: '#FFD700',
                  color: '#1D1D1F',
                  fontSize: 'clamp(9px, 2vw, 10px)',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontWeight: 700
                }}>
                  HOT
                </div>
                Professional
              </div>
              <div style={{
                fontSize: 'clamp(12px, 2.8vw, 14px)',
                fontWeight: 600,
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                Enterprise
              </div>
            </div>

            {/* Table Rows - Compact */}
            {[
              { feature: 'Custom Development', starter: true, pro: true, enterprise: true, highlight: false },
              { feature: 'Responsive Design', starter: true, pro: true, enterprise: true, highlight: false },
              { feature: 'SEO Optimization', starter: 'Basic', pro: 'Full', enterprise: 'Advanced', highlight: true },
              { feature: 'Advanced Animations', starter: false, pro: true, enterprise: true, highlight: false },
              { feature: 'API Development', starter: false, pro: true, enterprise: true, highlight: true },
              { feature: 'Cloud Infrastructure', starter: false, pro: true, enterprise: true, highlight: false },
              { feature: 'Security & Compliance', starter: false, pro: 'Standard', enterprise: 'Enterprise', highlight: true },
              { feature: 'Dedicated Support', starter: false, pro: false, enterprise: true, highlight: false }
            ].map((row, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
                  minWidth: '600px',
                  gap: '16px',
                  padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
                  borderBottom: index < 7 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  background: row.highlight ? 'rgba(0,113,227,0.02)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,113,227,0.06)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = row.highlight ? 'rgba(0,113,227,0.02)' : 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  fontSize: 'clamp(13px, 3vw, 15px)',
                  fontWeight: 500,
                  color: '#1D1D1F',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {row.highlight && (
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#0071E3'
                    }} />
                  )}
                  {row.feature}
                </div>
                
                {/* Starter Column */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {row.starter === true ? (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(52,199,89,0.3)',
                      animation: 'pulse 2s infinite'
                    }}>
                      <Check size={16} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  ) : row.starter === false ? (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#F5F5F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <X size={14} color="#D2D2D7" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <span style={{
                      fontSize: 'clamp(11px, 2.7vw, 13px)',
                      color: '#0071E3',
                      fontWeight: 600,
                      padding: '4px 10px',
                      background: 'rgba(0,113,227,0.1)',
                      borderRadius: '8px'
                    }}>
                      {row.starter}
                    </span>
                  )}
                </div>

                {/* Professional Column */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {row.pro === true ? (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(52,199,89,0.3)',
                      animation: 'pulse 2s infinite'
                    }}>
                      <Check size={16} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  ) : row.pro === false ? (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#F5F5F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <X size={14} color="#D2D2D7" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <span style={{
                      fontSize: 'clamp(11px, 2.7vw, 13px)',
                      color: '#0071E3',
                      fontWeight: 600,
                      padding: '4px 10px',
                      background: 'rgba(0,113,227,0.1)',
                      borderRadius: '8px'
                    }}>
                      {row.pro}
                    </span>
                  )}
                </div>

                {/* Enterprise Column */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {row.enterprise === true ? (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(52,199,89,0.3)',
                      animation: 'pulse 2s infinite'
                    }}>
                      <Check size={16} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  ) : row.enterprise === false ? (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#F5F5F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <X size={14} color="#D2D2D7" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <span style={{
                      fontSize: 'clamp(11px, 2.7vw, 13px)',
                      color: '#0071E3',
                      fontWeight: 600,
                      padding: '4px 10px',
                      background: 'rgba(0,113,227,0.1)',
                      borderRadius: '8px'
                    }}>
                      {row.enterprise}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Footer CTA inside table */}
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(0,113,227,0.05) 0%, rgba(52,199,89,0.05) 100%)',
              borderTop: '1px solid rgba(0,113,227,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <div style={{
                    fontSize: 'clamp(14px, 3.2vw, 16px)',
                    fontWeight: 600,
                    color: '#1D1D1F',
                    marginBottom: '4px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                  }}>
                    Ready to get started?
                  </div>
                  <div style={{
                    fontSize: 'clamp(12px, 2.8vw, 14px)',
                    color: '#6E6E73'
                  }}>
                    Choose the perfect plan for your project
                  </div>
                </div>
                <Link to="/booking" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="primary" 
                    size="lg"
                    rightIcon={<ArrowRight size={18} />}
                    style={{
                      background: 'linear-gradient(135deg, #0071E3 0%, #00A8E8 100%)',
                      boxShadow: '0 4px 16px rgba(0,113,227,0.3)'
                    }}
                  >
                    Book a consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Add animations */}
          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); box-shadow: 0 2px 8px rgba(52,199,89,0.3); }
              50% { transform: scale(1.05); box-shadow: 0 4px 12px rgba(52,199,89,0.5); }
            }
          `}</style>
        </div>
      </section>

      {/* ===========================
          CTA SECTION
          =========================== */}
      <section style={{
        padding: 'clamp(50px, 10vw, 100px) clamp(16px, 5vw, 24px)',
        background: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: '#1D1D1F',
            marginBottom: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Ready to Start Your Project?
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: '48px'
          }}>
            Let's discuss how we can help you achieve your business goals with our expert services.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <Button 
                variant="primary" 
                size="xl"
                rightIcon={<ArrowRight size={22} />}
              >
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
          /* Service cards grid - ensure single column on mobile */
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          /* Comparison table - better mobile layout */
          .comparison-table {
            overflow-x: auto !important;
          }
          
          /* Stats grid - 2 columns on mobile */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;


