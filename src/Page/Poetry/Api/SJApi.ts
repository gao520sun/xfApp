
import {request} from '../../../network'
import APIConfig from './ApiConfig'
const Host = APIConfig.HOST

/**
 * 获取四书五经章节
 * @method get
 * */
export async function getSishuwujingChapters() {
    return request({host: Host, uri:'/api/sishiwujing/chapters'});
}

/**
 * 根据章节获取详情内容
 */
export async function getSSWJChaptersDetail(chapter) {
    return request({host: Host, uri:'/api/sishiwujing/chapters/detail', params:{chapter}});
}