import { useEffect } from "react";
import "../styles/coming-soon.css";

const APPROVED_NB_LOGO = "/brand/noor-final/noor-nb-master.png";

export function ComingSoon() {
  useEffect(() => {
    document.title = "NOOR BAMAROUF | Coming Soon";
  }, []);

  return (
    <main className="coming-soon" aria-labelledby="coming-soon-title">
      <div className="coming-soon__card">
        <img className="coming-soon__logo" src={APPROVED_NB_LOGO} alt="" width="1200" height="1200" decoding="async" loading="eager" />
        <div className="coming-soon__copy">
          <p id="coming-soon-title" className="coming-soon__name">
            NOOR BAMAROUF
          </p>
          <p>Official Portfolio</p>
          <p>Coming Soon</p>
        </div>
      </div>
    </main>
  );
}
