import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Courses from "./components/Courses";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  return (
    <div>
      {user ? <Courses user={user} /> : <Login user={user} setUser={setUser} />}
    </div>
  );
}

export default App;
