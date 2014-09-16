/**
 * Created by gaston on 3/09/14.
 */

var module = angular.module(appName);

module.service("Utilities", ["$cookies",function ($cookies) {
        var icon = angular.element(document.getElementById('iconSound'));
        var sound = document.getElementById('intro');

        this.completeObject = function(toComplete,newObject){
            for(var key in newObject){
                toComplete[key] = newObject[key];
            }
        }

        this.playIntro = function(){
            sound.play();
            icon.removeClass("fi-volume-strike");
            icon.addClass("fi-volume");
            $cookies.soundOff = "false";
        }

        this.stopIntro = function(){
            sound.pause();
            icon.removeClass("fi-volume");
            icon.addClass("fi-volume-strike");
            sound.currentTime = 0;
            $cookies.soundOff = "true";
        }
    }]
);