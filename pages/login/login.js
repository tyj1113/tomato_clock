import http from '../../lib/http'
const { app_id, app_secret } = getApp().globalData

Page({
login(e){
  let encrypted_data = e.detail.encryptedData
  let iv = e.detail.iv,code;
  wx.login({
    success(res){
      code=res.code
      http.post('/sign_in/mini_program_user', {
        code,
        iv,
        encrypted_data,
        app_id,
        app_secret,
      }).then(response => {
        wx.setStorageSync('me', response.data.resource)
        wx.setStorageSync('X-token', response.header["X-token"])
        wx.reLaunch({ url: "/pages/home/home" })

          })
    }
  })

}
})