import http from '../../lib/http'
Page({
  data: {
    tab: "tomato",
      todos:{},
    tomatoes:{}
  },
getMonthDate(data){
  return data.updated_at.substr(5,2)+data.updated_at.substr(8,2)
},
  onShow(){
    http.get('/tomatoes').then((res)=>{
      let data=res.data.resources
      let length=data.length
      let date=this.getMonthDate(data[0])
      let Object={[date]:[data[0]]}
      let lastDate=date
      for(let i=1;i<length;i++){
        if(this.getMonthDate(data[i])===lastDate){
          Object[lastDate][Object[lastDate].length]=data[i]
        }else{
          Object[this.getMonthDate(data[i])]=[data[i]]
          lastDate=this.getMonthDate(data[i])
        }
      }
    this.setData({tomatoes:Object})



    })
    http.get('/todos?completed=true',{ is_group: "yes" }).then((res)=>{
      this.setData({todos:res.data.resources})
    })

  },
  changeTab(e){
this.setData({tab:e.target.dataset.name})
  }
})