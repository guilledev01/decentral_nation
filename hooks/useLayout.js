import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TITLE = {
  "/": "Welcome",
  "/request-budget": "Request Budget",
  "/contact-us": "Contact Us",
  "/privacy-policy": "Privacy Policy",
  "/legal-warning": "Legal Warning",
  "/cookies-policy": "Cookies Policy",
};

const DESCRIPTION = {
  "/": "Welcome to Decentral Nation, where we decentralize your business and ensure its future. Request a quote for your project today and let's build the future together!",
  "/request-budget":
    "Obtain a complimentary and non-binding budget estimate for your project.",
  "/contact-us":
    "Tell us how we can help you and our support team will contact you as soon as possible.",
  "/privacy-policy": "Read our Privacy Policy for Decentral Nation website",
  "/legal-warning": "Read our Legal Warning for Decentral Nation website",
  "/cookies-policy": "Read our Cookies Policy for Decentral Nation website",
};

export default function useLayout() {
  const [title, setTitle] = useState(false);
  const [description, setDesription] = useState(false);
  let router = useRouter();

  useEffect(() => {
    setTitle(TITLE[router.pathname]);
    setDesription(DESCRIPTION[router.pathname]);
  }, [router]);

  return {
    router,
    title,
    description,
  };
}
