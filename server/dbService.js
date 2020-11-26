const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config({ path: "./.env" });

// const connection = mysql.createConnection({
// 	host: process.env.DATABASE_HOST,
// 	user: process.env.DATABASE_USER,
// 	password: process.env.DATABASE_PASSWORD,
// 	database: process.env.DATABASE
// });

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }

  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllUsers() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM users";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllPosts() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM posts";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async registerUser(email, password, username, fullName, avatar) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO users (user_id, username, email, user_password, fullName, avatar) VALUES (?,?,?,?,?,?); ";

        connection.query(
          query,
          [null, username, email, password, fullName, avatar],
          (err, result) => {
            if (err) {
              console.log(err.message);
              reject(new Error(err.message));
            }
            resolve(result.insertId);
          }
        );
      });

      return { insertId, username, email, fullName, password, avatar };
    } catch (err) {
      console.log(err);
    }
  }
  async signIn(username) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE username=?";
        connection.query(query, [username], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  async createPost(
    title,
    description,
    authorUid,
    file,
    thumbnail,
    timestamp,
    numLikes,
    numComments
  ) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO posts (postUid, user_id, title, timestamp, description, numLikes, numComments, thumbnail, post_file ) VALUES (?,?,?,?,?,?,?,?,?); ";

        connection.query(
          query,
          [
            null,
            authorUid,
            title,
            timestamp,
            description,
            numLikes,
            numComments,
            thumbnail,
            file,
          ],
          (err, result) => {
            if (err) {
              console.log(err.message);
              reject(new Error(err.message));
            }
            console.log(result);
            resolve(result.insertId);
          }
        );
      });
      console.log();
      return {
        insertId,
        title,
        description,
        authorUid,
        file,
        thumbnail,
        timestamp,
        numLikes,
        numComments,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getUserPosts(user_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM posts WHERE user_id=?";
        connection.query(query, [user_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getComments(post_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT content, user_id, timestamp  FROM comments WHERE postUid=(?) ";
        connection.query(query, [post_id], (err, results) => {
          if (err) {
            console.log(err.message);
          }
          resolve(results);
        });
      });

      console.log("getComments", response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getPostLikes(post_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT user_id FROM likes WHERE postUid=(?)";
        connection.query(query, [post_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log("getPostLikes", response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addComment(content, user_id, postUid, timestamp) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO comments (content, user_id, postUid, timestamp ) VALUES (?,?,?,?); ";
        connection.query(
          query,
          [content, user_id, postUid, timestamp],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      });

      console.log("addComment", response);
      return {
        content,
        user_id,
        postUid,
        timestamp,
      };
    } catch (err) {
      console.log(err);
    }
  }
  async addLike(user_id, postUid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO likes (postUid, user_id) VALUES (?,?); ";
        connection.query(query, [postUid, user_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log("addLike", response);
      return {
        postUid,
        user_id,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async deleteLike(user_id, postUid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM likes WHERE postUid=(?) AND user_id=(?); ";
        connection.query(query, [postUid, user_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log("delete like", response);
      return {
        postUid,
        user_id,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async followUser(follower_id, followee_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO following (follower_id, followee_id) VALUES (?,?); ";
        connection.query(query, [follower_id, followee_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log("follow user", response);
      return {
        follower_id,
        followee_id,
      };
    } catch (err) {
      console.log(err);
    }
  }
  async unfollowUser(follower_id, followee_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "DELETE FROM following WHERE follower_id=(?) AND followee_id=(?); ";
        connection.query(query, [follower_id, followee_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      console.log("unfollow user", response);
      return {
        follower_id,
        followee_id,
      };
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @function getNonFollowers(): is a function that makes a query for all
   * users that the current user does not follow
   *
   * @param follower_id: the user we want to find posts for, in which those posts
   * are NOT made me users that follower_id follows
   */
  async getNonFollowers(follower_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT (followee_id) from following WHERE NOT follower_id = (?)";
        connection.query(query, [follower_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * @function getExplorePosts(): is a function that makes a query for all
   * explore posts
   *
   * @param followerIDs: array of followerIDs to run with query
   *
   *
   * @param exploreQuery: the query to be run in our DB
   */

  async getUserExplorePosts(follower_id, exploreQuery) {
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(exploreQuery, [follower_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getUserHomePosts(follower_id, homeQuery) {
    try {
      const response = await new Promise((resolve, reject) => {
        connection.query(homeQuery, [follower_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsersFollowing(follower_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM following WHERE follower_id = (?)";
        connection.query(query, [follower_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsersFollowers(followee_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM following WHERE followee_id = (?)";
        connection.query(query, [followee_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getUserPostIds(user_id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT postUid FROM posts WHERE user_id = (?)";
        connection.query(query, [user_id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async updateAvatar(user_id, avatar) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE users SET avatar = (?) WHERE user_id = (?);";
        connection.query(query, [avatar, user_id], (err, results) => {
          if (err) {
            console.log(err.message);
          }
          resolve(results);
        });
      });
      console.log("updateAvatar", response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getTopPost() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT topPost.postUid FROM ( SELECT postUid, COUNT(postUid) AS likeCount FROM likes GROUP BY postUid ) AS topPost ORDER BY likecount DESC LIMIT 1";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DbService;
