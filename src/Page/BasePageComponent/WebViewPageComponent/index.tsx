import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import WebView from 'react-native-webview'

import LoadPageComponent from '../LoadPageComponent'

import NotDatePageComponent from '../NotDatePageComponent'

const WebViewPageComponent = (props: any,) => {
    const [isFirstLoading, setIsFirstLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)
    const errorMsg = '数据🏃了,点击重新获取数据'

    const _onLoadStart = (e) => {
        console.log('start:::',e.nativeEvent)
        // setIsFirstLoading(true)
    }
    const _onLoadEnd = (e) => {
        console.log('end:::',e.nativeEvent)
        setIsFirstLoading(false)
    }
    const _onLoad = (e) => {
        console.log('load:::',e.nativeEvent)
        setIsFirstLoading(false)
    }
    const _onError = (e) => {
        console.log('error:::',e.nativeEvent)
        setIsFirstLoading(false)
        setIsError(true)
    }

    const _onNavigationStateChange = (e) => {
        console.log('e:::',e)
        if(props.onNavigationStateChange) {
            props.onNavigationStateChange(e)
        }
    }
    const _onErrorPress = () => {
        setIsFirstLoading(true)
        setIsError(false)
    }
  return (
    <View style={styles.container}>
      <WebView 
        ref = {props.webViewRef}
        source = {{uri:props.uri}}
        onNavigationStateChange = {(e) => _onNavigationStateChange(e)}
        onLoadStart = {(e) => _onLoadStart(e)}
        onLoadEnd = {(e) => _onLoadEnd(e)}
        onLoad = {(e) => _onLoad(e)}
        onError = {(e) => _onError(e)}
      />
      {
          isFirstLoading ? 
            <View  style = {styles.loadingView}>
                <LoadPageComponent/>
            </View> :null
      }
      {
          isError ? 
          <View style = {styles.loadingView}>
              <NotDatePageComponent errorMsg = {errorMsg} onErrorPress = {_onErrorPress}/>
          </View> : null
        }
    </View>
  );
};

export default WebViewPageComponent;

const styles = StyleSheet.create({
  container: {
      flex:1,
      position:'relative'
  },
  loadingView: {
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    // backgroundColor:'rgba(5,49,125,0.6)'
    // backgroundColor:'transparent'
  }
});
