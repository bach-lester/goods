import request from '../utils/request'
export const artGetChannelService = () => request.get('/my/cate/list')

export const artAddChannelService = date => request.post('/my/cate/add', date)

export const artEditChannelService = date => request.put('/my/cate/info', date)

export const artDelChannelService = id =>
  request.delete('/my/cate/del', { params: { id } })

//文章相关的接口
export const artGetListService = params =>
  request.get('/my/article/list', {
    params,
  })

export const artGetDetailsService = id =>
  request.get('/my/article/info', { params: { id } })
export const artPublishArticleService = data =>
  request.post('/my/article/add', data)

export const artDelManageService = id =>
  request.delete('/my/article/info', { params: { id } })

export const artEditArticleService = data =>
  request.put('/my/article/info', data)
