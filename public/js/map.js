var host = "172.17.201.138:8080";
var httphost = "http://" + host;

var socket;

var sectorHeight;
var stage;
var layerGround;
var layerObj;

var audios = {};

var context;
var bufferLoader;


function connect(host){
    try{
        socket = new WebSocket(host);
        socket.binaryType = 'arraybuffer';

        socket.onopen = function(evt){
            console.log("Socket open");
        }

        socket.onmessage = function(evt){
            var inflated = pako.inflate(new Uint8Array(evt.data));
            var str = "";
            for (var i=0; i<inflated.length; i++)
                str += String.fromCharCode(inflated[i]);
            var payload = JSON.parse(str);
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
    initSounds();
});

function initSounds() {
    // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      {name:"new-bullet", url : "sound/new-bullet.mp3"},
      {name:"new-drone", url : "sound/new-drone.ogg"},
      {name:"new-terminator", url : "sound/new-drone.ogg"},
      {name:"delete-terminator", url: "sound/delete-something.ogg"},
      {name:"delete-drone", url: "sound/delete-something.ogg"},
      {name:"delete-recycler", url: "sound/delete-something.ogg"},
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading() {
    console.log("Audios loaded!");
    var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  source1.buffer = bufferLoader.bufferByName["new-rock"];
  //source2.buffer = bufferLoader.bufferList[1];

  source1.connect(context.destination);
 // source2.connect(context.destination);
  source1.start(0);
  //source2.start(0);
}

function setup(sectorId) {
    $('#container').on('initSector', handleInitSector);
    $('#container').on('updateSector', handleUpdateSector);

    connect("ws://" + host + "/sectors/" + sectorId + "/overseer");
};

function toPx(meters) {
    return meters * 20;
}

function newImage(id, x, y, src, layer, type, noOffset) {
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
    playSound("new-" + type);

}


function playSound( sound ) {
    if( bufferLoader.bufferByName[sound] !== undefined ) {
          var source1 = context.createBufferSource();
          source1.buffer = bufferLoader.bufferByName[sound];

          source1.connect(context.destination);
          source1.start(0);
    }
}

function UrlExists(url)
{
    
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
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
        newImage(val.id, val.position[0], val.position[1], "img/map/" + val.type + ".png", layerObj, val.type);
    });
}

function handleUpdateSector(event, data) {
    $(data.deletedObjects).each(function(i, val) {        
        var obj = stage.get('#' + val.id)[0];
        if(obj !== undefined)
            obj.remove();
        else
            console.log("Remove UNDEFINED " + JSON.stringify(val));
        playSound("delete-"+val.type);
    });
    $(data.newObjects).each(function(i, val) {
        newImage(val.id, val.position[0], val.position[1], "img/map/" + val.type + ".png", layerObj, val.type);
    });
    $(data.objects).each(function(i, val) {
        var obj = stage.get('#' + val.id)[0];
        if(obj !== undefined) {
            if(val.position !== undefined)
                obj.setPosition({x:toPx(val.position[0]), y:sectorHeight - toPx(val.position[1])});
            if(val.rotation !== undefined)
                obj.rotation(-val.rotation * 180 / Math.PI);
        } else
            console.log("Update UNDEFINED " + JSON.stringify(val));
    });
    layerObj.batchDraw();
}
