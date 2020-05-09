const {proto, serverAddress} = require("./config");
const readline = require("readline");
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
  proto.path,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

const socialnet_proto = grpc.loadPackageDefinition(packageDefinition).socialnet;

//Read terminal Lines
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let username;

//Create gRPC client
let client = new socialnet_proto.SocialNet(serverAddress, grpc.credentials.createInsecure());

//Start the stream between server and client
function startChat() {
  let channel = client.join({userName: username, message: "joined this channel"});

  client.list({}, (error, data) => {
    console.log(data)
  });
  channel.on("data", onData);

  readLine.on("line", function (text) {
    client.send({userName: username, message: text}, (error, response) => {
      console.log(response);
    });
  });
}

//When server send a message
function onData(post) {
  if (post.user === username) {
    return;
  }
  console.log(post);
}

//Ask user name then start the chat
readLine.question("What's your name? ", answer => {
  username = answer;

  startChat();
});
