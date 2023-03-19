const express = require('express');
const router = express.Router();
const QuestionDB = require('../DB/models/questionModel');

const cors = require('cors');
router.use(cors());

router.post('/api/addQuestion', async(req, res) => {
    console.log(req.body);
    const {Question, optionA, optionB, optionC, optionD, correctAns, tags} = req.body;
    try {
        const response =  await QuestionDB.create({Question, optionA, optionB, optionC, optionD, correctAns, tags});
        return res.json({status: 'ok', data: 'success'});
    } catch (error) {
        return res.json({status: 'falied', data: 'failed to save data'});
    }
   
});

module.exports = router;