require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/User");
const LoginHistory = require("./model/LoginHistory");

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const rawMongoUri = process.env.MONGO_URL;
const uri = rawMongoUri && !rawMongoUri.includes("<<") ? rawMongoUri : "mongodb://127.0.0.1:27017/zerodha_clone";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Auth routes
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    // Save signup to login history
    const ipAddress = req.ip || req.connection.remoteAddress;
    await LoginHistory.create({
      username,
      email,
      action: "signup",
      ipAddress,
      success: true,
    });
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Save failed signup attempt
    const ipAddress = req.ip || req.connection.remoteAddress;
    await LoginHistory.create({
      username: req.body.username,
      email: req.body.email,
      action: "signup",
      ipAddress,
      success: false,
    }).catch(err => console.error("Failed to log signup:", err));
    
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Save failed login attempt
      const ipAddress = req.ip || req.connection.remoteAddress;
      await LoginHistory.create({
        username,
        action: "login",
        ipAddress,
        success: false,
      }).catch(err => console.error("Failed to log login:", err));
      
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1h" });
    
    // Save successful login attempt
    const ipAddress = req.ip || req.connection.remoteAddress;
    await LoginHistory.create({
      username,
      email: user.email,
      action: "login",
      ipAddress,
      success: true,
    }).catch(err => console.error("Failed to log login:", err));
    
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

app.get("/addHoldings", async (req, res) => {
  try {
    // Check if holdings already exist
    const existingHoldings = await HoldingsModel.countDocuments();
    if (existingHoldings > 0) {
      return res.send("Holdings already added!");
    }

    let tempHoldings = [
      {
        name: "BHARTIARTL",
        qty: 2,
        avg: 538.05,
        price: 541.15,
        net: "+0.58%",
        day: "+2.99%",
      },
      {
        name: "HDFCBANK",
        qty: 2,
        avg: 1383.4,
        price: 1522.35,
        net: "+10.04%",
        day: "+0.11%",
      },
      {
        name: "HINDUNILVR",
        qty: 1,
        avg: 2335.85,
        price: 2417.4,
        net: "+3.49%",
        day: "+0.21%",
      },
      {
        name: "INFY",
        qty: 1,
        avg: 1350.5,
        price: 1555.45,
        net: "+15.18%",
        day: "-1.60%",
        isLoss: true,
      },
      {
        name: "ITC",
        qty: 5,
        avg: 202.0,
        price: 207.9,
        net: "+2.92%",
        day: "+0.80%",
      },
      {
        name: "KPITTECH",
        qty: 5,
        avg: 250.3,
        price: 266.45,
        net: "+6.45%",
        day: "+3.54%",
      },
      {
        name: "M&M",
        qty: 2,
        avg: 809.9,
        price: 779.8,
        net: "-3.72%",
        day: "-0.01%",
        isLoss: true,
      },
      {
        name: "RELIANCE",
        qty: 1,
        avg: 2193.7,
        price: 2112.4,
        net: "-3.71%",
        day: "+1.44%",
      },
      {
        name: "SBIN",
        qty: 4,
        avg: 324.35,
        price: 430.2,
        net: "+32.63%",
        day: "-0.34%",
        isLoss: true,
      },
      {
        name: "SGBMAY29",
        qty: 2,
        avg: 4727.0,
        price: 4719.0,
        net: "-0.17%",
        day: "+0.15%",
      },
      {
        name: "TATAPOWER",
        qty: 5,
        avg: 104.2,
        price: 124.15,
        net: "+19.15%",
        day: "-0.24%",
        isLoss: true,
      },
      {
        name: "TCS",
        qty: 1,
        avg: 3041.7,
        price: 3194.8,
        net: "+5.03%",
        day: "-0.25%",
        isLoss: true,
      },
      {
        name: "WIPRO",
        qty: 4,
        avg: 489.3,
        price: 577.75,
        net: "+18.08%",
        day: "+0.32%",
      },
    ];

    await HoldingsModel.insertMany(tempHoldings);
    res.send("Holdings added successfully!");
  } catch (error) {
    res.status(500).send("Error adding holdings: " + error.message);
  }
});

app.get("/allHoldings", verifyToken, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/addPositions", async (req, res) => {
  try {
    // Check if positions already exist
    const existingPositions = await PositionsModel.countDocuments();
    if (existingPositions > 0) {
      return res.send("Positions already added!");
    }

    let tempPositions = [
      {
        product: "CNC",
        name: "EVEREADY",
        qty: 2,
        avg: 316.27,
        price: 312.35,
        net: "+0.58%",
        day: "-1.24%",
        isLoss: true,
      },
      {
        product: "CNC",
        name: "JUBLFOOD",
        qty: 1,
        avg: 3124.75,
        price: 3082.65,
        net: "+10.04%",
        day: "-1.35%",
        isLoss: true,
      },
    ];

    await PositionsModel.insertMany(tempPositions);
    res.send("Positions added successfully!");
  } catch (error) {
    res.status(500).send("Error adding positions: " + error.message);
  }
});

app.get("/allPositions", verifyToken, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", verifyToken, async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});

// Get login history for current user
app.get("/loginHistory", verifyToken, async (req, res) => {
  try {
    const history = await LoginHistory.find({ username: req.user.username })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch login history" });
  }
});

// Admin endpoint: Get all login/signup activity
app.get("/allActivity", async (req, res) => {
  try {
    const activity = await LoginHistory.find()
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});


app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(rawMongoUri)
    .then(() => console.log("DB started!"))
    .catch((err) => console.error("DB connection error:", err.message));
});
