
module.exports =(app) =>{
    const handler = require('./handler');
    app.get('/process', handler.process)

    app.post('/appointments', handler.setAppointments)

    app.post('/users', handler.setUsers);

    app.get('/appointments',handler.getAppointments);

    app.get('/users',handler.getUsers);
}