import React, { useEffect, useState } from "react";
import Assignments from "./Assignments";

function Registered({ user, view, setView }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5500/get_registered_courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    })
      .then((response) => response.json())
      .then((data) => setCourses(data.registered_courses))
      .catch((error) => console.error("Error fetching courses:", error));
  }, [user.id]);

  const getCourseName = (courseId) => {
    switch (courseId) {
      case 1:
        return "MongoDB";
      case 2:
        return "Flask";
      case 3:
        return "Git and GitHub";
      default:
        return "Unknown Course";
    }
  };

  const getCourseUrl = (courseId) => {
    switch (courseId) {
      case 1:
        return "http://127.0.0.1:5500/static/mongodb.html";
      case 2:
        return "http://127.0.0.1:5500/static/flask.html";
      case 3:
        return "http://127.0.0.1:5500/static/gitandgithub.html";
      default:
        return "#";
    }
  };

  const handleBack = () => {
    setView(false);
  };

  const [assignment, setAssignment] = useState(null);
  const [viewAssignments, setViewAssignments] = useState(false);

  return (
    <>
      {!viewAssignments ? (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col justify-center items-center p-6">
          <button
            onClick={() => handleBack()}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg m-4"
          >
            Back
          </button>

          <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
              Registered Courses
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                    {getCourseName(course.course_id)}
                  </h3>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        setAssignment(course.course_id);
                        setViewAssignments(true);
                      }}
                      className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                      View Assignments
                    </button>
                    <a
                      href={getCourseUrl(course.course_id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                      View Course Content
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Assignments
          user={user}
          viewAssignments={viewAssignments}
          setViewAssignments={setViewAssignments}
          course_id={assignment}
        />
      )}
    </>
  );
}

export default Registered;
