Page({
    data: {
        visible: false
    },
    showConfirm() {
        this.setData({visible: true})
    },
    update(e) {
        console.log(e.detail)
        this.hideConfirm()
    },
    hideConfirm() {
        this.data.visible=false
        // this.setData({visible: false})
    }
})