import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavigationBar";
import {Button} from '@mui/material'
import './Styles/LandingPage.css';
import heroIllu from '../assets/hero-illustration.png';
import testImg from '../assets/test.webp'
import studentImg from '../assets/student.jpeg';
import reviewUser from '../assets/user8.jpg';
import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';
import user3 from '../assets/user3.jpg';
import user4 from '../assets/user4.jpg';
import user5 from '../assets/user5.jpg';
import user6 from '../assets/user6.jpg';
import user7 from '../assets/user7.jpg';
import user8 from '../assets/user8.jpg';
import user9 from '../assets/user9.jpg';
import user10 from '../assets/user10.jpg';
import user11 from '../assets/user11.jpg';
import user12 from '../assets/user12.jpg';
import { useNavigate } from "react-router-dom";




function LandingPage() {

    return (
        <div className="landingPage">
           <Navbar />
            <div className="hero-page-container">
                <Hero />  
                <Features />
                <Review />
                <Community />
            </div>
        </div>
    )
}

function Hero() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    useEffect(() => {
        setUser(() => localStorage.getItem('resultemail'))
    });
    
    return (
        <div className="hero-container">
            <div className="hero-info-text">
                <h3 className="hero-title">TestPrepPro</h3>
                <h1 className="hero-main-title">Get prepared for success with TestPrepPro <span className="dot">.</span></h1>
                <p className="hero-info">
                    TestPrepPro provides students with all the tools they need to succeed on their exams. With our mock tests, detailed analysis and personalized advice, we can help you ace your exams
                </p>
                <div className="hero-action-bar">
                    <h3 className="hero-title">Let's Get Started</h3>
                    <div className="action-btn-container">
                        {   user &&
                            /*<Button variant="contained" onClick={() => navigate('../login', {replace: true})} color="info">Login</Button>*/
                            <Button variant="contained" onClick={() => navigate('../home', {replace: true})} color="info">Dashboard</Button>
                        }
                        {
                            !user &&
                            <Button variant="contained" onClick={() => navigate('../login', {replace: true})} color="info">Login</Button>
                        }
                        <Button variant="outlined" onClick={() => navigate('../signup', {replace: true})} color="info">Sign-up</Button>
                    </div>
                </div>
            </div>
            <div className="hero-illu">
                <img src={heroIllu} alt="hero-illu" />
            </div>
        </div>
    )
}

function Features() {

    return (
        <div className="features-container hero-container">
           <div className="feature">
                <div className="feature-illu">
                    <img src={testImg} className="feature-img" alt="Mock test" />
                </div>
                <div className="feature-info">
                    <h3 className="feature-heading">Free mock tests&nbsp; <span className="dot">.</span></h3>
                    <p className="feature-text hero-info">Get unlimited access to practice tests and study materials. Our detailed analysis provides you with a comprehensive overview of your progress.</p>
                </div>
           </div>
           <div className="feature">
                <div className="feature-info">
                    <h3 className="feature-heading">Track your progress&nbsp; <span className="dot">.</span></h3>
                    <p className="feature-text hero-info">Stay motivated and track your progress with our intuitive analysis dashboard. Get personalized advice to reach your goals quickly and efficiently.</p>
                </div>
                <div className="feature-illu">
                    <img src={studentImg} className="feature-img" alt="students" />
                </div>
           </div>
        </div>
    )
}

function Review() {

    return (
        <div className="review-container">
            <div className="review">
                <h1>"After using TestPrepPro, I am now more confident in my academic performance. and I got my favourite college"</h1>
                <div className="review-user">
                    <img src={reviewUser} className="review-icon" alt="user" />
                    <p>Jabya Sarpotdar</p>
                </div>
            </div>
        </div>
    )
}

function Community() {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("isAdmin");

    return (
        <div className="community-container">
            <div className="community-box">
                <div className="users-container">
                    <img src={user1} className="review-icon" alt="user1" />
                    <img src={user2} className="review-icon" alt="user2" />
                    <img src={user3} className="review-icon" alt="user3" />
                    <img src={user4} className="review-icon" alt="user4" />
                    <img src={user5} className="review-icon" alt="user5" />
                    <img src={user6} className="review-icon" alt="user6" />
                    <img src={user7} className="review-icon" alt="user7" />
                    <img src={user8} className="review-icon" alt="user8" />
                    <img src={user9} className="review-icon" alt="user9" />
                    <img src={user10} className="review-icon" alt="user10" />
                    <img src={user11} className="review-icon" alt="user11" />
                    <img src={user12} className="review-icon" alt="user12" />
                </div>
                <h1 className="community-heading">Join our community of fans that love ExamPrep &nbsp;<span className="dot">.</span></h1>
                <div className="btn-container">
                    <Button variant="contained" onClick={() => navigate('../login', {replace: true})} color="info">Login</Button>
                    <Button variant="outlined" onClick={() => navigate('../signup', {replace: true})} color="info">Sign-up</Button>
                </div>
                <div className="btn-container btn-container-2">
                    <Button variant="contained"  onClick={() => navigate('../adminLogin', {replace: true})} color="info">Admin-login</Button>
                    {isAdmin && <Button variant="outlined"  onClick={() => navigate('../adminSignup', {replace: true})} color="info">Admin Signup</Button>}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;