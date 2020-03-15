# Description

This is a JavaScript library for convering a Status chat key ot a chat name.

# Details

This implementation is based off of a GoLang one in [`status-im/status-go`](https://github.com/status-im/status-go/tree/develop/protocol/identity/alias) repo.

It uses the [Linear-Feedback Shift Register](https://en.wikipedia.org/wiki/Linear-feedback_shift_register) algorithm on the 8 least significant bytes of the `X` of [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) public key.

# Building

You can update the contents of `dist` folder by running:
```
yarn test
yarn build
```

# Usage

The library exports just one method:
```js
const StatusIm = require('./dist/status-chat-name.js')

let chatKey = '0x040bc5bdbd8edf82962b191e80541d7ca8868920b1b415fcd999d6bd723cbbcff17f34e1e6e0484c11d9c7c63b164878a6da3173a49ceaf5fea2faac98928f8a47'

let chatName = StatusIm.chatKeyToChatName(chatKey)

if (chatName != 'Defensive Impartial Impala') {
  throw new Error('FAIL!')
}
```
