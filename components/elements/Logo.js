import { LogoIcon } from "../svgs";

export default function Loader() {
  return (
    <div className="logo d-flex ai-c jc-c gp-8">
      <LogoIcon />
      <div className="d-flex col ai-c jc-c">
        <h4 translate="no">Decentral</h4>
        <h4 translate="no">Nation</h4>
      </div>
    </div>
  );
}
