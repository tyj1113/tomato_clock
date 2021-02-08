import http from '../../lib/http'
Page({
    data: {
        createVisible: false,
        updateTextVisible: false,
        list:[],
        content:'',
        updateTextId:'',
        updateTextIndex:''
    },
    onShow(){
      http.get('/todos?completed=false').then((res)=>{
        this.setData({list:res.data.resources})
        console.log(res.data.resources)
      })
    },
  completed(e){
    const index = e.target.dataset.index
    http.put(`/todos/${e.target.dataset.id}`, {completed:true}).then((res)=>{
      this.data.list[index]=res.data.resource
      this.setData({list:this.data.list})
    })
  },
    showTextConfirm(e){//单击时显示confirm并将文本内容传到content里 从而传给confirm
        this.setData({updateTextVisible: true,content:e.target.dataset.test})
        this.data.updateTextId=e.target.dataset.id
        this.data.updateTextIndex=e.target.dataset.index
    },
    updateText(e){//点击确定后 获取confirm传的文本 修改任务并覆盖页面数据
        const index = this.data.updateTextIndex
      http.put(`/todos/${this.data.updateTextId}`,{ completed: false, description:`${e.detail}`}).then(
          (res)=>{
              this.data.list[index]=res.data.resource
              this.setData({list:this.data.list})
              this.hideUpdateConfirm()
          }
      )
    },
    showCreateConfirm() {
        this.setData({createVisible: true})
    },
    create(e) {
      http.post('/todos', { description: e.detail }).then((res) => {  
        console.log(res)
        //接口写的不好resource一会有s一会没有
        //resource 是对象不能用concat 转为数组
        const item = [res.data.resource]
        this.data.list = this.data.list.concat(item)
        this.setData({list:this.data.list})
      })
        this.hideCreateConfirm()
    },
    hideCreateConfirm() {
        this.setData({createVisible: false})
    },
    hideUpdateConfirm() {
        this.setData({updateTextVisible: false})
    }
})