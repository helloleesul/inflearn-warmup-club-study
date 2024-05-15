import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const profilePictureUrl = localStorage.getItem("profilePictureUrl");
    if (profilePictureUrl) {
      navigate("/main");
    }
  }, [navigate]);

  return (
    <div className="bg-[url('assets/landing-bg.jpeg')] min-h-screen bg-center bg-no-repeat flex justify-center items-center">
      <div className="text-white flex flex-col gap-8">
        <img src="/image/another_logo_big.svg" alt="logo" width={600} />
        <button className="bg-blue-700 p-4 rounded hover:bg-blue-600 transition-all duration-200">
          GET THE DISNEY BUNDLE
        </button>
        <span className=" text-center text-xs text-gray-300">
          Stream now.{" "}
          <Link to="" className="underline font-medium text-white">
            Terms Apply
          </Link>
        </span>
        <img src="/image/another_logo_small.png" alt="logo" width={600} />
        <Link to="" className="text-center underline font-medium">
          Sign up for Disney+ only
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
