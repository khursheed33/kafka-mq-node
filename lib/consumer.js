const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-consumer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const consumer = kafka.consumer({ groupId: "my-consumer-group" });
const publishVerifiedMessage = async (topic, message) => {
  try {
    await producer.connect();
   
    await producer.send({ topic, messages: [{ value: message }] });
  } catch (error) {
    console.error(`Error publishing message to topic "${topic}":`, error);
  }
};
const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "topic-group.M1", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { value } = message;
      console.log(`Consumer: ${value.toString()}`);
      await publishVerifiedMessage("topic-group.verified", value.toString());
      // Perform your desired action with the received message
    },
  });
};
runConsumer();
module.exports = { runConsumer };
