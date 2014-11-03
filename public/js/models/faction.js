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

function Faction(name,uri){
    this.id = null;
    this.name = name;
    this.uri = uri;
    this.state = null;
    this.avatar = null;
}

Faction.prototype.validate = function(){
    if(isEmpty(this.name)){
        throw new Error("EL nombre no debe estar vacio");
    }

    if(isEmpty(this.uri)){
        throw new Error("la uri no puede estar vacio");
    }
}

function isEmpty(str){
    return str === "" || str === undefined || str === null;
}
