import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContext } from 'react-navigation';

import FlatListPageComponent from '../../BasePageComponent/FlatListPageComponent'

import {getLunyuChaptersDetail} from '../Api/LYApi';

interface LYLunyuDetailPageContainerProps {}

const LYLunyuDetailPageContainer = (props: LYLunyuDetailPageContainerProps) => {
    const navigation = React.useContext(NavigationContext);
    const params = navigation.state.params || {}
    React.useEffect(() => {
        navigation.setParams({
            title:params.chapter || ''
          })
        return () => {
        }
    }, [])

    const fetchData = async ({successCallback,errorCallback}) => {
        
        const res = await getLunyuChaptersDetail(params['chapter'])
        if(res.status === 1) {
            successCallback(res.data)
        }else {
            errorCallback()
        }
        console.log('res:::',res)
    }
    const _renderItem = ({item}) => {
        return (
            <View key = {item} style = {styles.itemCell}>
                {/* <Text style = {styles.itemText}>{item.chapter}</Text> */}
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
            />
    </View>
  );
};

LYLunyuDetailPageContainer.navigationOptions = ({navigation}) => ({
    title:navigation.state.params.title,
  })

export default LYLunyuDetailPageContainer;

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
      paddingTop:20
    },
    itemText: {
        fontSize:20,
        color:'#333333',
        alignSelf:'center',
        marginVertical: 20,
        fontWeight:'bold'
    },
    itemDetail:{
        fontSize:16,
        color:'#333333',
        // alignSelf:'center',
        marginTop:0,
        marginHorizontal:20,
        lineHeight:20,
        marginBottom: 15,
    }
});
