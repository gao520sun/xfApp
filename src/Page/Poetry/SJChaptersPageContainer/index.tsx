import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import { NavigationContext } from 'react-navigation';

import {getSishuwujingChapters} from '../Api/SJApi'

import FlatListPageComponent from '../../BasePageComponent/FlatListPageComponent'

interface SJChaptersPageContainerProps {}

const SJChaptersPageContainer = (props: SJChaptersPageContainerProps) => {

  const navigation = React.useContext(NavigationContext);

    const fetchData = async ({offset,successCallback,errorCallback}) => {
      const res = await getSishuwujingChapters()
      if(res.status === 1) {
          successCallback(res.data)
      }else {
          errorCallback()
      }
  }
    React.useEffect(() => {
        return () => {
        }
    },[])

   const _onNextSJDetailPage = (item) => {
        navigation.navigate('SJDetailPageContainer', {"chapter":item})
    }

    const _renderItem = ({item}) => {
      
        return (
            <TouchableOpacity key = {item} style = {styles.itemCell} onPress={() => _onNextSJDetailPage(item)}>
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

SJChaptersPageContainer.navigationOptions = ({navigation}) => ({
  title:'四书五经',
})

export default SJChaptersPageContainer;

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
