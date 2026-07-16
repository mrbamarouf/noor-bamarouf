import { FormEvent, useMemo, useState } from "react";
import { ArtFrame } from "../components/ArtFrame";
import { useLanguage } from "../context/LanguageContext";

type ContactFields = {
  name: string;
  email: string;
  interest: string;
  timeline: string;
  budget: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const initialFields: ContactFields = {
  name: "",
  email: "",
  interest: "",
  timeline: "",
  budget: "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactPage() {
  const { dictionary } = useLanguage();
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const fieldLabels = dictionary.contactPage.labels;
  const fieldErrors = dictionary.contactPage.errors;

  const options = useMemo(() => dictionary.contactPage.options, [dictionary]);

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors: ContactErrors = {};
    if (!fields.name.trim()) nextErrors.name = fieldErrors.name;
    if (!isValidEmail(fields.email)) nextErrors.email = fieldErrors.email;
    if (!fields.interest) nextErrors.interest = fieldErrors.interest;
    if (!fields.timeline) nextErrors.timeline = fieldErrors.timeline;
    if (!fields.budget) nextErrors.budget = fieldErrors.budget;
    if (!fields.message.trim()) nextErrors.message = fieldErrors.message;
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const reset = () => {
    setFields(initialFields);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="page contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <div>
          <span className="section__index">{dictionary.nav.contact}</span>
          <h1 id="contact-title">{dictionary.contactPage.title}</h1>
          <p>{dictionary.contactPage.body}</p>
        </div>
        <address>
          <a href="mailto:hello@nourbamarouf.com">{dictionary.contactPage.email}</a>
          <span>{dictionary.contactPage.instagram}</span>
          <span>{dictionary.contactPage.behance}</span>
        </address>
      </section>

      <section className="contact-layout">
        <ArtFrame
          variant="flora"
          alt={{
            en: "Botanical desk composition with a contact card placeholder.",
            ar: "تكوين مكتبي نباتي مع بطاقة تواصل مؤقتة.",
          }}
          ratio="portrait"
        />

        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="contact-name">{fieldLabels.name}</label>
            <input
              id="contact-name"
              value={fields.name}
              placeholder={dictionary.contactPage.placeholders.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name ? <p id="contact-name-error">{errors.name}</p> : null}
          </div>

          <div className="form-field">
            <label htmlFor="contact-email">{fieldLabels.email}</label>
            <input
              id="contact-email"
              type="email"
              value={fields.email}
              placeholder={dictionary.contactPage.placeholders.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email ? <p id="contact-email-error">{errors.email}</p> : null}
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="contact-interest">{fieldLabels.interest}</label>
              <select
                id="contact-interest"
                value={fields.interest}
                onChange={(event) => updateField("interest", event.target.value)}
                aria-invalid={Boolean(errors.interest)}
                aria-describedby={errors.interest ? "contact-interest-error" : undefined}
              >
                <option value="">Select</option>
                {options.interest.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.interest ? <p id="contact-interest-error">{errors.interest}</p> : null}
            </div>

            <div className="form-field">
              <label htmlFor="contact-timeline">{fieldLabels.timeline}</label>
              <select
                id="contact-timeline"
                value={fields.timeline}
                onChange={(event) => updateField("timeline", event.target.value)}
                aria-invalid={Boolean(errors.timeline)}
                aria-describedby={errors.timeline ? "contact-timeline-error" : undefined}
              >
                <option value="">Select</option>
                {options.timeline.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.timeline ? <p id="contact-timeline-error">{errors.timeline}</p> : null}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="contact-budget">{fieldLabels.budget}</label>
            <select
              id="contact-budget"
              value={fields.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={errors.budget ? "contact-budget-error" : undefined}
            >
              <option value="">Select</option>
              {options.budget.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.budget ? <p id="contact-budget-error">{errors.budget}</p> : null}
          </div>

          <div className="form-field">
            <label htmlFor="contact-message">{fieldLabels.message}</label>
            <textarea
              id="contact-message"
              value={fields.message}
              placeholder={dictionary.contactPage.placeholders.message}
              rows={6}
              onChange={(event) => updateField("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            {errors.message ? <p id="contact-message-error">{errors.message}</p> : null}
          </div>

          {submitted ? <p className="form-success" role="status">{dictionary.contactPage.success}</p> : null}

          <div className="form-actions">
            <button className="button button--primary" type="submit">{dictionary.actions.sendDraft}</button>
            <button className="button button--quiet" type="button" onClick={reset}>{dictionary.actions.clearForm}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
