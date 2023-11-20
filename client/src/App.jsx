import SheetViewer from "./pages/SheetViewer";
import CreateCharacter from "./pages/CreateCharacter";
import CreateStoryPoint from "./pages/CreateStoryPoint";
import HomePage from "./components/HomePage";
import StoryMap from "./pages/StoryMap.jsx";
import UserPage from "./pages/UserPage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {Route, Routes, Link} from 'react-router-dom'
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";
import AuthProvider from "./components/AuthProvider";
import Login from "./components/Login.jsx";



function App() {
  return (
    <AuthProvider>
          
      <div className="App container p-5">
      <header><NavBar />
        </header>  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/storypoints" element={<StoryMap />} />
          <Route
            path="/private"
            element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }
          
          />
        </Routes>
      </div>
    </AuthProvider>
  
  );
}

export default App;
