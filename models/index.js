
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var mangoXlsx = require('mongo-xlsx');
var config = require('../settings');
var mongoose = require('mongoose');

module.exports = {
    Users: require('./user').Users
}

var Userdetails = require("../models").Users;
var Userdetails = mongoose.model('Users');

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, config.uploadPath);
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).array('fileUploader', 5);

router.post('/api/Upload', function (request, response) {
    console.log('IN API Upload');
    upload(request, response, function (err) {
        if (err) {
            console.log('Error Occured');
            console.log(err);
            return;
        }
        // request.files is an object where fieldname is the key and value is the array of files 
        console.log(request.files);
        var dataFromMongoDB = getAndSaveToMongoJsonFromExcel(request.files[0].path);
        //response.end(dataFromMongoDB);
        console.log('File Uploaded');

        getSavedDataFromMongoDB(response);
    })
});

router.get('/_ping1', function (req, res) {
    res.status(200).send("PONG1");
});

var getAndSaveToMongoJsonFromExcel = function (path) {
    console.log(path);
    var model = null;
    mangoXlsx.xlsx2MongoData(path, model, function (error, data) {
        var multiSheet = [data, []];
        var modifyData = getSaveToMongoSchemaData(multiSheet, 0);
        // console.log(modifyData);
        //return modifyData;
    });
}



var getSaveToMongoSchemaData = function (data, sheet) {
    if (data.length > 0) {
        var mongoData = [];
        var tempData = data[sheet];
        for (let index = 0; index < tempData.length; index++) {
            var item = new Userdetails({
                gender: tempData[index].gender,
                name: {
                    title: tempData[index].title,
                    first: tempData[index].first,
                    last: tempData[index].last
                },
                location: {
                    street: tempData[index].street,
                    city: tempData[index].city,
                    state: tempData[index].state,
                    postcode: tempData[index].postcode
                },
                email: tempData[index].email,
                dob: tempData[index].dob,
                registered: tempData[index].registered,
                phone: tempData[index].phone,
                cell: tempData[index].cell,
                id: {
                    name: tempData[index].name,
                    value: tempData[index].value
                },
                nat: tempData[index].nat
            });
            //console.log(item);
            item.save(function (error) {

                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log('Data saved.');
            });

            mongoData.push(item);
        }
        return mongoData;
    }
    return data;
}

var getSavedDataFromMongoDB = function (response) {
    var UserInfo = [];
    Userdetails.find({}, function (err, results) {
        if (!err) {

            console.log(results);
            for (let i = 0; i < results.length; i++) {
                let responseDetails = { 'Nationality': results[i].nat, 'DOB': results[i].dob, 'gender': results[i].gender };
                UserInfo.push(responseDetails);
            }

            console.log(UserInfo.length);
            //console.log(UserInfo);
            response.json({ success: "Data imported successfully.", status: 200, data: UserInfo });
        } else {
            console.log(err);
            throw err;
        }
    });


}

module.exports = router;