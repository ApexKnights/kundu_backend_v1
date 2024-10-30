import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import { config } from "dotenv";
import SendEnquiry from "./utils/sendEnquiry.js";
import SendMessage from "./utils/sendMessage.js";

config({
    path: "./data/config.env",
})


const app = express();





app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,

}))


app.get("/", (req, res) => {
    res.status(200).send("<h1>App Running Successfully</h1>")
})


app.post("/api/v1/tourenquiry", async (req, res) => {
    const { name, email, phone, tourname } = req.body;

    try {
        const send_from = process.env.EMAIL_USER;
        const send_to = process.env.EMAIL_RECIEVE;
        const subject = `Regarding tour enquiry by ${name}, from kundutravels website`
        const person = name;
        const mail = email;
        const ph = phone;
        const tour = tourname;
        await SendEnquiry(send_from, send_to, subject, ph, person, mail, tour, res)
        res.status(200).json({
            success: true,
            message: "Email Sent Successfully"
        })

    } catch (error) {
        res.status(500).json(error.message)
    }

})


app.post("/api/v1/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const send_from = process.env.EMAIL_USER;
        const send_to = process.env.EMAIL_RECIEVE;
        const subject = `Regarding queries by ${name}, from kundutravels website`
        const person = name;
        const mail = email;
        const msg = message;
        await SendMessage(send_from, send_to, subject, person, mail, msg, res)
        res.status(200).json({
            success: true,
            message: "Email Sent Successfully"
        })

    } catch (error) {
        res.status(500).json(error.message)
    }

})




app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT} `)
})


console.log("hii")