module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next() //如果 req.isAuthenticated() 回傳 true，則執行下一個 middleware
    }
    res.redirect('/users/login') // false，就強制返回 login 頁面
  }
}