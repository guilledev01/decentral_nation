import { useRouter } from "next/router";
import { LogoIcon } from "../svgs";

export default function Loader() {
  let route = useRouter();
  return (
    <div className="logo d-flex ai-c jc-c gp-8" onClick={() => route.push("/")}>
      <LogoIcon />
      <div className="d-flex col ai-c jc-c">
        <h4 translate="no">Decentral</h4>
        <h4 translate="no">Nation</h4>
      </div>
    </div>
  );
}
