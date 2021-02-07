// pages/me/me.js
Page({
  data: {
    tab: "tomato",
  },
  changeTab(e){
this.setData({tab:e.target.dataset.name})
  }
})