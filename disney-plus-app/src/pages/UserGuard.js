import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserGuard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const profilePictureUrl = localStorage.getItem("profilePictureUrl");
    if (!profilePictureUrl) {
      navigate("/");
    }
  }, [navigate]);
  return <Outlet />;
};

export default UserGuard;
