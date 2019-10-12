const Realm = require('realm');
import React from 'react';
import {Text} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';
var base64js = require('base64-js')
var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realm: null,
    };
  }

  componentWillMount() {
    let randonmStr = create64String(); // w8TTelZzoWdP1otQIod3KoddYHRasaTBr5keryt1BVDCnhhnVWfImRl7g6Om4zZE
    // const b64encoded = btoa( // dzhUVGVsWnpvV2RQMW90UUlvZDNLb2RkWUhSYXNhVEJyNWtlcnl0MUJWRENuaGhuVldmSW1SbDdnNk9tNHpaRQ==
    //   'w8TTelZzoWdP1otQIod3KoddYHRasaTBr5keryt1BVDCnhhnVWfImRl7g6Om4zZE', // 4*ceil(n/3) so n = 6  i.e. 8 bytes = 64 bits
    // );
    const binaryArr = hexStringToByte('w8TTelZzoWdP1otQIod3KoddYHRasaTBr5keryt1BVDCnhhnVWfImRl7g6Om4zZE')
  //base64js.toByteArray(b64encoded);
    //console.log('b64encoded====', b64encoded);
    console.log('bytes====',binaryArr);
    console.log('from byte array===', toHexString(binaryArr))
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}],
      encryptionKey: binaryArr,
    }).then(realm => {

      realm.write(() => {
        realm.create('Dog', {name: 'Rex'});
      });
      this.setState({realm});
    });
  }

  render() {
    const info = this.state.realm
      ? 'Number of dogs in this Realm: ' +
        this.state.realm.objects('Dog').length
      : 'Loading...';

    return <Text>{info}</Text>;
  }
}
function create64String(){
										var text = "";
										for (var i = 0; i < 64; i++) {
											text += possible.charAt(Math.floor(Math.random() * possible.length));
										}
										console.log('@@@@@@ random text ', text);
										return text;
                  }
function toHexString(byteArray) {
      return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
      }).join('')
    }
function hexStringToByte(str) {
  let byteArray = [];
  for (let i = 0, len = str.length; i < len; i += 1) {
    byteArray.push(parseInt(str.substr(i, 2), 16));
  }
  return new Int8Array(byteArray); 
}