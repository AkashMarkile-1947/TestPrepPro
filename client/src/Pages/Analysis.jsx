import React from "react";
import Navbar from "../Components/NavigationBar";
import {Typography, Button} from '@mui/material';
import { useNavigate } from "react-router-dom";
import './Styles/Analysis.css';


function Analysis() {
    const naviagate = useNavigate();
    const TestResult = JSON.parse(sessionStorage.getItem('TestResult'));
    console.log(TestResult);
    const Email = localStorage.getItem("resultemail");

    async function saveRecord(record) {
      const result = await fetch('http://localhost:5000/api/saveRecord', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          TestResult,
          email: Email,
      })//
    }).then(res => res.json());
        if (result.status == 'ok') {
            alert('Record Saved');
        } else  {
            alert(result.data);
        }
    }

    return (
        <div className="container-a analysis">
            <Navbar />
            <div className="record-brief">
                <Typography variant="h5">{Email.split('@')[0]}</Typography>
                <Typography variant="h6">Score: {TestResult.userScore}/{TestResult.totalScore}</Typography>
                <Typography variant="h6">Subjects: {TestResult.subjects.map(item => `${item} `)}</Typography>
            </div>
            <div className="current-test-analysis">
                <QuestionContainer testResult={TestResult.rightAns} questionType="right"/>
                <QuestionContainer testResult={TestResult.wrongAns} questionType="wrong"/>
            </div>
            {TestResult.wrongAns.length > 0 &&
                <AnalysisTopicWise topics={TestResult.wrongTags} topicType="wrong" compare={TestResult.rightTags} />
            }
            {TestResult.rightAns.length > 0 &&
                <AnalysisTopicWise topics={TestResult.rightTags} topicType="right" compare={TestResult.wrongTags}/>
            }
            <div className="analysis-footer">
                <Button variant="contained" color="info" onClick={() => saveRecord(TestResult)}>Save Record</Button>
                <Button variant="outlined" style={{marginLeft: '40px'}} color="info" onClick={() => naviagate('../home', {replace: true})}>Dashboard</Button>
            </div>
        </div>
    )
}

export default Analysis;


function AnalysisTopicWise({topics, topicType, compare}) {
    function mostFrequent(arr, n) {
 
        let maxcount = 0;
        let element_having_max_freq;
       for (let i = 0; i < n; i++) {
            let count = 0;
            for (let j = 0; j < n; j++) {
                if (arr[i][0] == arr[j][0] && arr[i][1] === arr[j][1])
                    count++;
            }
     
            if (count > maxcount) {
                maxcount = count;
                element_having_max_freq = arr[i];
            }
        }
     
      
        return [element_having_max_freq, maxcount];
    }
    const revisonTopic = mostFrequent(topics, topics.length);
    const compareTopic = mostFrequent(compare, compare.length);
    let renderResult = revisonTopic[0][0] === compareTopic[0][0] && revisonTopic[0][1] === revisonTopic[0][1] && revisonTopic[1] <= compareTopic[1];

    return (
    <div>
        <div className="topic-analysis">
            { (topicType === "wrong" && renderResult === false ) &&
            <div className="RevisionTopics  wrongTopic">
                <Typography variant="h6">Need Revision</Typography>
                <Typography variant="body1">The Topic needs to be resvised is {`${revisonTopic[0][0]}, ${revisonTopic[0][1]}`}</Typography>
                <Typography variant="body1">{revisonTopic[1]} Questions questions Wrong  </Typography>
            </div>
            }
            { (topicType === "right" && renderResult === false) &&
            <div className="RevisionTopics rightTopic lastdiv">
                <Typography variant="h6">Masterd Concepts</Typography>
                <Typography variant="body1">Great!!! You are good at {`${revisonTopic[0][0]}, ${revisonTopic[0][1]}`}</Typography>
                <Typography variant="body1">You Answersed {revisonTopic[1]} questions right on this topic. </Typography>
            </div>
            }
        </div>
    </div>
    )
}



function QuestionContainer({testResult, questionType}) {
    let type = questionType[0].toUpperCase() + questionType.slice(1, questionType.length);
    return (
        <div className={`${questionType}Ans`}>
            {testResult.length !== 0 && <div>
                <Typography variant="h5">{ type} Answers</Typography>
                <div className={`type-container`} >
                        {
                            testResult.map((item, index) => {

                                return (
                                    <div className={`question-container ${questionType}-container`} key={index}>
                                        <Typography variant="body1" className="question">{`(`}{item.questionNo++}{`)`}{item.question}</Typography>
                                        <Typography variant="body1" className="selectedAns">{item.selectedAns}</Typography>
                                        {questionType === "wrong" && <Typography variant="body1" className="correctAns">{item.correctAns}</Typography>}
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
            }
        </div>
    )
}