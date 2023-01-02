

const button=document.getElementById('btn');
let recieveLi=document.getElementById('recieved');
let sendLi=document.getElementById('sent')

class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox=document.getElementById(chatBoxId);
        this.userEmail=userEmail;
        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect', ()=>{
            console.log("connection established using sockets....!")
        })
        self.socket.emit('join_room', {
            user_email:self.userEmail,
            chatroom:'codeal'
        });

        self.socket.on('user_joined', (data)=>{
            console.log('a user joined', data);
        })

        button.addEventListener('click',()=>{
            let msg=document.getElementById('message').value;
            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codial'
                })
            }
        })
        self.socket.on('recieve_message', (data)=>{
            console.log("message recieved", data)
            let newMsg=document.createElement("span");
            newMsg.innerText=`msg-${data.message},
               ${data.user_email}
            `;
            console.log("55", newMsg)

            if(data.user_email!=self.userEmail){
                console.log(recieveLi)
                recieveLi.appendChild(newMsg)
            }
            else{
                console.log(sendLi)
                sendLi.appendChild(newMsg)
            }
        })
    }
}







