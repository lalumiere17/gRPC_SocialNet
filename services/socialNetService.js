const DataBase = require("./dataBaseService");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const publishPost = async (request) => {
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

const likePost = async (postId) => {
  const post = await DataBase.getPostById(postId);
  const newLikes = post.likeAmount + 1;

  const updatedPost = await DataBase.updatePostById(postId, {likeAmount: newLikes});
  return updatedPost.likeAmount;
};

const commentPost = async (postId, userName, message) => {
  const comment = new Comment({message: message, userName: userName});

  return await DataBase.commentPost(postId, comment);
}


module.exports = {
  publishPost,
  getListOfPosts,
  likePost,
  commentPost
}