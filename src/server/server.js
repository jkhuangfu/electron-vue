// const Koa = require('koa')
// const router = require('koa-router')()

// const app = new Koa();

// router.get('/test', async (ctx) => {
//   ctx.body = { code: 200, data: 'hello world' }
// })

// app.use(router.routes()).listen(3002, () => {
//   console.log('server--->', 'server start ....');
// })


const axios = require('axios')

async function test() {
  const data = await axios.post('https://web.jxbrty.com/prd-server/doc/list')
  console.log('data', data.data);
  return data.data
}

module.exports = { test }