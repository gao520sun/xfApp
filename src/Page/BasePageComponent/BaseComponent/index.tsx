import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import LoadPageComponent from '../../BasePageComponent/LoadPageComponent'

import NotDatePageComponent from '../../BasePageComponent/NotDatePageComponent'

interface BaseComponentProps {
  onErrorPress:() => {}
}

const BaseComponent = (props: BaseComponentProps) => {
    const [isFirstLoad, setIsFirstLoad] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const renderErrorComponent = () => {
      if(isFirstLoad && !isError) {
        return  <LoadPageComponent />
      }
      if(isError) {
        return <NotDatePageComponent errorMsg = {'数据🏃了,点击重新获取数据'} onErrorPress = {() => props.onErrorPress()}/>
      }
      return null
    }
   
    return {isFirstLoad, setIsFirstLoad, isError, setIsError, renderErrorComponent}
};

export default BaseComponent;

const styles = StyleSheet.create({
  container: {},
  viewContainer: {
    flex:1,
  }
});
