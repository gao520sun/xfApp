/*
 * @Descripttion: 全局配置
 * @version: 
 * @Author: gaozhonglei
 * @Date: 2019-11-30 23:03:04
 * @LastEditors: gaozhonglei
 * @LastEditTime: 2019-12-04 23:13:36
 */
import Color from '../Theme/Color'

declare global{
    // function require(name: string): any;
    namespace NodeJS {
        interface Global {
            CR:object,
        }
    }
   /**
    * Console polyfill
    * @see https://facebook.github.io/react-native/docs/javascript-environment.html#polyfills
    */
   interface Console {
       error(message?: any, ...optionalParams: any[]): void;
       info(message?: any, ...optionalParams: any[]): void;
       log(message?: any, ...optionalParams: any[]): void;
       warn(message?: any, ...optionalParams: any[]): void;
       trace(message?: any, ...optionalParams: any[]): void;
       debug(message?: any, ...optionalParams: any[]): void;
       table(...data: any[]): void;
       disableYellowBox: boolean;
       ignoredYellowBox: string[];
   }
}
global.CR = Color();
   
