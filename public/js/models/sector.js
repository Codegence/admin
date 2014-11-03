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

var MINIMUN_WIDTH = 0;
var MINIMUM_HEIGHT = 0;
var MAXIMUN_WIDTH = 1000;
var MAXIMUN_HEIGHT = 1000;

var MINIMUN_ROCK_DENSITY = 0.01;
var MINIMUN_RESOURCE_DENSITY = 0.01;//TODO chequear esto

function Sector(name,type,width,height,rockDesnsity,resourceDensity){
    this.type = type || "random";
    this.name = name;
    this.width = width || MINIMUN_WIDTH;
    this.height = height || MINIMUM_HEIGHT;
    this.rockDensity =rockDesnsity || 0.01;
    this.resourceDensity = resourceDensity || 0.01;
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

    if(isEmpty(this.resourceDensity)){
        throw new Error("La densidad de los recursos no puede ser vacio");
    }

    if(this.resourceDensity <= 0){
        throw new Error("La densidad de los recursos no puede ser menor o igual a cero");
    }
}

function isEmpty(str){
    return str === "" || str === undefined || str === null;
}
