import * as React from 'react';
import { Text, View, StyleSheet,SafeAreaView } from 'react-native';

import { NavigationContext } from 'react-navigation';

import WebView from 'react-native-webview'

interface NSWebViewPageContainerProps {
    uri:string
}

const NSWebViewPageContainer = (props: NSWebViewPageContainerProps) => {
    const navigation = React.useContext(NavigationContext);
    const params = navigation.state.params
  return (
    <View style={styles.container}>
    <WebView source = {{uri:params.uri}}/>
</View>
    
  );
};

NSWebViewPageContainer.navigationOptions = ({navigation}) => ({
    head:null,
  })

export default NSWebViewPageContainer;

const styles = StyleSheet.create({
  container: {
      flex:1
  }
});
