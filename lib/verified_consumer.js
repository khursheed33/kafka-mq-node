const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-verified-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'my-verified-consumer-group' });

const runVerifiedConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'topic-group.verified', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { value } = message;
      console.log(`Verified Consumer: ${value.toString()}`);
      // Perform your desired action with the verified message
    },
  });
};
runVerifiedConsumer();
module.exports = { runVerifiedConsumer };
