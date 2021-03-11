const nats = require('nats')

const sc = nats.StringCodec()

const getClient = async () => nats.connect({
  servers: 'nats://localhost:4222',
})

const publishTopic = async (data) => {
  const client = await getClient()
  
  client.publish('houses.rents.search', data, {
    reply: 'ack',
  })
}

publishTopic(sc.encode(process.argv[2]))