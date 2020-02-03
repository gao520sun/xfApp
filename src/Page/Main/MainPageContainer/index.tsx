/*
 * @Descripttion: 
 * @version: 
 * @Author: gaozhonglei
 * @Date: 2019-11-30 18:44:59
 * @LastEditors  : gaozhonglei
 * @LastEditTime : 2020-01-06 21:59:36
 */
import React, { Component } from 'react'
import {Platform} from 'react-native'
import AppNavigation from '../../../Route/Route'

const prefix = Platform.OS == 'android' ? 'safety://safety/' : 'safety://'

export default class MainPageContainer extends Component {
    render() {
        return (
            <AppNavigation uriPrefix={prefix}/>
        )
    }
}