import * as React from 'react';
import { TouchableOpacity, View, StyleSheet,Image } from 'react-native';

import { NavigationContext } from 'react-navigation';

import WebViewPageComponent from '../../BasePageComponent/WebViewPageComponent'

const navBackImg = require('../Image/nav_back.png');
const navWebCaImg = require('../Image/web_ca.png');
interface NSWebViewPageContainerProps {
    uri:string
}

const NSWebViewPageContainer = (props: NSWebViewPageContainerProps) => {
    const navigation = React.useContext(NavigationContext);
    const params = navigation.state.params
    let webViewPage = React.useRef();

    const _onNavigationStateChange = (e) => {
      navigation.setParams({
        title:e.title || '',
        event:{...e, webView:webViewPage.current},
      })
    }
  return (
    <View style={styles.container}>
      <WebViewPageComponent 
        webViewRef = {webViewPage}
        uri = {params.uri}
        onNavigationStateChange = {(e) => _onNavigationStateChange(e)}
      />
  </View>
  );
};

NSWebViewPageContainer.navigationOptions = ({navigation}) => ({
    title:navigation.state.params.title,
    headerLeft: (
      <View style={{width: 100, height: 40, flexDirection: 'row', alignItems:'center'}}>
        <TouchableOpacity onPress = {() => {navigation.state.params.event && navigation.state.params.event.canGoBack ? navigation.state.params.event.webView.goBack() : navigation.goBack()}} style = {{paddingLeft:15}}>
           <Image style={{width: 20, height: 20}} source={navBackImg} />
        </TouchableOpacity>
        {
         navigation.state.params.event && navigation.state.params.event.canGoBack ?  <TouchableOpacity onPress = {() => {navigation.goBack()}} style = {{flex:1, paddingLeft:15}}>
           <Image style={{width: 15, height: 15}} source={navWebCaImg} />
             </TouchableOpacity> : null
        }
      </View>
    )
  })

export default NSWebViewPageContainer;

const styles = StyleSheet.create({
  container: {
      flex:1
  }
});
