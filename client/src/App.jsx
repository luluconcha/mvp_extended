import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SheetViewer from "./pages/SheetViewer";
import SheetCreator from "./pages/SheetCreator";
import HomePage from "./components/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sheetCreator" element={<SheetCreator />} />
        <Route path="/sheetViewer/:characterId" element={<SheetViewer />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
