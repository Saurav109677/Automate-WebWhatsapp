const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

let numbers;
// let message ="From Node Js App\n\n"+
//  "🎉🎊🎉🎊🎉🎊🎊✨🎊\n"+
// "☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️\n\n"+

// "*VOICE* presents online PRERNA : a festival of positive inspiration\n\n"+

// "*Topic :*\n"+
// "*FOUR PILLARS OF SUCCESSFUL CAREER* 🎓🎓\n"+
// "Based on the teachings of *Bhagavad Gita* 📔\n\n"+

// "*Guest Speaker :* 🎙️\n"+
// "*HG Kumar Lila Das*🎊\n"+
// "BTech, IIT BHU\n"+
// "Motivational Speaker\n\n"+

// "*Date -* 23rd Jan 2022 🗓️\n"+
// "*Time -* 12pm to 1:30pm ⏰\n\n"+

// "Join Zoom Meeting:\n"+
//  "*_https://cutt.ly/iskconhaldia_* \n\n"+

// "Meeting ID: *980 0439 339* \n\n"+

// "*For any query, contact -*+91-9065062820 \n\n"+

// "Your ever well-wisher\n"+
// "*VOICE*\n";

let message = "https://www.youtube.com/watch?v=gZnGYV0f9SY";

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

    for(i=0;i<numbers.length;i++){
        const chatId = "91"+numbers[i].trim()+"@c.us";
        console.log("chatId",chatId);
         // Sending message.
        client.sendMessage(chatId, message);
    }


    client.destroy();

});

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/send', (req, res) => {
//   res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
    // console.log(`${req.body.allNumbers}`);
    const allNumbers = `${req.body.allNumbers}`;
    // message = `${req.body.message}`;
    numbers = allNumbers.split("\n");
    console.log(numbers);
    console.log(message);
    console.log("wait till qr genertes!!");
    client.initialize();
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});