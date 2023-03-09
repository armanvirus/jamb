import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import Quiz from './pages/Quiz';
import Info from "./pages/Info";
import Construction from "./pages/Construction";

global.score = [];

function App() {
  return (
    <Router>
    <div className="App">
    <Routes>
     <Route element={<Login/>} path="/login"/>
     <Route element={<Register/>} path="register"/>
     <Route element={<Quiz/>} path="/quiz/:category"/>
     <Route element={<Courses/>} path="/course"/>
     <Route element={<Info/>} path="/info"/>
     <Route element={<Construction/>} path="/construction"/>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
