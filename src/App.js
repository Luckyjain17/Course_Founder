import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "./component/Course";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Course />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
