const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

  
client.on('ready', () => {
    console.log('Client is ready!');
   
     // Number where you want to send the message.
     

    const numbers = ["919677120415"];
   
     // Your message.
    const text = "VOICE presents online PRERNA : a festival of positive inspiration\n"+
    "Topic :\n"+
    "FOUR PILLARS OF SUCCESSFUL CAREER 🎓🎓\n+"
    "Based on the teachings of Bhagavad Gita 📔\n\n";

    for(i=0;i<numbers.length;i++){
        const chatId = numbers[i]+"@c.us";
         // Sending message.
        client.sendMessage(chatId, text);
    }

   });



   client.initialize();