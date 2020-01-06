/*
 * @Descripttion: 主题
 * @version: 
 * @Author: gaozhonglei
 * @Date: 2019-11-30 22:50:47
 * @LastEditors: gaozhonglei
 * @LastEditTime: 2019-12-19 22:20:15
 */

const color = {
    color: '#FD3D62',
    background: '#F5F5F8',
    fontColor: '#F7F7F7',
    borderColor: 'rgb(245,245,245)',
};
const colorTheme = (ch = 'df') : object => {
    switch (ch) {
        case 'df':
            return color;
        default:
            throw new Error ('dot color theme')
    }
};
export default colorTheme
