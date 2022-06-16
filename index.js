require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

app.use(express.json());

class Blog extends Model {}

Blog.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  underscored: true,
  timestamps: false,
  modelName: 'Blog' // We need to choose the model name
});

Blog.sync();


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

app.post('/api/blogs/', async (req, res) => {
  console.log(typeof req.body.likes);
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


const PORT = process.env.PORT || 3006
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`)
})

