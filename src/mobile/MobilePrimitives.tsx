import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getProjectDisplayTitle, getProjectTitleDirection } from "../data/projects";
import type { Project } from "../types";

export function MobileArrow() {
  const { language } = useLanguage();
  return <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>;
}

export function MobileTextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link className="m-text-link" to={to}>
      <span>{children}</span>
      <MobileArrow />
    </Link>
  );
}

export function MobileProjectLine({ project, index }: { project: Project; index: number }) {
  const { dictionary, language } = useLanguage();

  return (
    <Link className="m-project-line" to={`/work/${project.slug}`}>
      <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
      <strong>
        <bdi dir={getProjectTitleDirection(project, language)}>{getProjectDisplayTitle(project, language)}</bdi>
      </strong>
      <small>{dictionary.categories[project.category]}</small>
    </Link>
  );
}
