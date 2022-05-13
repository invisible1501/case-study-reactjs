const express = require('express');
const router = express.Router();
const path = require("path");
const db = require('../api/db.json');
const jsonServer = require('json-server');
const fs = require('fs');
const uuid = require('uuid');
const mongoClient = require('mongodb').MongoClient;

router.get('/goods', jsonServer.router(db));

router.get('/users', jsonServer.router(db));

router.post('/users', (request, response) => {
    fs.readFile(path.join(__dirname, '../api/db.json'), (err, data) => {
        if(err) throw err;
        else {
            let db = (JSON.parse(data));
            oldUsers = db.users;
            let userValid = oldUsers.find(item => item._id === request.body._id);
            let duplicate = oldUsers.find(item => item.username === request.body.username);
            console.log(request.body);
            if(duplicate != null) {
                if(request.body.isSignUp === true) {
                    return response.status(400).json({
                        'msg': `${request.body.username} is invalid!`
                    });
                } else if(request.body.isSignUp === false) {
                    if(duplicate.password !== request.body.password) {
                        return response.status(400).json({
                            'msg': `Wrong Password!`
                        });
                    } else {
                        return response.status(200).json({
                            'msg': `Successfully Login for ${request.body.username}!`,
                            'username': request.body.username
                        });
                    }
                } else {
                    return response.status(400).json({
                        'msg': `${request.body.username} is invalid!`
                    });
                }
            } else {
                if(request.body.isSignUp === true) {
                    const newUser = {
                        '_id': uuid.v4(),
                        'name': request.body.name,
                        'username': request.body.username,
                        'password': request.body.password,
                        'age': request.body.age,
                        'phone': request.body.phone,
                    };
                    oldUsers.push(newUser);
                    db = {...db, users: oldUsers};
                    console.log(db);
                    json = JSON.stringify(db, null, 2);
                    fs.writeFile(path.join(__dirname, '../api/db.json'), json, (err) => {
                        if(err) throw err;
                        console.log('Update!');
                    });

                    //Update user database
                    mongoClient.connect('mongodb+srv://tttm15012001:Yeubemai%40151@cluster0.u8ris.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
                        if(err) throw err;

                        console.log('Connected');
                        const database = client.db('case-study');
                        const collection = database.collection('users');

                        collection.insertOne(newUser, (err, res) => {
                            if(err) console.log(err);
                            else {
                                console.log('Updated');
                                client.close();
                                console.log('Disconnected');
                            }
                        });
                    })

                    return response.status(200).json({
                        'msg': `Successfully register for ${request.body.username}!`,
                        'username': request.body.username
                    });
                }
                else if(userValid != null) {
                    let newUser = oldUsers.filter(item => item._id !== userValid._id);
                    userValid = {...request.body};
                    console.log(userValid);
                    newUser.push(userValid);
                    db = {...db, users: newUser};
                    json = JSON.stringify(db, null, 2);
                    fs.writeFile(path.join(__dirname, '../api/db.json'), json, (err) => {
                        if(err) throw err;
                        console.log('Update!');
                    });
                    return response.status(200).json({
                        'msg': `Your profile is updated!`,
                        'username': request.body.username
                    });
                } 
                else {return response.status(400).json({
                    'msg': 'Username or Password is invalid!'
                });
                }
            }
        }
    });
    /* return response.status(200).json({
        'msg': `Successfully register for ${request.body.username}`,
        'username': request.body.username
    }); */
});

module.exports = router;
