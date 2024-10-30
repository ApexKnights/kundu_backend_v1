import nodemailer from "nodemailer"


const SendEnquiry = async (send_from, send_to, subject, ph, person, mail, tour, res) => {
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
        html: `<p>This is ${person}, <br/> Email - ${mail},  <br/> My Phone Number is - ${ph} <br/> I want to enquiry regarding ${tour} tour</p>`

    }

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).json({
                success: false
            })
            throw error
        } else {
            console.log(info)
        }
    })
}


export default SendEnquiry