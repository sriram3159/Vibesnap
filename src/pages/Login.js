import React from "react";
import { auth } from "../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ROUTES } from "../constants/routes";
import LocalStorage from "../utils/storageUtils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../asset/images/images";

const Login = () => {
  const navigate = useNavigate();
  const signin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
        LocalStorage.login(result.user);
        navigate(ROUTES.FEED);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        alert(error.message);
      });
  };

  return (
    <div className="h-screen  md:overflow-hidden">
      <div className="">
        <div className="md:h-screen flex-col md:flex md:flex-row justify-around gap-x-10  items-center mx-auto max-w-7xl  sm:static sm:px-6 lg:px-8 overflow-hidden">
          <div>
            <div className="md:mt-10  ">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none  lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-center space-x-2 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-2 lg:gap-y-8">
                      <div className="w-52 h-64 md:h-64 md:w-44 overflow-hidden lg:rounded-lg sm:opacity-0 lg:opacity-100">
                        <img alt="" src={IMAGES.LOGIN_IMG_1} className="size-full object-cover" />
                      </div>
                      <div className="w-52 h-64 md:h-64 md:w-44 overflow-hidden lg:rounded-lg">
                        <img alt="" src={IMAGES.LOGIN_IMG_2} className="size-full object-cover" />
                      </div>
                      <div className="w-52 h-64 md:h-64 md:w-44 overflow-hidden lg:rounded-lg">
                        <img alt="" src={IMAGES.LOGIN_IMG_3} className="size-full object-cover" />
                      </div>
                    </div>
                    <div className="relative bottom-28 grid shrink-0 grid-cols-1 gap-y-2 lg:gap-y-8">
                      <div className="w-52 h-64 md:h-64 md:w-44  overflow-hidden lg:rounded-lg">
                        <img alt="" src={IMAGES.LOGIN_IMG_4} className="size-full object-cover" />
                      </div>
                      <div className="w-52 h-64 md:h-64 md:w-44 overflow-hidden lg:rounded-lg">
                        <img alt="" src={IMAGES.LOGIN_IMG_5} className="size-full object-cover" />
                      </div>
                      <div className="w-52 h-64 md:h-64 md:w-44 overflow-hidden lg:rounded-lg">
                        <img alt="" src={IMAGES.LOGIN_IMG_8} className="size-full object-cover" />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-2 lg:gap-y-8">
                      <div className="w-52 h-64 md:h-64 md:w-44 overflow-hidden lg:rounded-lg">
                        <img alt="" src={IMAGES.LOGIN_IMG_7} className="size-full object-cover" />
                      </div>
                      <div className="w-52 h-64 md:h-64 md:w-44 overflow-hidden lg:rounded-lg">
                        <img alt="" src={IMAGES.LOGIN_IMG_6} className="size-full object-cover" />
                      </div>
                      <div className="w-52 h-64 md:h-64 md:w-44 overflow-hidden lg:rounded-lg">
                        <img alt="" src={IMAGES.LOGIN_IMG_9} className="size-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white relative bottom-28 rounded-t-[63px] pt-9  flex flex-col items-center">
            <div className="flex gap-x-1">
              <img src={IMAGES.LOGO} className="w-14 object-cover " />
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-6xl">Vibesnap</h1>
            </div>
            <p className="mt-2 md:mt-4 text-base md:text-xl text-black font-normal">
              Moments That Matter, Shared Forever.
            </p>
            <div
              className="bg-[#292929] flex justify-center items-center w-max gap-x-3.5 py-4 px-5 rounded-full mt-7 md:mt-10 cursor-pointer"
              onClick={signin}
            >
              <img src={IMAGES.GOOGLE} className="size-10" />
              <span className="whitespace-nowrap font-bold text-base text-white">Continue with Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
