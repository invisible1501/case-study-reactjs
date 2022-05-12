const fs = require('fs');
const uuid = require('uuid');
const mongoClient = require('mongodb').MongoClient;

module.exports = (request, response) => {
    fs.readFile(__dirname + '/GET.json', (err, data) => {
        if(err) throw err;
        else {
            oldUsers = JSON.parse(data);
            let userValid = oldUsers.find(item => item._id === request.body._id);
            let duplicate = oldUsers.find(item => item.username === request.body.username);
            console.log(userValid);
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
                    json = JSON.stringify(oldUsers, null, 2);
                    fs.writeFile(__dirname + '/GET.json', json, (err) => {
                        if(err) throw err;
                        console.log('Update!');
                    });

                    //Update user database
                    mongoClient.connect('mongodb+srv://tttm15012001:Yeubemai%40151@cluster0.u8ris.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
                        if(err) throw err;

                        console.log('Connected');
                        const db = client.db('case-study');
                        const collection = db.collection('users');

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
                    json = JSON.stringify(newUser, null, 2);
                    fs.writeFile(__dirname + '/GET.json', json, (err) => {
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
}