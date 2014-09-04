/**
 * Created by gaston on 29/08/14.
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
