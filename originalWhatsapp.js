const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js');
// const client = new Client();
const fs = require('fs');


// Path where the session data will be stored
const SESSION_FILE_PATH = './sessions/session.json';

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
let invitation ="ðððððððâ¨ð\n"+
"âï¸âï¸âï¸âï¸âï¸âï¸âï¸âï¸âï¸âï¸\n\n"+

"*PRERNA Festival*\n"+
"presented by Haldia VOICE\n\n"+

"*Topic :*\n\n"+

" â *Life of an American Sadhu* â\n"+
"How an American Youth , Joe transformed into Krsna Consciousness\n\n"+

"*Events:*\n"+
"ð¤Inspirational Talk\n"+
"ð¶Music & Dance\n"+
"ðDelicious Feast\n\n"+


"*Guest Speaker :* ðï¸\n"+
"*HG Jiv-Nath Das* â\n"+
"California, USA\n"+
"International Motivational Speaker\n\n"+

"*Venue -* VOICE (offline)\n"+  
"*Date -* Sat, Apr 02, 2022 ðï¸\n"+
"*Time -* 11:30 AM â°\n\n"+

"Â® *CONTACT US FOR REGISTRATION* \n\n"+

"Your ever well-wisher\n"+
"*VOICE* ð¼\n";

// let message = "https://www.youtube.com/watch?v=gZnGYV0f9SY";

let reminder = "â¼ï¸ *REMINDER* â¼ï¸\n"+
"*Join today at 12pm*"

let session2Li = "https://www.youtube.com/watch?v=XoZsjcs-sllU"
let session3Li = "https://youtu.be/zSnQC_8bLZM"

let msg2= "â¼ï¸ Have you attended the previous session ? â¼ï¸\n"+
"*SECOND PILLAR OF SUCCESSFUL CAREER* ðð"

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


const sendMedia = async(chatId,message)=>{

    // const media = new MessageMedia('image/png', base64);
    // client.sendMessage(chatId,media);

    const media = MessageMedia.fromFilePath('./prerna_american_sadhu.jpeg');
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
        sendMedia(chatId,invitation);
        // sendMessage(chatId,reminder);
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