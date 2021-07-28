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
 * @param {string} name - Example: bell or bell.qasm or bell.quil 
 * @returns string
 */
export async function execute(name) {
  const realName = name.includes('.') ? name : name + EXT
  const res = await fetch(ENDPOINT_SERVICES + '/run/' + realName, { method: 'post' })
  if (!res.ok) throw res.status
  return await res.text()
}