var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');

var app = express();
app.use(cors());
app.use(express.json()); 

var conn_str = '';

var DATABASENAME = 'students_db';
var database;

app.listen(5038, () => {
    MongoClient.connect(conn_str, (error, client) => {
        if (error) {
            console.error('MongoDB connection error:', error);
            return;
        }
        database = client.db(DATABASENAME);
        console.log("MongoDB Connection Successful");
    });
});

app.get('/api/students/getStudents', (request, response) => {
    database.collection('students_collection').find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});

app.get('/api/students/getStudent', (request, response) => {
    const studentId = request.query.id;
    database.collection('students_collection').findOne({ id: studentId }, (error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});


app.delete('/api/students/deleteStudents', (request, response) => {
    database.collection('students_collection').deleteOne({
        id: request.query.id
    }, (error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.json("Deleted Successfully");
        }
    });
});

app.post('/api/students/newAddStudents', multer().none(), (request, response) => {
    database.collection('students_collection').find().sort({ id: -1 }).limit(1).toArray(function (error, docs) {
        if (error) {
            response.status(500).send(error);
        } else {
            const { surname, birth_year, gender, group, faculty, score, workplace, city } = request.body;

            let newId = 1; 
            if (docs.length > 0) {
                newId = parseInt(docs[0].id) + 1;
            }

            database.collection('students_collection').insertOne({
                id: newId.toString(),
                surname,
                birth_year,
                gender,
                group,
                faculty,
                score,
                workplace,
                city
            }, function(insertError) {
                if (insertError) {
                    response.status(500).send(insertError);
                } else {
                    response.json("Added Successfully");
                }
            });
        }
    });
});


app.get('/api/students/getStudentsJSON', (request, response) => {
    database.collection('students_collection').find({}).toArray((error, result) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.json(result);
        }
    });
});

app.put('/api/students/updateStudent', multer().none(), (request, response) => {
    const { id, surname, birth_year, gender, group, faculty, score, workplace, city } = request.body;

    database.collection('students_collection').updateOne(
        { id: id },
        {
            $set: {
                surname,
                birth_year,
                gender,
                group,
                faculty,
                score,
                workplace,
                city
            }
        },
        (error, result) => {
            if (error) {
                response.status(500).send(error);
            } else {
                response.json("Updated Successfully");
            }
        }
    );
});
