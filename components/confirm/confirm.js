Component({
    properties: {
        placeholder: {
            type: String,
            value: ""
        },
        visible: {
            type: Boolean,
            value: true
        },
        value:{
            type:String,
            value:""
        }
    },
    methods:{
        confirm(){
            this.triggerEvent('confirm', this.data.value)
            this.data.value=""
        },
        cancel(){
            this.triggerEvent('cancel')
            this.data.value=""
        },
        updateValue(e){
            this.data.value=e.detail.value
            // this.setData({value:e.detail.value})
        }
    }
})