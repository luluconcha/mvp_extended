import SheetViewer from "./pages/SheetViewer";
import CreateCharacter from "./pages/CreateCharacter";
import CreateStoryPoint from "./pages/CreateStoryPoint";
import ViewStoryPoint from "./components/ViewStoryPoint";
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
import {useState} from 'react'


function App() {

  
  return (
    <AuthProvider>
          
      <div className="App container p-5">
      <header>
        <h1>CottonCandyLand</h1>
        <NavBar />
        </header>  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/storypoints" element={<StoryMap />} />
          <Route path="/storypoints/:id" element={<ViewStoryPoint />} />
          <Route path="/private" element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }
          />
             <Route path="/createcharacter" element={
              <RequireAuth>
                <CreateCharacter />
              </RequireAuth>
            }
          />
          <Route path="/createstorypoint" element={
              <RequireAuth>
                <CreateStoryPoint />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  
  );
}

export default App;
