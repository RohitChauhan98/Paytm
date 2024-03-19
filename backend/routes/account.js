const express = require('express');
const router = express.Router();
const { Account } = require("../db");
const {authMiddleware} = require('../middleware');
const {  mongoose } = require('mongoose');

router.get('/balance', authMiddleware, async function(req, res){
    const acc = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: acc.balance
    })
})


router.post('/transfer', authMiddleware, async (req, res) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to} = req.body;
    const acc = await Account.findOne({userId: req.userId}).session(session);
    if(!acc || acc.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transaction Successful"
    });
});

module.exports = router;