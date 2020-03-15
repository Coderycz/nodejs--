const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categroies: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  title: { type: String },
  body: { type: String },
})

module.exports = mongoose.model('Article', schema)