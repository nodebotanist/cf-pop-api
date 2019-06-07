const dataCenters = require('./data-centers.json')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  DataCenterKV.put('centers', JSON.stringify(dataCenters))
  return new Response(JSON.stringify(dataCenters), { status: 200 })
}
