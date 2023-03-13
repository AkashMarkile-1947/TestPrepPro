import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavigationBar";
import {Typography, Button, Link, TextField, Checkbox} from '@mui/material';
import '../Pages/Styles/takeTest.css';

export let exportObj;

function TakeTest() {
  const [checkboxValues, setCheckboxValues] = useState({});
  const [testSize, setTestSize] = useState(0);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setCheckboxValues({ ...checkboxValues, [e.target.name]: e.target.checked });
  };

  const handleChangeNumber = (e) => {
    setTestSize(() =>  e.target.value);
  }

    const handleSubmit = async(e) => {   
    e.preventDefault();
    console.log(checkboxValues, testSize);
    const result = await fetch('http://localhost:3000/api/taketest/', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            checkboxValues, testSize
        })
    }).then(res => res.json())

    if(result.status !== 'ok') {
      alert('internal server error');
    } else {
      exportObj = {
        subject: result.subject,
        data: result.data,
      }
      sessionStorage.setItem('exportObj', JSON.stringify(exportObj));
      setTimeout(() => navigate('../Test', {replace: true}), 500);
    }
  };
    return (
      <div className="container-s">
        <Navbar />
        <div className="selection-container">
          <div className="Test">
            <div className="test-info">
              <Typography variant="h4" align="center">MHA MCA CET</Typography>
              <div className="test-info-stat">
                <Typography variant="body1">No of Questions: 100</Typography>
                <Typography variant="body1">Time: 90min</Typography>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="test-size-container">
              <Typography variant="body1">Set a Size of Questions from each Topic:</Typography>
              <div className="test-size">
              <TextField id="outlined-number" label="Test Size" type="number" value={testSize} max="20" min="0" size="small"  onChange={handleChangeNumber} InputLabelProps={{shrink: true,}}/>
              <sub className="test-size-warn">max size for each topic is 20</sub>
              </div>
            </div>
            <Option name="Logical Reasoning" text="Logical Reasoning" method={handleChange} />
            <Option name="Maths" text="Mathematics & Statistics" method={handleChange} />
            <Option name="English" text="English comprehension and verbal ability" method={handleChange} />
            <Option name="Computer" text="Computer Concepts" method={handleChange} />
            <Button type="submit" variant="contained" color="info" className="startTest">Start</Button>
          </form>
          </div>
        </div>
      </div>
      )
}

function Option({name, text, method}) {
    return (
        <div className="checkOption"> 
        <input
          type="checkbox"
          className="checkbox"
          name={name}
          onChange={method}
        />
        <Typography variant="body1" style={{marginLeft: '20px'}}>{text}</Typography>
      </div>
    )
}

export default TakeTest;