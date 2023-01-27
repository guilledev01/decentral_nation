import * as jose from "jose";
import { useReCaptcha } from "next-recaptcha-v3";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useState } from "react";
import { FadeEffect } from "../../components/animations";
import { Button } from "../../components/elements";
import { useMatchMedia } from "../../hooks";

export default function ContactUsPage() {
  const { t } = useTranslation("contact-us");
  const contactUs = t("contact-us", {}, { returnObjects: true });
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
    privacyPolicy: false,
  });
  const [send, setSend] = useState(undefined);
  const isMobileResolution = useMatchMedia("(max-width:1370px)", undefined);
  const { executeRecaptcha } = useReCaptcha();

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
    fetch("/api/email/support-contact", {
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
            email: "",
            message: "",
            privacyPolicy: false,
          });
        }
      })
      .catch(console.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const property in form) {
      if (form[property] === "" || form[property] === false) {
        setSend(false);
        return false;
      }
    }
    const token = await executeRecaptcha("form_submit");
    token ? sendForm() : setSend(false);
  };

  return (
    <article id="contact-us">
      <div className="d-flex col ai-c jc-c m-center gp-64">
        <div>
          <h3>{contactUs.title}</h3>
          <span>{contactUs.description}</span>
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
                {send ? contactUs.warning.success : contactUs.warning.error}
              </span>
            </FadeEffect>
          )}
          {contactUs.form.map(({ name, value }, id) => {
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
              {contactUs.textArea.name}&nbsp;
              <span className="required">*</span>
            </span>
            <textarea
              name="message"
              className="form-field"
              placeholder={contactUs.textArea.placeholder}
              onChange={handleForm}
              value={form.message}
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
              {contactUs.accept.text}&nbsp;
              <Link className="routes" href="/privacy-policy">
                {contactUs.accept.policy}
              </Link>
              &nbsp;
              <span className="required">*</span>
            </span>
          </div>
          <Button color="secondary" titleA={contactUs.request} type="submit" />
        </form>
      </div>
    </article>
  );
}
