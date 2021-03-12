const nats = require('nats')

const sc = nats.StringCodec()

const getClient = async () => nats.connect({
  servers: 'nats://localhost:4222',
})

const subscribeTopic = async () => {
  const client = await getClient()
  
  const sub = client.subscribe('houses.rents.search')
  processMessage(sub)
}

const processMessage = async (sub) => {
  for await (const m of sub) {
    console.log(
      `#${sub.getProcessed()} - ${m.subject} ${
        m.data ? " " + sc.decode(m.data) : ""
      }`,
    );
  }
}

subscribeTopic()