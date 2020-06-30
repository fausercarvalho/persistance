const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')

const app = express();
app.use(bodyParser());

const PORT = 8080;

app.get('/students', (req, res) => {
    let search = req.query.search;
    if (search != undefined) {
        db.query(`SELECT * FROM students WHERE name='${search}'`, (error, response) => {
            if (error) {
                res.status(500)
                throw error
            } else {
                res.status(200).send(response.rows)
            }
        });
    } else {
        db.query("SELECT * FROM students", (error, response) => {
            if (error) {
                res.status(500)
                throw error
            } else {
                res.status(200).send(response.rows)
            }
        });
    }
})

app.get('/students/:studentId', (req, res) => {
    db.query(`SELECT * FROM students WHERE id='${req.params.studentId}'`, (error, response) => {
        if (error) {
            res.status(500)
            throw error
        } else {
            res.status(200).send(response.rows)
        }
    });
})

app.get('/grades/:studentId', (req, res) => {
    db.query(`SELECT * FROM grades WHERE "studentId"=${req.params.studentId}`, (error, response) => {
        if (error) {
            res.status(500)
            throw error
        } else {
            res.status(200).send(response.rows)
        }
    });
})

app.post('/grades', (req, res) => {
    if (req.body.studentId != undefined && req.body.class != undefined) {
        db.query(`INSERT INTO grades ("studentId", "class", "grade") VALUES ('${req.body.studentId}', '${req.body.class}', '${req.body.grade}')`, (error, response) => {
            if (error) {
                res.status(500)
                throw error
            } else {
                res.status(201).send({'Status': 'Success'})
            }
        });
    } else {
        res.status(406)
    }
})

app.post('/register', (req, res) => {
    if (req.body.username != undefined && req.body.email != undefined) {
        db.query(`INSERT INTO students ("username", "name", "email") VALUES ('${req.body.username}', '${req.body.name}', '${req.body.email}')`, (error, response) => {
            if (error) {
                res.status(500)
                throw error
            } else {
                res.status(201).send({'Status': 'Success'})
            }
        });
    } else {
        res.status(406)
    }
})

app.listen(PORT);