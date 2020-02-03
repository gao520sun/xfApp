import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';

import { NavigationContext } from 'react-navigation';

const {width, height} = Dimensions.get('window');//屏幕宽度

interface PoetryMainPageContainerProps {}

enum LIST_ENUM {
    sswj = "四书五经",
    tczz = '唐词作者',
    sczz = '宋词作者',
    lunyu = '论语'
}

const PoetryMainPageContainer = (props: PoetryMainPageContainerProps) => {

      const navigation = React.useContext(NavigationContext);
      const [list, setList] = React.useState([LIST_ENUM.sswj, LIST_ENUM.tczz, LIST_ENUM.sczz, LIST_ENUM.lunyu]);
    
       const _onNextSJDetailPage = (item) => {
           switch (item) {
                case LIST_ENUM.sswj:
                        navigation.navigate('SJChaptersPageContainer')
                    break;
                case LIST_ENUM.sczz:
                        navigation.navigate('SAuthorPageContainer')
                break;
                case LIST_ENUM.lunyu:
                        navigation.navigate('LYLunyunPageContainer')
                break;
                case LIST_ENUM.tczz:
                        navigation.navigate('TAuthorPageContainer')
                break;
           
               default:
                   alert('还未开发')
                   break;
           }
        }
    
        const _renderItem = ({item}) => {
            return (
                <TouchableOpacity key = {item} style = {styles.itemCell} onPress={() => _onNextSJDetailPage(item)}>
                    <Text style = {styles.itemText}>{item}</Text>
               </TouchableOpacity>
            )
        }
      
        const _keyExtractor = (item, index) => index + item;
      return (
        <View style={styles.container}>
          <FlatList 
              style = {styles.flatContainer}
              data = {list}
              keyExtractor={_keyExtractor}
              renderItem = {_renderItem}
        />
        </View>
      );
};

PoetryMainPageContainer.navigationOptions = ({navigation}) => ({
    title:'古诗词',
  })

export default PoetryMainPageContainer;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    flatContainer:{
      flex:1,
      
    },
    itemCell: {
      flex:1,
      width:width,
      height:50,
      borderBottomColor:'#e5e5e5',
      borderBottomWidth:0.5,
      justifyContent:'center'
    },
    itemText: {
      marginLeft:20,
    }
});
