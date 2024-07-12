//服务端 API
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')
const bodyParser = require('body-parser');

// const Post = require('./models/post');
const ico_set = require('./models/ico_set');
const Blog_set = require('./models/blog_set');
const Article_set = require('./models/article_set')
const Note_set = require('./models/note_set');
const article_set = require('./models/article_set');

const app = express();

app.use(cors())
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mernblogdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//博客数据获取
app.get('/api/posts', async (req, res) => {
  try {
     // 查询数据库
    const data = await Blog_set.find();
    res.json(data);// 将数据以JSON格式发送回客户端
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});
app.delete('/api/posts/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const deletedBlog = await Blog_set.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: '找不到要删除的笔记' });
    }
    res.json({ message: '笔记已删除' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '删除笔记时发生错误' });
  }
});
//ico标签数据获取
app.get('/api/icos', async (req, res) => {
  try {
    const data = await ico_set.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});
//ico删除请求
app.delete('/api/icos/:id', async (req, res) => {
  const icoId = req.params.id;
  try {
    const deletedIco = await ico_set.findByIdAndDelete(icoId);
    if (!deletedIco) {
      return res.status(404).json({ message: '找不到要删除的笔记' });
    }
    res.json({ message: '笔记已删除' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '删除笔记时发生错误' });
  }
});
//article文章数据获取
app.get('/api/articles', async (req, res) => {
  try {
    const data = await Article_set.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});
//article删除请求
app.delete('/api/article/:id', async (req, res) => {
  const articleId = req.params.id;
  try {
    const deletedArticle = await article_set.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return res.status(404).json({ message: '找不到要删除的笔记' });
    }
    res.json({ message: '笔记已删除' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '删除笔记时发生错误' });
  }
});
//note笔记数据获取
app.get('/api/notes', async (req, res) => {
  try {
    const data = await Note_set.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});
//note删除请求
app.delete('/api/notes/:id', async (req, res) => {
  const noteId = req.params.id;
  try {
    const deletedIco = await Note_set.findByIdAndDelete(noteId);
    if (!deletedIco) {
      return res.status(404).json({ message: '找不到要删除的笔记' });
    }
    res.json({ message: '笔记已删除' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '删除笔记时发生错误' });
  }
});
//note的创建添加请求
app.post('/api/notes', async (req, res) => {
  try {
    const note = new Note_set(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});
//icos创建添加请求
app.post('/api/icos',async(req,res)=> {
  try {
    const ico = new ico_set(req.body);
    await ico.save();
    res.status(201).json(ico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
})

//blog 数据聚合
app.get('/api/posts/:icoType', async (req, res) => {
  const icoType = req.params.icoType; // 从URL参数中获取类型名称
  try {
    const data = await Blog_set.find({ icoType }); // 以类型名称作为查询条件查询博客文章
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }
});

//article 数据聚合
app.get('/api/articles/:icoType',async(req,res)=>{
  const icoType = req.params.icoType;
  try{
    const data = await article_set.find({ icoType });
    res,json(data)
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器错误' });
  }

})


// app.put('/api/posts/:id', async (req, res) => {
//   const updatedPost = await Blog_set.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedPost);
// });

const PORT = process.env.PORT || 3033;

app.listen(PORT, () => 
  // console.log(`http://localhost:${PORT}`)
  // console.log(`http://localhost:${PORT}/api/data`)
  console.log(`http://localhost:${PORT}/api/posts`)
  
);




