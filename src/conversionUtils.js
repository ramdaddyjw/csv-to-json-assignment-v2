
function createCustomer (keys, data) {
  let values = data.split(',')
  let customer = {}

  keys.forEach((key, i) => {
    customer[key] = values[i]
  })
  return customer
}

function convertArrayToJson(customersArray) {
  return JSON.stringify(customersArray, null, 2)
}

module.exports = {
  createCustomer,
  convertArrayToJson
}
