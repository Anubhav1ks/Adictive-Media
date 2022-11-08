const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const upload=require("express-fileupload")
require('dotenv').config();



const app = express();

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(upload());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'public')));
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
mongoose.connect('mongodb+srv://admin-Anubhav:test123@cluster0.xagze.mongodb.net/?retryWrites=true&w=majority');



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successfully connected");
});

const formSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    dob:Date,
    country:String,
    resume:String
});
const Form = mongoose.model('Form', formSchema);




function getName() {
    var n=4;
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomString = 'DONBTN';
  
    for (var i = 0; i < n; i++) {
        var index = Math.floor(Math.random() * 62);
        randomString = randomString+characters[index];
    }
    return randomString;
}
var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];



app.get("/", async function(req , res){
        res.render("home", {
            country:country_list
             });
});


app.get("/view-data",function(req,res){
    Form.find({},function(err,founddata){
        if(err){
          console.log(err);
        }else{
          res.render("view", {
            datas: founddata
            });
        }
    });
    // res.render('view')
});


app.post("/",function(req,res){
    console.log(req.body.resume);
    var filename=""
    if(req.files){
        console.log(req.files);
        var file=req.files.resume
        filename=getName()+file.name
        console.log(filename);
        file.mv('./public/uploads/'+filename,function(err){
            if(err){
                res.send(err);
            }
            else{
                console.log("file upload");
            }
        })
    }
    // var resume =__dirname+ "/uploads/"+filename;
    // console.log(resume);
    const data= new Form({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob:req.body.dob,
        country:req.body.country,
        resume:filename
    })
    data.save();
    res.redirect("/");

});



  
  
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});












