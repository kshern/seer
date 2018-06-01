
const Service = require('./service')


module.exports =  class Controller{

    static reader(ctx){
         let query = ctx.query
         let options = {
             name:query.name
         }
         let total = Service.getTotal(options)

         ctx.body = {
             name:query.name,
             total:total
         }

    }


}
