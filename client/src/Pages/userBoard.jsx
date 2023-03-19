import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, Link as LinkTo } from "react-router-dom";
import Navbar from "../Components/NavigationBar";
import {Typography, Button, Link} from '@mui/material';
import './Styles/userBoard.css'

const RecordContext =  createContext();

function UserBoard() {
    const navigate = useNavigate(); 
    const [result, setResult] = useState();
    useEffect(() => {
        handleLoading();
    }, []);
    const email = localStorage.getItem('resultemail');
    //console.log(email);
    async function handleLoading() {
        const response = await fetch('http://localhost:5000/api/getRecord', {
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
    
    return (
            <RecordContext.Provider value={result}>
            <div className="dashboard-container" style={{maxWidth: '1400px'}}>
                <Navbar />
                <SideNavbar navigate={navigate}/>
                <WelcomeCard />
                <TakeTest navigate={navigate}/>
                <Results />
                <Suggestion /> 
            </div>
            </RecordContext.Provider>
    )
}


/*function Header() {

    return (
        <div className="header">
            <h1>header</h1>
        </div>
    )
}*/
export function SideNavbar({navigate}) {
    const isAdmin = localStorage.getItem("isAdmin");
    return (
            <div className="nav">
            <LinkTo to="/" className="link">Home</LinkTo>
            <LinkTo to="/takeTest" className="link">Take Test</LinkTo>
            <LinkTo to="/userProfile" className="link">User Profile</LinkTo>
            <a href="#" aria-disabled="true" className="link disabled">Study Material</a>
            <a href="#" aria-disabled="true" className="link disabled">Exams Info</a>
            {isAdmin && <Link className="link" onClick={() => navigate('../addQuestion', {replace: true})} style={{textDecoration: 'none', cursor: 'pointer'}}>Add Questions</Link>}
        </div>
    )
}
function WelcomeCard() {
    const result = useContext(RecordContext);
    const email = localStorage.getItem('resultemail');
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
        <div className="welcome wrapper">
            <div className="welcome-container container not-wrapper">
            <Typography variant="h6">Hello There,</Typography>
            <Typography variant="h4">{email.split('@')[0]}</Typography>
            <Typography variant="h6">Wishing you a productive day ahead!</Typography>
            <hr width="90%" />
            {result && <UserDetails result={result} sTopic={sTopic} wTopic={wTopic}/>}
            </div>
        </div>
    )
}
function UserDetails({result, sTopic, wTopic}) {

    return (
        <div className="details">
            <Typography varient="h4">Total No of tests taken: {result.length}</Typography>
            <Typography varient="h4">Overall Strong Topic: {sTopic}</Typography>
            <Typography varient="h4">Overall Weak Topic: {wTopic}</Typography>
        </div>
    )
}
function TakeTest({navigate}) {
    return (
        <div className="takeTest wrapper">
            <div className="test-container container not-wrapper">
                <Typography variant="h4">Let'start practice</Typography>
                <Typography varient="h5">Available Test: MHA MCA CET</Typography>
                <Button variant="contained" onClick={() => navigate('../takeTest', {replace: true})}>Take a test &rarr;</Button>
            </div>
        </div>
    )
}
function Results() {
    const result = useContext(RecordContext);
    result ? result.splice(4, result.length) : "";
    return(
        <div className="results wrapper">
            <div className="result-container container not-wrapper">
            <Typography variant="h5" style={{marginBottom: '10px'}}>User Record📖</Typography>
                {
                    !result ?  
                        <Typography variant="body1" style={{textAlign: 'center',position: 'relative', bottom: '50px'}}>You haven't appeared for any test yet</Typography> 
                    : 
                        <PrintLast3Records data={result} />
                }
            </div>
        </div>
    )
}

export function PrintLast3Records({data}) {
    return (
        <div>
            {
                data.map((item, id) => {
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
}

function Suggestion() {
    return (
        <div className="suggestion wrapper">
          <div className="suggestion-container container not-wrapper">
          <Typography variant="h5">Must Checkout 🔥</Typography>
          <div className="s-article">
            <img src="https://cetcell.net/PGD_2020/Images/logo_heder.png" className="article-img" />
            <Link href="https://collegedunia.com/exams/mah-mca-cet/exam-pattern" target="_blank" rel="noreferrer"  variant="h6">MAH MCA CET 2023 Exam Pattern: Syllabus: Collegedunia</Link>
          </div>
          <div className="s-article">
            <img src="https://cetcell.net/PGD_2020/Images/logo_heder.png" className="article-img" />
            <Link href="https://collegedunia.com/exams/mah-mca-cet/cutoff" target="_blank" rel="noreferrer" variant="h6">MAH MCA CET 2023 Exam Cuttoffs: Collegedunia</Link>
          </div>
          </div>
        </div>
    )
}

export function mostFrequent(arr) {
    // Create a dictionary to store the count of each item
    let count_dict = {};
  
    // Iterate through each element in the array
    for (let row of arr) {
      for (let item of row) {
        // Skip the iteration if the item is Maths, Computer or Logical Reasoning
        if (item === "Maths" || item === "Computer" || item === "Logical Reasoning" || item === "English") {
          continue;
        }
        // If the item is not skipped, increment its count in the dictionary
        if (item in count_dict) {
          count_dict[item] += 1;
        } else {
          count_dict[item] = 1;
        }
      }
    }
  
    // Find the item with the highest count in the dictionary
    let max_count = 0;
    let max_item = null;
    for (let item in count_dict) {
      if (count_dict[item] > max_count) {
        max_count = count_dict[item];
        max_item = item;
      }
    }
  
    return max_item;
  }
export default UserBoard;