const humps = require('humps')
const { activation } = require('../../services/Auth')
var licenseKey = require('license-key-gen')
const { getHWID } = require('hwid')
let replace = require('lodash.replace');
var path = require('path')
var fs = require('fs')

module.exports = async (req, res) => {
  let payload = humps.camelizeKeys(req.body)

  try {
    let hwid = await getHWID()

    var userInfo = {
      company: 'mindsolution.tech',
      hardwareid: hwid,
      city: 'city/town',
      state: 'State/Province',
      zip: 'postal/zip',
    }
    var licenseData = {
      info: userInfo,
      prodCode: 'VAG',
      appVersion: '1.0',
      osType: 'WIN10',
    }

    var license = licenseKey.validateLicense(licenseData, payload.key)
    if (license.message == "ok") {
      res.send({
        status: true,
        activationkey: payload.key
      })
    } 
  } catch (err) {
    res.send({
      status: false,
      ...err
    })
  }
}
