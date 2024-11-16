import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Registered from "./Registered";

function Courses({ user }) {
  const handleEnroll = async (courseId) => {
    const response = await fetch(
      `http://127.0.0.1:5500/register_course/${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      }
    );

    if (response.ok) {
      alert("Successfully registered");
    } else {
      alert("Registration failed");
    }
  };

  const handleEnrolled = async () => {
    setView(true);
  };

  const [view, setView] = useState(false);

  return (
    <>
      {!view ? (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col justify-center items-center p-6">
          <h1 className="text-5xl font-extrabold text-white mb-10">
            Available Courses
          </h1>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 max-w-xs text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">MongoDB</h3>
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => handleEnroll(1)}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg mx-2 hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Enroll Now
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 max-w-xs text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Flask</h3>
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => handleEnroll(2)}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg mx-2 hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Enroll Now
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg flex-1 max-w-xs text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Git</h3>
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => handleEnroll(3)}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg mx-2 hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleEnrolled()}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg m-4"
          >
            View Enrolled Courses
          </button>
        </div>
      ) : (
        <Registered user={user} view={view} setView={setView} />
      )}
    </>
  );
}

export default Courses;
