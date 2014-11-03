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

limitNameSector = 20;

module.controller('HomeController',function($scope,$filter,WorldService,$location,Utilities){
    $scope.sectores = [];
    $scope.newSector = null;
    $scope.selectedSector = null;

    //para acortar el nombre del sector en la lista si supera el limite

    $scope.isGreaterThan = function(sectorName){
        return sectorName.length > limitNameSector ?
            $filter('limitTo')(sectorName, limitNameSector) + "...":sectorName;
    };

    function getAllSectors(){
        WorldService.getAllSectors(function(data){
            $scope.sectores = data;
        },function(error){
            alert("hubo un error al obtener los sectores");
        });
    }

    getAllSectors();

    $scope.soundStopPlay = function(event){
        var icon = angular.element(event.target);
        icon = !icon.html() ? icon : icon.children();
        if(icon.hasClass("fi-volume")){
            Utilities.stopIntro();
        }else{
            Utilities.playIntro();
        }
    };

/**
 * Agregar nuevo sector
 * ---------------------------------
 */
    $scope.addSector = function(){
        $scope.newSector = new Sector();
    };

    $scope.saveSector = function(){
        try {
            $scope.newSector.height = parseInt($scope.newSector.height);
            $scope.newSector.width = parseInt($scope.newSector.width);
            $scope.newSector.resourceDensity = parseFloat($scope.newSector.resourceDensity);
            $scope.newSector.rockDensity = parseFloat($scope.newSector.rockDensity);
            $scope.newSector.validate();
        }catch(Error){
            alert(Error.message);
            return;
        }
        WorldService.addSector(function(data){
            Utilities.completeObject($scope.newSector,data);
            getAllSectors();
            $scope.closeModal();
            $scope.showSector($scope.newSector);
        },function(error){
            alert("hubo un error al crear el sector");
        },$scope.newSector);
    };

    $scope.closeModal = function(){
        $('#addSectorModal').foundation('reveal', 'close');
    };

    /**
     * mostrar sector
     * ---------------------------------
     */
    $scope.showSector = function(sector){
        if($location.path() === '/sector/' + sector.name){
            return;
        }
        $scope.selectedSector = sector;
        var element = $('#sector_panel');
        if(element && element.hasClass('fadeInRightBig')) {
            element.removeClass('fadeInRightBig');
            element.addClass('fadeOutDownBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $location.path('/sector/' + sector.name);
                $scope.$apply();
            });
        }else{
            $location.path('/sector/' + sector.name);
        }
    };

    $scope.startSector2d = function(){
        WorldService.updateSector(function(){
            window.location.href = "/map.html?id=" + $scope.selectedSector.id;
        },function(){
              alert('hubo un error al intentar iniciar el juego');
            },{"id":$scope.selectedSector.id,"status":"start"});
    }

     $scope.startSector3d = function(){
        WorldService.updateSector(function(){
            window.location.href = "/wglmap.html?id=" + $scope.selectedSector.id;
        },function(){
              alert('hubo un error al intentar iniciar el juego');
            },{"id":$scope.selectedSector.id,"status":"start"});
    }

    /**
     * remover el sector
     */
    $scope.removeSector = function(){
        var element = $('#sector_panel');
        WorldService.removeSector(function() {
            $scope.sectores.splice($scope.sectores.indexOf($scope.selectedSector),1);
            element.removeClass('fadeInRightBig');
            element.addClass('fadeOutDownBig');
        },function(){
            alert("hubo un error al eliminar el sector");
        },$scope.selectedSector.id);
    }

    /**
    * efecto de salida del panel del sector
    */

/*    $scope.$on('$locationChangeSuccess',function(event){
        var element = $('#sector_panel');
        element.removeClass('fadeOutDownBig');
        element.addClass('fadeInRightBig');
    });*/
});
