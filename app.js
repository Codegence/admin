/*
    Copyright (C) 2014  Gaston Kaltner
    This file is part of Codegence.

    Codegence is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Codegence is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Codegence. If not, see <http://www.gnu.org/licenses/>.
*/

var express = require("express"),
    http = require("http"),
    path = require("path"),
    consolidate = require("consolidate"),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger =  require("morgan");


function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.send(500, { error: 'Something blew up!' });
    } else {
        next(err);
    }
}

var app = express();
app.engine('html',consolidate.swig);
app.set('view engine','html');
app.set('views',path.join(__dirname ,"public"));
app.use(logger('combined'));
app.use(bodyParser.text());
app.use(methodOverride());

//app.use(express.Router());
app.use(clientErrorHandler);
app.use(express.static("public"));

//routes
var home = require(path.join(__dirname,"controllers/index.js"));
var map = require(path.join(__dirname,"controllers/map.js"));
var wglmap = require(path.join(__dirname,"controllers/wglmap.js"));
app.get('/',home.index);
app.get('/sector/:id',home.sector);
app.get('/map',map.start);
app.get('/wglmap',wglmap.start);

/**
 * Captura de excepciones inesperadas
 */
process.on('uncaughtException', function ( err ) {
    console.error("hubo un error inesperado, se cerrara el servidor");
    console.error(err);
    process.exit(1);
});

/**
 * Inicio del servidor
 */
http.createServer(app).listen('3000',function(){
    console.log('Servidor de pruebas levantado en el puerto 3000');
});
