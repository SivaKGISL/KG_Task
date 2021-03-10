/*
 * Request Handlers
 *
*/


// Dependencies
const Model = require('./model');

// Define all the handlers
var handlers = {};


// appointments - post
// Required data: fromTime, toTime, currentDate, 
handlers.setAppointments = (req,res) =>{
    const requestData = req.body;
    const model = new Model.appointment({
        name: requestData.name,
        contact: requestData.contact,
        appointment: requestData.appointment,
        waited:requestData.waited,
        age:requestData.age,
        image:requestData.image,
        status:requestData.status,
    });
    model.save().then(data => {
        console.log("data === >", data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error in save data"
        })
    })
};

handlers.process = async (req, res) => {
       Model.users.find({}).then((users) => {
        Model.appointment.find({}).then((appointment) => {
            console.log('users',users);
            console.log('appointment',appointment);
            if (users.length === 0) {
                Model.users.create(...require("../data/users.json"));
              }
              if (appointment.length === 0) {
                  Model.appointment.create(...require("../data/appointments.json"));
              }
        })
       });      
}

// appointments - get
// Required data: fromTime, toTime, currentDate, 
handlers.getAppointments = (req,res) =>{
    Model.appointment.find({}).then(resData => {
        console.log("resData",resData)
        if (!resData) {
            return res.status(404).send({
                message: "Requested data not found" + JSON.stringify(req.body.filter)
            });
        }
        res.send(resData);
    }).catch(err => {
        return res.status(500).send({
            message: "Error in deleting data " + err
        });
    })
};


// users - get
handlers.getUsers = (req,res) =>{
    Model.users.find(req.body.filter).then(resData => {
        if (!resData) {
            return res.status(404).send({
                message: "Requested data not found" + JSON.stringify(req.body.filter)
            });
        }
        res.send(resData);
    }).catch(err => {
        return res.status(500).send({
            message: "Error in deleting data " + err
        });
    })
};

// users - post
handlers.setUsers = (req,res) =>{
    const requestData = req.body;
    if(requestData.fromTime && requestData.toTime) {
        const filter = {
            fromTime : requestData.fromTime 
        }
        Model.users.find(filter).then(resData => {
            if(resData.length === 0) {
                const model = new Model.users({
                    fromTime: requestData.fromTime,
                    toTime: requestData.toTime
                });
                console.log('sendPostRequest',requestData);
                model.save().then(data => {
                    console.log("data === >", data);
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Error in save data"
                    })
                })
            } else {
                const error = {
                    error: "Time slot already added"
                }
                res.send(error)
            }
        });
       
    }
};

module.exports = handlers