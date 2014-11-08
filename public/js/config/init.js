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

var appName = "codegence"

require.config({
    baseUrl: "js",
    paths:{
        "jquery" : "http://code.jquery.com/jquery-2.1.1.min",
        "foundation": "foundation.min",
        "angular": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min",
        "models": "models",
        "controllers": "controllers",
        "services": "services",
        "directives":"directives",
        "index": "controllers/home",
        "angular-route":"https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-route.min",
        "angular-cookies":"https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-cookies.min"
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
    app.config(function ($interpolateProvider,$httpProvider,$routeProvider,$locationProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.headers.post["Content-Type"] = "application/json";

            $routeProvider.
                when('/sector/:id', {
                    templateUrl: '/sector.html',
                    controller: 'SectorCtrl'
                }).
                when('/wglmap',{
                    redirectTo: '/wglmap.html'
                }).
                when('/map',{
                    redirectTo: '/map.html'
                }).otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        }
    );

    app.constant('globals', {
        "host": "localhost:8080",
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
