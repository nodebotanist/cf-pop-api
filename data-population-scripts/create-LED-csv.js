const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csv = require('csv-parser')

const csvWriter = createCsvWriter({
	path: './datacenter-led-data.csv',
	header: [
		{ id: 'dataCenterID', title: 'dataCenterID' },
		{ id: 'status', title: 'status'},
		{ id: 'strand', title: 'strand' },
		{ id: 'led', title: 'led' }
	]
})

let dataCenters = []
let records = []

fs.createReadStream('../d3-vis/all-data-centers.csv')
	.pipe(csv())
	.on('data', (data) => { dataCenters.push(data) })
	.on('end', () => {
		for (const dataCenter in dataCenters) {
			records.push({
				dataCenterID: dataCenters[dataCenter].lon + dataCenters[dataCenter].lat,
				status: dataCenters[dataCenter].Status,
				strand: 7,
				led: 0
			})
		}
		csvWriter.writeRecords(records)
			.then(() => {
				console.log('...Done')
			})
	})

