"use strict";


const CHAR_RETURN = 13; 
const socket = new WebSocket("ws://127.0.0.1:4000");
const chat = document.getElementById("chat");
const msg = document.getElementById("msg");

msg.focus();

const writeLine = (text) => {
  const line = document.createElement("div");

  line.innerHTML = `<p>${text}</p>`;
  chat.appendChild(line);
};

socket.addEventListener("open", () => {
  writeLine("connected");
});

socket.addEventListener("close", () => {
  writeLine("closed");
});

socket.addEventListener("message", ({ data }) => {
  writeLine(data);
});

msg.addEventListener("keydown", (event) => {
  if (event.keyCode === CHAR_RETURN) {
    const s = msg.value;

    msg.value = "";
    writeLine(s);
    socket.send(s);
  }
});
