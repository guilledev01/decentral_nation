import * as jose from "jose";
import { useReCaptcha } from "next-recaptcha-v3";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FadeEffect } from "../../components/animations";
import { Button } from "../../components/elements";
import { useMatchMedia } from "../../hooks";

export default function RequestBudgetPage() {
  const { t } = useTranslation("request-budget");
  const requestBudget = t("request-budget", {}, { returnObjects: true });
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    projectName: "",
    projectDescription: "",
    privacyPolicy: false,
  });
  const [send, setSend] = useState(undefined);
  const isMobileResolution = useMatchMedia("(max-width:1370px)", undefined);
  const { executeRecaptcha } = useReCaptcha();
  const [domain, setDomain] = useState(false);

  useEffect(() => {
    setDomain(window.location.host);
  }, []);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const sendForm = async () => {
    const iss = process.env.NEXT_PUBLIC_CORS_ORIGIN_INTERNAL;
    const aud = form.email;
    const alg = "RS256";
    const privateKey = await jose.importPKCS8(
      process.env.NEXT_PUBLIC_RSA_PRIVATE_KEY,
      alg
    );
    const jwt = await new jose.SignJWT(form)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer(iss)
      .setAudience(aud)
      .setExpirationTime("10s")
      .sign(privateKey);
    fetch("/api/email/request-budget", {
      method: "POST",
      headers: {
        authorization: jwt,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        iss,
        aud,
      }),
    })
      .then((res) => {
        if (res.status === 202) {
          setSend(true);
          setForm({
            fullName: "",
            companyName: "",
            email: "",
            projectName: "",
            projectDescription: "",
            privacyPolicy: false,
          });
        }
      })
      .catch(console.error);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      for (const property in form) {
        if (form[property] === "" || form[property] === false) {
          setSend(false);
          return false;
        }
      }
      if (!domain) return false;
      const token = await executeRecaptcha("form_submit");
      token ? sendForm() : setSend(false);
    },
    [form, executeRecaptcha, domain, sendForm]
  );

  return (
    <article id="request-budget">
      <div className="d-flex col ai-c jc-c m-center gp-64">
        <div>
          <h3>{requestBudget.title}</h3>
          <span>{requestBudget.description}</span>
        </div>

        <form
          style={{ width: isMobileResolution ? "100%" : 500 }}
          className="d-flex col ai-c jc-c m-center gp-16"
          onSubmit={handleSubmit}
        >
          {send !== undefined && (
            <FadeEffect top>
              <span
                className={`form ${send ? "success" : "error"} max-width p-8`}
              >
                {send
                  ? requestBudget.warning.success
                  : requestBudget.warning.error}
              </span>
            </FadeEffect>
          )}
          {requestBudget.form.map(({ name, value }, id) => {
            return (
              <div key={id} className="max-width d-flex col jc-c gp-4">
                <span className="d-flex ai-fs pl-8">
                  {name}&nbsp;<span className="required">*</span>
                </span>
                <input
                  name={value}
                  className="form-field"
                  type="text"
                  onChange={handleForm}
                  value={form[value]}
                />
              </div>
            );
          })}
          <div className="max-width d-flex col jc-c gp-4">
            <span className="d-flex ai-fs pl-8">
              {requestBudget.textArea.name}&nbsp;
              <span className="required">*</span>
            </span>
            <textarea
              name="projectDescription"
              className="form-field"
              placeholder={requestBudget.textArea.placeholder}
              onChange={handleForm}
              value={form.projectDescription}
              style={{ resize: "none", height: 195 }}
            />
          </div>
          <div className="max-width d-flex ai-c jc-c gp-4">
            <input
              name="privacyPolicy"
              type="checkbox"
              onChange={handleForm}
              checked={form.privacyPolicy}
            />
            <span>
              {requestBudget.accept.text}&nbsp;
              <Link className="routes" href="/privacy-policy">
                {requestBudget.accept.policy}
              </Link>
              &nbsp;
              <span className="required">*</span>
            </span>
          </div>
          <Button
            color="secondary"
            titleA={requestBudget.request}
            type="submit"
          />
        </form>
        <span>{requestBudget.footer}</span>
      </div>
    </article>
  );
}
