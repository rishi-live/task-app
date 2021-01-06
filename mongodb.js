//CURD operations

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID, DBRef } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID()
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!");
    }
    const db = client.db(databaseName);

    //insertOne function

    // db.collection('users').insertOne({
    //         name: 'Rishi',
    //         age: 21
    //     }, (error, result) => {
    //         if (error) {
    //             return console.log("Unable to insert the data");
    //         }
    //         console.log(result.ops);
    //     })

    //console.log('Connected successfully...');

    //insertMany function

    // db.collection('users').insertMany([{
    //     name: 'Piyush',
    //     age: 27

    // }, {
    //     name: 'Twinein',
    //     age: 4
    // }], (error, result) => {
    //     if (error) {
    //         console.log("Unable to insert")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([{
    //         description: 'Clean room',
    //         completed: true
    //     },
    //     {
    //         description: 'Play game',
    //         completed: false
    //     },
    //     {
    //         description: 'Meeting',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert")
    //     }
    //     console.log(result.ops);
    // })

    // db.collection('users').findOne({ _id: new ObjectID("5ff47c3cf420fb57bcd1bdb3") }, (error, result) => {
    //     if (error) {
    //         return console.log("Unable to fetch");
    //     }
    //     console.log(result);
    // })

    // db.collection('users').find({ name: "Twinein" }).toArray((error, users) => {
    //     console.log(users);
    // })
    // db.collection('users').find({ name: "Twinein" }).count((error, count) => {
    //     console.log(count);
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID("5ff47e0dc6243638ac040f73") }, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, results) => {
    //     console.log(results);
    // })

    // ################################ UPDATE ######################################################

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5ff47c3cf420fb57bcd1bdb3")
    // }, {
    //     // $set: {
    //     //     name: 'Rishi'
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    //################################## DELETE ##########################################################

    // db.collection('users').deleteMany({
    //     age: 4
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })


    db.collection('tasks')
        .deleteOne({
            description: "Play game"
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })

});