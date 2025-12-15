import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";
import { Link } from "react-router-dom";

// Intersection Observer hook for scroll animations
function useInView(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

// Animated section wrapper
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView();

  const style: CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translateY(0)" : "translateY(40px)",
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

function Demo() {
  return (
    <div className="app">
      <div className="grid-pattern" />

      {/* Navigation */}
      <nav className="nav">
        <div className="container nav__container">
          <Link to="/" className="nav__logo">
            <svg className="nav__icon" viewBox="0 0 100 100" fill="none">
              <rect
                x="20"
                y="45"
                width="60"
                height="45"
                rx="8"
                fill="currentColor"
              />
              <path
                d="M30 45 L30 30 Q30 10 50 10 Q70 10 70 30 L70 45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
            <span>TaskLock</span>
          </Link>
          <div className="nav__links">
            <Link to="/#how-it-works">How It Works</Link>
            <Link to="/#features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/demo" className="nav__link--active">
              Demo
            </Link>
            <Link to="/#signup" className="btn btn--primary btn--small">
              Early Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="demo-hero">
        <div className="container">
          <div className="demo-hero__content">
            <div className="badge animate-in">
              <span className="badge__dot" />
              See It In Action
            </div>
            <h1 className="demo-hero__title animate-in delay-1">
              TaskLock <span className="highlight">Demo</span>
            </h1>
            <p className="demo-hero__subtitle animate-in delay-2">
              Watch how TaskLock integrates with Vikunja and enforces task
              accountability across your household.
            </p>
          </div>
        </div>
      </header>

      {/* Video Demos */}
      <section className="demo-videos">
        <div className="container">
          <AnimatedSection>
            <h2>
              Watch TaskLock <span className="highlight">In Action</span>
            </h2>
            <p className="demo-videos__subtitle">
              Real recordings showing task blocking and automatic restoration
            </p>
            <div className="divider" />
          </AnimatedSection>

          <div className="demo-videos__grid">
            <AnimatedSection delay={0.1}>
              <div className="demo-video-card">
                <div className="demo-video-card__header">
                  <span className="demo-video-card__icon">🎬</span>
                  <div>
                    <h3>Task Blocking Demo</h3>
                    <p>See how overdue tasks trigger automatic DNS blocking</p>
                  </div>
                </div>
                <div className="demo-video-card__player">
                  <video
                    controls
                    playsInline
                    poster="/recurring task page.png"
                    className="demo-video"
                  >
                    <source
                      src="/ScreenRecording_12-03-2025 08-40-21_1.MOV"
                      type="video/quicktime"
                    />
                    <source
                      src="/ScreenRecording_12-03-2025 08-40-21_1.MOV"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="demo-video-card__features">
                  <span>🔒 DNS Blocking</span>
                  <span>⚡ Real-time</span>
                  <span>🏠 Per-user</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="demo-video-card">
                <div className="demo-video-card__header">
                  <span className="demo-video-card__icon">🔄</span>
                  <div>
                    <h3>Task Completion Flow</h3>
                    <p>Watch access restore instantly when tasks are done</p>
                  </div>
                </div>
                <div className="demo-video-card__player">
                  <video
                    controls
                    playsInline
                    poster="/landing page.png"
                    className="demo-video"
                  >
                    <source
                      src="/ScreenRecording_12-03-2025 08-40-21_1 (1).MOV"
                      type="video/quicktime"
                    />
                    <source
                      src="/ScreenRecording_12-03-2025 08-40-21_1 (1).MOV"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="demo-video-card__features">
                  <span>✅ Instant restore</span>
                  <span>📱 All devices</span>
                  <span>🔔 Notifications</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="demo-screenshots">
        <div className="container">
          <AnimatedSection>
            <h2>
              Interface <span className="highlight">Screenshots</span>
            </h2>
            <p className="demo-screenshots__subtitle">
              Clean, modern interfaces for both task management and admin
              control
            </p>
            <div className="divider" />
          </AnimatedSection>

          <div className="demo-screenshots__grid">
            <AnimatedSection delay={0.1}>
              <div className="demo-screenshot-card">
                <div className="demo-screenshot-card__badge">Vikunja</div>
                <div className="demo-screenshot-card__image">
                  <img
                    src="/landing page.png"
                    alt="Vikunja task manager interface showing current tasks with priorities and due dates"
                    loading="lazy"
                  />
                </div>
                <div className="demo-screenshot-card__content">
                  <h3>Task Manager Interface</h3>
                  <p>
                    Your tasks live in Vikunja — an open-source, self-hosted
                    task manager. Organize by project, set priorities, and track
                    due dates all in one place.
                  </p>
                  <ul>
                    <li>
                      <span>📋</span> Multiple projects & lists
                    </li>
                    <li>
                      <span>🎯</span> Priority levels (High, Medium, Low)
                    </li>
                    <li>
                      <span>⏰</span> Due dates with countdown
                    </li>
                    <li>
                      <span>👥</span> Multi-user support
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="demo-screenshot-card">
                <div className="demo-screenshot-card__badge demo-screenshot-card__badge--tasklock">
                  TaskLock
                </div>
                <div className="demo-screenshot-card__image">
                  <img
                    src="/recurring task page.png"
                    alt="TaskLock recurring tasks admin panel showing template management"
                    loading="lazy"
                  />
                </div>
                <div className="demo-screenshot-card__content">
                  <h3>Recurring Tasks Admin</h3>
                  <p>
                    Set up recurring task templates that automatically create
                    tasks in Vikunja on your schedule. Daily, weekly, or monthly
                    — you're in control.
                  </p>
                  <ul>
                    <li>
                      <span>🔄</span> Daily, weekly, monthly schedules
                    </li>
                    <li>
                      <span>👤</span> Per-user task assignment
                    </li>
                    <li>
                      <span>⚙️</span> Pause/resume templates
                    </li>
                    <li>
                      <span>📊</span> Status tracking
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="demo-screenshot-card">
                <div className="demo-screenshot-card__badge demo-screenshot-card__badge--tasklock">
                  TaskLock Pro
                </div>
                <div className="demo-screenshot-card__image">
                  <img
                    src="/pro-domain-seeding.png"
                    alt="TaskLock Pro domain seeding interface for pre-built blocklists"
                    loading="lazy"
                  />
                </div>
                <div className="demo-screenshot-card__content">
                  <h3>Domain Seeding (Pro Feature)</h3>
                  <p>
                    Quickly set up pre-built blocklists for common distractions.
                    Choose from "Strict Mode," "Deep Work Mode," or "ADHD Mode"
                    — or create your own custom lists.
                  </p>
                  <ul>
                    <li>
                      <span>📦</span> Pre-built blocklist packages
                    </li>
                    <li>
                      <span>🎯</span> Focus mode presets
                    </li>
                    <li>
                      <span>✏️</span> Custom domain lists
                    </li>
                    <li>
                      <span>⚡</span> One-click setup
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="demo-screenshot-card">
                <div className="demo-screenshot-card__badge demo-screenshot-card__badge--tasklock">
                  TaskLock Pro
                </div>
                <div className="demo-screenshot-card__image">
                  <img
                    src="/bark config.png"
                    alt="TaskLock Bark integration configuration for encrypted iOS push notifications"
                    loading="lazy"
                  />
                </div>
                <div className="demo-screenshot-card__content">
                  <h3>Bark Integration (Pro Feature)</h3>
                  <p>
                    Configure encrypted push notifications using the Bark iOS app
                    model. Get zero-knowledge alerts about task status, blocking
                    events, and access restoration — all without cloud storage.
                  </p>
                  <ul>
                    <li>
                      <span>🔐</span> End-to-end encryption
                    </li>
                    <li>
                      <span>📱</span> iOS push notifications
                    </li>
                    <li>
                      <span>🔔</span> Task reminders & alerts
                    </li>
                    <li>
                      <span>🛡️</span> Zero-knowledge architecture
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Flows */}
      <section className="demo-flow">
        <div className="container">
          <AnimatedSection>
            <h2>
              The Complete <span className="highlight">Flow</span>
            </h2>
            <div className="divider" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="demo-flow__steps">
              <div className="demo-flow__step">
                <div className="demo-flow__number">1</div>
                <div className="demo-flow__content">
                  <h3>Tasks Created</h3>
                  <p>
                    Recurring templates automatically create tasks in Vikunja,
                    or you add them manually.
                  </p>
                </div>
              </div>
              <div className="demo-flow__connector">→</div>
              <div className="demo-flow__step">
                <div className="demo-flow__number">2</div>
                <div className="demo-flow__content">
                  <h3>Deadline Passes</h3>
                  <p>
                    When a task becomes overdue, TaskLock detects it via webhook
                    or sync.
                  </p>
                </div>
              </div>
              <div className="demo-flow__connector">→</div>
              <div className="demo-flow__step">
                <div className="demo-flow__number">3</div>
                <div className="demo-flow__content">
                  <h3>Blocking Activates</h3>
                  <p>
                    Pi-hole blocks distracting domains on all devices assigned
                    to that user.
                  </p>
                </div>
              </div>
              <div className="demo-flow__connector">→</div>
              <div className="demo-flow__step">
                <div className="demo-flow__number">4</div>
                <div className="demo-flow__content">
                  <h3>Task Completed</h3>
                  <p>
                    Mark the task done in Vikunja, and access is restored
                    instantly.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="demo-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="demo-cta__card">
              <h2>Ready to Try It?</h2>
              <p>
                Join the early access list and be among the first to enforce
                accountability in your household.
              </p>
              <div className="demo-cta__buttons">
                <Link to="/#signup" className="btn btn--primary">
                  Join Early Access
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link to="/pricing" className="btn btn--secondary">
                  View Pricing
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <p className="footer__tagline">
              Made for people who want to do better —
              <br />
              not by trying harder, but by designing an environment that helps
              them follow through.
            </p>
            <p className="footer__values">
              <span>Self-hosted.</span>
              <span>Private.</span>
              <span>Effective.</span>
            </p>
            <div className="footer__links">
              <Link to="/pricing">Pricing</Link>
              <Link to="/demo">Demo</Link>
            </div>
            <div className="footer__logo">
              <svg className="footer__icon" viewBox="0 0 100 100" fill="none">
                <rect
                  x="20"
                  y="45"
                  width="60"
                  height="45"
                  rx="8"
                  fill="currentColor"
                />
                <path
                  d="M30 45 L30 30 Q30 10 50 10 Q70 10 70 30 L70 45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
              <span>TaskLock</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Demo;

