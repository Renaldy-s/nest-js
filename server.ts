import './tracer';
import app from './App';
const PORT = process.env.NODE_PORT;

app.listen(PORT);
console.log(`${process.env.SERVICE_NAME} running on port ${PORT}`);