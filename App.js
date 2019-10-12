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
    let randonmStr = create64String();
    const b64encoded = btoa(
      randonmStr, // 4*ceil(n/3) so n = 6  i.e. 8 bytes = 64 bits
    );
    const binaryArr = base64js.toByteArray(b64encoded);
    console.log('b64encoded====', b64encoded);
    console.log('bytes====',binaryArr);
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