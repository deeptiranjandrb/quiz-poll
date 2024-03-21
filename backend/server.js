const app = require('express')();
const server = require('http').createServer(app);
let students = [];
var totalResponse = 0;
var resultCount = { };
const io = require('socket.io')(server,{
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
const port = process.env.PORT || 8080;
app.get('/', function(req, res) {
  res.sendfile('index.html');
});
io.on('connection', (socket) => {
    console.log('user connected, id: ' + socket.id);
    let studentName = null;
    let timer = 60 * 1000;
    socket.on('student-connection', (data) => {
        studentName = data.name;
        if(students.indexOf(studentName) > -1){
            socket.emit('student-exists', {message: "A student with this name already exists, please try with a different name"})
        }else{
            students.push(studentName);
            console.log(students);
            socket.emit('student-connected', {message: `${studentName} connected`})
        }
    })
    socket.on('disconnect', ( socket ) => {
        console.log(studentName);
        if(studentName){
            const i = students.indexOf(studentName);
            console.log(i);
            students.splice(i, 1);
            console.log(students);
        }
        console.log('user disconnected', students);
    })
    socket.on('userchange', (data) => {
        console.log(data)
    });
    socket.on('question', (data) => {
        console.log('question: ', data);
        totalResponse = 0;
        resultCount = {
        }
        timer = parseInt(data.timer) * 1000;
        setTimeout(() => {
            console.log('setTimeout called');
            io.emit('result', {options:resultCount, totalCount: totalResponse, answer:data.answer});
        },timer);
        console.log(timer);
        socket.broadcast.emit("question", data);
    });
    socket.on('student-answer', (data) => {
        console.log(data);
        if(resultCount.hasOwnProperty(data.answer.toString())){
            resultCount[data.answer]++;
        }else{
            resultCount[data.answer] = 1;
        }
        totalResponse = totalResponse + 1;
        io.emit('option-update', {options:resultCount, totalCount: totalResponse});
        console.log(resultCount);
    });
    
})
//io - global context
//socket - particular connection
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
