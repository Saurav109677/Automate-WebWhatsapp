const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const { MessageMedia } = require('whatsapp-web.js');

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.on('ready', () => {
    console.log('Client is ready!');
   
     // Number where you want to send the message.
    const numbers = ["919643757522"];
   
     // Your message.
    const text = "From Node app";

    for(i=0;i<numbers.length;i++){
        const chatId = numbers[i]+"@c.us";
         // Sending message.
        // client.sendMessage(chatId, text);
        // const media = new MessageMedia('image/png', 'base64Image' ,'image.png');
        // client.sendMessage(chatId,media, {caption: 'this is my caption !! hare krsna!!'});

        try{
            // const media = MessageMedia.fromUrl('https://go-lakshmi.s3.ap-south-1.amazonaws.com/1642682696068_prabhupada666.jpg');
            // client.sendMessage(chatId,media);
            sendMedia(chatId);
        }
        catch(e){
            console.log(e);
        }
       
    }

     client.destroy();
   });

   const sendMedia = async(chatId)=>{
    let media = await new MessageMedia("image/png", base64.data, "image.png")
            await client.sendMessage(chatId, media, {caption: "my image"})
   }





client.initialize();