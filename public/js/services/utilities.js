/**
 * Created by gaston on 3/09/14.
 */

var module = angular.module(appName);

module.service("Utilities", [function () {
        this.completeObject = function(toComplete,newObject){
            for(var key in newObject){
                toComplete[key] = newObject[key];
            }
        }
    }]
);