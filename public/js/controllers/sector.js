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

module.controller('SectorCtrl',function($scope,WorldService,Utilities){

    $scope.newFaction = {};

    $scope.getAllFactions = function(){
      WorldService.getAllFactions(function(data){
          $scope.selectedSector.factions = data ? data : [];
      },function(){
          alert("hubo un error al obtener las facciones del sector: " + $scope.selectedSector.name);
      },$scope.selectedSector.id);
    };

    $scope.getAllFactions();

    $scope.addFaction = function(){
        $scope.newFaction = new Faction();
    };

    $scope.saveFaction = function(){
        try {
            $scope.newFaction.validate();
        }catch(Error){
            alert(Error.message);
            return;
        }

        WorldService.addFaction(function(data){
            Utilities.completeObject($scope.newFaction,data);
            //TODO cambiar esto para que se agregue directamento sobre la lista y no recargarla
            $scope.getAllFactions();
            //$scope.selectedSector.factions.push($scope.newFaction);
            $scope.closeModal();
        },function(){
            alert("hubo un error al crear la faccion");
        },$scope.selectedSector.id,$scope.newFaction);
    };

    $scope.removeFaction = function(faction){
        //TODO chequear el estado de la facccion
        WorldService.removeFaction(function() {
            $scope.selectedSector.factions.splice($scope.selectedSector.factions.indexOf(faction),1);
        },function(){
            alert("hubo un error al eliminar la faccion");
        },$scope.selectedSector.id,faction.id);
    };

});
