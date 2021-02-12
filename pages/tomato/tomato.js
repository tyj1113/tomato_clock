import http from '../../lib/http'
Page({
  data: {
    defaultTime: 1500,
    formatTime: '', //格式化后的时间
    again: false, //控制再来一组
    renounce: false, //控制放弃confirm
    timerStart: true, //控制暂停开始按钮切换
    timer: null,
    progress: false, //控制完成进度confirm
    tomato: {}, //存放服务器返回的闹钟对象
    confirmText: '' //confirm理由
  },
  onShow() {
    http.post('/tomatoes').then((res) => {
      this.setData({
        tomato: res.data.resource
      })
    })
    this.timeFormat()
    this.setTimer()
  },
  setTimer() { //添加定时器
    this.data.timer = setInterval(() => {
      this.data.defaultTime--
        this.timeFormat()
      if (this.data.defaultTime === 0) {
        this.setData({
          again: true
        })
        this.setData({
          progress: true
        })
        this.clearTimer()
      }
    }, 1000)
  },
  clearTimer() { //清除定时器
    clearInterval(this.data.timer)
  },
  suspend() { //按下暂停逻辑
    this.clearTimer()
    this.setData({
      timerStart: false
    })
  },
  startTimer() { //按下开始逻辑
    this.setData({
      timerStart: true
    })
    this.setTimer()
  },
  timeFormat() { //格式化时间
    let m = Math.floor(this.data.defaultTime / 60)
    if (m < 10 && m > 0) {
      m = '0' + m
    }
    if (m === 0) {
      m = '00'
    }
    let s = this.data.defaultTime % 60
    if (s < 10 && s > 0) {
      s = '0' + s
    }
    if (s === 0) {
      s = '00'
    }
    this.setData({
      formatTime: `${m}:${s}`
    })
  },
  showGiveUpConfirm() { //按下放弃逻辑
    this.setData({
      renounce: true
    })
    this.clearTimer()
  },
  confirmSure(e) { //确定逻辑
    this.setData({
      confirmText: e.detail
    })
    http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: this.data.confirmText,
        aborted: true
      })
      .then((res) => {
        wx.navigateBack({
          to: -1
        })
      })
  },
  confirmClose() { //取消逻辑
    this.setTimer()
    this.setData({
      renounce: false
    })
  },
  againTimer() {
    this.setData({
      again: false,
      defaultTime: 1500
    })
    this.timeFormat()
    this.setTimer()
  },
  progressConfirmSure(e) {
    this.setData({
      confirmText: e.detail
    })
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: this.data.confirmText,
      aborted: true
    })
    this.setData({
      progress: false
    })
  },
  progressConfirmClose(e) {
    console.log(e)
    this.setData({
      confirmText: e.detail
    })
    this.setData({
      progress: false
    })
    if (this.data.confirmText) {
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: this.data.confirmText,
        aborted: true
      })
    } else {
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: "未知完成情况",
        aborted: true
      })
    }
  },
  hideAndUnload() {
    if (this.data.progress) {
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: "未知完成情况",
        aborted: true
      })
      return
    }
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: "未知理由放弃",
        aborted: true
      })
  },
  onHide() {
    this.hideAndUnload()
  },
  onUnload() {
    this.hideAndUnload()
  },
})