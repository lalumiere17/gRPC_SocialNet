const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const omitBy = require("lodash.omitby");
const isEmpty = require("lodash.isempty");

const {mongodb} = require("../config");

let dbClient;

MongoClient.connect(mongodb.url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  dbClient = client.db(mongodb.databaseName);
})

const createPost = async (post) => {
  return await dbClient
    .collection(mongodb.postCollection)
    .insertOne(post)
    .then(result => result.ops[0])
    .catch(error => console.error(error));
}

const getAll = async () => {
  return await dbClient
    .collection(mongodb.postCollection)
    .find({})
    .toArray()
}

const getPostById = async (postId) => {
  return await dbClient
    .collection(mongodb.postCollection)
    .findOne({_id: new ObjectID(postId)})
    .then(result => result)
    .catch(error => console.error(error))
}

const updatePostById = async (postId, updateInfo) => {

  let updateObject = {
    message: updateInfo.message,
    userName: updateInfo.userName,
    likeAmount: updateInfo.likeAmount
  }

  updateObject = omitBy(updateObject, prop => prop === undefined || prop === null);

  if (isEmpty(updateObject)) {
    console.error("There is no update information");
    return;
  }

  return await dbClient
    .collection(mongodb.postCollection)
    .updateOne({ _id: new ObjectID(postId) }, { $set: updateObject })
    .then(result => result)
    .catch(error => console.error(error))
}

module.exports = {
  createPost,
  getAll,
  getPostById,
  updatePostById
}