import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { NavigationContext } from 'react-navigation';

import NSWebViewPageContainer from '../NSWebViewPageContainer'

import {getNewsList} from '../APi/NSApi'
// import ScrollableTabView from 'react-native-scrollable-tab-view'

// import CustomTabComponent from '../Components/CustomTabComponent'

// import NSNewsListPageContainer from '../NSNewsListPageContainer'

interface NSNewsMainPageContainerProps {}

const NSNewsMainPageContainer = (props: NSNewsMainPageContainerProps) => {

  const navigation = React.useContext(NavigationContext);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    getDataApi()
  }, [])

  const getDataApi = async () => {
    const res = await getNewsList();
    if(res.status === 1) {
      setList(res.data)
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

  //   const tabs = ['头条,头条头条头条', '社会社会社会', '国内国内国内', '国际国际国际', '娱乐', '体育', '军事', '财经', '科技', '时尚']
  //   const _renderTabBar = () => {
  //       return (
  //           <CustomTabComponent tabs = {tabs}/>
  //       )
  //   }

  //   const scorllableTabviev = () => {
  //       return (
  //           <ScrollableTabView renderTabBar = {() => _renderTabBar()}>
  //               {tabs.map((item, index) => {
  //                   return <NSNewsListPageContainer tabLabel = {item}  key = {index} style = {{width:100,height:100,backgroundColor:'red'}} />
  //               })}
  //           </ScrollableTabView>
  //       )
  //   }
  // return (
  //   <View style={styles.container}>
  //     {scorllableTabviev()}
  //   </View>
  // );
};

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



