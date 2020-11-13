const dbService = require("../dbService");

module.exports = (app) => {
  app.post("/api/posts/create", async (req, res) => {
    const numLikes = 0;
    const numComments = 0;
    const { title, description, authorUid, file, thumbnail } = req.body;

    const dateTime = new Date();
    const years = dateTime.getFullYear();
    const months = dateTime.getMonth();
    const days = dateTime.getDay();
		const timestamp = `${years}-${months}-${days}`;

    try {
      const db = dbService.getDbServiceInstance();
      const response = await db.createPost(
        title,
        description,
        authorUid,
        file,
        thumbnail,
        timestamp,
        numLikes,
        numComments
      );
      const usersLiked = [];
      const comments = [];

      if (response) {
        const newPost = { ...response, usersLiked, comments };
        res.send(newPost);
      }
    } catch (err) {
      res.status(401).send("DB error");
    }
  });

  app.post("/api/posts/addcomment", async (req, res) => {
    const dateTime = new Date();
    const years = dateTime.getFullYear();
    const months = dateTime.getMonth();
    const days = dateTime.getDay();
    const timestamp = `${years}-${months}-${days}`;

    const { content, user_id, postUid } = req.body;
    try {
      const db = dbService.getDbServiceInstance();
      const response = await db.addComment(
        content,
        user_id,
        postUid,
        timestamp
			);
			
      if (response) {
        const newComment = { ...response};
        res.send(newComment);
      }
    } catch (err) {
      res.status(401).send("DB error");
    }
	});
	app.post("/api/posts/addlike", async (req, res) => {
		const { user_id, postUid } = req.body;
		debugger;
    try {
      const db = dbService.getDbServiceInstance();
      const response = await db.addLike(
        user_id,
        postUid,
			);
			
      if (response) {
        const newLike = { ...response};
        res.send(newLike);
      }
    } catch (err) {
      res.status(401).send("DB error");
    }
	});
	app.post("/api/posts/deletelike", async (req, res) => {
    const { user_id, postUid } = req.body;
    try {
      const db = dbService.getDbServiceInstance();
      const response = await db.deleteLike(
        user_id,
        postUid,
			);
			
      if (response) {
        const deletedLike = { ...response};
        res.send(deletedLike);
      }
    } catch (err) {
      res.status(401).send("DB error");
    }
  });
};
