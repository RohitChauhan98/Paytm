const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");
// const router = require(".");

const signupSchema = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken/ Invalid inputs",
    });
  }

  const searchUser = await User.findOne({
    userName: req.body.userName,
  });

  if (searchUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const newUser = await User.create({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  const userId = newUser._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

const signinSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signin", async (req, res, next) => {
  // console.log(req.body)
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid username or password",
    });
  }

  const searchUser = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });

  if (searchUser) {
    const token = jwt.sign(
      {
        userId: searchUser._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "Updated Successfully",
  });
});

userRouter.post("/me", async (req, res) => {
  const token = req.body.token;
  var decode = jwt.verify(token, JWT_SECRET);
  console.log(decode);
  const user = await User.findOne({_id: decode.userId});
  console.log(user);

  res.json({
    name: user.firstName,
    id: user._id
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = userRouter;
