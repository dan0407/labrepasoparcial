let socket = io("http://localhost:5050", { path: "/real-time" });

document.getElementById("fetch-button").addEventListener("click", fetchData);

async function fetchData() {
  socket.emit("chat-messages", "Hola"); // Sends a string message to the server
}

socket.on("chat-messages", (message) => {
  console.log(message);
});
