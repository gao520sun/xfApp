import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContext } from 'react-navigation';

import FlatListPageComponent from '../../BasePageComponent/FlatListPageComponent'

import {getLunYuChapters} from '../Api/LYApi';

interface LYLunyuPageContainerProps {}

const LYLunyuPageContainer = (props: LYLunyuPageContainerProps) => {
    const navigation = React.useContext(NavigationContext);
    const params = navigation.state.params || {}
    React.useEffect(() => {
        return () => {
        }
    }, [])

    const _onLunyuDetailPass = (item) => {
        navigation.navigate('LYLunyuDetailPageContainer', {chapter:item})
    }

    const fetchData = async ({offset,successCallback,errorCallback}) => {
        const res = await getLunYuChapters()
        if(res.status === 1) {
            successCallback(res.data)
        }else {
            errorCallback()
        }
    }
    const _renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity = {0.5} key = {item} style = {styles.itemCell} onPress = {() => _onLunyuDetailPass(item)}>
                <Text style = {styles.itemText}>{item}</Text>   
           </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
      <FlatListPageComponent 
                renderCell = {_renderItem}
                fetchData  = {(param) =>fetchData(param)}
            />
    </View>
  );
};

LYLunyuPageContainer.navigationOptions = ({navigation}) => ({
    title:'论语章节',
  })

export default LYLunyuPageContainer;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    flatContainer:{
      flex:1,
      
    },
    itemCell: {
        flex:1,
        height:50,
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:0.5,
        justifyContent:'center'
      },
      itemText: {
        marginLeft:20,
      }
});
