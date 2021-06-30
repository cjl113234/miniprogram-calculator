// pages/index.js
let value = []
let resultValue = ''

// 点击=计算后立马点击数字键会和nextVal拼接
// 点击算法键运算后，再次点击算法键无法得到正确结果 例如 3+3+3


Page({

  /**z
   * 页面的初始数据
   */
  data: {
    userTouchValue: '',  // 展示用户输入的数字
    preValShow: '',  // 展示用户点击算法键前的数字
    nextValShow: '',  // 展示用户点击算法键后的数字
    preVal: '',  // 点击算法键之前的数据
    nextVal: '',  // 点击算法键之后的数据
    userTouchAlgorithmPress: false,  // 判断用户点击算法键
    whichAlgorithmPress: '',  // 判断用户点击哪一个算法键
    resultValue: ''  // 计算结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 获取用户点击数字键的值
  getValue(e){
    // console.log(e.target.dataset.id)
    // 如果首位点击是小数点，则小数点之前补0
    if(value.length == 0 && e.target.dataset.id == '.'){
      value.push(0.)
    }
    // 判断点击的是小数点或数字
    if(!isNaN(e.target.dataset.id) || e.target.dataset.id == '.'){
      // 如果已经含有小数点，再次点击无效
      if(value.indexOf('.') !== -1 && e.target.dataset.id == '.') return
      value.push(e.target.dataset.id)
      // 如果用户未点击算法键，则将数据存入preVal
      if(this.data.userTouchAlgorithmPress == false){
        this.setData({
          userTouchValue: value.join(''),
          preVal: value.join('')
        })
      }
      // 否则将数据存入nextVal
      else{
        this.setData({
          userTouchValue: value.join(''),
          nextVal: value.join('')
        })
      }
      // console.log(this.data.preVal) 
    }
  },

  // AC键全清
  AllClear(){
    this.setData({
      userTouchValue: '',
      preVal: '',
      preValShow: '',
      nextVal: '',
      nextValShow: '',
      userTouchAlgorithmPress: false,
      whichAlgorithmPress: ''
    })
    value = []
  },

  // 回退一位
  BackOneNum(){
    let userTouchValue = this.data.userTouchValue.slice(0,this.data.userTouchValue.length-1)
    value = value.slice(0,this.data.userTouchValue.length-1)
    if(this.data.userTouchAlgorithmPress){
      this.setData({
        userTouchValue,
        nextVal: userTouchValue
      })
    }else{
      this.setData({
        userTouchValue,
        preVal: userTouchValue
      })
    }
    
  },

  // 获得点击的算法键ID,并将是否点击算法键置为true
  getAlgorithmPressValue(e){
    this.setData({
      userTouchValue: '',
      preValShow: this.data.preVal,
      nextValShow: '',
      whichAlgorithmPress: e.target.dataset.id,
      userTouchAlgorithmPress: true
    })
    value = []
  },

  // 根据算法键ID计算并输出结果
  result(){
    // 如果preVal为空，则将nextVal置为preVal，并将nextVal置为空
    if(this.data.preVal == ''){
      this.data.preVal = this.data.nextVal
      this.data.nextVal = ''
    }
    // 如果nextVal为空，则return
    if(this.data.nextVal == '') return
    // 已经点击了=，将是否点击算法键置为false
    this.setData({
      userTouchAlgorithmPress: false,
    })
    switch(this.data.whichAlgorithmPress){
      case "+":
        resultValue = parseFloat(this.data.preVal) + parseFloat(this.data.nextVal)
        break
      case "-":
        resultValue = parseFloat(this.data.preVal) - parseFloat(this.data.nextVal)
        break
      case "x":
        resultValue = parseFloat(this.data.preVal) * parseFloat(this.data.nextVal)
        break
      case "÷":
        resultValue = parseFloat(this.data.preVal) / parseFloat(this.data.nextVal)
        break
      case "%":
        resultValue = parseFloat(this.data.preVal) % parseFloat(this.data.nextVal)
        break
    }
    // console.log(typeof resultValue)
    // 如果含有小数点，则将小数点后位数指定为3位
    if(resultValue.toString().indexOf('.') !== -1){
      resultValue = parseFloat(resultValue.toFixed(3))
    }
    // 计算完结果显示，并将preVal的值置为计算后的结果resultValue
    this.setData({
      userTouchValue: resultValue,
      preValShow: this.data.preVal,
      nextValShow: this.data.nextVal,
      preVal: resultValue
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})