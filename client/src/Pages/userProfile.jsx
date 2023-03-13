import React, {useState, useEffect} from "react";
import {Typography, Button, Link} from '@mui/material';
import Navbar from "../Components/NavigationBar";
import { SideNavbar, mostFrequent, PrintLast3Records } from "./userBoard";
import './Styles/userProfile.css';


const UserProfile = () => {
    const [result, setResult] = useState();
    useEffect(() => {
        handleLoading();
    }, []);
    const email = localStorage.getItem('resultemail');
    //console.log(email);
    async function handleLoading() {
        const response = await fetch('http://localhost:3000/api/getRecord', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        }).then(res => res.json());
        if (response.status === 'ok') {
           setResult(() => response.data);
          // console.log(result);
        }
    }
    let resultTags;

    function findMaxItem(typeTag) {
    if (result) {

        resultTags = result.map(item => {
            let rt = [];
            //console.log(item[typeTag]);
            for (let  i = 0; i < item[typeTag].length; i++) {
                rt.push(...item[typeTag][i]);
            }
            return rt;
        })
        resultTags = mostFrequent(resultTags);
        return resultTags;
    }
    }
    const sTopic = findMaxItem('rightTags');
    const wTopic = findMaxItem('wrongTags');
    return (
        <div className="profile-container">
            <Navbar />

            <SideNavbar />
            <div className="user-container">
                <div className="user">
                <img style={{width: '150px', height: 'auto', borderRadius: '50%'}} src="https://www.kindpng.com/picc/m/150-1503949_computer-icons-user-profile-male-profile-icon-png.png" alt={email} />
                <Typography variant="h6" color="gray">{email}</Typography>
                </div>
                {
                result
                &&
                <div className="user-stat-container">
                    
                    <div className="user-stats">
                    <Typography variant="h5">User Stats</Typography>
                        <div>
                            <span className="material-icons">quiz</span>
                            <Typography variant="h6">Test taken until now: {result.length}</Typography>
                        </div>
                        <div>
                            <span className="material-icons">task_alt</span>
                            <Typography variant="h6">Overall Strong Topic: {sTopic}</Typography>
                        </div>
                        <div>
                            <span className="material-icons">close</span>
                            <Typography variant="h6">Overall Strong Topic: {wTopic}</Typography>
                        </div>
                    </div>
                <div className="results wrapper">
                    <div className="result-container container not-wrapper">
                        <Typography variant="h5" style={{position: 'relative', bottom: '25px'}}>User Record📖</Typography>
                            {
                                !result ?  
                            <Typography variant="body1" style={{textAlign: 'center',position: 'relative', bottom: '50px'}}>You haven't appeared for any test yet</Typography> 
                            : 
                            <PrintLast3Records data={result} />
                            }
                    </div>
                </div>
                </div>
                }
            </div>
        </div>
    )
}

/*function PrintLast3Records({result}) {
    return (
        <div>
            {
                result.map((item, id) => {
                    return <div className="lastrecord" key={id}>
                        <Typography variant="body1">
                            {
                                item.subjects.map(item => `${item }`)
                            }
                        </Typography>
                        <Typography variant="body1">
                            {
                                `${item.userScore}/${item.totalScore}`
                            }
                        </Typography>
                        <Typography variant="body1">
                            {
                                item.dateTime
                            }
                        </Typography>
                    </div>
                })
            }
        </div>
    )
}*/


export default UserProfile;