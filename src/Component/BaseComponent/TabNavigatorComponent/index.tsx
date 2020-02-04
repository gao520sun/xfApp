
import React, {Component} from 'react';
import {Image} from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabNavigator = (screen) => createBottomTabNavigator(screen);

export const TabOptions = (navigation, tabBarTitle, normalImage, selectedImage) => {
    let tabBarVisible = false
    if(navigation.state.index === 0) {
        tabBarVisible =  true
    }
    return {
        tabBarLabel: tabBarTitle,
        tabBarVisible,
        tabBarIcon: ({ tintColor , focused}) => (
        <Image
            source={focused ? selectedImage : normalImage}
            style={[{width:22, height:22}]}
        />
    )
    }
}


export default TabNavigator;