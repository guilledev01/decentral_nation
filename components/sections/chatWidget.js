import { ContactIcon } from "../svgs";

export default function ChatWidget({ router }) {
  return (
    <div
      className="chat-widget d-flex ai-c jc-c p-16"
      onClick={() => router.push("/contact-us")}
    >
      <ContactIcon />
    </div>
  );
}
