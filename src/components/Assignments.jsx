import { useState } from "react";

const questions = {
  1: [
    {
      question: "What is MongoDB?",
      options: ["Database", "Language", "Framework", "Library"],
      answer: "Database",
    },
    {
      question: "Which command is used to start MongoDB?",
      options: ["mongod", "mongo", "startdb", "runmongo"],
      answer: "mongod",
    },
    {
      question: "Which data format does MongoDB use?",
      options: ["XML", "JSON", "CSV", "YAML"],
      answer: "JSON",
    },
    {
      question: "What is the default port for MongoDB?",
      options: ["27017", "8080", "3306", "5432"],
      answer: "27017",
    },
    {
      question: "Which command is used to create a new database in MongoDB?",
      options: ["use", "create", "newdb", "makedb"],
      answer: "use",
    },
    {
      question: "Which method is used to insert a document in MongoDB?",
      options: ["insertOne", "add", "put", "insertDoc"],
      answer: "insertOne",
    },
  ],
  2: [
    {
      question: "What is Flask?",
      options: ["Database", "Language", "Framework", "Library"],
      answer: "Framework",
    },
    {
      question: "Which language is Flask written in?",
      options: ["JavaScript", "Python", "Java", "C#"],
      answer: "Python",
    },
    {
      question: "Which command is used to install Flask?",
      options: [
        "npm install flask",
        "pip install flask",
        "gem install flask",
        "apt-get install flask",
      ],
      answer: "pip install flask",
    },
    {
      question: "What is the default port for Flask?",
      options: ["5000", "8080", "3306", "5432"],
      answer: "5000",
    },
    {
      question: "Which method is used to define a route in Flask?",
      options: ["@route", "@app.route", "@path", "@url"],
      answer: "@app.route",
    },
    {
      question: "Which command is used to run a Flask application?",
      options: ["flask run", "python run", "start flask", "run flask"],
      answer: "flask run",
    },
  ],
  3: [
    {
      question: "What is Git?",
      options: ["Database", "Language", "Framework", "Version Control System"],
      answer: "Version Control System",
    },
    {
      question: "Which command initializes a new Git repository?",
      options: ["git init", "git start", "git new", "git create"],
      answer: "git init",
    },
    {
      question: "Which command is used to stage changes in Git?",
      options: ["git add", "git stage", "git commit", "git push"],
      answer: "git add",
    },
    {
      question: "Which command is used to commit changes in Git?",
      options: ["git commit", "git save", "git push", "git stage"],
      answer: "git commit",
    },
    {
      question: "Which command is used to push changes to a remote repository?",
      options: ["git push", "git upload", "git send", "git transfer"],
      answer: "git push",
    },
    {
      question: "Which command is used to clone a repository?",
      options: ["git clone", "git copy", "git download", "git fetch"],
      answer: "git clone",
    },
  ],
};

function Assignments({ viewAssignments, setViewAssignments, course_id, user }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [highestScore, setHighestScore] = useState(null);

  const handleBack = () => {
    setViewAssignments(false);
  };

  const handleChange = (question, option) => {
    setAnswers({ ...answers, [question]: option });
  };

  const handleSubmit = async () => {
    const correctAnswers = questions[course_id].filter(
      (q) => answers[q.question] === q.answer
    ).length;

    try {
      const response = await fetch(
        `http://127.0.0.1:5500/submit_assignment/${course_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user.id, score: correctAnswers }),
        }
      );
      const result = await response.json();
      setScore(correctAnswers);
      setHighestScore(result.highest);
      alert(
        `Current Score: ${correctAnswers}, Highest Score: ${result.highest}. ${
          correctAnswers >= result.highest ? "Improvement!" : "No Improvement."
        }`
      );
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      <button
        onClick={handleBack}
        className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg m-4"
      >
        Back
      </button>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Assignment Questions
        </h2>
        {questions[course_id].map((q, index) => (
          <div key={index} className="mb-6">
            <p className="text-lg font-medium text-gray-700 mb-2">
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option, i) => (
                <label
                  key={i}
                  className="block text-gray-600 p-2 bg-gray-100 rounded-lg shadow-md"
                >
                  <input
                    type="radio"
                    name={q.question}
                    value={option}
                    checked={answers[q.question] === option}
                    onChange={() => handleChange(q.question, option)}
                    className="mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Assignments;
