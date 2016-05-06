/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  BackAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as XG from 'react-native-tencent-xg';

class sample extends Component {
  state = {
    event: '',
    eventArgs: null,
    devToken: 'waiting for registration',
  };

  componentDidMount() {
    XG.enableDebug(true);
    console.log(XG.allEvents());
    var registerHolder = XG.addEventListener('register', devToken => {
      this.setState({event: 'register', eventArgs: devToken});
    });

    if (!registerHolder) console.log('Fail to add event to handle register');

    var errorHolder = XG.addEventListener('error', err => {
      this.setState({event: 'error', eventArgs: err});
    });

    if (!errorHolder) console.log('Fail to add event to handle error');

    var remoteHolder = XG.addEventListener('notification', xgInstance => {
      this.setState({event: 'notification', eventArgs: xgInstance});
    });

    if (!remoteHolder)
      console.log('Fail to add event to handle remote notification');

    var localHolder = XG.addEventListener('localNotification', xgInstance => {
      this.setState({event: 'localNotification', eventArgs: xgInstance});
    });

    if (!localHolder) console.log('Fail to add event to local notification');

    this.setState({
      eventsHolder: [
        registerHolder,
        errorHolder,
        remoteHolder,
        localHolder
      ]
    });

    // Your accessId as number and your accessKey
    XG.setCredential(2100197325, 'A253BZM7P9NF');
    XG.register('SampleTester');
  }

  componentWillUnmount() {
    this.state.eventsHolder.filter(h => !!h).forEach(holder => holder.remove());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          {'Your device token is ' + this.state.devToken}
        </Text>
        <Text style={styles.instructions}
          onPress={
            () => {
              var fireDate = Date.now() + 60000;
              XG.scheduleLocalNotification({
                fireDate,
                alertBody: 'content of ' + fireDate,
              });
            }
          }>
          Press to send a local notification after 1min
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('sample', () => sample);
