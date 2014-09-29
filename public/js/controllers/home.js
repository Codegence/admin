/**
 * Created by gaston on 7/08/14.
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

    $scope.startSector = function(){
        WorldService.updateSector(function(){
            window.location.href = '/map?id=' +  $scope.selectedSector.id;
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
