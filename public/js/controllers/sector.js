/**
 * Created by gaston on 29/08/14.
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