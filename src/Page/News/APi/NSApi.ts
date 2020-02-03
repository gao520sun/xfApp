
import {request} from '../../../network'
import APIConfig from './ApiConfig'
const Host = APIConfig.HOST

/**
 * 获取新闻
 * @method get
 * */
export async function getNewsList() {
    return request({host: Host, uri:'/api/get/news/list'});
}
