const express = require('express');
const router = express.Router();
const { searchUsers ,showBlogs, searchBlogs} = require('../controllers/searchController'); 

router.get('/search', searchUsers);
router.get('/showblogs/:userId',showBlogs);
router.get('/search/blogs',searchBlogs);
module.exports = router;

