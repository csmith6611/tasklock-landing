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

interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  limits: { resource: string; limit: string }[];
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description:
      "Perfect for small households getting started with task accountability.",
    limits: [
      { resource: "Users", limit: "3" },
      { resource: "Devices per user", limit: "3" },
      { resource: "Recurring task templates", limit: "10" },
    ],
    features: [
      "Full task integration",
      "Three-tier blocking system",
      "Bark push notifications",
      "Recurring tasks (daily, weekly, monthly)",
      "Web admin interface",
      "Timezone configuration",
    ],
  },
  {
    name: "Pro",
    price: "$39",
    priceNote: "/year or $99 lifetime",
    description: "For larger households or power users who need no limits.",
    limits: [
      { resource: "Users", limit: "Unlimited" },
      { resource: "Devices per user", limit: "Unlimited" },
      { resource: "Recurring task templates", limit: "Unlimited" },
    ],
    features: [
      "Everything in Free",
      "Unlimited users",
      "Unlimited devices per user",
      "Unlimited recurring task templates",
      "Advanced scheduling options",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Family",
    price: "$149",
    priceNote: "lifetime",
    description: "For households that want everything, forever.",
    limits: [
      { resource: "Users", limit: "Unlimited" },
      { resource: "Devices per user", limit: "Unlimited" },
      { resource: "Recurring task templates", limit: "Unlimited" },
    ],
    features: [
      "Everything in Pro",
      "Priority support",
      "Access to future premium features",
      "Lifetime updates",
    ],
    badge: "Best Value",
  },
];

interface ComparisonRow {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  family: string | boolean;
}

const comparisonData: ComparisonRow[] = [
  { feature: "Users", free: "3", pro: "Unlimited", family: "Unlimited" },
  {
    feature: "Devices per user",
    free: "3",
    pro: "Unlimited",
    family: "Unlimited",
  },
  {
    feature: "Recurring templates",
    free: "10",
    pro: "Unlimited",
    family: "Unlimited",
  },
  { feature: "Task integration", free: true, pro: true, family: true },
  { feature: "Tiered blocking", free: true, pro: true, family: true },
  { feature: "Push notifications", free: true, pro: true, family: true },
  { feature: "Notification encryption", free: true, pro: true, family: true },
  { feature: "Recurring tasks", free: true, pro: true, family: true },
  { feature: "Timezone support", free: true, pro: true, family: true },
  { feature: "Web admin UI", free: true, pro: true, family: true },
  { feature: "Advanced scheduling", free: false, pro: true, family: true },
  { feature: "Priority support", free: false, pro: false, family: true },
  { feature: "Future premium features", free: false, pro: false, family: true },
];

const coreFeatures = [
  {
    category: "Task Integration",
    icon: "📋",
    items: [
      {
        name: "Vikunja Sync",
        desc: "Automatically syncs tasks from your Vikunja instance",
      },
      { name: "Webhook Support", desc: "Real-time task updates via webhooks" },
      {
        name: "Per-User Task Tracking",
        desc: "Each household member has their own tasks and consequences",
      },
    ],
  },
  {
    category: "Tiered Consequences",
    icon: "🔒",
    items: [
      {
        name: "Three-Tier Blocking System",
        desc: "Progressive restrictions based on task priority",
      },
      {
        name: "Pi-hole Group Integration",
        desc: "Map each tier to your custom blocklists",
      },
      {
        name: "Priority-Based Escalation",
        desc: "Higher priority overdue tasks trigger stricter tiers",
      },
    ],
  },
  {
    category: "Notifications",
    icon: "🔔",
    items: [
      {
        name: "Bark Push Notifications",
        desc: "iOS notifications when tasks are due or consequences activate",
      },
      {
        name: "Encrypted Notifications",
        desc: "AES-128-CBC encryption for privacy",
      },
      {
        name: "Per-User Devices",
        desc: "Each user can register multiple notification devices",
      },
    ],
  },
  {
    category: "Recurring Tasks",
    icon: "🔄",
    items: [
      { name: "Daily Tasks", desc: "Automatically created every day" },
      { name: "Weekly Tasks", desc: "Created on specified days of the week" },
      { name: "Monthly Tasks", desc: "Created on specified days of the month" },
      {
        name: "Timezone-Aware Scheduling",
        desc: "All times respect your configured timezone",
      },
    ],
  },
];

function Pricing() {
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
            <Link to="/pricing" className="nav__link--active">
              Pricing
            </Link>
            <Link to="/demo">Demo</Link>
            <Link to="/#signup" className="btn btn--primary btn--small">
              Early Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Pricing Hero */}
      <header className="pricing-hero">
        <div className="container">
          <div className="pricing-hero__content">
            <div className="badge animate-in">
              <span className="badge__dot" />
              Self-Hosted Accountability
            </div>
            <h1 className="pricing-hero__title animate-in delay-1">
              Simple, <span className="highlight">Transparent</span> Pricing
            </h1>
            <p className="pricing-hero__subtitle animate-in delay-2">
              Your rules. Your home. Your server.
              <br />
              Choose the plan that fits your household.
            </p>
          </div>
        </div>
      </header>

      {/* Pricing Cards */}
      <section className="pricing-cards">
        <div className="container">
          <div className="pricing-cards__grid">
            {pricingTiers.map((tier, index) => (
              <AnimatedSection key={tier.name} delay={index * 0.1}>
                <div
                  className={`pricing-card ${
                    tier.highlighted ? "pricing-card--highlighted" : ""
                  }`}
                >
                  {tier.badge && (
                    <div className="pricing-card__badge">{tier.badge}</div>
                  )}
                  <div className="pricing-card__header">
                    <h3 className="pricing-card__name">{tier.name}</h3>
                    <div className="pricing-card__price">
                      <span className="pricing-card__amount">{tier.price}</span>
                      {tier.priceNote && (
                        <span className="pricing-card__note">
                          {tier.priceNote}
                        </span>
                      )}
                    </div>
                    <p className="pricing-card__description">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pricing-card__limits">
                    {tier.limits.map((limit) => (
                      <div key={limit.resource} className="pricing-card__limit">
                        <span className="pricing-card__limit-resource">
                          {limit.resource}
                        </span>
                        <span
                          className={`pricing-card__limit-value ${
                            limit.limit === "Unlimited"
                              ? "pricing-card__limit-value--unlimited"
                              : ""
                          }`}
                        >
                          {limit.limit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pricing-card__features">
                    <p className="pricing-card__features-title">Includes:</p>
                    <ul>
                      {tier.features.map((feature) => (
                        <li key={feature}>
                          <span className="pricing-card__check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/get-started?plan=${tier.name.toLowerCase()}`}
                    className={`btn ${
                      tier.highlighted ? "btn--primary" : "btn--secondary"
                    } pricing-card__cta`}
                  >
                    {tier.price === "$0"
                      ? "Get Started Free"
                      : `Get ${tier.name}`}
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
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="core-features">
        <div className="container">
          <AnimatedSection>
            <h2>
              Core Features <span className="highlight">(All Tiers)</span>
            </h2>
            <p className="core-features__subtitle">
              Every plan includes powerful features to keep your household
              accountable.
            </p>
            <div className="divider" />
          </AnimatedSection>

          <div className="core-features__grid">
            {coreFeatures.map((category, index) => (
              <AnimatedSection key={category.category} delay={index * 0.1}>
                <div className="core-features__card">
                  <div className="core-features__header">
                    <span className="core-features__icon">{category.icon}</span>
                    <h3>{category.category}</h3>
                  </div>
                  <ul className="core-features__list">
                    {category.items.map((item) => (
                      <li key={item.name}>
                        <strong>{item.name}</strong>
                        <span>{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pricing-comparison">
        <div className="container">
          <AnimatedSection>
            <h2>Feature Comparison</h2>
            <p className="pricing-comparison__subtitle">
              See exactly what's included in each plan.
            </p>
            <div className="divider" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="pricing-comparison__table-wrapper">
              <table className="pricing-comparison__table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Free</th>
                    <th className="pricing-comparison__highlight">Pro</th>
                    <th>Family</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td>
                        {typeof row.free === "boolean" ? (
                          row.free ? (
                            <span className="yes">✓</span>
                          ) : (
                            <span className="no">✗</span>
                          )
                        ) : (
                          <span
                            className={
                              row.free === "Unlimited" ? "unlimited" : ""
                            }
                          >
                            {row.free}
                          </span>
                        )}
                      </td>
                      <td className="pricing-comparison__highlight">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <span className="yes">✓</span>
                          ) : (
                            <span className="no">✗</span>
                          )
                        ) : (
                          <span
                            className={
                              row.pro === "Unlimited" ? "unlimited" : ""
                            }
                          >
                            {row.pro}
                          </span>
                        )}
                      </td>
                      <td>
                        {typeof row.family === "boolean" ? (
                          row.family ? (
                            <span className="yes">✓</span>
                          ) : (
                            <span className="no">✗</span>
                          )
                        ) : (
                          <span
                            className={
                              row.family === "Unlimited" ? "unlimited" : ""
                            }
                          >
                            {row.family}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Privacy & Self-Hosting */}
      <section className="pricing-privacy">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="pricing-privacy__card">
              <div className="pricing-privacy__icon">🛡️</div>
              <h2>Privacy & Self-Hosting</h2>
              <p className="pricing-privacy__main">
                TaskLock is <strong>100% self-hosted</strong>. Your data never
                leaves your network.
              </p>
              <div className="pricing-privacy__grid">
                <div className="pricing-privacy__item">
                  <span>🏠</span>
                  <p>
                    <strong>No cloud accounts required</strong>
                    <br />
                    Runs entirely on your hardware
                  </p>
                </div>
                <div className="pricing-privacy__item">
                  <span>📊</span>
                  <p>
                    <strong>No telemetry</strong>
                    <br />
                    We don't collect any usage data
                  </p>
                </div>
                <div className="pricing-privacy__item">
                  <span>🔌</span>
                  <p>
                    <strong>No external dependencies</strong>
                    <br />
                    Works on an air-gapped network
                  </p>
                </div>
                <div className="pricing-privacy__item">
                  <span>💾</span>
                  <p>
                    <strong>You own the data</strong>
                    <br />
                    Everything stays in your PostgreSQL database
                  </p>
                </div>
                <div className="pricing-privacy__item">
                  <span>🔍</span>
                  <p>
                    <strong>Open inspection</strong>
                    <br />
                    See exactly what's running on your server
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Technical Requirements */}
      <section className="pricing-requirements">
        <div className="container container--narrow">
          <AnimatedSection>
            <h2>Technical Requirements</h2>
            <div className="divider" />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="pricing-requirements__grid">
              <div className="pricing-requirements__card">
                <h3>Required</h3>
                <ul>
                  <li>
                    <span className="pricing-requirements__icon">🐳</span>
                    Docker and Docker Compose
                  </li>
                  <li>
                    <span className="pricing-requirements__icon">🐘</span>
                    PostgreSQL database (included in Docker setup)
                  </li>
                  <li>
                    <span className="pricing-requirements__icon">🕳️</span>
                    Pi-hole instance (v5.x or v6.x)
                  </li>
                  <li>
                    <span className="pricing-requirements__icon">✅</span>
                    Vikunja instance with API access
                  </li>
                </ul>
              </div>
              <div className="pricing-requirements__card">
                <h3>Optional</h3>
                <ul>
                  <li>
                    <span className="pricing-requirements__icon">📱</span>
                    Bark app for iOS notifications
                  </li>
                </ul>
                <div className="pricing-requirements__specs">
                  <h4>Minimum Specs</h4>
                  <p>1GB RAM, 2GB disk space</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How Upgrades Work */}
      <section className="pricing-upgrade">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="pricing-upgrade__card">
              <h2>How Upgrades Work</h2>
              <div className="divider" style={{ margin: "1rem auto 2rem" }} />

              <div className="pricing-upgrade__prompt">
                <p className="pricing-upgrade__example">
                  "You've reached the user limit (3/3). Upgrade to Pro for
                  unlimited users!"
                </p>
              </div>

              <div className="pricing-upgrade__steps">
                <div className="pricing-upgrade__step">
                  <span className="pricing-upgrade__number">1</span>
                  <p>Purchase a license</p>
                </div>
                <div className="pricing-upgrade__step">
                  <span className="pricing-upgrade__number">2</span>
                  <p>Receive your license file via email</p>
                </div>
                <div className="pricing-upgrade__step">
                  <span className="pricing-upgrade__number">3</span>
                  <p>Upload it in the admin interface</p>
                </div>
                <div className="pricing-upgrade__step">
                  <span className="pricing-upgrade__number">4</span>
                  <p>Enjoy unlimited access immediately</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <div className="container container--narrow">
          <AnimatedSection>
            <div className="pricing-cta__card">
              <h2>Ready to Take Control?</h2>
              <p>
                Start with the free tier and upgrade anytime as your household
                grows.
              </p>
              <div className="pricing-cta__buttons">
                <Link to="/get-started?plan=free" className="btn btn--primary">
                  Get Started Free
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
                <Link to="/" className="btn btn--secondary">
                  Learn More
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

export default Pricing;
