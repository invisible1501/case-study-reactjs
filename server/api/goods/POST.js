const fs = require('fs');

module.exports = (request, response) => {

    const userId = request.body.id;
    if (userId === 1) {
        return response.status(409).send({});
    }

    fs.readFile(__dirname + '/GET.json', (err, data) => {
        if(err) throw err;
        else {
            oldUser = JSON.parse(data);
            oldUser.push({
                'id': parseInt(request.body.id),
                'name': request.body.name
            });
            json = JSON.stringify(oldUser, null, 2);
            fs.writeFile(__dirname + '/GET.json', json, (err) => {
                if(err) throw err;
                console.log('Update!');
            });
        }
    })

    return response.send({
        'id': request.body.id,
        'name': request.body.name
    });

}