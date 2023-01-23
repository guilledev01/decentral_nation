import useTranslation from "next-translate/useTranslation";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation("privacy-policy");
  const privacyPolicy = t("privacy-policy", {}, { returnObjects: true });

  return (
    <article id="privacy-policy">
      <div className="d-flex col ai-c jc-c gp-64">
        <h3>{privacyPolicy.title}</h3>
        <div className="d-flex col ai-c jc-c gp-32">
          {privacyPolicy.policy.map((text, id) => {
            return <span key={id}>{text}</span>;
          })}
        </div>
      </div>
    </article>
  );
}
