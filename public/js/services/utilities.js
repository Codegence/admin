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
