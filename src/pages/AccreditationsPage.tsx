import { Link } from "react-router-dom";
import { accreditationCopy, accreditations } from "../data/accreditations";
import { useLanguage } from "../context/LanguageContext";

function CertificateDetails({ item }: { item: (typeof accreditations)[number] }) {
  const { language } = useLanguage();
  const details = [
    [item.issuerLabel[language], item.issuer[language]],
    [item.detailLabel[language], item.detail[language]],
    [item.issueLabel[language], item.issueDate[language]],
    [item.expiryLabel[language], item.expiryDate[language]],
  ];

  return (
    <dl className="desktop-accreditation-card__details">
      {details.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AccreditationsPage() {
  const { language } = useLanguage();
  const copy = accreditationCopy[language];

  return (
    <div className="desktop-page desktop-accreditations">
      <section className="desktop-accreditations__hero desktop-section-flow" aria-labelledby="accreditations-title" data-reveal>
        <span className="desktop-kicker">{copy.label}</span>
        <h1 id="accreditations-title">{copy.title}</h1>
        <p>{copy.intro}</p>
        <Link className="desktop-accreditations__jump" to="#certificate-01">
          {copy.credibilityTitle}
        </Link>
      </section>

      <section className="desktop-accreditations__list" aria-label={copy.title}>
        {accreditations.map((item, index) => (
          <article
            className={`desktop-accreditation-card desktop-accreditation-card--${index % 2 === 0 ? "primary" : "secondary"}`}
            id={`certificate-${item.number}`}
            key={item.id}
            data-reveal
          >
            <a
              className="desktop-accreditation-card__preview"
              href={item.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.action[language]}: ${item.title[language]}`}
            >
              <img src={item.previewSrc} alt={item.alt[language]} loading={index === 0 ? "eager" : "lazy"} />
            </a>
            <div className="desktop-accreditation-card__copy desktop-section-flow">
              <span className="desktop-kicker" dir="ltr">{item.number}</span>
              <h2>{item.title[language]}</h2>
              <CertificateDetails item={item} />
              <a
                className="desktop-button desktop-button--primary"
                href={item.pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.action[language]}: ${item.title[language]}. ${copy.openHint}`}
              >
                {item.action[language]}
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="desktop-accreditations__closing desktop-section-flow" data-reveal>
        <span className="desktop-kicker">{copy.label}</span>
        <h2>{copy.closingTitle}</h2>
        <p>{copy.closingBody}</p>
        <Link className="desktop-text-link" to="/contact">
          {language === "ar" ? "بدء محادثة" : "Begin a conversation"}
        </Link>
      </section>
    </div>
  );
}
