const express = require('express');
const router = express.Router();

// Dummy in-memory data storage
let posts = [];
let nextId = 1;

// Render the home page with posts
router.get('/', (req, res) => {
    res.render('index', { posts });
});

// Render the form to create a new post
router.get('/create', (req, res) => {
    res.render('create');
});

// Handle post creation
router.post('/create', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: nextId++, title, content });
    res.redirect('/');
});

// Render the form to edit a post
router.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('edit', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

// Handle post update
router.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = { id: postId, title, content };
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

// Handle post deletion
router.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/');
});

module.exports = router;
