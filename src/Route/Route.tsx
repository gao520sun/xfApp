/*
 * @Descripttion: 
 * @version: 
 * @Author: gaozhonglei
 * @Date: 2019-11-30 22:13:50
 * @LastEditors  : gaozhonglei
 * @LastEditTime : 2020-01-06 21:55:16
 */
import { createAppContainer } from 'react-navigation';

import StackNav from '../Component/BaseComponent/StackNavigatorComponent'
import WebsiteRoute from '../Page/Website/Route'
const StackNavigation = StackNav({
    ...WebsiteRoute
})

export default createAppContainer(StackNavigation);
