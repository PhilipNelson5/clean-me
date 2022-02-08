const { randomUUID } = require('crypto');
const express = require('express');
const path = require('path');
const app = express();

const toUnix = (d) => Math.floor(d.getTime() / 1000);
const success = 'success';

app.use(express.static(path.join(__dirname, '../Client', 'build')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../Client', 'build', 'index.html'));
});

app.post('/api/task', (req, res) => {
    const task = req.body;
    console.log('create', task);
    const id = randomUUID();
    res.send({success, id: id});
    // res.status(500).send({
        // err: 'duplicate name'
    // })
})

app.get('/api/tasks', (req, res) => {
    console.log('get tasks');
    const tasks = [
        {
            id: randomUUID(),
            title: "bedroom",
            cleaned: toUnix(new Date(2022, 0, 1)),
            interval: 30*86400
        },
        {
            id: randomUUID(),
            title: "kitchen",
            cleaned: toUnix(new Date(2022, 0, 15)),
            interval: 30*86400
        },
        {
            id: randomUUID(),
            title: "bathroom",
            cleaned: toUnix(new Date(2022, 0, 30)),
            interval: 30*86400
        }
    ]
    
    res.send({tasks: tasks});
})

app.put('/api/clean', (req, res) => {
    const id = req.body.id;
    const now = toUnix(new Date());
    console.log('clean', id);
    res.send({success});
})

app.delete('/api/task', (req, res) => {
    const id = req.body.id;
    console.log('delete', id);
    res.send({success});
    // res.status(500).send({
        // err: 'failed to delete'
    // })
})


app.listen(9000, () => {
    console.log('Ready');
});
