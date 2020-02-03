import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContext } from 'react-navigation';

import FlatListPageComponent from '../../BasePageComponent/FlatListPageComponent'

import {getTangAuthorPoetry} from '../Api/TangApi';

interface TAuthorPoetryPageContainerProps {}

const TAuthorPoetryPageContainer = (props: TAuthorPoetryPageContainerProps) => {
    const navigation = React.useContext(NavigationContext);
    const params = navigation.state.params || {}
    React.useEffect(() => {
        navigation.setParams({
            title:params.author || ''
          })
        return () => {
        }
    }, [])

    const fetchData = async ({offset,successCallback,errorCallback}) => {
        
        const res = await getTangAuthorPoetry({limit:10, offset:offset, author: params['author']})
        if(res.status === 1) {
            successCallback(res.data)
        }else {
            errorCallback()
        }
    }
    const _renderItem = ({item}) => {
        return (
            <View key = {item} style = {styles.itemCell}>
                <Text style = {styles.itemText}>{item.title}</Text>
                {item && item.paragraphs.map((item, index) => {
                    return<Text key = {index} style = {styles.itemDetail}>{item}</Text>
                })    
                }
           </View>
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

TAuthorPoetryPageContainer.navigationOptions = ({navigation}) => ({
    title:navigation.state.params.title,
  })

export default TAuthorPoetryPageContainer;

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
      justifyContent:'center',
      alignItems:'center'
    },
    itemText: {
        fontSize:20,
        color:'#333333',
        alignSelf:'center',
        marginVertical: 20,
    },
    itemDetail:{
        fontSize:16,
        color:'#999b9d',
        marginTop:0,
        marginHorizontal:20,
        lineHeight:20,
        marginBottom: 10,
    }
});
