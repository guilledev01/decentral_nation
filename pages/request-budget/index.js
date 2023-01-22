import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FadeEffect } from "../../components/animations";
import { Button } from "../../components/elements";
import { useMatchMedia } from "../../hooks";

export default function RequestBudgetPage() {
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
    [form, executeRecaptcha]
  );

  const sendForm = () => {
    setSend(true);
    setForm({
      fullName: "",
      companyName: "",
      email: "",
      projectName: "",
      projectDescription: "",
      privacyPolicy: false,
    });
  };

  return (
    <article id="request-budget">
      <div className="d-flex col ai-c jc-c m-center gp-64">
        <div>
          <h3>Request Budget</h3>
          <span>
            Obtain a complimentary and non-binding budget estimate for your
            project.
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
                  ? "Budget requested successfully"
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
              Organization or company name&nbsp;
              <span className="required">*</span>
            </span>
            <input
              name="companyName"
              className="form-field"
              type="text"
              onChange={handleForm}
              value={form.companyName}
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
              Project name&nbsp;<span className="required">*</span>
            </span>
            <input
              name="projectName"
              className="form-field"
              type="text"
              onChange={handleForm}
              value={form.projectName}
            />
          </div>
          <div className="max-width">
            <span className="d-flex ai-fs pl-8">
              Project description&nbsp;<span className="required">*</span>
            </span>
            <textarea
              name="projectDescription"
              className="form-field"
              placeholder="Insert a detailed description of the project, including the specific use of blockchain technology and its functions and characteristics within the app. Provide information on the overall goals and objectives of the project, as well as any specific features or functionality that must be included in the final product. The more detailed the description, the more accurate the development cost estimate will be."
              onChange={handleForm}
              value={form.projectDescription}
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
          <Button color="secondary" titleA="REQUEST BUDGET" type="submit" />
        </form>

        <span>
          The approximate budget for your project will be provided to you within
          a maximum of 5 business days. Upon receipt of the approximate budget,
          a project manager will reach out to you for further detailed
          information in order to provide you with an accurate budget for the
          development of your project. If you have any other questions or
          concerns, please do not hesitate to contact our support team.
        </span>
      </div>
    </article>
  );
}
