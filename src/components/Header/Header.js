import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";
import BarberRegister from "../Pages/BarberRegister";
import store from "../../Redux/reduxStore";
import { addAuth } from "../../Redux/Slices/AuthSlice";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { professionalLogOut } from "../../Redux/Slices/professionalRedux";
import { userLogout } from "../../Redux/Slices/UserRedux";
// import { useState } from "react";

const Header = ({ isUser, isPro }) => {
  const [messageAPi, context] = message.useMessage();
  const sendMessage = (varient, textMessage) => {
    messageAPi.open({
      type: varient,
      content: textMessage,
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandle = () => {
    dispatch(userLogout());
    navigate("/");
    setTimeout(() => {
      let varient = "success";
      let textMessage = "User Logout !!!";
      sendMessage(varient, textMessage);
    }, 1200);
    store.dispatch(addAuth.deleteState(""));
  };
  const ProfessionalLogOUt = () => {
    dispatch(professionalLogOut());
    navigate("/");
    setTimeout(() => {
      let varient = "success";
      let textMessage = "Professional Logout !!!";
      sendMessage(varient, textMessage);
    }, 1200);
    store.dispatch(addAuth.deleteState(""));
  };
  const location = useLocation();
  const hideHeaderOnPath = [
    "/dashboard",
    "/dashboard/schedules-professional",
    "/dashboard/add-services",
    "/login",
  ];
  if (hideHeaderOnPath.includes(location.pathname)) {
    return <></>;
  }
  return (
    <div>
      <div>
        {context}
        <div className="bg-black text-white py-2">
          <div className="d-flex justify-content-between container-fluid px-sm-5 align-items-center">
 <button
                      to={"/professional-register"}
                      className="me-5 text-decoration-underline border-0 fw-bold bg-black text-warning"
                      data-mdb-toggle="modal"
                      data-mdb-target="#exampleModal"
                    >
                      Register as Professional
                    </button>
          </div>
        </div>
      </div>
      {/* Professional Registration Modal */}
      <BarberRegister />
    </div>
  );
};

export default Header;