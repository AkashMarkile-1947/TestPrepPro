import React ,{ useState, createContext} from "react";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import ChangePasswordOne from "./Pages/changeP1";
import ChangePasswordTwo from "./Pages/changeP2";
import Navbar from "./Components/NavigationBar";
//import UserRecord from "./Pages/UserRecord";
import { Routes, Route, useNavigate, Link} from 'react-router-dom';
import './App.css';




export const SomeContext = createContext(null)


/*/**/ 
function App() {

    const navigate = useNavigate(); 
    return (
        <div className="user-container">
            <div className="dashboard-container">
                <Header />
                <SideNavbar />
                <WelcomeCard />
                <TakeTest />
                <Results />
                <Suggestion />
            </div>
        </div>
    )
}


function Header() {

    return (
        <div className="header">
            <h1>header</h1>
        </div>
    )
}
function SideNavbar() {
    return (
            <div className="nav">
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
            <a href="#">Take Test</a>
            <a href="#"><span className="material-symbols-rounded"></span> User Profile</a>
            <a href="#">Study Material</a>
            <a href="#">Exams Info</a>
        </div>
    )
}
function WelcomeCard() {
    const email = localStorage.getItem('resultemail');
    return (
        <div className="welcome">
            <p>Hello There</p>
            <h1>{email ? `${email.split('@')[0]}` : "UserName"}</h1>
            <h3>Wishing you a productive day ahead!</h3>
        </div>
    )
}
function TakeTest() {
    return (
        <div className="takeTest">
            <h1>takeTest</h1>
        </div>
    )
}
function Results() {
    return(
        <div className="results">
            <h1>results</h1>
        </div>
    )
}

function Suggestion() {
    return (
        <div className="suggestion">
            
        </div>
    )
}

export default App;