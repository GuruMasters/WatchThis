import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check, Code, Zap, Sparkles, Smartphone, Cloud, Database, Layers, Settings, Shield, Search, Lightbulb, Wrench, TestTube, Rocket, Heart, Linkedin } from 'lucide-react';

/**
 * Software Development Service Page
 * Featuring live code animation across multiple programming languages
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
    { language: '.NET', color: '#512BD4', code: `// Modern enterprise solutions
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
    { language: 'Spring', color: '#6DB33F', code: `// Building scalable applications
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
    { language: 'NestJS', color: '#E0234E', code: `// Enterprise-grade backend framework
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}
  
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }
}` },
    { language: 'SQL', color: '#4479A1', code: `-- Database magic at work
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT false
);

CREATE INDEX idx_users_email ON users(email);
SELECT * FROM users WHERE verified = true;` },
    { language: 'Django', color: '#092E20', code: `# Python web framework powerhouse
from django.views import View
from django.http import JsonResponse

class UserView(View):
    def post(self, request):
        user = User.objects.create(
            email=request.POST['email'],
            verified=True
        )
        return JsonResponse({'id': user.id})` },
    { language: 'Go', color: '#00ADD8', code: `// Fast and efficient backend
func CreateUser(w http.ResponseWriter, r *http.Request) {
    var user User
    json.NewDecoder(r.Body).Decode(&user)
    
    db.Create(&user)
    
    json.NewEncoder(w).Encode(user)
}

http.HandleFunc("/api/users", CreateUser)` },
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
    { language: 'Flutter', color: '#02569B', code: `// Cross-platform mobile apps
class UserProfile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: StreamBuilder<User>(
        stream: userStream,
        builder: (context, snapshot) {
          return UserCard(user: snapshot.data);
        },
      ),
    );
  }
}` },
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
          
          if (codeRef.current && Math.random() > 0.7) {
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
      const resetTimer = setTimeout(() => {
        setDisplayedCode('');
        setCurrentLine(0);
        setActiveSnippet((prev) => (prev + 1) % codeSnippets.length);
      }, 3000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [displayedCode, currentLine, snippet, activeSnippet, codeSnippets.length]);

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
            Experience the magic of software development in real-time
          </p>
        </div>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <MacBrowserWindow url={`code-editor.dev/${snippet.language.toLowerCase()}`}>
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
                <Code size={16} />
                {snippet.language}
              </div>
            </div>

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

          <div style={{
            display: 'flex',
            gap: 'clamp(4px, 1vw, 8px)',
            padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.3)',
            flexWrap: 'wrap',
            overflowX: 'auto'
          }}>
            {codeSnippets.map((lang, idx) => (
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
              >
                {lang.language}
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
          @keyframes sparkle {
            0% { opacity: 1; transform: scale(1) translateY(0); }
            100% { opacity: 0; transform: scale(0.5) translateY(-20px); }
          }
        `}</style>
      </div>
    </section>
  );
};

export const SoftwareDevelopmentPage: React.FC = () => {
  const services = [
    'Web Development (Angular, React, Next.js, NestJS, Node.js)',
    'Mobile Apps (iOS / Android / Flutter / React Native)',
    'Custom Software Solutions',
    'API Integration & Automation',
    'Microservices Architecture',
    'Firebase / Cloud Integrations',
    'Database Design & Optimization (SQL / MongoDB / Firestore)',
    'AI & Machine Learning Solutions',
    'SaaS Development',
    'Blockchain / Web3 Integration'
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
            <Code size={16} strokeWidth={2} />
            <span>Software Development Services</span>
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
            Software Development
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
            Professional software development services that transform ideas into scalable, secure, and high-performance applications.
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
                Start Your Project
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

      {/* Code Animation */}
      <CodeRevealSection />

      {/* Services Section - Usluge razvoja softvera */}
      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#F5F5F7'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
              <Code size={16} color="#0071E3" />
              <span style={{
                color: '#0071E3',
                fontSize: 'clamp(12px, 2.8vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                SOFTWARE DEVELOPMENT
              </span>
            </div>

          <h2 style={{
              fontSize: 'clamp(32px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#1D1D1F',
              marginBottom: '24px'
            }}>
              Software Development
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #0071E3 0%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Services
              </span>
          </h2>

            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: 1.6,
              color: 'rgba(29,29,31,0.7)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Complete development services covering all aspects of modern software
            </p>
          </div>

          <div className="services-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '32px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              {
                icon: <Layers size={32} />,
                title: 'Custom Software Development',
                description: 'We develop custom software that perfectly integrates with your business processes.',
                color: '#0071E3'
              },
              {
                icon: <Code size={32} />,
                title: 'Web Application Development',
                description: 'Frontend and backend systems with modern frameworks (React, Node, Django).',
                color: '#34C759'
              },
              {
                icon: <Smartphone size={32} />,
                title: 'Mobile App Development',
                description: 'iOS and Android applications with high performance and UX quality.',
                color: '#FF9500'
              },
              {
                icon: <Database size={32} />,
                title: 'API Development & Integration',
                description: 'Development of REST and GraphQL APIs and integration with external services.',
                color: '#AF52DE'
              },
              {
                icon: <Cloud size={32} />,
                title: 'Cloud Solutions',
                description: 'AWS, Azure and Google Cloud infrastructure, DevOps implementation.',
                color: '#FF2D55'
              },
              {
                icon: <Settings size={32} />,
                title: 'Software Maintenance & Support',
                description: 'Continuous support, monitoring, optimization and upgrades.',
                color: '#10B981'
              }
            ].map((service, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  padding: '40px 32px',
                  borderRadius: '24px',
                  border: '1px solid #E5E7EB',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: `${service.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: service.color,
                  fontSize: '32px'
                }}>
                  {service.icon}
                </div>

                <h3 style={{
                  fontSize: '20px',
            fontWeight: 600,
                  color: '#1D1D1F',
                  marginBottom: '16px',
                  lineHeight: 1.3
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontSize: '16px',
                  color: 'rgba(29,29,31,0.7)',
                  lineHeight: 1.6
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,113,227,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3
        }} />

        <div style={{ maxWidth: '1484px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
                DEVELOPMENT PROCESS
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '24px'
            }}>
              Waterfall
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #0071E3 0%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Model
              </span>
          </h2>

            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Clear and organized approach to software development that guarantees quality
            </p>
          </div>

          {/* Waterfall Model Process */}
          <div style={{
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div className="waterfall-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
              gap: '0px',
              position: 'relative'
            }}>
              {/* 3D stair rail background */}
              <svg
                width="100%"
                height="360"
                viewBox="0 0 1200 360"
                preserveAspectRatio="none"
                style={{ position: 'absolute', top: '-40px', left: 0, zIndex: 0, opacity: 0.15, pointerEvents: 'none' }}
              >
                {Array.from({ length: 5 }).map((_, s) => (
                  <g key={s} transform={`translate(${s * 220}, ${s * 48})`}>
                    <path d="M0 40 L180 40 L220 0 L40 0 Z" fill="#0071E3" />
                    <path d="M40 0 L220 0 L220 24 L40 24 Z" fill="#34C759" opacity="0.6" />
                  </g>
                ))}
              </svg>
              {[
                {
                  step: '01',
                  title: 'Requirements',
                  subtitle: 'Gather and document stakeholder needs, scope, constraints and success criteria.',
                  color: '#1e90ff',
                  bgColor: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="3" width="16" height="18" rx="2"/>
                      <line x1="8" y1="7" x2="16" y2="7"/>
                      <line x1="8" y1="11" x2="16" y2="11"/>
                      <line x1="8" y1="15" x2="13" y2="15"/>
                    </svg>
                  )
                },
                {
                  step: '02',
                  title: 'Design',
                  subtitle: 'Create system and UI designs, data models and interaction flows.',
                  color: '#6a11cb',
                  bgColor: 'linear-gradient(135deg, #a78bfa 0%, #6a11cb 100%)',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="14" rx="2"/>
                      <path d="M3 17l9-6 9 6"/>
                    </svg>
                  )
                },
                {
                  step: '03',
                  title: 'Implementation',
                  subtitle: 'Develop features per specification with code reviews and CI.',
                  color: '#00c853',
                  bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 18l6-6-6-6"/>
                      <path d="M8 6l-6 6 6 6"/>
                    </svg>
                  )
                },
                {
                  step: '04',
                  title: 'Verification',
                  subtitle: 'Validate completeness and quality via automated and manual testing.',
                  color: '#ff6d00',
                  bgColor: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    </svg>
                  )
                },
                {
                  step: '05',
                  title: 'Maintenance',
                  subtitle: 'Operate, monitor and enhance the product with updates and fixes.',
                  color: '#ff3d71',
                  bgColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6l-.09.06a2 2 0 1 1-3.82 0l-.09-.06a1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1l-.06-.09a2 2 0 1 1 0-3.82l.06-.09a1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6l.09-.06a2 2 0 1 1 3.82 0l.09.06a1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.6 1 1.65 1.65 0 0 0 .33 1.82l.06.06z"/>
                    </svg>
                  )
                }
              ].map((item, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  {/* Step Card */}
                  <div style={{
                    background: item.bgColor,
                    borderRadius: i === 0 ? '20px 0 0 20px' :
                                 i === 5 ? '0 20px 20px 0' : '0',
                  padding: '42px 26px',
                    color: '#FFFFFF',
                    position: 'relative',
                  height: '315px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transform: `perspective(1000px) rotateY(${i * 2}deg)`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `perspective(1000px) rotateY(${i * 2}deg) scale(1.05)`;
                    e.currentTarget.style.zIndex = '10';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `perspective(1000px) rotateY(${i * 2}deg) scale(1)`;
                    e.currentTarget.style.zIndex = '1';
                  }}
                  >
                    {/* Subtle inner highlight */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: i === 0 ? '20px 0 0 20px' : i === 5 ? '0 20px 20px 0' : '0',
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)',
                      pointerEvents: 'none'
                    }} />

                    {/* Soft shine */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '28%',
                      borderRadius: i === 0 ? '20px 0 0 0' : i === 5 ? '0 20px 0 0' : '0',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.0) 80%)',
                      pointerEvents: 'none'
                    }} />

                    {/* Step Number + Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        opacity: 0.9
                      }}>
                        Step {item.step}
                      </div>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.22)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35), 0 8px 20px rgba(0,0,0,0.15)'
                      }}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 style={{
                      fontSize: '26px',
                      fontWeight: 700,
                      marginBottom: '18px',
                      lineHeight: 1.2
                    }}>
                      {item.title}
                    </h3>

                    {/* Step Description */}
                <p style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      opacity: 0.92,
                      margin: 0
                    }}>
                      {item.subtitle}
                    </p>

                    {/* Decorative Element */}
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 700
                    }}>
                      {item.step}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Process Flow Description */}
            <div style={{
              marginTop: '60px',
              textAlign: 'center',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <div className="process-info-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
                gap: '32px',
                marginTop: '40px'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#667eea',
                    marginBottom: '16px'
                  }}>
                    Product Strategy
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Define product vision, target audience, and business objectives to create a strategic roadmap for development.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#f093fb',
                    marginBottom: '16px'
                  }}>
                    User Experience Design
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Create intuitive user interfaces and seamless experiences through research-driven design principles and user feedback.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#4facfe',
                    marginBottom: '16px'
                  }}>
                    Technical Architecture
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Design scalable system architecture with microservices, APIs, and cloud infrastructure planning for optimal performance.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#43e97b',
                    marginBottom: '16px'
                  }}>
                    Agile Development
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Build features iteratively using agile methodologies with continuous integration and deployment for rapid delivery.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fa709a',
                    marginBottom: '16px'
                  }}>
                    Quality Assurance
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Implement comprehensive testing strategies including automation, performance, and security testing to ensure reliability.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#a8edea',
                    marginBottom: '16px'
                  }}>
                    Launch & Growth
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Deploy to production with monitoring, analytics, and continuous optimization for sustainable growth and user satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Technology Stack & Statistics - Combined Premium Table */}
      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,113,227,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
              <Layers size={16} color="#0071E3" />
              <span style={{
                color: '#0071E3',
                fontSize: 'clamp(12px, 2.8vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                TECHNOLOGY STACK
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '24px'
            }}>
              Technology
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #0071E3 0%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Stack
              </span>
            </h2>

            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Complete ecosystem of modern technologies for delivering premium software solutions
            </p>
          </div>

          {/* Main Technology Table with Scroll Indicator */}
              <div className="tech-table-container" style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            {/* Table Header */}
            <div className="tech-table-header" style={{
              background: 'linear-gradient(135deg, rgba(0,113,227,0.15) 0%, rgba(52,197,89,0.15) 100%)',
              padding: '24px 32px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <div className="tech-table-header-grid" style={{
                display: 'grid',
                gridTemplateColumns: '80px 200px 1fr 200px 150px',
                gap: '24px',
                alignItems: 'center'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Category
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Technology
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Description
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Key Features
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Use Cases
                </div>
              </div>
            </div>

            {/* Table Body with Scroll Indicator */}
            <div className="tech-table-body" style={{ maxHeight: '600px', overflowY: 'auto', position: 'relative' }}>
              {/* Custom Scrollbar Styling */}
              <style>
                {`
                  div::-webkit-scrollbar {
                    width: 8px;
                  }
                  div::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.05);
                    border-radius: 4px;
                  }
                  div::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #0071E3 0%, #34C759 100%);
                    border-radius: 4px;
                    border: 1px solid rgba(255,255,255,0.1);
                  }
                  div::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #0056B3 0%, #28A745 100%);
                  }
                `}
              </style>

              {[
                {
                  category: 'Frontend',
                  color: '#3B82F6',
                  technologies: [
                    {
                      name: 'React',
                      version: 'v18.2+',
                      description: 'Modern JavaScript library for building user interfaces with component architecture',
                      features: ['Virtual DOM', 'JSX', 'Hooks', 'Context API', 'Concurrent Features'],
                      useCase: 'SPA, PWA, complex web applications'
                    },
                    {
                      name: 'Angular',
                      version: 'v16+',
                      description: 'Full-featured framework for enterprise web applications with TypeScript support',
                      features: ['Two-way binding', 'Dependency injection', 'Modules', 'Directives', 'RxJS'],
                      useCase: 'Large enterprise applications, real-time dashboards'
                    },
                    {
                      name: 'Vue.js',
                      version: 'v3.3+',
                      description: 'Progressive framework focused on reactivity and component architecture',
                      features: ['Composition API', 'Virtual DOM', 'Reactivity', 'Single-file components'],
                      useCase: 'Progressive web applications, microservices'
                    },
                    {
                      name: 'Next.js',
                      version: 'v14+',
                      description: 'React framework with server-side rendering and performance optimizations',
                      features: ['SSR', 'SSG', 'API routes', 'Image optimization', 'Middleware'],
                      useCase: 'SEO-friendly applications, e-commerce, blogs'
                    },
                    {
                      name: 'TypeScript',
                      version: 'v5.2+',
                      description: 'Statically typed JavaScript for better development productivity and maintenance',
                      features: ['Static typing', 'IntelliSense', 'Refactoring', 'Advanced IDE support'],
                      useCase: 'All projects for better type safety'
                    }
                  ]
                },
                {
                  category: 'Backend',
                  color: '#10B981',
                  technologies: [
                    {
                      name: 'Node.js',
                      version: 'v20 LTS',
                      description: 'JavaScript runtime for server-side with event-driven architecture',
                      features: ['Non-blocking I/O', 'NPM ecosystem', 'Cross-platform', 'High performance'],
                      useCase: 'REST APIs, real-time applications, microservices'
                    },
                    {
                      name: 'NestJS',
                      version: 'v10+',
                      description: 'Progressive Node.js framework with TypeScript support and modular architecture',
                      features: ['Decorators', 'Modules', 'Providers', 'Guards', 'Interceptors'],
                      useCase: 'Enterprise applications, microservices, GraphQL APIs'
                    },
                    {
                      name: 'Django',
                      version: 'v4.2+',
                      description: 'High-level Python web framework with batteries-included philosophy',
                      features: ['ORM', 'Admin interface', 'Authentication', 'Security', 'Scalability'],
                      useCase: 'Complex web applications, CMS, e-commerce'
                    },
                    {
                      name: 'Spring Boot',
                      version: 'v3.1+',
                      description: 'Java framework for rapid development of enterprise applications with auto-configuration',
                      features: ['Auto-configuration', 'Standalone apps', 'Microservices', 'Security', 'Monitoring'],
                      useCase: 'Enterprise Java applications, microservices'
                    },
                    {
                      name: '.NET Core',
                      version: 'v8+',
                      description: 'Cross-platform framework for modern applications with C# language',
                      features: ['Cross-platform', 'High performance', 'Cloud-native', 'Container support'],
                      useCase: 'Enterprise applications, cloud services'
                    }
                  ]
                },
                {
                  category: 'Mobile',
                  color: '#F59E0B',
                  technologies: [
                    {
                      name: 'React Native',
                      version: 'v0.72+',
                      description: 'Framework for developing native mobile applications using React',
                      features: ['Native performance', 'Code reuse', 'Hot reload', 'Third-party plugins'],
                      useCase: 'Cross-platform mobile applications'
                    },
                    {
                      name: 'Flutter',
                      version: 'v3.13+',
                      description: 'Google\'s UI toolkit for building native applications from a single codebase',
                      features: ['Dart language', 'Widget system', 'Hot reload', 'Native performance'],
                      useCase: 'High-performance cross-platform applications'
                    },
                    {
                      name: 'Swift',
                      version: 'v5.9+',
                      description: 'Apple\'s programming language for iOS, macOS, watchOS and tvOS development',
                      features: ['Type safety', 'Performance', 'Interoperability', 'Modern syntax'],
                      useCase: 'Native iOS applications, Apple ecosystem'
                    },
                    {
                      name: 'Kotlin',
                      version: 'v1.9+',
                      description: 'Modern programming language for Android development with concise syntax',
                      features: ['Null safety', 'Coroutines', 'Extension functions', 'Interoperability'],
                      useCase: 'Modern Android development, multiplatform applications'
                    }
                  ]
                },
                {
                  category: 'Databases',
                  color: '#8B5CF6',
                  technologies: [
                    {
                      name: 'PostgreSQL',
                      version: 'v15+',
                      description: 'Advanced open-source relational database with JSON support',
                      features: ['ACID compliance', 'JSON support', 'Advanced indexing', 'Replication'],
                      useCase: 'Complex data, analytics, enterprise applications'
                    },
                    {
                      name: 'MongoDB',
                      version: 'v7.0+',
                      description: 'NoSQL document database with flexible schema',
                      features: ['Document model', 'Horizontal scaling', 'Aggregation', 'Geospatial'],
                      useCase: 'Real-time applications, content management, IoT'
                    },
                    {
                      name: 'Redis',
                      version: 'v7.2+',
                      description: 'In-memory data structure store for caching and real-time functionality',
                      features: ['High performance', 'Persistence', 'Clustering', 'Pub/Sub'],
                      useCase: 'Caching, session storage, real-time features'
                    },
                    {
                      name: 'Elasticsearch',
                      version: 'v8.9+',
                      description: 'Distributed search and analytics engine with full-text search capabilities',
                      features: ['Full-text search', 'Analytics', 'Log analysis', 'Machine learning'],
                      useCase: 'Search functionality, log analysis, monitoring'
                    }
                  ]
                },
                {
                  category: 'Cloud',
                  color: '#EF4444',
                  technologies: [
                    {
                      name: 'Amazon Web Services',
                      version: 'Latest',
                      description: 'Complete cloud computing platform with 200+ services',
                      features: ['Compute', 'Storage', 'Database', 'AI/ML', 'IoT', 'Security'],
                      useCase: 'Scalable cloud infrastructure, enterprise applications'
                    },
                    {
                      name: 'Microsoft Azure',
                      version: 'Latest',
                      description: 'Cloud computing service for building, testing and deploying applications',
                      features: ['Global reach', 'Hybrid cloud', 'AI services', 'DevOps tools'],
                      useCase: 'Enterprise cloud solutions, .NET applications'
                    },
                    {
                      name: 'Docker',
                      version: 'v24+',
                      description: 'Platform for containerizing applications with isolated execution environment',
                      features: ['Containerization', 'Portability', 'Resource efficiency', 'Ecosystem'],
                      useCase: 'Microservices, consistent deployment environment'
                    },
                    {
                      name: 'Kubernetes',
                      version: 'v1.28+',
                      description: 'Open-source platform for automatic deployment, scaling and management of containerized applications',
                      features: ['Auto-scaling', 'Load balancing', 'Self-healing', 'Service discovery'],
                      useCase: 'Container orchestration, cloud-native applications'
                    }
                  ]
                },
                {
                  category: 'Testing',
                  color: '#06B6D4',
                  technologies: [
                    {
                      name: 'Jest',
                      version: 'v29+',
                      description: 'JavaScript testing framework focused on simplicity and performance',
                      features: ['Unit testing', 'Mocking', 'Snapshot testing', 'Code coverage'],
                      useCase: 'JavaScript/TypeScript application testing'
                    },
                    {
                      name: 'Cypress',
                      version: 'v13+',
                      description: 'End-to-end testing framework for web applications with real browser environment',
                      features: ['E2E testing', 'Real browser', 'Time travel', 'Screenshots'],
                      useCase: 'Web application integration testing'
                    },
                    {
                      name: 'Selenium',
                      version: 'v4.11+',
                      description: 'Framework for automating web browsers for testing web applications',
                      features: ['Multi-browser', 'Multi-language', 'Distributed testing', 'Recording'],
                      useCase: 'Cross-browser testing, regression testing'
                    },
                    {
                      name: 'Postman',
                      version: 'v10+',
                      description: 'Collaboration platform for API development with comprehensive testing capabilities',
                      features: ['API testing', 'Mock servers', 'Documentation', 'Collaboration'],
                      useCase: 'API testing, documentation, team collaboration'
                    }
                  ]
                }
              ].map((category, categoryIndex) => (
                category.technologies.map((tech, techIndex) => (
                  <div
                    key={`${categoryIndex}-${techIndex}`}
                    className="tech-table-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 200px 1fr 200px 150px',
                      gap: '24px',
                      alignItems: 'center',
                      padding: '20px 32px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {/* Category Badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`,
                      border: `1px solid ${category.color}30`,
                      color: category.color,
                      fontSize: '12px',
                      fontWeight: 700,
                      textAlign: 'center',
                      lineHeight: '1.2'
                    }}>
                      {category.category}
                    </div>

                    {/* Technology Name & Version */}
                    <div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '4px'
                      }}>
                        {tech.name}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: category.color,
                        background: `${category.color}15`,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        display: 'inline-block'
                      }}>
                        {tech.version}
                      </div>
                    </div>

                    {/* Description */}
                    <div style={{
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: '1.5'
                    }}>
                      {tech.description}
                    </div>

                    {/* Features */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {tech.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            color: category.color,
                            background: `${category.color}10`,
                            padding: '6px 10px',
                            borderRadius: '20px',
                            border: `1px solid ${category.color}20`,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Use Case */}
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.9)',
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.05)',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      {tech.useCase}
                    </div>
                  </div>
                ))
              ))}
            </div>

            {/* Table Footer with Statistics */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,113,227,0.08) 0%, rgba(52,197,89,0.08) 100%)',
              padding: '20px 32px',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px 200px 1fr 200px 150px',
                gap: '24px',
                alignItems: 'center'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Total
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#34C759'
                }}>
                  50+ Technologies
                </div>
                <div style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center'
                }}>
                  Across 6 Major Categories
                </div>
                <div style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center'
                }}>
                  Enterprise-Grade Solutions
                </div>
                <div style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center'
                }}>
                  Scalable & Secure
                </div>
              </div>
            </div>
          </div>

          {/* Compact CTA */}
          <div style={{
            marginTop: '70px',
            textAlign: 'center'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '18px' }}>Want to build the next product together?</p>
            <Link to="/booking">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight />}>Book Consultation</Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Software Quality & Security Section */}
      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
        background: '#000000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,113,227,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
              <Shield size={16} color="#0071E3" />
              <span style={{
                color: '#0071E3',
                fontSize: 'clamp(12px, 2.8vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}>
                QUALITY & SECURITY
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '24px'
            }}>
              Software Quality
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #0071E3 0%, #34C759 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                & Security
              </span>
            </h2>

            <p style={{
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Emphasizing the reliability and security of our software solutions
            </p>
          </div>

          {/* Premium Left-Right Flow Layout */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Left-Right Flow Items */}
            {[
              {
                side: 'left',
                title: 'Secure Code Practices',
                subtitle: 'Secure coding practices with OWASP standards and regular security audits.',
                color: '#0071E3',
                bgColor: 'linear-gradient(135deg, #0071E3 0%, #0056B3 100%)'
              },
              {
                side: 'right',
                title: 'Automated Testing',
                subtitle: 'Complete test automation with unit, integration and end-to-end tests.',
                color: '#34C759',
                bgColor: 'linear-gradient(135deg, #34C759 0%, #28A745 100%)'
              },
              {
                side: 'left',
                title: 'Data Encryption',
                subtitle: 'Data encryption in transit and at rest with AES-256 standards.',
                color: '#FF9500',
                bgColor: 'linear-gradient(135deg, #FF9500 0%, #E68900 100%)'
              },
              {
                side: 'right',
                title: 'Scalable Infrastructure',
                subtitle: 'Horizontally scalable infrastructure with auto-scaling and load balancing.',
                color: '#AF52DE',
                bgColor: 'linear-gradient(135deg, #AF52DE 0%, #9B49C4 100%)'
              },
              {
                side: 'left',
                title: 'Continuous Deployment',
                subtitle: 'Continuous deployment with blue-green strategies and rollback capabilities.',
                color: '#FF2D55',
                bgColor: 'linear-gradient(135deg, #FF2D55 0%, #E02847 100%)'
              },
              {
                side: 'right',
                title: 'Performance Monitoring',
                subtitle: 'Real-time performance monitoring with alerting systems and optimization.',
                color: '#10B981',
                bgColor: 'linear-gradient(135deg, #10B981 0%, #0D9668 100%)'
              }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: item.side === 'left' ? 'flex-start' : 'flex-end',
                position: 'relative'
              }}>
                {/* Main Content Card */}
                <div style={{
                  width: '45%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '32px',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  {/* Title Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: item.side === 'left' ? '32px' : 'auto',
                    right: item.side === 'right' ? '32px' : 'auto',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: item.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 700,
                    boxShadow: `0 4px 20px ${item.color}40`
                  }}>
                    {i + 1}
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '16px',
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {item.subtitle}
                  </p>
                </div>

              </div>
            ))}

          </div>


        </div>
      </section>

      



      {/* CTA */}
      <section style={{
        padding: 'clamp(60px, 12vw, 120px) clamp(16px, 5vw, 24px)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 6vw, 56px)',
          fontWeight: 600,
          marginBottom: '24px',
          color: '#1D1D1F'
        }}>
          Ready to Build Something Amazing?
        </h2>
        <p style={{
          fontSize: 'clamp(16px, 3.5vw, 20px)',
          color: '#6E6E73',
          marginBottom: '48px'
        }}>
          Let's discuss your software development needs
        </p>
        <Link to="/booking">
          <Button variant="primary" size="xl" rightIcon={<ArrowRight />}>
            Book a Consultation
          </Button>
        </Link>
      </section>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .services-grid,
          .waterfall-grid,
          .process-info-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .quality-flow-item { justify-content: center !important; }
          .quality-card { width: 100% !important; padding: 24px !important; }
          .tech-table-container { overflow-x: auto !important; }
          .tech-table-header { position: static !important; }
          .tech-table-header-grid { display: none !important; }
          .tech-table-row { grid-template-columns: 1fr !important; gap: 12px !important; align-items: start !important; padding: 16px 20px !important; }
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

export default SoftwareDevelopmentPage;

