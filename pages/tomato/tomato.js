Page({
    data: {
        again: false,
        renounce: false
    },
    showGiveUpConfirm() {
        this.confirmClose()
    },
    confirmClose() {
        this.setData({renounce: false})
    }
})