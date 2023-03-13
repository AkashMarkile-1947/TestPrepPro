import React ,{ useState, useContext, createContext} from "react";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import ChangePasswordOne from "./Pages/changeP1";
import ChangePasswordTwo from "./Pages/changeP2";
import { Routes, Route} from 'react-router-dom';
import TakeTest from "./Pages/takeTest";
import Error from "./Pages/Error";
import Test from "./Pages/Test";
import Analysis from "./Pages/Analysis";
import App from "./App";
//import UserRecord from "./Pages/UserRecord";
import UserBoard from "./Pages/userBoard";
import UserProfile from "./Pages/userProfile";
import LandingPage from "./Pages/LandingPage";



//<Route path="/userRecord" exact element={UserRecord} />}
export const SomeContext = createContext(null)

function View() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<UserBoard />}/>
            <Route path="/signup" exact element={<SignUp />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/ChangePasswordOne" exact element={<ChangePasswordOne />} />
            <Route path="/ChangePasswordTwo" exact element={<ChangePasswordTwo />} />
            <Route path="/takeTest" exact element={<TakeTest />} />
            <Route path="/Test" exact element={<Test />} />
            <Route path="/Analysis" exact element={<Analysis />} />
            <Route path="/userProfile" exact element={<UserProfile />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}



export default View;