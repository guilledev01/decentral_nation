const LEGAL_WARNING = [
  "The information and materials contained on this website are provided for general information purposes only. We do not make any representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.",
  "In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.",
  "This website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).",
  "All trademarks and logos used on this website are the property of their respective owners and are used with permission.",
  "The use of this website and any dispute arising out of such use of the website is subject to the laws of the country where the website is hosted.",
  "Please note that this Legal Notice and our Privacy Policy and Cookie Policy may be updated from time to time, so please review them regularly. If you have any questions or concerns about our use of your personal information or cookies.",
];

export default function LegalWarningPage() {
  return (
    <article id="legal-warning">
      <div className="d-flex col ai-c jc-c gp-64">
        <h3>Legal Warning</h3>
        <div className="d-flex col ai-c jc-c gp-32">
          {LEGAL_WARNING.map((text, id) => {
            return <span key={id}>{text}</span>;
          })}
        </div>
      </div>
    </article>
  );
}
