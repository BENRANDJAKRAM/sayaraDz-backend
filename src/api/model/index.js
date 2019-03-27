const router = require('express').Router()
const { create, read, deleteOne, update } = require('./controller')
const versions = require('../version')
const http = require('../../services/http')
const Model = require('../model/model')

router.use('/:id/versions', async (req, res, next) => {
  const { manufacturer: { models }, params: { id } } = req
  const index = models.indexOf(id)
  if (index !== -1) {
    req.model = await Model.findById(models[index])
    return next()
  }
  http.notFound(res, {
    error: true,
    msg: 'model not found'
  })
})
router.use('/:id/versions', versions)
router.get('/', read)
router.post('/', create)
router.delete('/:id', deleteOne)
router.put('/:id', update)

module.exports = router