import { Message, connect } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()               // Returns all messages from be
    .setDurableName('accounting-service');  // store in [name] all successfully delivered

  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name',             // keep group connection even if service is disconnected.
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
