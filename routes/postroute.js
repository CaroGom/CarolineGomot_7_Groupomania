const router = require('express').Router();
const postCtrl= require('../controllers/postcontroller');
const uploadCtrl= require('../controllers/uploadcontroller');
const auth= require('../middlewares/authmiddleware');
const multer= require('../middlewares/multermiddleware');


router.get('/', postCtrl.readPost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.patch('/like-post/:id', auth, postCtrl.likePost);
router.patch('/unlike-post/:id', auth, postCtrl.unlikePost);

//comments

router.patch('/comment-post/:id', auth, postCtrl.commentPost);
router.patch('/edit-comment-post/:id', auth, postCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', auth, postCtrl.deleteCommentPost);

//upload



module.exports = router;