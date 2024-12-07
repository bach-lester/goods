import request from '@/utils/request'

export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

export const userGetInfoService = () => request.get('/my/userinfo')

export const userUpdateUserInfoService = data =>
  request.put('/my/userinfo', data)

export const userUpdateAvatarService = avatar =>
  request.patch('/my/update/avatar', { avatar })

//更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) => {
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
}
