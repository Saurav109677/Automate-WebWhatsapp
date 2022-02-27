const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js');
// const client = new Client();
const fs = require('fs');


// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData
});


// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

let numbers;
let invitation ="🎉🎊🎉🎊🎉🎊🎊✨🎊\n"+
"☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️\n\n"+

"*VOICE* presents online PRERNA\n"+
"a festival of positive inspiration\n\n"+

"*Topic :*\n\n"+

"*Session - 4 (CONCLUDING SESSION)*\n"+
"*FOUR PILLARS OF SUCCESSFUL CAREER* 🎓🎓\n"+
"Based on the teachings of *Bhagavad Gita* 📔\n\n"+

"*Guest Speaker :* 🎙️\n"+
"*HG Kumar Lila Das*❉\n"+
"BTech, IIT BHU\n"+
"Motivational Speaker\n\n"+

"*Date -* 27th Feb 2022 🗓️\n"+
"*Time -* 12pm to 1:30pm ⏰\n\n"+

"Join Zoom Meeting:\n"+
 "*https://cutt.ly/haldiaVOICE* \n\n"+

"Meeting ID: *939 7758 0348* \n"+
"Passcode: *271950* \n\n"+

"*For any query, contact -* +919065062820 \n\n"+

"Your ever well-wisher\n"+
"*VOICE* 🌼\n";

// let message = "https://www.youtube.com/watch?v=gZnGYV0f9SY";

let reminder = "‼️ *REMINDER* ‼️\n"+
"*Join today at 12pm*"

let session2Li = "https://www.youtube.com/watch?v=XoZsjcs-sllU"
let session3Li = "https://youtu.be/zSnQC_8bLZM"

let msg2= "‼️ Have you attended the previous session ? ‼️\n"+
"*SECOND PILLAR OF SUCCESSFUL CAREER* 🎊🎊"

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


const sendMedia = async(chatId,message)=>{

    // const media = new MessageMedia('image/png', base64);
    // client.sendMessage(chatId,media);

    const media = MessageMedia.fromFilePath('./conclusion.jpg');
    await client.sendMessage(chatId,media,{caption:message});
    console.log("Success!! ",chatId);

}

const sendMessage = async(chatId,message)=>{
    await client.sendMessage(chatId, message);
    console.log("Message sent!",chatId);
}

client.on('ready', () => {
    console.log('Client is ready!');

    for(i=0;i<numbers.length;i++){
        const chatId = "91"+numbers[i].trim()+"@c.us";
        
         // Sending message.
        // client.sendMessage(chatId, message);
        // sendMedia(chatId,invitation);
        sendMessage(chatId,reminder);
    }

    console.log("Total Count = "+numbers.length);
});

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/send', (req, res) => {
//   res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
    // console.log(`${req.body.allNumbers}`);
    const allNumbers = `${req.body.allNumbers}`;
    // message = `${req.body.message}`;
    numbers = allNumbers.split("\n");
    console.log(numbers);
    // console.log(message);
    console.log("wait till qr genertes!!");
    client.initialize();
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});