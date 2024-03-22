import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter((item) => item);

  let breadcrumb = "";
  return (
    <div className="breadcrumb">
      {paths.length > 0 && <Link to="/"> Home </Link>}
      {paths.map((item, index) => {
        breadcrumb += `/${item}`;

        const isLast = index === paths.length - 1;

        return isLast ? (
          <span> &gt; {item}</span>
        ) : (
          <Link to={breadcrumb}> &gt; {item}</Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
