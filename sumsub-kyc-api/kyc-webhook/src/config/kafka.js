const { Kafka } = require('kafkajs');

const host = process.env.KAFKA_HOST || 'localhost';

class KafkaNode {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'node-webhook',
            brokers: [`${host}:9092`, `${host}:9093`, `${host}:9094`]
        });    
        this.producer;
        this.consumer;
    }

    async producerInit() {
        this.producer = this.kafka.producer();
    }

    async consumerInit({ groupId }) {
        this.consumer = this.kafka.consumer({ groupId });
    }

    async senderMessage({ topic, messages = [] }) {
        try {
            await this.producer.connect();
            await this.producer.send({ topic, messages });
            return;
        } catch (err) {
            throw err;
        }   
    }

    async receiverMessage({ topics = [] }) {
        try {
            await this.consumer.connect()
            for (let i = 0; i < topics.length; i++) {
                await this.consumer.subscribe({ topic: topics[i] })
            }
            return new Promise(async (resolve, reject) => {
                try {
                    await kafka.consumer.run({
                        eachMessage: async ({ topic, partition, message }) => {
                            console.log({
                                partition,
                                offset: message.offset,
                                value: message.value.toString(),
                            });
                            resolve({ topic, partition, message });
                        }
                    });
                } catch (err) {
                    reject(err);
                }
            })
        } catch (err) {
            throw err;
        }
    }
}

const kafka = new KafkaNode();

module.exports = kafka;