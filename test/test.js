import * as assert from 'assert'
import * as q from '../index.js'

async function test(name) {
  //q.configure({ server: 'http://localhost:8080' })
  const algorithm = await q.get(name)
  assert.ok(algorithm.length > 0)
  const result = await q.execute(name)
  assert.ok(result.length > 0)
}

test('bell').catch(console.error)