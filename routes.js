const Router = require('koa-router');
const ejs = require('ejs')
const controller = require('./controller')


let router = new Router()

router.get('/',(ctx,next)=>{
    ctx.body = 122

})


router.get('/reader/:name',(ctx,next)=>{
    return controller.reader(ctx)
})

module.exports = router