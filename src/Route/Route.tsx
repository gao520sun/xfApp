/*
 * @Descripttion: 
 * @version: 
 * @Author: gaozhonglei
 * @Date: 2019-11-30 22:13:50
 * @LastEditors  : gaozhonglei
 * @LastEditTime : 2020-01-06 21:55:16
 */
import React from 'react'

import {Image, View} from 'react-native'

import { createAppContainer } from 'react-navigation';

import StackNav from '../Component/BaseComponent/StackNavigatorComponent'

import TabNav, {TabOptions} from '../Component/BaseComponent/TabNavigatorComponent'

import PoetryRoute from '../Page/Poetry/Route'

import NewsRoute from '../Page/News/Route'

const navBackImg = require('./Image/nav_back.png');


const defaultNav = {
    defaultNavigationOptions: ({navigation}) => ({
        header: navigation.state && navigation.state.params && navigation.state.params.header,
        title: navigation.state && navigation.state.params && navigation.state.params.title,
        headerTitleContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerBackTitle: null,
        headerBackImage: (
            <View style={{width: 50, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: 20, height: 20}} source={navBackImg} />
            </View>
        ),
        headerLeft: navigation.state && navigation.state.params && navigation.state.params.headerLeft,
        headerRight: (navigation.state && navigation.state.params && navigation.state.params.headerRight) || <View />,
        gesturesEnabled: true,
    }),
}

const StackNavigation = StackNav({
    ...NewsRoute,
    ...PoetryRoute,
})

const newsStackNavigation = StackNav({
    ...NewsRoute,
},
    defaultNav
)

const poetryStackNavigation = StackNav({
    ...PoetryRoute,
},
    defaultNav
)


const TabbarNavigataion = TabNav(
    {
        News:{
            screen:newsStackNavigation,
            
        },
        poetry:{
            screen:poetryStackNavigation
        }
    },
)

newsStackNavigation.navigationOptions = ({navigation}) => {
    return {
        ...TabOptions(navigation,'新闻', '', ''),
    }
}

poetryStackNavigation.navigationOptions = ({navigation}) => {
    return {
        ...TabOptions(navigation,'古诗', '', '')
    }
}


export default createAppContainer(TabbarNavigataion);
