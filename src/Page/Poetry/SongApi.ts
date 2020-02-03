
import {request} from '../../../network'
const Host = 'http://127.0.0.1:49000'
// const Host = 'http://39.100.108.105:49000'

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