import nodemailer from "nodemailer"


const SendMessage = async (send_from, send_to, subject, person, mail, msg, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const options = {
        from: send_from,
        to: send_to,
        subject: subject,
        html: `<p>This Message is regarding Kundu travels queries, <br/> This is ${person}, <br/> Email - ${mail},  <br/> My Message is - ${msg}</p>`

    }

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error)
            throw error
        } else {
            console.log(info)
        }
    })
}


export default SendMessage