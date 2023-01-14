import { FadeEffect } from "../animations";

export default function Title({ title, description }) {
  return (
    <FadeEffect bottom>
      <div className="mb-64">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </FadeEffect>
  );
}
