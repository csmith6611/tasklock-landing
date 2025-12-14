import { Link, useSearchParams } from "react-router-dom";
import { FormSpreeForm } from "../components/FormspreeForm";

function NotAvailable() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "pro";

  const planNames: { [key: string]: string } = {
    free: "Free",
    pro: "Pro",
    family: "Family",
  };

  const planName = planNames[plan] || "Pro";

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
            <Link to="/demo">Demo</Link>
            <Link to="/#signup" className="btn btn--primary btn--small">
              Early Access
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="not-available">
        <div className="container container--narrow">
          <div className="not-available__content">
            {/* Icon */}
            <div className="not-available__icon-wrapper animate-in">
              <svg
                className="not-available__icon"
                viewBox="0 0 100 100"
                fill="none"
              >
                <rect
                  x="20"
                  y="45"
                  width="60"
                  height="45"
                  rx="8"
                  fill="var(--accent-primary)"
                />
                <path
                  d="M30 45 L30 30 Q30 10 50 10 Q70 10 70 30 L70 45"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="8"
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
              <div className="not-available__pulse"></div>
            </div>

            <div className="badge animate-in delay-1">
              <span className="badge__dot" />
              Coming Soon
            </div>

            <h1 className="not-available__title animate-in delay-2">
              TaskLock <span className="highlight">{planName}</span> is Not
              Available Yet
            </h1>

            <p className="not-available__subtitle animate-in delay-3">
              We're putting the finishing touches on TaskLock. Sign up for early
              access and be the first to know when it launches.
            </p>

            <FormSpreeForm plan={plan} />

            {/* Timeline */}
            <div className="not-available__timeline animate-in delay-5">
              <h3>What to Expect</h3>
              <div className="not-available__timeline-items">
                <div className="not-available__timeline-item">
                  <div className="not-available__timeline-dot not-available__timeline-dot--active"></div>
                  <div className="not-available__timeline-content">
                    <strong>Now</strong>
                    <span>Sign up for early access</span>
                  </div>
                </div>
                <div className="not-available__timeline-item">
                  <div className="not-available__timeline-dot"></div>
                  <div className="not-available__timeline-content">
                    <strong>Soon</strong>
                    <span>Receive alpha invite via email</span>
                  </div>
                </div>
                <div className="not-available__timeline-item">
                  <div className="not-available__timeline-dot"></div>
                  <div className="not-available__timeline-content">
                    <strong>Alpha</strong>
                    <span>Test TaskLock with all features</span>
                  </div>
                </div>
                <div className="not-available__timeline-item">
                  <div className="not-available__timeline-dot"></div>
                  <div className="not-available__timeline-content">
                    <strong>Launch</strong>
                    <span>Get exclusive early-bird pricing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="not-available__links animate-in delay-5">
              <Link to="/pricing" className="btn btn--secondary">
                ← Back to Pricing
              </Link>
              <Link to="/" className="btn btn--secondary">
                Learn More About TaskLock
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
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

export default NotAvailable;
