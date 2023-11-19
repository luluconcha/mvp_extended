
import SheetViewer from "./pages/SheetViewer";
import SheetCreator from "./pages/SheetCreator";
import HomePage from "./components/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {Route, Routes, Link} from 'react-router-dom'

function App() {
  return (
      <Routes>
        <Route path="/sheetCreator" element={<SheetCreator />} />
        <Route path="/sheetViewer/:characterId" element={<SheetViewer />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
  );
}

export default App;
