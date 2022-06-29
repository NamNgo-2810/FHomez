import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AuthContext from "../../contexts/AuthContext.js";
import {userService} from '../../services/user.service.js'
import {
  FaCommentDollar,
  FaAddressBook,
  FaSignOutAlt,
  FaFolderPlus,
} from "react-icons/fa";


function Header() {
  const [show, setShow] = useState(0);
  const { user } = useContext(AuthContext);

  return (
    // navbar-expand-sm -> Các phần tử hiện thị theo chiều ngang ở màn hình > sm và theo chiều dọc ở màn hình sm

    <div
      style={{ height: "80px", position: "fixed", top: "0", zIndex: 999 }}
      className="container-fluid navbar navbar-expand navbar-light bg-light"
    >
      <div className="container">
        <Link
          className="navbar-brand fs-2 fw-normal"
          to="/"
          style={{ color: "#df9c9d" }}
        >
          <img
            src="https://cdn.thukyluat.vn/nhch-images//CauHoi_Hinh/9eb6abaa-8cda-456c-ad66-26ba4da23ffe.jpg"
            alt=""
            width="60"
            height="48"
            className="d-inline-block align-text-bottom"
          />
          FHomez
        </Link>
        <div className="collapse navbar-collapse" id="navbarMobile">
          <ul className="navbar-nav mr-auto w-100 flex-row justify-content-end align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <div className="dropdown">
                    <img
                      src={user.avtUrl ? user.avtUrl : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"}
                      style={{
                        borderRadius: "50%",
                        width: "70px",
                        height: "60px",
                      }}
                      className="btn"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                      style={{ fontSize: "16px" }}
                    >
                      <Link to="/account" style={{ textDecoration: "none" }}>
                        <button className="dropdown-item">
                          <FaAddressBook /> Quản lí tài khoản
                        </button>
                      </Link>
                      <hr />
                      <Link to="/upload" style={{ textDecoration: "none" }}>
                        <button className="dropdown-item">
                          {" "}
                          <FaFolderPlus /> Đăng bài
                        </button>
                      </Link>
                      <button
                        className="dropdown-item"
                        onClick={() => userService.logOut()}
                      >
                        <FaSignOutAlt /> Đăng xuất
                      </button>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active me-2">
                  <button
                    style={{ width: "125px", backgroundColor: "#cfe2ff" }}
                    className="btn btn-light btn-block"
                    onClick={() => setShow(1)}
                  >
                    Đăng kí
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    style={{ width: "125px", backgroundColor: "#f6dddf" }}
                    className="btn btn-block"
                    onClick={() => setShow(2)}
                  >
                    Đăng nhập
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {
        {
          0: null,
          1: <Register setShow={setShow}></Register>,
          2: <Login setShow={setShow}></Login>,
        }[show]
      }
    </div>
  );
}

export default Header;
