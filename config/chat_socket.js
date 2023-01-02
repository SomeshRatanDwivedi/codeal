module.exports.chatSocket=(socketServer)=>{
  let io=require('socket.io')(socketServer, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    },
    allowEIO3: true
  });


  io.sockets.on('connection', (socket)=>{
    console.log('new connection recieved', socket.id);



    socket.on('disconnect', ()=>{
        console.log("disconnected")
    })

    socket.on('join_room', (data)=>{
        console.log('joining request recieved', data);
        socket.join(data.chatroom);

        io.in(data.chatroom).emit('user_joined', data);
    })

    socket.on('send_message', (data)=>{
      console.log("***", data)
      socket.join(data.chatroom);
       io.in(data.chatroom).emit('recieve_message', data);
    })
  })
}