require('dotenv').load()
const WorkerKV = require('./kv-module')

const kv = new WorkerKV()

kv.listKeys({
	namespaceId: '87f12faa1bd14a17ac949ff65eaae944'
}).then((keyList) => {
	console.log(keyList)
})