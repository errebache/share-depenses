// Breadcrumbs.js

import React from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importez useTranslation depuis react-i18next

function Breadcrumbs() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const pathnames = pathname
    .split("/")
    .filter((x) => x && !/^[0-9a-fA-F]{24}$/.test(x));

  return (
    <section className="section-box">
      <div className="breacrumb-cover">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12">
              <ul className="breadcrumbs">
                {pathnames.map((name, index) => {
                  const routeTo = `/${pathnames.slice(0, index + 1).join(">")}`;
                  const isLast = index === pathnames.length - 1;
                  const pageTitle = t(name);
                  return isLast ? (
                    <li key={name}>{pageTitle}</li>
                  ) : (
                    <li key={name}>
                      <Link to={routeTo}>{pageTitle}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumbs;
