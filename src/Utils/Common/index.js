import {
    Dimensions,
    Platform,
    StatusBar,
    PixelRatio,
} from 'react-native';

const _screenWidth = Dimensions.get('window').width;
const _screenHeight = Dimensions.get('window').height; // 安卓不包含虚拟按键高度

// const DEFAULT_DENSITY = 2;
const defaultWidth = 375;
const defaultHeight = 667;
// const w2 = defaultWidth / DEFAULT_DENSITY;
// const h2 = defaultHeight / DEFAULT_DENSITY;

const _scaleWidth = _screenWidth / defaultWidth;
const _scaleHeight = _screenHeight / defaultHeight;
const fontScale = PixelRatio.getFontScale();

const globalWindow = typeof window !== 'undefined' ? window : global;

const NarBarInfoModule = Platform.OS === 'android' ? require('react-native').NativeModules.NarBarInfoModules : null;

/**
 * 判断手机是否为iOS 刘海屏系列
 * */
const isIphoneX = (Platform.OS === 'ios' && (Number(((_screenHeight / _screenWidth) + '').substr(0, 4)) * 100) === 216);
/**
 * 状态栏高度
 * */
const statusBarHeight = Platform.OS !== 'ios' ? StatusBar.currentHeight : isIphoneX ? 34 : 20;

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function log(title, data) {
    if(globalWindow.process.env.NODE_ENV === 'development') {
        console.group(new Date().toLocaleString() + ' ' + title);
        console.log(data);
        console.groupEnd();
    }
}

function getScaleSize(originW, originH, maxWidth = 0, maxHeight = 0) {
    let width = originW;
    let height = originH;
    let scaleW = 1;
    let scaleH = 1;
    if (maxWidth > 0 && width > maxWidth) {
        scaleW = maxWidth / width;
    }
    if (maxHeight > 0 && height > maxHeight) {
        scaleH = maxHeight / height;
    }
    const scale = scaleW > scaleH ? scaleH : scaleW;
    width = width * scale;
    height = height * scale;
    return {width, height};
}
/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param {number} size 设计图的尺寸
 * @returns {number} number
 */
function scaleSize(size) {
    if(!isIphoneX) {
        return size * _scaleWidth;
    }
    return size;
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param {number} size 设计图的尺寸
 * @returns {number} number
 */
function scaleHeight(size) {
    if(!isIphoneX) {
        return size * _scaleHeight;
    }
    return size;
}

function setSpText(size, allowFontScaling = true) {
    if(!isIphoneX) {
        const scale = Math.min(_scaleWidth, _scaleHeight);
        const fontSize = allowFontScaling ? 1 : fontScale;
        return size * scale / fontSize;
    }
    return size;
}

module.exports = {
    width:_screenWidth,
    height:_screenHeight,
    isIphoneX: isIphoneX,
    statusBarHeight: statusBarHeight,
    log: log,
    uuid:uuid,
    spText:setSpText,
    scaleSize:scaleSize,
    scaleHeight:scaleHeight,
    getDates:getDates,
    getDateDiff:getDateDiff,
    getImageSize:getImageSize,
    getScaleSize:getScaleSize,
};
