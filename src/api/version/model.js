const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  vehicles: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  colors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color'
    }
  ],
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Option'
    }
  ]
}, { timestamps: true })

schema.methods.toJSON = function () {
  return {
    id: this.id,
    name: this.name,
    // colors: this.colors,
    model: this.model,
    options: this.options,
    vehicles: this.vehicles
  }
}

module.exports = schema
