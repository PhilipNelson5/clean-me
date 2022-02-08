const express = require('express');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { randomUUID } = require('crypto');

const toUnix = (d) => Math.floor(d.getTime() / 1000);
const success = 'success';
const DATABASE = 'tasks.db';
const PORT = 9000;

const db_exists = fs.existsSync(DATABASE);
const db = new sqlite3.Database(DATABASE, (err) => {
    if (err) {
        console.error('failed to create database');
        console.error(err.message);
        process.exit();
    }
    console.log('Connected to the database');
});

if(!db_exists) {
    db.run(`
CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    cleaned INTEGER NOT NULL,
    interval INTEGER NOT NULL
);
`);}

const app = express();
app.use(express.static(path.join(__dirname, '../Client', 'build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (_, res) {
    res.sendFile(path.join(__dirname, '../Client', 'build', 'index.html'));
});

app.get('/api/tasks', (_, res) => {
    console.log('get tasks');
    db.all('SELECT * from tasks;', [], (err, rows) => {
        if (err) {
            console.log('failed to get tasks');
            console.log(err);
            res.status(500).send({ err })
        } else {
            res.send({tasks: rows});
        }
    })
})

app.post('/api/task', (req, res) => {
    const task = req.body;
    console.log('create', task.title);
    const id = randomUUID();
    db.run(
        `INSERT INTO tasks(id, title, cleaned, interval) VALUES(?, ?, ?, ?)`,
        [id, task.title, task.cleaned, task.interval], function(err) {
            if (err) {
                console.log('failed to create task', task.title);
                console.log(err);
                res.status(500).send({ err })
            } else  {
                res.send({success, id: id});
            }
        }
    );
})

app.put('/api/clean', (req, res) => {
    const id = req.body.id;
    const now = toUnix(new Date());
    console.log('clean', id);
    db.run(
        `UPDATE tasks SET cleaned = ? WHERE id = ?`,
        [now, id], function(err) {
            if (err) {
                console.log('failed to clean', id);
                console.log(err);
                res.status(500).send({ err });
            } else  {
                res.send({success});
            }
        }
    );
})

app.delete('/api/task', (req, res) => {
    const id = req.body.id;
    console.log('delete', id);
    db.run(
        `DELETE FROM tasks WHERE id = ?`,
        [id], function(err) {
            if (err) {
                console.log('failed to delete', task.id);
                console.log(err);
                res.status(500).send({ err });
            } else  {
                res.send({success});
            }
        }
    );
})


app.listen(PORT, () => {
    console.log('Listening on', PORT);
});
