import fetch from 'node-fetch'


let EXT = '.qasm'
let ENDPOINT = 'https://quantum.tecnalia.com'
let ENDPOINT_ALGORITHMS = ENDPOINT + '/algorithms'
let ENDPOINT_SERVICES = ENDPOINT + '/execute'

/**
 * Override default settings.
 * @param {object} options - { ext, server } 
 */
export function configure(options) {
  if (options?.ext) EXT = options.ext
  if (options?.server) {
    ENDPOINT = options.server
    ENDPOINT_ALGORITHMS = ENDPOINT + '/algorithms'
    ENDPOINT_SERVICES = ENDPOINT + '/services'
  }
}

/**
 * Get the source text of the algorithm
 * @param {string} name - Example: bell or bell.qasm or bell.quil
 */
export async function get(name) {
  const realName = name.includes('.') ? name : name + EXT
  const res = await fetch(ENDPOINT_ALGORITHMS + '/' + realName)
  if (!res.ok) throw res.status
  return await res.text()
}

/**
 * Execute an algorithm
 * @param {string} name_or_data - Example: bell or bell.qasm or bell.quil. If data, the algorithm provided is executed without saving in the repo. 
 * @returns string
 */
export async function execute(name_or_data) {
  if (name_or_data.length < 20) {
    const realName = name_or_data.includes('.') ? name_or_data : name_or_data + EXT
    const res = await fetch(ENDPOINT_SERVICES + '/run/' + realName, { method: 'post' })
    if (!res.ok) throw res.status
    return await res.text()
  } else {
    const res = await fetch(ENDPOINT_SERVICES + '/run/', { method: 'post', body: name_or_data })
    if (!res.ok) throw res.status
    return await res.text()
  }
}