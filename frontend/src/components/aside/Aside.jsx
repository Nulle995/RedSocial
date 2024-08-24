import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./style.css";
import SearchBar from "../searchBar/SearchBar";
import WhoFollow from "../whoFollow/WhoFollow";

const Aside = () => {
  const url = useLocation();
  const [asideType, setAsideType] = useState();

  function asideContent() {
    if (url.pathname === "/" || url.pathname.includes("profile")) {
      setAsideType(
        <div className="aside">
          <SearchBar />
          <WhoFollow />
        </div>
      );
    }
  }

  useEffect(() => {
    asideContent();
  }, []);

  return <aside>{asideType}</aside>;
};

export default Aside;
