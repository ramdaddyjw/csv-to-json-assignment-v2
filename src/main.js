const path = require('path')
const fs = require('fs')
const utils = require('./conversionUtils.js')

// Path information
const resourcesDir = path.join(__dirname, '..', 'resources')
const customerData = path.join(resourcesDir, 'customer-data.csv')
const customerJson = path.join(resourcesDir, 'customer-data.json')

// Algorithm is to read the file, split on the lines, then convert each line
// to a Customer before converting the Customer to JSON. Finally, add the JSON
// to an array, then write the array of customer JSON to file.
function fileConversion() {
  let customers = []

  // Start with reading the file in
  fs.readFile(customerData, 'utf-8', (err, data) => {
    if (err) {
      return console.error(err)
    }
    let lines = data.split('\r\n')

    // Get the key values from the first line
    const customerKeys = lines.shift().split(',')

    // Now each line has customer data, so fill the array of customer objects
    for (let line of lines) {
      let customer = utils.createCustomer(customerKeys, line)
      customers.push(customer)
    }

    // Finally, take the array of JSON customers and write the array out to file
    fs.writeFile(customerJson, utils.convertArrayToJson(customers), (err) => {
      if (err)
        throw console.error(err)
      console.log('Customer JSON file written!')
    })
  })
}

fileConversion();
