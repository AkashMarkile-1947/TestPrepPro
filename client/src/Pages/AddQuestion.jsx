import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import '../Pages/Styles/AddQuestion.css';
import Navbar from '../Components/NavigationBar';

const AddQuestion = () => {
  const [questionData, setQuestionData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    subject: '',
    topic: '',
  });

  const handleInputChange = (event) => {
    setQuestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    // Extract questionData fields to send to server
    const { question: Question, option1: optionA, option2: optionB, option3: optionC, option4: optionD , answer: correctAns , subject, topic } = questionData;
    const tags = [subject, topic];
    const newQuestion = {
        Question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAns,
        tags
    };
    alert(JSON.stringify(newQuestion));
    // TODO: Send newQuestion to server to add to database
    const result = await fetch('http://localhost:5000/api/addQuestion', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          Question,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAns,
          tags
      })//
    }).then(res => res.json());

    if (result.status === 'ok') {
        alert(result.data);
    } else {
        alert(result.data);
    }

    // Reset form fields
    setQuestionData({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      subject: '',
      topic: '',
    });
  };

  return (
    <div className="addQuestionContainer">
    <Navbar />
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Add Question</h1>
      <TextField
        id="question"
        name="question"
        required
        label="Question"
        value={questionData.question}
        onChange={handleInputChange}
        className="form-input"
      />
      <br />
      <TextField
        id="option1"
        name="option1"
        required
        label="Option 1"
        value={questionData.option1}
        onChange={handleInputChange}
        className="form-input"
      />
      <TextField
        id="option2"
        name="option2"
        required
        label="Option 2"
        value={questionData.option2}
        onChange={handleInputChange}
        className="form-input"
      />
      <TextField
        id="option3"
        name="option3"
        required
        label="Option 3"
        value={questionData.option3}
        onChange={handleInputChange}
        className="form-input"
      />
      <TextField
        id="option4"
        name="option4"
        required
        label="Option 4"
        value={questionData.option4}
        onChange={handleInputChange}
        className="form-input"
      />
      <br />
      <FormControl className="form-input" required>
        <InputLabel id="Answer">Correct Option</InputLabel>
        <Select
          labelId="Answer-label"
          id="answer"
          name="answer"
          value={questionData.answer}
          label="Answer"
          onChange={handleInputChange}
        >
          <MenuItem className="menu-item" value="optionA">optionA</MenuItem>
          <MenuItem className="menu-item" value="optionB">optionB</MenuItem>
          <MenuItem className="menu-item" value="optionC">optionC</MenuItem>
          <MenuItem className="menu-item" value="optionD">optionD</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="form-input" required>
        <InputLabel id="subject-label">Subject</InputLabel>
        <Select
          labelId="subject-label"
          id="subject"
          name="subject"
          value={questionData.subject}
          label="Subject"
          onChange={handleInputChange}
        >
          <MenuItem className="menu-item" value="Math">Logical Reasoning</MenuItem>
          <MenuItem className="menu-item" value="Computer">Computer</MenuItem>
          <MenuItem className="menu-item" value="English">English</MenuItem>
          <MenuItem className="menu-item" value="Maths">Maths</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="form-input" required>
        <InputLabel id="topic-label">Topic</InputLabel>
        <Select
          labelId="topic-label"
          id="topic"
          name="topic"
          value={questionData.topic}
          label="Topic"
          onChange={handleInputChange}
        >
          <MenuItem className="menu-item" value="Integration">Integration</MenuItem>
          <MenuItem className="menu-item" value="Vector">Vector</MenuItem>
          <MenuItem className="menu-item" value="Sets">Sets</MenuItem>
          <MenuItem className="menu-item" value="Grammer">Grammer</MenuItem>
          <MenuItem className="menu-item" value="Coordinate Geometry">Coordinate Geometry</MenuItem>
          <MenuItem className="menu-item" value="MemoryMgmt">MemoryMgmt</MenuItem>
          <MenuItem className="menu-item" value="Series">Series</MenuItem>
          <MenuItem className="menu-item" value="Coding decoding">Coding decoding</MenuItem>
          <MenuItem className="menu-item" value="Age problems">Age problems</MenuItem>
          <MenuItem className="menu-item" value="basics">Basics</MenuItem>
        </Select>
        </FormControl>
        <Button type="submit" className="submit-button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Add Question</Button>
    </form>
        </div>
    );
};

export default AddQuestion;

