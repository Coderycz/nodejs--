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

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
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