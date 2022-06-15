const router = require('express').Router();
const postCtrl= require('../controllers/postcontroller');

router.get('/', postCtrl.readPost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
router.patch('/like-post/:id', postCtrl.likePost);
router.patch('/unlike-post/:id', postCtrl.unlikePost);

module.exports = router;