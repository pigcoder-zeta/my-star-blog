const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// --- 模拟数据库 ---
const users = []; 

// 【新增】文章数据库 (预先放一篇欢迎文章)
const articles = [
    {
        id: 1,
        title: "欢迎来到我的个人博客",
        content: "这是我的第一篇文章！全栈开发真是太有趣了。",
        date: "2023-10-27"
    }
];

// --- 接口 1: 用户注册 ---
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(u => u.username === username);
    if (userExists) return res.status(400).json({ success: false, message: "用户名已存在" });
    users.push({ username, password });
    res.json({ success: true, message: "注册成功" });
});

// --- 【新增】接口 2: 获取所有文章 (GET) ---
app.get('/articles', (req, res) => {
    // 把文章列表发给前端
    res.json(articles); 
});

// --- 【新增】接口 3: 发布新文章 (POST) ---
app.post('/articles', (req, res) => {
    const { title, content } = req.body;
    
    // 创建一个新文章对象
    const newArticle = {
        id: Date.now(), // 用时间戳做唯一ID
        title: title,
        content: content,
        date: new Date().toLocaleDateString() // 今天的日期
    };

    articles.unshift(newArticle); // 把新文章加到数组最前面
    console.log("收到新文章:", title);
    
    res.json({ success: true, message: "发布成功！" });
});

app.listen(PORT, () => {
    console.log(`🚀 博客服务器运行中: http://localhost:${PORT}`);
});