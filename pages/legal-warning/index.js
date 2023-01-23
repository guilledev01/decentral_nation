import useTranslation from "next-translate/useTranslation";

export default function LegalWarningPage() {
  const { t } = useTranslation("legal-warning");
  const legalWarning = t("legal-warning", {}, { returnObjects: true });

  return (
    <article id="legal-warning">
      <div className="d-flex col ai-c jc-c gp-64">
        <h3>{legalWarning.title}</h3>
        <div className="d-flex col ai-c jc-c gp-32">
          {legalWarning.warning.map((text, id) => {
            return <span key={id}>{text}</span>;
          })}
        </div>
      </div>
    </article>
  );
}
