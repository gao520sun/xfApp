import * as React from 'react';
import { Text, View, StyleSheet, Image,Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');//屏幕宽度

import icon40 from '../../BaseResource/Icon/icon40.png'

interface LoadPageComponentProps {
    title?:string
}
const title = '正在努力加载数据...'
const LoadPageComponent = (props: LoadPageComponentProps) => {
  return (
    <View style={styles.container}>
        <Image style = {styles.loadImage} source = {icon40}/>
        <Text style = {styles.loadText}>{props.title || title}</Text>
    </View>
  );
};

export default LoadPageComponent;

const styles = StyleSheet.create({
  container: {
      flex:1,
      // width,
      // height,
      justifyContent:'center',
      alignItems:'center',
  },
  loadImage:{
      width:60,
      height:60,
  },
  loadText: {
      fontSize:12,
      color:'#333333',
      marginTop:15
  }
});
