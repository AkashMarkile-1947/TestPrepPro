const express = require('express');
const router = express.Router();
const UserRecord = require('../DB/models/userRecord');
const UserModel = require('../DB/models/userModel');
//const QuestionDB = require('../DB/models/questionModel.js');


router.post('/api/saveRecord', async(req, res) => {
    const {TestResult, email} = req.body;
    try {
        const user = await UserModel.findOne({email}).lean();
        if (!user) {
            return res.json({status: 'failed', data: 'User not registred'});
        }
        const {wrongAns, rightAns, rightTags, wrongTags, subjects, totalScore, userScore} = TestResult;
        //console.log(wrongAns, rightAns, rightTags, wrongTags, subjects, totalScore, userScore);
        const userId = user["_id"];
        const response =  await UserRecord.create({userId,rightAns,wrongTags,rightTags,subjects,totalScore,userScore,wrongAns});
        //const response = await UserRecord.create({userId});
        return res.json({status: 'ok', data: 'success'});
    } catch (error) {
        return res.json({status: 'failed', data: 'failed to save data'});
    }
   
});


router.post('/api/getRecord', async(req, res) => {
    const {email} = req.body;
    //console.log(email);
    try {
        const user = await UserModel.findOne({email}).lean();
        if(!user) {
            return res.json({status: 'Error', data: 'failed to find'})
        }
       const userId = user["_id"];
       console.log(userId);
        if (!userId) {
            return res.json({status: 'error', data: "You haven't appeared for any test yet"});
        }
        //const response = await UserRecord.find({userId}).limit(3).lean();
        const response = await UserRecord.find({userId}).sort({dateTime: -1});
        /*console.log(response);*/
        if (!response) {
            return res.json({status: 'error', data: 'internal server error'})
        }
        res.json({status: 'ok', data: response}); 
    } catch(error) {
        return res.json({status: 'error', data: 'internal server error'})
    }
})

module.exports = router;
