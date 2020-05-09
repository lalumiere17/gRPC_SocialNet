module.exports = class Post {

  constructor(postInfo) {
    const post = postInfo || {};

    /**
     * Post message
     * @type {string}
     */
    this.message = post.message;

    /**
     * Name of the user, who published the post
     * @type {string}
     */
    this.userName = post.userName;

    /**
     * Amount of likes of the post
     * @type {number}
     */
    this.likeAmount = post.likeAmount || 0;
  }
};