import { log } from '../utils/log.mjs'
import { hash } from '../utils/crypto.mjs'

export function ConfirmationModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma

  return this
}

ConfirmationModel.prototype.load = async function (where) {
  this.record = await this.prisma.confirmation.findUnique({ where })

  return this.setExists()
}

ConfirmationModel.prototype.setExists = function () {
  this.exists = this.record ? true : false

  return this
}

ConfirmationModel.prototype.setResponse = function (status = 200, error = false) {
  this.response = {
    status,
    body: {
      result: 'success',
    },
  }
  if (status > 201) {
    this.response.body.error = error
    this.response.body.result = 'error'
    this.error = true
  } else this.error = false

  return this.setExists()
}

ConfirmationModel.prototype.setResponse = function (
  status = 200,
  result = 'success',
  error = false
) {
  this.response = {
    status: this.status,
    body: {
      error: this.error,
      result: this.result,
    },
  }
  if (error) {
    this.response.body.error = error
    this.error = true
  } else this.error = false

  return this.setExists()
}

ConfirmationModel.prototype.create = async function (data = {}) {
  try {
    this.record = await this.prisma.confirmation.create({ data })
  } catch (err) {
    log.warn(err, 'Could not create confirmation record')
    return this.setResponse(500, 'createConfirmationFailed')
  }
  log.info({ confirmation: this.record.id }, 'Confirmation created')

  return this.setResponse(201)
}