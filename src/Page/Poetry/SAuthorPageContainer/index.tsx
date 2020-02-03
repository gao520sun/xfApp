import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContext } from 'react-navigation';

import FlatListPageComponent from '../../BasePageComponent/FlatListPageComponent'

import {getSongAuthor} from '../Api/SongApi'

interface SAuthorPageContainerProps {}

const SAuthorPageContainer = (props: SAuthorPageContainerProps) => {
    const navigation = React.useContext(NavigationContext);
    React.useEffect(() => {
        return () => {
        }
    }, [])
    const _onAuthorListPress = (item) => {
        navigation.navigate('SAuthorPoetryPageContainer',{...item})
    }
    const fetchData = async ({offset,successCallback,errorCallback}) => {
        const res = await getSongAuthor({limit:10, offset:offset})
        if(res.status === 1) {
            successCallback(res.data)
        }else {
            errorCallback()
        }
    }
    const _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress = {() =>_onAuthorListPress(item)} activeOpacity = {0.5} key = {item} style = {styles.itemCell}>
                <Text style = {styles.itemText}>{item.author}</Text>
                <Text style = {styles.itemDetail}>{item.description}</Text>
           </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <FlatListPageComponent 
                renderCell = {_renderItem}
                fetchData  = {(param) =>fetchData(param)}
                isUpRefresh = {true}
                isDownRefresh = {true}
            />
        </View>
    );
};

SAuthorPageContainer.navigationOptions = ({navigation}) => ({
    title:'作者',
  })

export default SAuthorPageContainer;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    flatContainer:{
      flex:1,
      
    },
    itemCell: {
      flex:1,
      borderBottomColor:'#e5e5e5',
      borderBottomWidth:0.5,
      justifyContent:'center'
    },
    itemText: {
        fontSize:20,
        color:'#333333',
        alignSelf:'center',
        marginTop:25
    },
    itemDetail:{
        fontSize:16,
        color:'#999b9d',
        alignSelf:'center',
        marginTop:25,
        marginHorizontal:20,
        lineHeight:20,
        marginBottom: 15,
    }
});
