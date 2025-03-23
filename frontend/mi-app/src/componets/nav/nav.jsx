import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav.scss";

const Nav = ({ routers, LogoComponent, isScroll }) => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);
  

  return (
    <>
      {/* Background circles */}
      <div className="bg-circles">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      
      
      <nav className="nav__container">
        <div className="nav__container-content">
          <div className={`nav__content-img ${isScroll >= 100 ? 'logo_visable--nav' : 'hidden--nav'}`}>
            <Link to={'/'}>
              {LogoComponent && isScroll != false && <LogoComponent logo_img={'img/3.svg'} className="nav__logo" />}
            </Link>
          </div>
          <ul className="nav__content-ul">
            {routers.map((router, index) => (
              <li key={index} className={`nav__content-li ${active === router.path ? "active" : ""}`}>
                <Link to={router.path} className="nav__content-link">
                  {router.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;