const express = require('express');
const router = express.Router();
const { Account, History, User } = require("../db");
const { authMiddleware } = require('../middleware');
const { mongoose } = require('mongoose');

router.get('/balance', authMiddleware, async function (req, res) {
    const acc = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: acc.balance
    })
})

router.post('/addBalance', authMiddleware, async function (req, res) {
    const addAmount = req.body;
    const acc = await Account.findOne({
        userId: req.userId
    })

    if (acc) {
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: addAmount.amount } })
    }
    else {
        return res.json({
            message: "Not able add amount to your account!"
        })
    }
    res.json({
        message: `Amount ${addAmount} is added to your Account`
    })
})


router.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const acc = await Account.findOne({ userId: req.userId }).session(session);
    if (!acc || acc.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transaction Successful"
    });
});

router.post('/history', authMiddleware, async function (req, res) {
    const body = req.body;
    console.log(body)
    const acc = await User.findOne({
        _id: req.userId
    })

    const reciever = await User.findOne({
        _id: body.to
    })

    if (acc) {
        await History.create({ userId: req.userId, to: reciever.firstName + " " + reciever.lastName, transactionType: "debit", amount: body.amount })
        await History.create({ userId: body.to, from: acc.firstName + " " + acc.lastName, transactionType: "credit", amount: body.amount })

        return res.status(200).json({
            message: "History Updated"
        })
    }
    else {
        return res.status(400).json({
            message: "Your account doesn't exist"
        })
    }
})

router.get('/getHistory', authMiddleware, async function (req, res) {

    const transaction = await History.find({
        userId: req.userId
    })

    res.json({transaction});

})

module.exports = router;