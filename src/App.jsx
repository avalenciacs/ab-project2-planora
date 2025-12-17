import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import PlanDetails from "./pages/PlanDetails";
import EditPlan from "./pages/EditPlan";
import About from "./pages/About";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <NavBar search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/create" element={<CreatePlan />} />
        <Route path="/plans/:id" element={<PlanDetails />} />
        <Route path="/plans/:id/edit" element={<EditPlan />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
