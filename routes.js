//自动调用
const routes = require('next-routes')();

//:表示可以任意匹配,页面跳转
routes
.add('/campains/new','/campains/new')
.add('/campains/:address','/campains/show')
.add('/campains/:address/requests','/campains/requests/index')
.add('/campains/:address/requests/new','/campains/requests/new')


module.exports = routes;
