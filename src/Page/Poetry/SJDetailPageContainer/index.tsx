import * as React from 'react';
import { Text, View, StyleSheet, ScrollView ,Dimensions,ActivityIndicator} from 'react-native';

const {width, height} = Dimensions.get('window');//屏幕宽度

import { NavigationContext } from 'react-navigation';

import BaseComponent from '../../BasePageComponent/BaseComponent'

import {getSSWJChaptersDetail} from '../Api/SJApi'



interface SJDetailPageContainerProps {
}

const SJDetailPageContainer = (props: SJDetailPageContainerProps) => {
    const {setIsError, setIsFirstLoad, isError, isFirstLoad, renderErrorComponent} = BaseComponent({
      onErrorPress: () => getData()
    })
    const [detail, setDetail] = React.useState(null);
    const navigation = React.useContext(NavigationContext);
    let chapter = ''

    const getData = async () => {        
        chapter = navigation.state.params['chapter'];
        const res = await getSSWJChaptersDetail(chapter)
        if(res.status === 1) {
            setDetail(res.data)
            setIsFirstLoad(false)
            setIsError(false)
        }else {
          setIsFirstLoad(false)
          setIsError(true)
        }
    }

    React.useEffect(() => {
        chapter = navigation.state.params['chapter'];
        navigation.setParams({
          title:chapter
        })
        getData()  
        return () =>{
        }
    },[])

  return (
      <View style = {styles.viewContainer}>
          {renderErrorComponent()}
         {
           !isFirstLoad && !isError ?
           <ScrollView style={styles.container}>
              {/* <Text style = {styles.chapterTitle}>{detail && detail.chapter}</Text> */}
              {
                  detail && detail.paragraphs.map((item, index) => {
                    return  <Text key = {index} style = {styles.chapterDetail}>{item}</Text>
                  })
              }
          </ScrollView>:null
         }
      </View>
  );
};
SJDetailPageContainer.navigationOptions = ({navigation}) => ({
  title:navigation.state.params.title,
})

export default SJDetailPageContainer;

const styles = StyleSheet.create({
  container: {
      width:width,
      height:height,
  },
  viewContainer: {
    flex:1
  },
  chapterTitle: {
    fontSize:25,
    color:'#333333',
    alignSelf:'center',
  },
  chapterDetail:{
    fontSize:18,
    color:'#333333',
    alignSelf:'center',
    marginTop:20,
    marginHorizontal:20,
    lineHeight:24
  }
});
