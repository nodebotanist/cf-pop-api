const fs = require('fs')
require('dotenv').load()
const csv = require('csv-parser')

const WorkerKV = require('./kv-module')

const kv = new WorkerKV()
const namespaceId = '87f12faa1bd14a17ac949ff65eaae944'
let dataCenters = []

function pause1sec() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, 1000)
	})
}

fs.createReadStream('../d3-vis/all-data-centers.csv')
	.pipe(csv())
	.on('data', (data) => { dataCenters.push(data) })
	.on('end', async function () {
		for(const dataCenter in dataCenters) {
			console.log('writing: ', dataCenters[dataCenter])
			await writeDataCenter(dataCenters[dataCenter])
			await pause1sec()
		}
	})

	async function writeDataCenter(dataCenter) {
		const result = await kv.write({
			namespaceId,
			key: dataCenter.lon + dataCenter.lat,
			value: JSON.stringify(dataCenter)
		})
		console.log(result)
	}

