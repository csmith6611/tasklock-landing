import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  CSSProperties,
  FormEvent,
} from "react";
import "./App.css";

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

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    // Get honeypot value
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)
      ?.value;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.error || "Form submission failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features: string[] = [
    "Local-only enforcement",
    "Pi-hole integration",
    "Multi-device, per-user mapping",
    "Smart cron-based scheduling",
    "Configurable consequence profiles",
    "Bark-style encrypted iOS push",
    "Web-based admin panel",
    "Self-contained Docker deployment",
    'Optional paid blocklists ("Strict Mode," "Deep Work Mode," "ADHD Mode")',
    "Zero cloud dependence",
  ];

  return (
    <div className="app">
      <div className="grid-pattern" />

      {/* Navigation */}
      <nav className="nav">
        <div className="container nav__container">
          <a href="#" className="nav__logo">
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
          </a>
          <div className="nav__links">
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#signup" className="btn btn--primary btn--small">
              Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <div className="hero__content">
            <div className="badge animate-in">
              <span className="badge__dot" />
              Finish First. Surf Second.
            </div>

            <h1 className="hero__title animate-in delay-1">
              Get Things Done by Changing the Environment —{" "}
              <span className="highlight">Not Your Willpower</span>
            </h1>

            <p className="hero__subtitle animate-in delay-2">
              Traditional task apps assume discipline. This system{" "}
              <strong>enforces</strong> it.
              <br />
              Complete your tasks on Vikunja, or your Reddit/YouTube/Instagram
              stop working — automatically, on every device you own.
            </p>

            <div className="hero__cta animate-in delay-3">
              <a href="#signup" className="btn btn--primary">
                Join the Early Access List
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#how-it-works" className="btn btn--secondary">
                See How It Works
              </a>
            </div>
          </div>

          <div className="hero__visual animate-in delay-4">
            <div className="hero__diagram">
              <div className="diagram__center">
                <div className="diagram__core">
                  <svg viewBox="0 0 100 100" fill="none">
                    <rect
                      x="25"
                      y="48"
                      width="50"
                      height="38"
                      rx="6"
                      fill="var(--accent-primary)"
                    />
                    <path
                      d="M33 48 L33 36 Q33 18 50 18 Q67 18 67 36 L67 48"
                      fill="none"
                      stroke="var(--accent-primary)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="63" r="5" fill="var(--bg-deep)" />
                    <rect
                      x="47"
                      y="63"
                      width="6"
                      height="10"
                      rx="1"
                      fill="var(--bg-deep)"
                    />
                  </svg>
                  <span>TaskLock</span>
                </div>
              </div>
              <div className="diagram__orbit">
                <div
                  className="diagram__device"
                  style={{ "--i": 0 } as CSSProperties}
                >
                  <span>📱</span>
                  <small>Phone</small>
                </div>
                <div
                  className="diagram__device"
                  style={{ "--i": 1 } as CSSProperties}
                >
                  <span>💻</span>
                  <small>Laptop</small>
                </div>
                <div
                  className="diagram__device"
                  style={{ "--i": 2 } as CSSProperties}
                >
                  <span>🎮</span>
                  <small>Console</small>
                </div>
                <div
                  className="diagram__device"
                  style={{ "--i": 3 } as CSSProperties}
                >
                  <span>📺</span>
                  <small>Smart TV</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__fade" />
      </header>

      {/* Problem Section */}
      <section className="problem" id="problem">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2>Task Apps Don't Work If You Can Ignore Them</h2>
            <div className="divider" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="problem__story">
              <p className="problem__intro">
                I built this because I'm the kind of person who checks off tasks
                only when there are <strong>real consequences</strong>.
              </p>

              <div className="problem__list">
                <div className="problem__item">
                  <span className="problem__icon">🔔</span>
                  <span>
                    Reminders? <strong>I swipe them away.</strong>
                  </span>
                </div>
                <div className="problem__item">
                  <span className="problem__icon">📲</span>
                  <span>
                    Push notifications? <strong>Ignored within seconds.</strong>
                  </span>
                </div>
                <div className="problem__item">
                  <span className="problem__icon">📅</span>
                  <span>
                    Daily routines? <strong>Gone by Tuesday.</strong>
                  </span>
                </div>
              </div>

              <p className="problem__turn">
                But when my social media, games, or distracting apps{" "}
                <strong>suddenly stop working</strong>, I get my stuff done.
              </p>

              <p>
                Not because I magically became disciplined — but because{" "}
                <strong>
                  the environment finally supported the habits I wanted
                </strong>
                .
              </p>

              <div className="problem__callout">
                <p>This tool isn't another to-do list.</p>
                <p className="highlight">It's the missing enforcement layer.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What This Is */}
      <section className="what-is">
        <div className="container">
          <AnimatedSection>
            <div className="what-is__header">
              <h2>
                A Self-Hosted, Privacy-First
                <br />
                Tough-Love System for the Home
              </h2>
              <div className="divider" style={{ margin: "1.5rem auto" }} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="what-is__grid">
              <div className="what-is__item">
                <div className="what-is__icon">🏠</div>
                <p>Works entirely on your home WiFi</p>
              </div>
              <div className="what-is__item">
                <div className="what-is__icon">🔒</div>
                <p>No cloud tracking</p>
              </div>
              <div className="what-is__item">
                <div className="what-is__icon">👁️</div>
                <p>No surveillance</p>
              </div>
              <div className="what-is__item">
                <div className="what-is__icon">📵</div>
                <p>No app installing across devices</p>
              </div>
              <div className="what-is__item">
                <div className="what-is__icon">🛡️</div>
                <p>No giving a company access to your data</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="what-is__tagline">
              This is <strong>your network</strong>, enforcing{" "}
              <strong>your commitments</strong>, based on{" "}
              <strong>your rules</strong>.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Idea */}
      <section className="core-idea">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="core-idea__card">
              <div className="core-idea__comparison">
                <div className="core-idea__side core-idea__side--good">
                  <div className="core-idea__icon">✓</div>
                  <p>
                    <strong>Do the task</strong>
                  </p>
                  <span>→ your device stays normal</span>
                </div>
                <div className="core-idea__divider">
                  <span>or</span>
                </div>
                <div className="core-idea__side core-idea__side--consequence">
                  <div className="core-idea__icon">✗</div>
                  <p>
                    <strong>Skip the task</strong>
                  </p>
                  <span>
                    → your distractions get blocked across all your devices
                  </span>
                </div>
              </div>

              <div className="core-idea__footer">
                <p>It's not punishment.</p>
                <p className="highlight">It's accountability — automated.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <AnimatedSection>
            <h2>How It Works</h2>
            <div className="divider" />
          </AnimatedSection>

          <div className="steps">
            <AnimatedSection delay={0.1}>
              <div className="step">
                <div className="step__number">1</div>
                <div className="step__content">
                  <h3>Devices connect via Pi-hole</h3>
                  <p>
                    Your devices already use Pi-hole's DNS. Add any domains you
                    want blocked (Reddit, Facebook, Instagram, YouTube, gaming
                    servers, etc.). You control everything.
                  </p>
                  <div className="step__tags">
                    <span className="step__tag">Manual blocking: Free</span>
                    <span className="step__tag step__tag--pro">
                      Automatic block packages: Pro
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="step">
                <div className="step__number">2</div>
                <div className="step__content">
                  <h3>Map your Vikunja user → all your device IPs</h3>
                  <p>In the admin panel, you simply assign:</p>
                  <ul className="step__list">
                    <li>Your Vikunja user ID</li>
                    <li>
                      All the static IPs belonging to you (phone, laptop,
                      tablet, game console)
                    </li>
                  </ul>
                  <p>
                    This creates <strong>per-person enforcement</strong>, not
                    per-device. If you skip your tasks, every device assigned to
                    you gets consequences — and no one else in your home is
                    affected.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="step">
                <div className="step__number">3</div>
                <div className="step__content">
                  <h3>
                    (Optional Pro) Bark-Style Encrypted Push Notifications
                  </h3>
                  <p>
                    You can pair your Vikunja user with the Bark iOS app
                    encryption model to receive:
                  </p>
                  <ul className="step__list">
                    <li>Encrypted alerts</li>
                    <li>Zero-knowledge notifications</li>
                    <li>Task reminders</li>
                    <li>"Consequence triggered" warnings</li>
                    <li>"Task completed — access restored" messages</li>
                  </ul>
                  <p>
                    All done privately, with no cloud storage, using a proven
                    encryption flow.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="step">
                <div className="step__number">4</div>
                <div className="step__content">
                  <h3>The System Runs on a Smart Home-Style Scheduler</h3>
                  <p>
                    Daily tasks, weekly chores, monthly maintenance — you can
                    automate all of it.
                  </p>
                  <div className="step__highlight">
                    <p>
                      If something is <strong>overdue</strong>, your distraction
                      domains flip off.
                    </p>
                    <p>
                      When you <strong>complete it</strong>, access returns
                      instantly.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why It's Different */}
      <section className="comparison" id="features">
        <div className="container">
          <AnimatedSection>
            <h2>Why It's Different</h2>
            <p className="comparison__subtitle">
              Not a task app. Not a blocker. <strong>A behavior engine.</strong>
            </p>
            <div className="divider" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="comparison__table-wrapper">
              <table className="comparison__table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Task Apps</th>
                    <th>Focus Apps</th>
                    <th>Parental Controls</th>
                    <th className="comparison__highlight">TaskLock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Blocks entire device</td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td className="comparison__highlight">
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Blocks by person, not device</td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td className="comparison__highlight">
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Self-hosted</td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td className="comparison__highlight">
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>No cloud tracking</td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td className="comparison__highlight">
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Encrypted notifications</td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td className="comparison__highlight">
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Automates habits</td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td className="comparison__highlight">
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Integrates with task manager</td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td className="comparison__highlight">
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Consequence-based motivation</td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td>
                      <span className="no">✗</span>
                    </td>
                    <td className="comparison__highlight">
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="comparison__category">
              <p>This sits in a new category:</p>
              <p className="comparison__category-name">
                Household Accountability Automation.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who This Helps */}
      <section className="audience">
        <div className="container">
          <AnimatedSection>
            <h2>Who This Helps</h2>
            <div className="divider" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="audience__grid">
              <div className="audience__item">
                <span>🎯</span>
                <p>Adults who ignore task apps</p>
              </div>
              <div className="audience__item">
                <span>🧠</span>
                <p>ADHD and neurodivergent users needing external structures</p>
              </div>
              <div className="audience__item">
                <span>🏠</span>
                <p>Roommates sharing responsibilities</p>
              </div>
              <div className="audience__item">
                <span>👨‍👩‍👧‍👦</span>
                <p>Families with chore systems</p>
              </div>
              <div className="audience__item">
                <span>💑</span>
                <p>Couples wanting shared accountability</p>
              </div>
              <div className="audience__item">
                <span>⚡</span>
                <p>Productivity nerds</p>
              </div>
              <div className="audience__item">
                <span>🖥️</span>
                <p>Self-hosters who want a local-first solution</p>
              </div>
              <div className="audience__item">
                <span>🌟</span>
                <p>
                  Anyone who benefits from gentle (or not-so-gentle)
                  consequences
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Privacy */}
      <section className="privacy">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="privacy__card">
              <h2>A Word on Privacy</h2>
              <div className="divider" />

              <p className="privacy__main">
                This system <strong>never</strong> monitors content, activity,
                messages, browsing history, or behavior.
              </p>

              <p className="privacy__focus">It only cares about:</p>
              <ul className="privacy__list">
                <li>your tasks</li>
                <li>your schedule</li>
                <li>the domains you choose to block</li>
              </ul>

              <p className="privacy__network">
                Nothing leaves your home network unless you choose optional
                encrypted push notifications.
              </p>

              <p className="privacy__control highlight">
                You stay in control at all times.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Teaser */}
      <section className="features">
        <div className="container">
          <AnimatedSection>
            <h2>Feature Teaser</h2>
            <p className="features__subtitle">More coming soon</p>
            <div className="divider" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="features__grid">
              {features.map((feature, i) => (
                <div key={i} className="features__item">
                  <span className="features__check">✔</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA / Signup */}
      <section className="signup" id="signup">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="signup__card">
              <h2>Be the first to try it.</h2>
              <div className="divider" style={{ margin: "1rem auto 2rem" }} />

              <p className="signup__perks-intro">Early access gets:</p>
              <ul className="signup__perks">
                <li>Private beta invite</li>
                <li>Access to the Pro features</li>
                <li>Influence in shaping the future of the tool</li>
                <li>Discounted lifetime pricing</li>
              </ul>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="signup__form">
                  {/* Honeypot field - hidden from users, catches bots */}
                  <input
                    type="text"
                    name="website"
                    style={{ position: "absolute", left: "-9999px" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="signup__loading">Joining...</span>
                    ) : (
                      <>
                        Join the Early Access List
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M7 5l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="signup__success">
                  <div className="signup__success-icon">✓</div>
                  <p>You're on the list!</p>
                  <span>
                    We'll reach out soon with your early access invite.
                  </span>
                </div>
              )}
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

export default App;
