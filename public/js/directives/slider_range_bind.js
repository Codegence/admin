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

function slider(scope,element,attrs){
    var slider = $(element);
    /*scope.$watch(attrs.ngModel,function(value) {
     if(value != undefined || value != null)
     slider.foundation('slider', 'set_value', value);
     });*/

    slider.on('change.fndtn.slider', function(){
        scope.ngModel = slider.attr('data-slider');
        scope.$apply();
    });

}
module.directive('bindDataSlider',function(){
    return {
        scope: {
            ngModel : "="
        },
        restrict: 'A',
        link:slider
    };
});
