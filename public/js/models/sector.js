/**
 * Created by gaston on 11/08/14.
 */

var MINIMUN_WIDTH = 0;
var MINIMUM_HEIGHT = 0;
var MAXIMUN_WIDTH = 1000;
var MAXIMUN_HEIGHT = 1000;

var MINIMUN_ROCK_DENSITY = 0.01;
var MINIMUN_RESOURCE_DENSITY = 0.01;//TODO chequear esto

function Sector(name,type,width,height,rockDesnsity,resDensity){
    this.type = type || "random";
    this.name = name;
    this.width = width || MINIMUN_WIDTH;
    this.height = height || MINIMUM_HEIGHT;
    this.rockDensity =rockDesnsity || 0.01;
    this.resDensity = resDensity || 0.01;
    this.running = false;
    this.id = null;
    this.factions = [];
}

Sector.prototype.getMinimunHeight = function(){
    return MINIMUM_HEIGHT;
}

Sector.prototype.getMinimunWidth = function(){
    return MINIMUN_WIDTH;
}

Sector.prototype.getMaximunHeight = function(){
    return MAXIMUN_HEIGHT;
}

Sector.prototype.getMaximunWidth = function(){
    return MAXIMUN_WIDTH;
}

Sector.prototype.getMinimunRockDensity = function(){
    return MINIMUN_ROCK_DENSITY;
}

Sector.prototype.getMinimunResourceDensity = function(){
    return MINIMUN_RESOURCE_DENSITY;
}

Sector.prototype.validate = function(){
    if(isEmpty(this.name)){
        throw new Error("EL nombre no debe estar vacio");
    }

    if(isEmpty(this.width)){
        throw new Error("EL ancho no puede estar vacio");
    }

    if(this.width < MINIMUN_WIDTH){
        throw new Error("El ancho no puede ser menor a " + MINIMUN_WIDTH);
    }

    if(isEmpty(this.height)){
        throw new Error("EL alto no puede estar vacio");
    }

    if(this.height < MINIMUM_HEIGHT){
        throw new Error("El ancho no puede ser menor a " + MINIMUN_WIDTH);
    }

    if(isEmpty(this.rockDensity)){
        throw new Error("La densidad de la roca no puede ser vacio");
    }

    if(this.rockDensity <= 0){
        throw new Error("La densidad de la roca no puede ser menor o igual a cero");
    }

    if(isEmpty(this.resDensity)){
        throw new Error("La densidad de los recursos no puede ser vacio");
    }

    if(this.resDensity <= 0){
        throw new Error("La densidad de los recursos no puede ser menor o igual a cero");
    }
}

function isEmpty(str){
    return str === "" || str === undefined || str === null;
}