import { test } from 'zora'
import { chatKeyToChatName } from '../src/main.js'

const testCases = [
  { name: ["Enormous", "Vain", "Angwantibo"],
    key: "0x041c678bdeb6940df3e436cee76612ae6177f46e54e541fc024b572fafd9be89ba43612d6e26bba8f3961b5d379efe1fb031a718ea24936a83550086f4ba2c5c94" },
  { name: ["Grandiose", "Cooperative", "Kitfox"],
    key: "0x0447b772a4bb239b78d20f980e88c015d885e174b78654bbf7c35f38b1d9b73197decf7d769a7da261089e32f740154a6c8a33c577c0debc9caa57d2803fc29c4c" },
  { name: ["Quarrelsome", "Equatorial", "Curlew"],
    key: "0x048bea344d9e618556de6e6735987ab11984fa7a74f8cddfef81c906ea6647c5022b0dead89d33c104adf452e304cf7c2c5c37257a77837af6e839c80e1b310f65" },
  { name: ["Insecure", "Grumpy", "Adouri"],
    key: "0x04f6b657140489de221184b0ec3134de0d5486c07fd04ebba3e28b26237904f7a37087ad60a60c1255dfbe94a37e835581f5c6a435dcd4226f12ad73485ebd0282" },
  { name: ["Humming", "Brilliant", "Aoudad"],
    key: "0x04232d990f05e918ab1cbf9c5b3fe103280a21900b650477dfbeff2835651a77e9bbc0d40c44d41d3aaf16eae16f1b3d604107032c43275d996f5d7a7242ae66bb" },
  { name: ["Sentimental", "Stiff", "Wallaby"],
    key: "0x0419cdc5d7316e4f9ae55e5eda00c337600c64fb21451e0ddec37b6e5a5b19936daafcc8a0c61da05ef963d9d342b5cbb661de89f11f02f1791ea97a70ce4b4fa0" },
  { name: ["Amused", "Cadetblue", "Acouchi"],
    key: "0x049c450deea541169809902d6199f0269bfb60439cd93b7339af98cf0bf6d553d6e73435105c7131a72d512c75707bc073bd426ad742aecde64d14f74d0dca5f5c" },
  { name: ["Alive", "Jagged", "Alligator"],
    key: "0x04722d1a490efc6fdb811c266fc3fa0a59ea5f2984538bb134cec219da0e4e6646ce31c57522e58839e8d441c1af792f9d367558560632b48fca68fde00fe5de0c" },
  { name: ["Defensive", "Impartial", "Impala"],
    key: "0x040bc5bdbd8edf82962b191e80541d7ca8868920b1b415fcd999d6bd723cbbcff17f34e1e6e0484c11d9c7c63b164878a6da3173a49ceaf5fea2faac98928f8a47" },
]

test('chatKeyToChatName', t => {
  for (let c of testCases) {
    let chatName = chatKeyToChatName(c.key)
    t.equal(chatName, c.name, `should return ${c.name.join(' ')}`)
  }
})
