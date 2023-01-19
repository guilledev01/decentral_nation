const PRIVACY_POLICY = [
  "We are committed to protecting your privacy and personal information. Our privacy policy explains how we collect, use, and disclose your personal information.",
  "In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.",
  "We collect personal information when you register for an account, make a purchase, or contact us. We may also collect information about your browsing activity on our website, including the pages you visit, the links you click, and the search terms you enter.",
  "We use your personal information to provide you with the services you have requested and to improve our website. We may also use your personal information for marketing and advertising purposes.",
  "We will not share your personal information with third parties without your consent, except as required by law. We may share your personal information with our service providers, such as payment processors and shipping companies, to fulfill your orders.",
  "We have implemented security measures to protect your personal information from unauthorized access, use, or disclosure. However, please note that no method of transmitting information over the internet is completely secure.",
];

export default function PrivacyPolicyPage() {
  return (
    <article id="privacy-policy">
      <div className="d-flex col ai-c jc-c gp-64">
        <h3>Privacy Policy</h3>
        <div className="d-flex col ai-c jc-c gp-32">
          {PRIVACY_POLICY.map((text, id) => {
            return <span key={id}>{text}</span>;
          })}
        </div>
      </div>
    </article>
  );
}
