
const Service = require('./service')


module.exports = class Controller {

    static reader(ctx) {
        let query = ctx.query, options = {
            name: query.name
        }, pInfo = await Service.getInfo(options)


        ctx.body = {
            name: query.name,
            images: pInfo.list,
            total: pInfo.total
        }

    }


}
