const express = require('express');
const upload = require('../helper/file')
const router = express.Router();
const Product = require('../models/product')
const csrf = require('csurf')
const crufProduction = csrf()
router.use(crufProduction)
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, (err,date)=>{
    if(err){
      console.log(err);
    }
    else{
      res.render('shop/index', { title: 'Express', date: date.map(item=>{
        return {
          title: item.title,
          _id : item._id,
          description: item.description,
          img: item.img,
          price: item.price
        }
      }) });
      // console.log(date);
    }
  })
});
router.get('/add', function(req, res, next) {
  res.render('shop/add', { title: 'Add Product' });
});
router.post('/add', upload.single('img'), (req, res, next) => {
  try {
      // console.log(req.body); 
      const product = new Product({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          img: req.file.filename,
      })
      product.save((err, product) => {
          if (err) {
              console.log(err);
          } else {
              res.redirect('/')
          }
      })
      console.log(req.file);
  } catch (error) {
      console.log(error);
  }
});
router.get('/signup', (req,res,next)=>{
  res.render('user/signup', {
    title: "Sign up",
    csrfToken : req.csrfToken()
  })
})

module.exports = router;
