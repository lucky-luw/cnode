import request from './index.js'

const requestTopic=(tab,page,limit)=>request(`/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=false`)

const requestArticle=id=>request(`topic/${id}`)

const reqUser=loginname=>request(`/user/${loginname}`)
 
export default { requestTopic, requestArticle, reqUser}