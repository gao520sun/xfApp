/*
 * @Descripttion: 
 * @version: 
 * @Author: gaozhonglei
 * @Date: 2019-11-30 20:46:47
 * @LastEditors  : gaozhonglei
 * @LastEditTime : 2020-01-06 21:57:56
 */
import React from 'react'
import {Component} from 'react'
import {Provider} from 'mobx-react'
import './src/Config/Global'
import Store from './src/Mobx/Store'
import MainPageContainer from './src/Page/Main/MainPageContainer'

export default class App extends Component {
  render() {
    return (
      <Provider {...Store}>
        <MainPageContainer />
      </Provider>
    )
  }
}
