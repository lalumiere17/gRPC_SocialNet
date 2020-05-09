const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const socialNetService = require("./services/socialNetService");
const { proto, serverAddress } = require("./config");

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

let users = [];

// Receive message from client joining
function join(call, callback) {
  users.push(call);
  notifyChat({userName: "Server", message: "new user joined this channel"});
}

// Receive message from client
async function send(call, callback) {
  const post = await socialNetService.publishPost(call.request);

  notifyChat(post);

  callback(null, {postId: post._id})
}

// Send message to all connected clients
function notifyChat(post) {
  console.log(post);
  users.forEach(user => {
    user.write({
      message: post.message,
      userName: post.userName,
      likeAmount: post.likeAmount,
      postId: post._id
    });
  });
}

async function list(call, callback) {
  const allPost = await socialNetService.getListOfPosts();

  callback(null, {postList: allPost})
}


const server = new grpc.Server();

server.addService(socialnet_proto.SocialNet.service, {Join: join, Send: send, List: list});

server.bind(serverAddress, grpc.ServerCredentials.createInsecure());

server.start();

console.log("Server started listening to ...");