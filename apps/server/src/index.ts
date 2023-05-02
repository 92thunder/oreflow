import Fastify from 'fastify'

const port = Number(process.env.PORT || 3000)

const server = Fastify({
  logger: true
})

server.get('/', async (_, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'world' }
})

const start = async () => {
  try {
    const address = await server.listen({ port })
    server.log.info(`server listening on ${address}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
