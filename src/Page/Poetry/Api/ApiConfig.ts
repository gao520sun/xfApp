const env = 'dev' // dev sit prod

let host = 'http://127.0.0.1:49000'
// const Host = 'http://39.100.108.105:49000'
if(env === 'dev') {
    host = 'http://127.0.0.1:49000'
}else if(env === 'sit') {
    host = 'http://39.100.108.105:49000'
}

export default{
    HOST: host
}