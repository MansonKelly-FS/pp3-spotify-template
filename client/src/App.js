import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Nav from "./components/Nav";

import Home from "./pages/Home";
import Login from "./pages/Login"; 

function App() {
  return (
    <main className="wrapper">
      <Nav />
      <section>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
