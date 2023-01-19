const PROJECTS = {
  introduction:
    "We have successfully launched several projects using decentralized technology, including a decentralized marketplace, a decentralized social media platform, and a decentralized voting system. Our clients have seen increased security, transparency, and efficiency in their systems thanks to the use of decentralized technology.",
};

export default function Projects() {
  return (
    <article id="projects">
      <div className="d-flex col ai-c jc-c gp-64">
        <div className="d-flex col ai-c jc-c gp-32">
          <h3>Projects</h3>
          <span>{PROJECTS.introduction}</span>
        </div>
      </div>
    </article>
  );
}
