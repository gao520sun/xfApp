
import {request} from '../../../network'
import APIConfig from './ApiConfig'
const Host = APIConfig.HOST

/**
 * 获取论语章节
 * @method get
 * */
export async function getLunYuChapters() {
    return request({host: Host, uri:'/api/lunyu/chapters'});
}

/**
 * 根据论语获取详情内容
 */
export async function getLunyuChaptersDetail(chapter) {
    return request({host: Host, uri:'/api/lunyu/chapter/detail', params:{chapter}});
}