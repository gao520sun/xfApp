import * as React from 'react';
import { Text, View, StyleSheet, Image,  TouchableOpacity} from 'react-native';

const icon40 = require('../../BaseResource/Icon/icon40.png')

interface NotDataPageComponentProps {
  errorMsg:string
  onErrorPress()
}

const NotDataPageComponent = (props: NotDataPageComponentProps) => {
  const _onErrorPress = () => {
    props.onErrorPress()
  }
  return (
    <TouchableOpacity style={styles.container} onPress = {() => _onErrorPress()}>
        <Image style = {styles.loadImage} source = {icon40}/>
        <Text style = {styles.loadText}>{props.errorMsg}</Text>
    </TouchableOpacity>
  );
};

export default NotDataPageComponent;

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
