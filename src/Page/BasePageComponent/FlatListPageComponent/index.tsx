import * as React from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl } from 'react-native';

import ActivityIndicatorComponent from './ActivityIndicatorComponent'

import LoadPageComponent from '../LoadPageComponent'

import NotDatePageComponent from '../NotDatePageComponent'

interface FlatListPageComponentProps {
    renderCell:any,
    limit?:number,
    isDownRefresh?:boolean,
    isUpRefresh?:boolean,
    fetchData({offset:number,successCallback,errorCallback}): any,
}

enum GL_STATUS {
  /** 普通闲置状态 */
  GLRefreshStateIdle = 1,
  /** 松开就可以进行刷新的状态 */
  GLRefreshStatePulling,
  GLRefreshStateDownRefreshing,
  /** 正在刷新中的状态 */
  GLRefreshStateRefreshing,
  /** 所有数据加载完毕，没有更多的数据了 */
  GLRefreshStateNoMoreData,
}

enum MSG_FOOTER_MSG {
  MSGRefreshing = '正在刷新数据...',
  MSGNoMoreData = '已加载全部数据',
  MSGErrorData = '数据加载失败，点击重试'
}

const FlatListPageComponent = (props: FlatListPageComponentProps) => {
    const [list, setList] = React.useState([])
    const [isFirstLoading, setIsFirstLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)
    const [limit, setLimit] = React.useState(props.limit || 10);
    const [offset, setOffset] = React.useState(1);
    const [state, seState] = React.useState(GL_STATUS.GLRefreshStateIdle);
    // 接口返回错误
    const _errorCallback = () => {
        if(list.length <= 0) {
          setIsFirstLoading(false)
          setIsError(true)
        }
        seState(GL_STATUS.GLRefreshStateIdle)
    }
    const _successCallback = (res) => {
        setIsError(false)
        setIsFirstLoading(false)
        // 下拉刷新 需要把数组设置成空数组
        if(offset === 1) list.splice(0)
        // 上拉刷新新的的数据需要合并到总数据中
        const lt = list.concat(res)
        // 刷新
        setList(lt)
        // 上拉判断当前返回的数据是否小于定义好的数据
        if(res.length < limit) {
          seState(GL_STATUS.GLRefreshStateNoMoreData)
        }else {
          seState(GL_STATUS.GLRefreshStateIdle)
        }
    }
    // 错误点击重试
    const _onErrorPress = () => {
      setIsFirstLoading(true)
      setIsError(false)
      getData(1)
    }
    const getData = async (offset) => {
      // 把offset偏移量修改
      setOffset(offset)
      // 请求数据
      await props.fetchData({offset,successCallback:_successCallback, errorCallback:_errorCallback})
    }

    React.useEffect(() => {
      getData(1)
      return () => {
      }
    },[])
    const _notUpRefresh = () => {
      if(props.isUpRefresh === undefined || props.isUpRefresh == false) {
        return true
      }
      return false
    }
    const _notDownRefresh = () => {
      if(props.isDownRefresh === undefined || props.isDownRefresh == false) {
        return true
      }
      return false
    }
    // 下拉刷新
    const _refreshControl = () => {
      if(_notDownRefresh()) return
      return (
        <RefreshControl
          refreshing={state === GL_STATUS.GLRefreshStateDownRefreshing ? true : false}
          onRefresh={_handleRefresh}
          colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
          progressBackgroundColor="#ffffff"
    />
      )
    }
    const _handleRefresh = () => {
      seState(GL_STATUS.GLRefreshStateDownRefreshing)
      getData(1)
    }
    // 上拉刷新
    const _onEndReached = () => {
      if(_notUpRefresh()) return
      // 如果正在刷新 或者 没有数据 不进行任何操作
      if (state === GL_STATUS.GLRefreshStateRefreshing || state === GL_STATUS.GLRefreshStateDownRefreshing || state === GL_STATUS.GLRefreshStateNoMoreData) return;
      // 调用接口,状态为正在刷新
      seState(GL_STATUS.GLRefreshStateRefreshing)
      // 调用接口
      getData(offset + 1)
    }
    // 上拉内容
    const _ListFooterComponent = () => {
      if(_notUpRefresh() || isFirstLoading || isError) return <View></View>
      const stateText = state === GL_STATUS.GLRefreshStateRefreshing || state === GL_STATUS.GLRefreshStateDownRefreshing  ? MSG_FOOTER_MSG.MSGRefreshing : MSG_FOOTER_MSG.MSGNoMoreData
      return (
            <View style = {styles.footerView}>
                {state !== GL_STATUS.GLRefreshStateNoMoreData ? <ActivityIndicatorComponent/> : null}
                <Text style = {styles.footerText}>{stateText}</Text>
            </View>
      )
    }
    // cell内容
    const _renderItem = (item) => {
        return <View style = {styles.container}>
            {props.renderCell(item)}
        </View>
    }
    const _keyExtractor = (item, index) => index + item;
  return (
    <View style = {styles.container}>
      <FlatList 
            style = {styles.flatContainer}
            data = {list}
            renderItem = {_renderItem}
            onEndReached={_onEndReached}
            onEndReachedThreshold={0.1}
            refreshControl = {_refreshControl()}
            keyExtractor={_keyExtractor}
            ListFooterComponent = {_ListFooterComponent}
        />
        {
          isFirstLoading && !isError ? 
          <View style = {styles.loadingView}>
              <LoadPageComponent/>
          </View> : null
        }
        {
          isError ? 
          <View style = {styles.loadingView}>
              <NotDatePageComponent errorMsg = {'数据🏃了,点击重新获取数据'} onErrorPress = {_onErrorPress}/>
          </View> : null
        }
    </View>
  );
};

export default FlatListPageComponent;

const styles = StyleSheet.create({
  container: {
      flex:1,
      position:'relative'
  },
  flatContainer: {
      flex:1,
  },
  footerView: {
    flex:1,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
  footerText: {
    fontSize:14,
    color:'#333333',
    marginLeft: 5,
  },
  loadingView: {
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
  }
});
