const express = require('express');
const router = express.Router();
const { searchUsers ,showBlogs, searchBlogs, showTimeWiseBlogs, searchUserByID} = require('../controllers/searchController'); 

router.get('/timeline',showTimeWiseBlogs);
router.get('/search', searchUsers);
router.get('/showblogs/:userId',showBlogs);
router.get('/search/blogs',searchBlogs);
router.get('/search/userbyid/:userId',searchUserByID);
module.exports = router;

