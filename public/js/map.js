var host = "172.17.201.138:8080";
var httphost = "http://" + host;

var socket;

var sectorHeight;
var stage;
var layerGround;
var layerObj;

function connect(host){
    try{
        socket = new WebSocket(host);

        socket.onopen = function(evt){
            console.log("Socket open");
        }

        socket.onmessage = function(evt){
            var payload = JSON.parse(evt.data);
            $('#container').trigger(payload.event, payload.data);
        }

        socket.onclose = function(evt){
            console.log("Socket close");
        }

        socket.onError = function(evt){
            console.log("Socket error");
        }
    } catch(exception){
        alert(exception);
    }
}

$(document).ready(function() {
    setup(window.location.search.split('=')[1]);
});

function setup(sectorId) {
    $('#container').on('initSector', handleInitSector);
    $('#container').on('updateSector', handleUpdateSector);

    connect("ws://" + host + "/sectors/" + sectorId + "/overseer");
};

function toPx(meters) {
    return meters * 20;
}

function newImage(id, x, y, src, layer, noOffset) {
    var imageObj = new Image();
    imageObj.onload = function() {
        var img = new Kinetic.Image({
                                        id: id,
                                        x: toPx(x),
                                        y: sectorHeight - toPx(y),
                                        image: imageObj,
                                        offset: (noOffset === true) ?
                                                    {x:0,y:0} : {x:imageObj.height / 2, y:imageObj.width / 2}
                                    });
        layer.add(img);
        layer.batchDraw();
    }
    imageObj.src = src;
}

function handleInitSector(event, data) {
    // create stage
    sectorHeight = toPx(data.height);
    stage = new Kinetic.Stage({
                                  container: 'container',
                                  width: toPx(data.width),
                                  height: toPx(data.height)
                              });

    // create background layer
    layerGround = new Kinetic.Layer();
    stage.add(layerGround);
    var bgObj = new Image();
    bgObj.onload = function() {
        var rect = new Kinetic.Rect({
                                        id: "bg",
                                        x: 0,
                                        y: 0,
                                        width: toPx(data.width),
                                        height: toPx(data.height),
                                        fillPatternImage: bgObj
                                    });
        layerGround.add(rect);
        layerGround.draw();
    }
    bgObj.src = "img/map/background.png";

    // create objects layer
    layerObj = new Kinetic.Layer();
    stage.add(layerObj);
    $(data.objects).each(function(i, val) {
        newImage(val.id, val.position[0], val.position[1], "img/map/" + val.type + ".png", layerObj);
    });
}

function handleUpdateSector(event, data) {
    //TODO deletedObjects
    $(data.newObjects).each(function(i, val) {
        newImage(val.id, val.position[0], val.position[1], "img/map/" + val.type + ".png", layerObj);
    });
    $(data.objects).each(function(i, val) {
        var obj = stage.get('#' + val.id)[0];
        if(obj !== undefined) {
            if(val.position !== undefined)
                obj.setPosition({x:toPx(val.position[0]), y:sectorHeight - toPx(val.position[1])});
            if(val.rotation !== undefined)
                obj.rotation(-val.rot * 180 / Math.PI);
        } else
            console.log("Update UNDEFINED " + JSON.stringify(val));
    });
    layerObj.batchDraw();
}
