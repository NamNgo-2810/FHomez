import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <div className="row navbar navbar-expand-sm navbar-light bg-light px-8">
      <div style={{padding:'0px 32px'}} className="container">
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
            class="d-inline-block align-text-bottom"
          />
          FHomez
        </Link>
        <button
          class="navbar-toggler d-sm-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMobile"
          aria-controls="navbarMobile"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMobile">
          <ul className="navbar-nav mr-auto w-100 flex-row justify-content-end">
            <li class="nav-item active">
              <Link class="nav-link" to="/signup">
                <button style={{width: '125px'}} className="btn btn-light btn-block">Đăng kí</button>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">
                <button style={{width: '125px',backgroundColor:'#f6dddf'}} className="btn btn-block">Đăng nhập</button>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">
                <button style={{width: '125px'}} className="btn btn-primary btn-block">Đăng bài</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
