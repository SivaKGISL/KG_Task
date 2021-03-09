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
        const model = new Model.appointment({
            fromTime: requestData.fromTime,
            toTime: requestData.toTime,
            currentDate: requestData.currentDate,
            currentTimeStamp:requestData.currentTimeStamp
        });
        model.save().then(data => {
            console.log("data === >", data);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error in save data"
            })
        })
    }
};

module.exports = handlers