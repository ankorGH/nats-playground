const nats = require('nats')

const sc = nats.StringCodec()

const getClient = async () => {
  return await nats.connect({
    servers: 'nats://localhost:4222'
  })
}

const queue = async (data) => {
  const clientConnection = await getClient()

  clientConnection.publish('food.location.process', sc.encode(data))
}

queue(process.argv[2])