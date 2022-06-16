const router = require('express').Router()

const { Blog } = require('../models')

app.get('/api/blogs', async (req, res) => {
  const blogs = await sequelize.query("SELECT * FROM blogs", {
    model: Blog,
  });

  blogs.forEach(blog => {
    console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
  })
  res.json(blogs)
})

app.get('/api/blogs/:id', async (req, res) => {
  const blogs = await sequelize.query(`SELECT * FROM blogs WHERE id=${req.params.id}`, {
    model: Blog,
  });
  
  res.json(blogs);
})

app.put('/api/blogs/:id', async (req, res) => {
  const blogs = await sequelize.query(`UPDATE blogs SET likes=${req.body.likes} WHERE id=${req.params.id}`, {
    model: Blog,
  });
  
  res.json(blogs);
})


app.post('/api/blogs/', async (req, res) => {
  const blogs = await sequelize.query(`INSERT INTO blogs(author, url, title, likes) VALUES('${req.body.author}','${req.body.url}','${req.body.title}',${req.body.likes})`, {
    model: Blog,
  });
  
  res.status(200).json(blogs);
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blogs = await sequelize.query(`DELETE FROM blogs WHERE id=${req.params.id}`, {
    model: Blog,
  });
  
  res.json(blogs);
})

module.exports = router