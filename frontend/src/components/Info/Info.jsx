import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const childRoute = [
  { link: "/account", title: "Thông tin tài khoản" },
  { link: "/account/xac-thuc-tai-khoan", title: "Xác thực tài khoản" },
  { link: "/account/quan-li-tin", title: "Quản lí tin" },
  { link: "/account/nap-tien", title: "Nạp tiền" },
  { link: "/account/lich-su-nap-tien", title: "Lịch sử nạp tiền" },
];

function Info() {
  const location = useLocation();

  const isActiveLink = (currentPath) => {
    if (location.pathname === currentPath) {
      return " active";
    }
    return "";
  };

  return (
    <div style={{ transform: "translateY(140px)",height:'auto' }} className="container flex-column align-items-start">
      <div className="row container">
        <ul className="nav nav-pills border">
          {childRoute.map((e) => (
            <li key={e.link} className="nav-item">
              <Link className={"nav-link" + isActiveLink(e.link)} to={e.link}>
                {e.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="row container pt-3">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Info;
