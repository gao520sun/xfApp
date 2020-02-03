
import {request} from '../../../network'
import APIConfig from './ApiConfig'
const Host = APIConfig.HOST

interface Page {
    limit:number,
    offset:number
}
interface Poetry extends Page {
    author:string
}
/**
 * 获取宋词的作者
 * param limit
 * param offset
 * @method POST
 * */
export async function getSongAuthor(param:Page) {
    return request({host: Host, uri:'/api/author/song',data:param, method:'POST'});
}


/**
 * 获取宋词的作者的诗
 * param limit
 * param offset
 * @method POST
 * */
export async function getSongAuthorPoetry(param:Poetry) {
    return request({host: Host, uri:'/api/author/song/query/poetry',data:param, method:'POST'});
}