const express = require('express');
const router = require('express').Router;
const cors = require('cors');

router.use(cors());
router.use(express.json());

router.post('api/takequiz', async(req, res) => {
    res.json({status: 'ok', data: 'success'});
})


module.exports = router;