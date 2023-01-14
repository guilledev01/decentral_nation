import { FadeEffect } from "../animations";

export default function Divider() {
  return (
    <FadeEffect bottom>
      <div className="divider"></div>
    </FadeEffect>
  );
}
