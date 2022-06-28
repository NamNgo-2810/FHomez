import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const childRoute = [
  { link: "/admin", title: "Quản lí tài khoản" },
  { link: "/admin/duyet-bai-dang", title: "Duyệt bài đăng" },
  { link: "/admin/xac-thuc-nguoi-dung", title: "Xác thực người dùng" },
  { link: "/admin/quan-li-nguoi-dung", title: "Quản lí người dùng" },
];

function Admin() {
  const location = useLocation();

  const isActiveLink = (currentPath) => {
    if (location.pathname === currentPath) {
      return " active";
    }
    return "";
  };
  return (
    <>
      <div className="container" style={{ transform: "translateY(150px)" }}>
        <div className="row">
          <ul className="nav nav-pills">
            {childRoute.map((e) => (
              <li key={e.link} className="nav-item">
                <Link className={"nav-link" + isActiveLink(e.link)} to={e.link}>
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default Admin;
