const router = require("express").Router();
const { sequelize } = require('../util/db')
const { Blog, User } = require("../models");
const { errorHandler, authVerification} = require('../util/middleware')

router.get("/", authVerification, async (req, res, next) => {
  try {
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      model: Blog,
      // attributes: { exclude: ['userId'] },
      // include: {
      //   model: User,
      //   attributes: ['name']
      // }
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

router.put(":id", authVerification, async (req, res, next) => {
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

router.post("/", authVerification, async (req, res, next) => {
  try {
    console.log("HELLLLLLLOOOOOOOOOOOOOOO", req.authToken)
    const user = await User.findByPk(req.authToken.id);

    const blogs = await sequelize.query(
      `INSERT INTO blogs(author, url, title, likes,user_id) VALUES('${req.body.author}','${req.body.url}','${req.body.title}',${req.body.likes},${user.id})`,
      {
        model: Blog,
      }
    );

    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authVerification, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.authToken.id);

    const blog = await Blog.findByPk(req.params.id);
    console.log(user, blog);
    if (blog.userId === user.id) {
      const blogs =  await sequelize.query(
        `DELETE FROM blogs WHERE id=${req.params.id}`,
        {
          model: Blog,
        }
      );
      res.json(blogs);
    } else {
      res.send("No blog associated with this user found")
      throw new Error("No blog associated with this user found");
    }
    
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
