const mongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const uuid = require('uuid');
var path = require('path');
path.dirname('../../outside'); 

mongoClient.connect('mongodb+srv://tttm15012001:Yeubemai%40151@cluster0.u8ris.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
    if(err) throw err;

    console.log('Connected');
    const dbUser = client.db('case-study');
    
    const usersCollection = dbUser.collection('users');
    let arrInitialUsers = [
        {_id: uuid.v4(), name: 'admin', username: 'admin', password: '12345678', age: 30, phone: '0123456789'},
    ];
    usersCollection.insertMany(arrInitialUsers, (err, res) => {
        if(err) console.log(err);
        else {
            console.log(res);
            console.log(`Successfully added`);
            const obj_arrInitialUsers = JSON.stringify(arrInitialUsers, null, 2);
            fs.writeFile('api/users/GET.json', obj_arrInitialUsers, (err) => {
                if(err) console.log(err);
                else {
                    console.log('Updated');
                }
            })
        }
    });

    const arrInitialGoods = [
        {_id: uuid.v4(), name: 'Bed', thumbnail: '/images/bed.jpg', price: '10000', quantity: '100'},
        {_id: uuid.v4(), name: 'Cabinet', thumbnail: '/images/cabinet.jpg', price: '11000', quantity: '100'},
        {_id: uuid.v4(), name: 'Carpet', thumbnail: '/images/carpet.jpg', price: '12000', quantity: '100'},
        {_id: uuid.v4(), name: 'Curtain', thumbnail: '/images/curtain.jpg', price: '13000', quantity: '100'},
        {_id: uuid.v4(), name: 'Television', thumbnail: '/images/tv.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Chair', thumbnail: '/images/chair.jpg', price: '15000', quantity: '100'},
        {_id: uuid.v4(), name: 'Table', thumbnail: '/images/table.jpg', price: '10000', quantity: '100'},
        {_id: uuid.v4(), name: 'Refrigerator', thumbnail: '/images/refrige.jpg', price: '11000', quantity: '100'},
        {_id: uuid.v4(), name: 'Washing machine', thumbnail: '/images/washing-machine.jpg', price: '12000', quantity: '100'},
        {_id: uuid.v4(), name: 'wt-purifier', thumbnail: '/images/wt_purifier.jpg', price: '13000', quantity: '100'},
        {_id: uuid.v4(), name: 'Wall Fan', thumbnail: '/images/fan1.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Fan', thumbnail: '/images/fan2.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Knife', thumbnail: '/images/knifes.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Jar', thumbnail: '/images/jar.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Wallet', thumbnail: '/images/wallet.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Earphone', thumbnail: '/images/earphone.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Bag', thumbnail: '/images/bag.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Helmet', thumbnail: '/images/helmet.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Dishwashing machine', thumbnail: '/images/dishwashing-machine.jpg', price: '14000', quantity: '100'},
        {_id: uuid.v4(), name: 'Air Conditioner', thumbnail: '/images/air-conditioner.jpg', price: '15000', quantity: '100'},
    ];
    const goodsCollection = dbUser.collection('goods');
    goodsCollection.insertMany(arrInitialGoods, (err, res) => {
        if(err) console.log(err);
        else {
            console.log(res);
            console.log(`Successfully added`);
            const obj_arrInitialGoods = JSON.stringify(arrInitialGoods, null, 2);
            fs.writeFile('api/goods/GET.json', obj_arrInitialGoods, (err) => {
                if(err) console.log(err);
                else {
                    console.log('Updated');
                }
            })
        }
    })
})