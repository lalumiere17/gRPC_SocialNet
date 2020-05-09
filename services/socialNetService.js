const DataBase = require("./dataBaseService");
const Post = require("../models/Post");

const publishPost = async (request) => {
  // TODO: save to Db, send new info to all clients

  const post = new Post({
    message: request.message,
    userName: request.userName
  })
  return await DataBase.createPost(post);
};

const getListOfPosts = async () => {
  const allPosts = await DataBase.getAll();

  allPosts.forEach(post => {
    post.postId = post._id;
    delete post._id;
  })

  return allPosts;
}

const likePost = (postId, userName) => {
  // TODO: change likeAmount in DB
};




module.exports = {
  publishPost,
  getListOfPosts,
  likePost
}