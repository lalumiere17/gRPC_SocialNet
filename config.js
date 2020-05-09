module.exports = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "SocialNet",
    postCollection: "posts"
  },
  proto: {
    path: __dirname + '/socialnet.proto'
  },
  serverAddress: "0.0.0.0:5001"
}