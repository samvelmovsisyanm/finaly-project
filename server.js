var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000,function(){
    console.log("port is runing")
});

var Grass = require("./moduls/grass.js");
var xotaker = require("./moduls/xotaker.js");
var gishatich = require("./moduls/gishatich.js");
var mutant = require("./moduls/mutant.js");
var mard = require("./moduls/mard.js");

 grassArr = [];
 xotakerArr = [];
 gishatichArr = [];
 mardArr = [];
 mutantArr = [];

 var w = 50 ;
 var h = 50;
 function genMatrix(w,h){
     var matrix=[];
     for(var y=0 ;y<h; y++){
         matrix[y]=[];
         for(var x=0; x<w; x++){
             var r =Math.floor(Math.random()*75);
             if(r<20)r=0;
             else if(r<40)r=1;
             else if(r<42)r=2;
             else if(r<75)r=3;
             else if(r<70)r=4;
             else if(r<80)r=5;
             matrix[y][x]=r;
         }
     }
     return matrix
 }
 matrix= genMatrix(w,h);
 for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var xotk = new Xotaker(x, y, 2)
            xotakerArr.push(xotk);
        }
        else if (matrix[y][x] == 3) {
            var gishatich = new Gishatich(x, y)
            gishatichArr.push(gishatich);
        }
        else if (matrix[y][x] == 4) {
            var mard = new Mard(x, y)
            mardArr.push(mard);
        }
        else if (matrix[y][x] == 5) {
            var mut = new Mutant(x, y)
            mutantArr.push(mut);
        }
    }
}
function drawserever(){
    for (var i in grassArr){
        grassArr[i].mul();
    }
    for (var i in xotakerArr) {
        xotakerArr[i].move();
        xotakerArr[i].eat();
        xotakerArr[i].mul();
        xotakerArr[i].die();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].move();
        gishatichArr[i].eat();
        gishatichArr[i].mul();
        gishatichArr[i].die();
    }
    for (var i in mardArr) {
        mardArr[i].move();
        mardArr[i].eat();
        mardArr[i].mul();
        mardArr[i].die();
    }
    for (var i in mutantArr) {
        mutantArr[i].move();
        mutantArr[i].eat();
        mutantArr[i].mul();
        mutantArr[i].die();
    }
    io.sockets.emit("matrix",matrix);
}