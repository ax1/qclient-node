# qclient

Client for running quantum applications on qserver instances. See https://quantum.tecnalia.com.

## Install

```sh
npm install qclient-node
```

## Usage

```js
import * as q from 'qclient-node'

async function test(name) {
  q.configure({ server: 'http://localhost:8080', token:'AAA' })
  const algorithm = await q.get(name)
  const result = await q.execute(name)
  const data = '...qasm_or_quil...'
  const result = await q.execute(data)
}

test('bell').catch(console.error)
```

# Methods

- **configure({ server?, ext? ,token? })**: `server`: default server at https://quantum.tecnalia.com. `ext`: default '.qasm', useful in case always using the same language to represent the algorithm. `token`: default '', authorization token to execute services. E.g.: `configure({"token':'kkajsdkj-sudiuawjd...."})`.
- **get(algorithm_name)**: the algorithm in plain text, the extension of the file is optional. E.g.: `get('bell')`.
- **execute(algorithm_name or algorithm_description)**: based on the extension, an engine executes the algorithm and provides the result as string (depending on the engine, the result format can vary). E.g.: `execute('bell')`. If the algorithm is not stored yet, it can be executed by providing the text representation (in qasm, quil, etc.). E.g: execute('...qasm_string').
