import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { NavigationContext } from 'react-navigation';

import FlatListPageComponent from '../../BasePageComponent/FlatListPageComponent'

import {getNewsList} from '../APi/NSApi'

interface NSNewsMainPageContainerProps {}

const NSNewsMainPageContainer = (props: NSNewsMainPageContainerProps) => {

  const navigation = React.useContext(NavigationContext);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {

  }, [])

  const fetchData = async ({successCallback,errorCallback}) => {
    const res = await getNewsList();
    if(res.status === 1) {
      successCallback(res.data)
    }else {
      errorCallback()
    }
  }

   const _onNextSJDetailPage = (item) => {
      navigation.navigate('NSWebViewPageContainer',{uri:item.url})
    }

    const _renderItem = ({item}) => {
        return (
            <TouchableOpacity key = {item} style = {styles.itemCell} onPress={() => _onNextSJDetailPage(item)}>
                <Text style = {styles.itemText}>{item.title}</Text>
           </TouchableOpacity>
        )
    }
  
  return (
    <View style={styles.container}>
      <FlatListPageComponent 
          fetchData = {(param) =>fetchData(param)}
          renderCell = {_renderItem}
    />
    </View>
  );
};

NSNewsMainPageContainer.navigationOptions = ({navigation}) => ({
  title:'新闻工作室',
})
export default NSNewsMainPageContainer;

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



