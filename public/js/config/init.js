/**
 * Created by gaston on 7/08/14.
 */

var appName = "codegence"

require.config({
    baseUrl: "js",
    paths:{
        "jquery" : "vendor/jquery",
        "foundation": "foundation.min",
        "angular": "angular.min",
        "models": "models",
        "controllers": "controllers",
        "services": "services",
        "directives":"directives",
        //"x3dom": "http://www.x3dom.org/download/x3dom",
        "index": "controllers/home",
        "angular-route":"angular-route.min",
        "angular-cookies":"angular-cookies"
    },
    shim:{
        "angular":{
            exports: 'angular'
        },
        "jquery":{
            exports: '$'
        },
        "angular-route" :{
            "deps":['angular']
        },
        "angular-cookies":{
            "deps":['angular']
        },
        "foundation" :{
            deps: ["jquery"],
            init: function(){
                $(document).foundation();
            }
        },
        "init":{
          deps:['angular','foundation','angular-route','angular-cookies']
        },
        "index" :{
            deps:['app','services/utilities','services/world_service',"models/sector","directives/slider_range_bind","controllers/sector"],
            init: function(app){
                app.init();
            }
        },
        "controllers/sector":{
            deps:["models/faction"]
        }
    }
});

// Angular Configuration
define('app',['angular','angular-cookies'],function(){
    var app = angular.module(appName,['ngRoute','ngCookies']);
    app.config(function ($interpolateProvider,$httpProvider,$routeProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.headers.post["Content-Type"] = "application/json";

            $routeProvider.
                when('/sector/:id', {
                    templateUrl: '/sector/:id',
                    controller: 'SectorCtrl'
                }).
                /*when('/map',{
                    redirectTo: '/map'
                }).*/otherwise({
                    redirectTo: '/'
                });

        }
    );

    app.constant('globals', {
        "host": "172.17.201.138:8080",
        //"host": "localhost:8080",
        "protocol": "http"
    });

    app.factory('domain',['globals',function(globals){
        return globals.protocol  + "://" + globals.host + "/";
    }]);

   app.run(function(Utilities,$cookies){
       if($cookies.soundOff === "true"){
           Utilities.stopIntro();
       }else{
           Utilities.playIntro();
       }
   })

    app.init = function() {
        angular.bootstrap(document, [appName]);
    };
    return app;
});

//start app
require(['init'],function(){
    require(['index']);
    $('#topBar').addClass('animated fadeInDown');
    $('#leftContainer').addClass('animated fadeInLeftBig');
    $('#intro')[0].volume = 0.60;
    var left_door = $('#left-door');
    left_door.addClass('animated fadeOutLeftBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
        left_door.hide();
    });
    var right_door = $('#right-door');
    right_door.addClass('animated fadeOutRightBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
        right_door.hide();
    });
    //se usa para cuando termina la animacion
    /*.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
        alert("termino");
    });*/

    //to fix slider on modal
    $(document).on('opened','[data-reveal]',function(){
        $(window).trigger('resize');
    });
});
