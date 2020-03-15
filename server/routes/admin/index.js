module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  
  app.use('/admin/api/rest/:resource', (req, res, next) =>{
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '\\..\\..\\uploads'})
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '\\..\\..\\uploads')
    },
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  })
  // var upload = multer({ storage: storage })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = 'http://localhost:4000/uploads/'+ file.filename
    res.send(file)
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    console.log(req.Model,model)
    res.send(model)
  })

  router.get('/', async (req, res) => {
    let options = {}
    if(req.Model.modelName === 'Category'){
      options = {
        populate : 'parent'
      }
    }
    const items = await req.Model.find().setOptions(options).limit(10)
    res.send(items)
  })

  router.get('/:id', async (req, res) =>{
    console.log(req.params)
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  router.put('/:id', async (req, res) =>{
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) =>{
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send(model)
  })

  
}