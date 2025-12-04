import { useForm } from "@formspree/react";
import { useState } from "react";
import { AnimatedSection } from "../pages/LandingPage";

interface FormSpreeFormProps {
  plan?: string;
}

export function FormSpreeForm({ plan }: FormSpreeFormProps) {
  const [email, setEmail] = useState("");

  const [state, handleSubmit] = useForm(
    import.meta.env.VITE_FORMSPREE_URL_ENDPOINT
  );

  const { submitting, succeeded, errors } = state;

  return (
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

            {!succeeded ? (
              <form onSubmit={handleSubmit} className="signup__form">
                {/* Formspree honeypot field - hidden from users, catches bots */}
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                {/* Formspree metadata fields */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New TaskLock Early Access Signup"
                />
                <input
                  type="hidden"
                  name="_source"
                  value="tasklock-landing-page"
                />
                {plan && <input type="hidden" name="plan" value={plan} />}
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={submitting}
                >
                  {submitting ? (
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
                <span>We'll reach out soon with your early access invite.</span>
              </div>
            )}

            {errors && Object.keys(errors).length > 0 && (
              <p className="signup__error">
                An error has occurred in submission, please try again later.
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
