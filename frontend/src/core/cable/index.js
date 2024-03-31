import { createConsumer } from '@rails/actioncable';

const consumer = createConsumer(process.env.REACT_APP_BACKEND_CABLE_URL);

export default consumer;
