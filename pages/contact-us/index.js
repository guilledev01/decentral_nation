import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FadeEffect } from "../../components/animations";
import { Button } from "../../components/elements";
import { useMatchMedia } from "../../hooks";

export default function ContactUsPage() {
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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      for (const property in form) {
        if (form[property] === "" || form[property] === false) {
          setSend(false);
          return false;
        }
      }
      const token = await executeRecaptcha("form_submit");
      token ? sendForm() : setSend(false);
    },
    [form]
  );

  const sendForm = () => {
    setSend(true);
    setForm({
      fullName: "",
      email: "",
      message: "",
      privacyPolicy: false,
    });
  };

  return (
    <article id="contact-us">
      <div className="d-flex col ai-c jc-c m-center gp-64">
        <div>
          <h3>Contact us</h3>
          <span>
            Tell us how we can help you and our support team will contact you as
            soon as possible.
          </span>
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
                  ? "Message sended successfully"
                  : "Complete all required field"}
              </span>
            </FadeEffect>
          )}

          <div className="max-width">
            <span className="d-flex ai-fs pl-8">
              Full name&nbsp;<span className="required">*</span>
            </span>

            <input
              name="fullName"
              className="form-field"
              type="text"
              onChange={handleForm}
              value={form.fullName}
            />
          </div>
          <div className="max-width">
            <span className="d-flex ai-fs pl-8">
              E-mail&nbsp;<span className="required">*</span>
            </span>
            <input
              name="email"
              className="form-field"
              type="email"
              onChange={handleForm}
              value={form.email}
            />
          </div>
          <div className="max-width">
            <span className="d-flex ai-fs pl-8">
              Message&nbsp;<span className="required">*</span>
            </span>
            <textarea
              name="message"
              className="form-field"
              placeholder="How we can help you?"
              onChange={handleForm}
              value={form.message}
              style={{ resize: "none", height: 180 }}
            />
          </div>
          <div className="max-width d-flex ai-c jc-c">
            <input
              name="privacyPolicy"
              type="checkbox"
              onChange={handleForm}
              checked={form.privacyPolicy}
            />
            <span className="d-flex ai-fs pl-8">
              I have read and accept the&nbsp;
              <Link className="routes" href="/privacy-policy">
                Privacy Policy
              </Link>
              &nbsp;
              <span className="required">*</span>
            </span>
          </div>
          <Button color="secondary" titleA="CONTACT US" type="submit" />
        </form>
      </div>
    </article>
  );
}
