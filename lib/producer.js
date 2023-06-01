const { Kafka } = require('kafkajs');

const data = require('./data.json');


function getRandomData(){
  var randomIndex = Math.floor(Math.random() * data.length);
  const newData = data[randomIndex];
 return newData;
}



const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const admin = kafka.admin();

const createTopic = async (topic) => {
  try {
    await admin.connect();
    await admin.createTopics({
      topics: [
        { topic, numPartitions: 3, replicationFactor: 1 }
      ]
    });
    console.log(`Topic "${topic}" created.`);
  } catch (error) {
    console.error(`Error creating topic "${topic}":`, error);
  } finally {
    await admin.disconnect();
  }
};

const publishVerifiedMessage = async (topic, message) => {
  try {
    await producer.connect();
    await producer.send({ topic, messages: [{ value: message }] });
    console.log(message);
  } catch (error) {
    console.error(`Error publishing message to topic "${topic}":`, error);
  }
};


// Schedule message publishing every 2 seconds
setInterval(() => {
  publishVerifiedMessage('topic-group.M1',`Producer1: ${getRandomData()}`);
}, 2000);
setInterval(() => {
  publishVerifiedMessage('topic-group.M1',`Producer2: ${getRandomData()}`);
}, 1000);
setInterval(() => {
  publishVerifiedMessage('topic-group.M1',`Producer3: ${getRandomData()}`);
}, 3000);


const topicGroup = 'topic-group';
  const messageType = 'M1';
  const verifiedTopic = `${topicGroup}.verified`;

  // Create topics
   createTopic(`${topicGroup}.${messageType}`);
   createTopic(verifiedTopic);

module.exports = { createTopic };
