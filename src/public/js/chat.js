const socketClient = io();


const form = document.getElementById("chatForm");
const inputMessage = document.getElementById("chatMessage");
const h3Name = document.getElementById("name");
const chatDiv = document.getElementById("chat");

let user;

Swal.fire({
    title: 'Welcome to the chat!',
    text: 'What is your name?',
    input: 'text',
    inputValidator: value => {
        if(!value) {
            return 'Name is required'
        }
    }
  }).then(input => {
    user = input.value; 
    h3Name.innerHTML = `Chat user: ${user}`;
    socketClient.emit("newUser", user);
  })


socketClient.on("NewUserBroadcast", (user) => {
    Toastify({
        text: `User conected: ${user}`,
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
    }).showToast();
})


form.onsubmit = (e) => {
    e.preventDefault();
    const infoMessage = {
        user: user,
        message: inputMessage.value,
    }

    socketClient.emit("message", infoMessage);
}

socketClient.on("chat", (messages) => {
    const chat = messages.map((objMessage) => `<p> ${objMessage.user}: ${objMessage.message} </p>`)
    .join(" ");
    chatDiv.innerHTML = chat;
});