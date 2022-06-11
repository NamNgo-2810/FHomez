import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NewsManager from "../NewsManager/NewsManager";

const childRoute = [
  { link: "/account", title: "Thông tin tài khoản" },
  { link: "/account/quan-li-tin", title: "Quản lí tin" },
  { link: "/account/nap-tien", title: "Nạp tiền" },
  { link: "/account/lich-su-nap-tien", title: "Lịch sử nạp tiền" },
];

function Info() {

  const location = useLocation()     

  const isActiveLink = (currentPath) => {
      if(location.pathname === currentPath) { return ' active'}
      return ''
  }

  return (
    <>
      <div className="container" style={{ transform: "translateY(150px)" }}>
        <div className="row">
          <ul className="nav nav-pills">
            {childRoute.map((e) => (
              <li className='nav-item'>
                <Link className={'nav-link' + isActiveLink(e.link)} to={e.link}>
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

export default Info;
