import useTranslation from "next-translate/useTranslation";

export default function CookiesPolicyPage() {
  const { t } = useTranslation("cookies-policy");
  const cookiesPolicy = t("cookies-policy", {}, { returnObjects: true });

  return (
    <article id="cookies-policy">
      <div className="d-flex col ai-c jc-c gp-64">
        <h3>{cookiesPolicy.title}</h3>
        <div className="d-flex col ai-c jc-c gp-32">
          {cookiesPolicy.policy.map((text, id) => {
            return <span key={id}>{text}</span>;
          })}
        </div>
      </div>
    </article>
  );
}
