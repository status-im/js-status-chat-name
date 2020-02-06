import { test } from 'zora'
import { uncompressedPublicKeyToChatName } from '../src/main.js'

const testCases = [
  { 
    name: [ 'Studious', 'Gold', 'Mustang' ],
    key: "0x0461f576da67dc0bca9888cdb4cb28c80285b756b324109da94a081585ed6f007cf00afede6b3ee5638593674fee100b590318fc7bdb0054b8dd9445acea216ad2",
  },
  { 
    name: [ 'Studious', 'Gold', 'Mustang' ],
    key: "0x0461f576da67dc0bca9888cdb4cb28c80285b756b324109da94a081585ed6f007cf00afede6b3ee5638593674fee100b590318fc7bdb0054b8dd9445acea216ad2",
  },
]

test('uncompressedPublicKeyToChatName', t => {
  for (let c of testCases) {
    let chatName = uncompressedPublicKeyToChatName(c.key)
    t.equal(chatName, c.name, `should return ${c.name.join(' ')}`)
  }
})
