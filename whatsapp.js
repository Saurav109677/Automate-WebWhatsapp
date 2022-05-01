const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Client, MessageMedia , LegacySessionAuth ,LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { exit } = require('process');
const invitation = require('./resources/invitation');
const message = require('./resources/message');
const prompt =require('prompt')
let ch=0;



prompt.start();
// Path where the session data will be stored
const SESSION_FILE_PATH = './sessions/session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
    console.log(sessionData)
}

// Use the saved values
const client = new Client({
    // not enable multi device
    authStrategy: new LegacySessionAuth({
        session: sessionData
    })

    // enable multi device
    // authStrategy: new LocalAuth({
    //     session: sessionData
    // })
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

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    

    for(i=0;i<numbers.length;i++){
        const chatId = "91"+numbers[i].trim()+"@c.us";

        if(ch=='1'){
            console.log("Sending media message!!!")
            sendMedia(chatId,invitation);
        }
        else if(ch=='2'){
            console.log("Sending simple message!!!")
            sendMessage(chatId,message);
        }
        else{
            console.log("wrong choice!!")
            exit();
        }

    }

    console.log("Total Count = "+numbers.length);
});

// ================ SERVICES ====================================

const sendMessage = async(chatId,message)=>{
    await client.sendMessage(chatId, message);
    console.log("Message sent!",chatId);
}

const sendMedia = async(chatId,message)=>{
    const media = MessageMedia.fromFilePath('./resources/images/passwordForHappiness.png');
    await client.sendMessage(chatId,media,{caption:message});
    console.log("Success!! ",chatId);
}

// ================ END OF SERVICES ====================================



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
  
    // console.log(message)
  console.log("Please select the format you want to send - \n")
  console.log("1. MESSAGE WITH IMAGE \n 2. MESSAGE WITHOUT IMAGE\n")
    prompt.get(['choice'], function (err, result) {
        if (err) {
        return onErr(err);
        }
        console.log('Command-line input received:');
        console.log('  Choice: ' + result.choice);
        ch=result.choice
        console.log(`Server running on port ${port}`);
    });

});