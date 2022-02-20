const { response } = require("express");
var express = require("express");
var mongoose = require("mongoose");
var schema = mongoose.Schema;
var router = express.Router();

var empschema = new schema({
    _id: Number,
    empid: String,
    ename: { type: String, trim: true, required: true },
    sal: String
        //sal:{type:Number,validate:/[0-9]*/}
});

//retrieve data from emptab collection and its schema is defined 
//using empschema
var Emp = mongoose.model('emptab', empschema);

/* to retrieve all records from mongodb and displya it in the browser in table format
using index.jade file*/
router.get("/", function(req, res) {
    Emp.find().exec(function(err, data) {
        if (err) {
            res.status(500).send("no data found");
        }
        console.log(data);

        //this will display index.jade file on the screen
        res.render('index', { title: 'Employee Data', empdata: data })
    });
});
router.get("/create", function(req, res) {

    //this will display create.jade file on the screen
    res.render('create', { title: 'Add Employee' })

});

router.post("/create", function(req, res) {
    var emp = new Emp({ _id: req.body.keyid, empid: req.body.eid, ename: req.body.ename, sal: req.body.sal })
        //save model in  mongodb
    emp.save(function(err) {
        if (err) {
            res.status(500).send("no data found");
        }
        //it will go to browser and immediatly come back to sever
        //with new url "/"
        res.redirect("/");
    })
})

module.exports = router;