const express = require('express');
const app = express();

const http = require('http').createServer(app);
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const handle = require('./server/handlers');
const db = require('./server/models');
// const SocketServer = require('./socketServer');
const corsOptions = {
  Crediential: 'true',
};
const bodyParser = require('body-parser');

// const userRouter = require('./routes/userRouter');

require('dotenv').config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.static(path.resolve(__dirname, './pages/')));

//errorhandler from the handler server dir
app.use(handle.errorHandler);
app.use(handle.notFoundHandler);

// app.use(userRouter);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, './build')));
}

app.get('/', (req, res) => {
  res.send('hi');
});

// io.on('connection', (socket) => {
//   SocketServer(socket);
// });

// app.user('./pages/api', require('./routes/userRouter'));

const port = process.env.PORT || 4010;

// mongoose
//   .connect(URI, {})
//   .then(() =>
//     app.listen(port, () => {
//       console.log(`server is connected at: ${port}`);
//     })
//   )
//   .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`server is connected at ${port}`);
});
