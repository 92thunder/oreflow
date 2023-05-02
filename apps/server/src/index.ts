import axios from 'axios'
import qs from 'querystring'
import Fastify, { FastifyRequest } from 'fastify'

const port = Number(process.env.PORT || 3000)
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET')
}

const server = Fastify({
  logger: true
})

server.get('/', async (_, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'world' }
})

type CallbackRequest = FastifyRequest<{
  Querystring: { code: string }
}>

server.get('/callback', async (request: CallbackRequest, reply) => {
  const { code } = request.query
  const response = await axios.post('https://github.com/login/oauth/access_token', {
    "client_id": GITHUB_CLIENT_ID,
    "client_secret": GITHUB_CLIENT_SECRET,
    "code": code,
    "redirect_uri": "",
    "accept": "application/json",
  })
  const accessToken = response.data.json['access_token']
  reply.redirect(`https://oreflow.92thunder.dev/settings?access_token=${accessToken}`)
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
