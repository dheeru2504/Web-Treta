import { useState } from "react";

import "./output.css";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuStyles = {
    transition: "all 0.5s ease-out", // Smooth transition for opacity and visibility
    opacity: isMenuOpen ? "1" : "0", // Control opacity based on menu state
    visibility: isMenuOpen ? "visible" : "hidden", // Control visibility based on menu state
    maxHeight: isMenuOpen ? "100vh" : "0", // Expand to max height when open, collapse when closed
    overflow: "hidden", // Prevents content from spilling during transition
    display: isMenuOpen ? "flex" : "none", // Use flex display when menu is open
    flexDirection: "column", // Ensure items are in a row
    // justifyContent: "start",

    // padding: "0.5rem",
  };
  return (
    <>
      <div className="border-b-2 border-gray-600 bg-gray-950 ">
        <div className="flex md:flex-row  justify-between pt-12 pb-12">
          <div className="flex px-5 align-baseline">
            <img
              src="https://www.dolphinemulator.org/static/img/logo.webp"
              alt="logo"
              width={50}
              height={50}
            />
            <h1 className="text-white text-3xl px-2 font-bold ">
              Dolphin Emulator
            </h1>
          </div>

          {/* <div className="flex"> */}
          <div
            // style={isMenuOpen ? menuStyles : {}}
            className="
       
             md:ml-auto  md:mr-auto   items-center  hidden   font-bold  lg:flex"
          >
            <p className="text-gray-300 mx-10 text-lg">Home</p>
            <p className="text-gray-300 mx-10 text-lg">How to Use</p>
            <p className="text-gray-300 mx-10 text-lg">About</p>
          </div>
          <div className="md:hidden"></div>

          <button
            className=" inline-flex p-3 mx-4 hover:bg-gray-300 rounded lg:hidden ml-auto text-white hover:text-white outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <div
            style={isMenuOpen ? menuStyles : {}}
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:ml-auto  md:mr-auto   items-center  font-bold `}
          >
            <p className="text-gray-300 mx-10 text-lg">Home</p>
            <p className="text-gray-300 mx-10 text-lg">How to Use</p>
            <p className="text-gray-300 mx-10 text-lg">About</p>
          </div>
        </div>
      </div>

      <div className="flex m-5 flex-col md:flex-row">
        <div className="">
          <p className="text-gray-300 text-2xl pt-10 pb-5">
            Enjoy the best emulator of all times
          </p>
          <h1 className="text-white font-semibold text-7xl">Welcome to</h1>
          <h1 className="text-white font-semibold text-7xl">
            Dolphin Emulator
          </h1>
          <p className="text-gray-300 text-xl pt-10 pb-10">
            Dolphin is an open-source platform projectwhich means it's available
            on all kinds of hardware more recent versions only support 64-bit
            Windows, Mac, OS-10, Linux on Android Operating Systems.
          </p>

          <button
            style={{ backgroundColor: "rgb(79 70 229" }}
            className="text-white  p-3 rounded-md  text-lg mt-4 bg-pur-700"
          >
            Download Now
          </button>
        </div>
        <div>
          <img
            src="https://www.dolphinemulator.org/static/img/dolphin-header.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default App;
