const router = require("express").Router();
const { sequelize } = require('../util/db')
const { Blog } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      model: Blog,
    });

    blogs.forEach((blog) => {
      console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`);
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const blogs = await sequelize.query(
      `SELECT * FROM blogs WHERE id=${req.params.id}`,
      {
        model: Blog,
      }
    );
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.put(":id", async (req, res, next) => {
  try {
    const blogs = await sequelize.query(
      `UPDATE blogs SET likes=${req.body.likes} WHERE id=${req.params.id}`,
      {
        model: Blog,
      }
    );

    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const blogs = await sequelize.query(
      `INSERT INTO blogs(author, url, title, likes) VALUES('${req.body.author}','${req.body.url}','${req.body.title}',${req.body.likes})`,
      {
        model: Blog,
      }
    );

    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const blogs = await sequelize.query(
      `DELETE FROM blogs WHERE id=${req.params.id}`,
      {
        model: Blog,
      }
    );
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
