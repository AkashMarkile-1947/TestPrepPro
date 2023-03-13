import React, { useEffect, createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavigationBar";
import {Typography, Button} from '@mui/material';
import '../Pages/Styles/Test.css';
//mport { exportObj } from "./takeTest";

const DataContext = createContext(null);
export let TestData = {
    wrongAns: [],
    rightAns: [],
    rightTags: [],
    wrongTags: []
};



function Test() {
    const exportObj = JSON.parse(sessionStorage.getItem('exportObj'));
    const [testTime, setTestTime] = useState(60);
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    let [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        if (!exportObj) {
            setTimeout(() => navigate('../ahdbawdb', {replace: true}), 1);
        }
    });

    function updateScore() {
        setScore(prev => prev + 1)
    }

    let time = 0;
    let calculate = exportObj.data.map(item  => { 
        time += item.length;
    });



    return (
        <DataContext.Provider value={{score, setTotalScore, totalScore, navigate}}>
        <div className="container-T">
            <Navbar />
            <div className="testheader" style={{width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="body1">Score: {score}/{totalScore}</Typography>
                <Typography variant="h4">MHA MCA CET</Typography>
                <Typography variant="body1">Remaning time: {time}</Typography>
            </div>
            <div className="testsidenav">
                <Typography variant="h6">Subjects: {exportObj.subject.map(item => `${item} ` )}</Typography>
            </div>
            <TestModule eObj={exportObj} updateScore={updateScore} />
            <div className="footertestnav">
            </div>
        </div>
        </DataContext.Provider>
    )
}



function TestModule({eObj, updateScore}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    let {score, setTotalScore, totalScore, navigate} = useContext(DataContext);


    let data = eObj.data;
    let newData = [];
    data.map(item => newData.push(...item));
    setTotalScore(() => newData.length);

    //console.log(newData);

    //console.log(newData);
    let RightQuestions = [];
    let WrongQuestions = [];
    let solvedQuestions = [];




    function checkAns(choseOption) {
        let currentObj = {
            questionNo: currentQuestion,
            question: newData[parseInt(currentQuestion)]["Question"],
            selectedAns: `${choseOption}: ${newData[parseInt(currentQuestion)][choseOption]}`,
            correctAns: newData[parseInt(currentQuestion)]["correctAns"],
            tags: []
        }
        
        currentObj.correctAns = `${currentObj.correctAns}: ${newData[parseInt(currentQuestion)][currentObj.correctAns]}`

        if (choseOption === newData[parseInt(currentQuestion)]["correctAns"]) {
            updateScore();
            TestData.rightAns.push(currentObj);
            TestData.rightTags.push(newData[parseInt(currentQuestion)]["tags"]);
            if (newData.length - 1 === currentQuestion) {
                TestData .subjects = eObj.subject;
                TestData.userScore =  score;
                TestData.totalScore = totalScore;
                sessionStorage.setItem('TestResult', JSON.stringify(TestData));
                //console.log(TestData);
                navigate('../Analysis', {replace: true});
                return;
            }
            setCurrentQuestion(prev => prev +1);
            }  else {
                TestData.wrongAns.push(currentObj);
                TestData.wrongTags.push(newData[parseInt(currentQuestion)]["tags"]);
            if (newData.length - 1 === currentQuestion) {
                TestData .subjects = eObj.subject;
                TestData.userScore =  score;
                TestData.totalScore = totalScore;
                sessionStorage.setItem('TestResult', JSON.stringify(TestData));
                //console.log(TestData);
                navigate('../Analysis', {replace: true});
                return;
            }
            setCurrentQuestion(prev => prev +1);
        }
    }

    const optionStyle = {
        width: '700px',
        margin: '10px',
        padding: '8px 12px' ,
        marginLeft: '50px'
    }

    return (
        <div className="question-container">
            <div className="question-name">
                <Typography variant="h5" className="test-question">{`${currentQuestion + 1}) ${newData[parseInt(currentQuestion)]["Question"]}`}</Typography>
            </div>
            <Typography variant="h6">Options: </Typography>
            <Button variant="outlined" color="info" onClick={() => checkAns("optionA")} style={optionStyle}>
                {`(A)`} {newData[parseInt(currentQuestion)]["optionA"]}
            </Button>
            <Button variant="outlined" color="info" onClick={() => checkAns("optionB")}  style={optionStyle}>
                {`(B)`} {newData[parseInt(currentQuestion)]["optionB"]}
            </Button>
            <Button variant="outlined" color="info" onClick={() => checkAns("optionC")}  style={optionStyle}>
                {`(C)`} {newData[parseInt(currentQuestion)]["optionC"]}
            </Button>
            <Button variant="outlined" color="info" onClick={() => checkAns("optionD")}  style={optionStyle}>
                {`(D)`} {newData[parseInt(currentQuestion)]["optionD"]}
            </Button> 
        </div>
    )
}

export default Test;