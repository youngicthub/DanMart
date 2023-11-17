const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://youngicthub:youngicthub@cluster0.ntcp9bq.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.listen(port, () => {
    console.log("Server is running on port 8000");
});

// End point for App Registration page 
const User = require("./models/user");
const Order = require("./models/order");

// function to send verification Email to User
const sendVerificationEmail = async (email, verificationToken) => {
    // Create nodemailer Transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "youngicthub@gmail.com",
            pass: "lzev urmq ipnj thwk",
        },
    });

    // Compose mail message
    const mailOptions = {
        from: "DanMart",
        to: email,
        subject: "Email Verification",
        text: `Please click on the link below to verify your email: http://localhost:8000/verify/${verificationToken}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email", error);
    }
};

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if Email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exists" });
        }

        // Create New User
        const newUser = new User({ name, email, password });

        // Generate and Store Verification Token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // Save the user to the database
        await newUser.save();

        // Send Verification Email to the user
        await sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error in registering user", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// Endpoint to verify email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        // Find the user with the given verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({ message: "Invalid Email Verification" });
        }

        // Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email verification failed" });
    }
});

// Login EndPoint for App
const generateSecretKey = () => {
    secretKey = crypto.randomBytes(32).toString("hex");
};

// Generate secret key
generateSecretKey();

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the user password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate Token
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});
