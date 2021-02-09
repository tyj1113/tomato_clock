import http from '../../lib/http'
Page({
  data: {
    tab: "task",
      todos:{}
  },
  onShow(){
//     http.get('/tomatoes',{ is_group: "yes" }).then((res)=>{
//     })
    http.get('/todos',{ is_group: "yes" }).then((res)=>{
      this.setData({todos:res.data.resources})
        console.log(res.data.resources)
    })
  },
  changeTab(e){
this.setData({tab:e.target.dataset.name})
  }
})