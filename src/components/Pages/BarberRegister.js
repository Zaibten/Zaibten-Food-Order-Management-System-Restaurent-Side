import React, { useState } from "react";
import { ProfessionalSignIn, ProfessionalSignUp } from "../../Auth/auth";
import { message } from "antd";
import { useSelector } from "react-redux";

const BarberRegister = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const isUser = useSelector((state) => state.isUser.isUser);

  const sendMessage = (messageText, variant) => {
    messageApi.open({
      type: variant,
      content: messageText,
    });
  };

  const [value, setValue] = useState({
    email: "luckybroast@gmail.com",
    password: "12345678",
  });

  const [regValue, setRegValue] = useState({
    username: "",
    number: "",
    email: "",
    password: "",
  });

  // Modal visibility state
  const [showModal, setShowModal] = useState(true);

  // Tab state: "login" or "register"
  const [activeTab, setActiveTab] = useState("login");

  const onChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegValue((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeSigin = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    if (
      !regValue.username ||
      !regValue.email ||
      !regValue.number ||
      !regValue.password
    ) {
      alert("Enter SignUp Details");
      return;
    }
    sendMessage("Preparing Professional View!!", "warning");
    await ProfessionalSignUp(regValue, sendMessage, isUser);
    setRegValue({
      username: "",
      email: "",
      number: "",
      password: "",
    });
  };

  const OnSubmitLogin = async (e) => {
    e.preventDefault();
    if (isUser === true) {
      sendMessage(
        "Want to Switch your Account to Profesional Kindly visit User Profile !!!",
        "warning"
      );
      return;
    }
    if (!value.email || !value.password) {
      alert("Enter Login Details");
      return;
    }
    sendMessage("One moment please!!", "warning");
    await ProfessionalSignIn(value, sendMessage);
    setValue({
      email: "",
      password: "",
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <>
      {contextHolder}
      <style>{`
        /* Your existing styles here, unchanged */
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background: #fff0f5;
          color: #222;
        }
        .modal-content {
          background-color: #fff0f5 !important;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          max-width: 600px;
          margin: 1rem auto;
          padding: 1.5rem;
        }
        .modal-header {
          border-bottom: none;
          padding-bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title span {
          border: 2px solid #ff69b4;
          border-radius: 10px;
          padding: 0.4rem 1rem;
          background-color: #ffe0ec;
          font-weight: 600;
          font-size: 1.3rem;
        }
        .modal-title span span {
          background-color: #ff69b4;
          color: white;
          border-radius: 5px;
          padding: 0.4rem 0.7rem;
          margin-left: 0.5rem;
          font-weight: 700;
        }
        .btn-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #444;
        }
        .nav-pills {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .nav-pills a {
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          border: 2px solid #ff69b4;
          color: #ff69b4;
          text-decoration: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
          user-select: none;
        }
        .nav-pills a.active {
          background-color: #ff69b4;
          color: white;
        }
        .tab-content {
          padding: 0 1rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input.form-control {
          padding: 0.8rem 1rem;
          border-radius: 10px;
          border: 1.5px solid #ff69b4;
          font-size: 1rem;
          outline-offset: 2px;
          transition: border-color 0.3s ease;
        }
        input.form-control:focus {
          border-color: #ff1493;
          outline: none;
          box-shadow: 0 0 6px #ff69b4;
        }
        .form-check {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          color: #555;
        }
        .form-check-input {
          margin-right: 0.5rem;
          width: 1.2rem;
          height: 1.2rem;
          cursor: pointer;
          border-radius: 5px;
          border: 1.5px solid #ff69b4;
          transition: background-color 0.3s ease;
        }
        .form-check-input:checked {
          background-color: #ff69b4;
          border-color: #ff69b4;
        }
        button.btn {
          background-color: #ff69b4;
          color: white;
          border: none;
          padding: 0.85rem 0;
          border-radius: 10px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button.btn:hover {
          background-color: #ff1493;
        }
        @media (max-width: 480px) {
          .modal-content {
            margin: 1rem 0.5rem;
            padding: 1rem;
          }
          .nav-pills a {
            padding: 0.4rem 1rem;
            font-size: 0.9rem;
          }
          button.btn {
            font-size: 1rem;
          }
        }
        /* Modal background overlay */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background-color: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }
      `}</style>

<div className="modal-overlay" role="dialog" aria-modal="true">
        <div
          className="modal-content text-black"
          onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
        >
          <div className="modal-header position-relative">
            <h5 className="modal-title" id="exampleModalLabel">
              <span>
                Professional <span>{activeTab === "login" ? "Login" : "Register"}</span>
              </span>
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            >
              <span className="material-icons-outlined">close</span>
            </button>
          </div>
          <br></br>

          <div className="modal-body">
            {/* Tabs */}
            <ul className="nav nav-pills nav-justified mb-4" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link rounded-pill ${activeTab === "login" ? "active" : ""}`}
                  href="#"
                  role="tab"
                  aria-selected={activeTab === "login"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("login");
                  }}
                >
                  Login
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link rounded-pill ${activeTab === "register" ? "active" : ""}`}
                  href="#"
                  role="tab"
                  aria-selected={activeTab === "register"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("register");
                  }}
                >
                  Register
                </a>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "login" && (
                <div className="tab-pane fade show active" role="tabpanel">
                  <form onSubmit={OnSubmitLogin}>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      value={value.email}
                      name="email"
                      onChange={onChangeSigin}
                      autoComplete="email"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={value.password}
                      name="password"
                      onChange={onChangeSigin}
                      autoComplete="current-password"
                      required
                    />
                    <div className="form-check mt-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <button
                      className="btn mt-3"
                      type="submit"
                      disabled={!value.email || !value.password}
                    >
                      Login
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "register" && (
                <div className="tab-pane fade show active" role="tabpanel">
                  <form onSubmit={onSubmitRegister}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Name"
                      name="username"
                      value={regValue.username}
                      onChange={onChangeRegister}
                      required
                    />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={regValue.email}
                      onChange={onChangeRegister}
                      required
                    />
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      name="number"
                      value={regValue.number}
                      onChange={onChangeRegister}
                      required
                      pattern="[0-9]{10,15}"
                      title="Enter valid mobile number"
                    />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={regValue.password}
                      onChange={onChangeRegister}
                      required
                      minLength={8}
                    />
                    <button className="btn" type="submit">
                      Register
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarberRegister;
