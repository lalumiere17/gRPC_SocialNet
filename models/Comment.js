module.exports = class Comment {

  constructor(commentInfo) {
    const comment = commentInfo || {};

    this.message = comment.message;

    this.userName = comment.userName;
  }
};