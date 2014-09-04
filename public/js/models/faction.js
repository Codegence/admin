/**
 * Created by gaston on 1/09/14.
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