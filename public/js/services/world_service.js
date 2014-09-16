/**
 * Created by gaston on 7/08/14.
 */
var module = angular.module(appName);

module.service("WorldService", ['$http','domain', function ($http, domain) {

        /**
         * Sectores
         */
        this.getSector = function (successCallback, errorCallback,id) {//use callback(err,data)
            get(successCallback,errorCallback,"sectors/" +id);
        };
        this.getAllSectors = function (successCallback, errorCallback) {//use callback(err,data)
            get(successCallback,errorCallback,"sectors");
        };
        this.addSector = function (successCallback, errorCallback, dataObject) {//use callback(err,data)
            save(successCallback,errorCallback,"sectors",dataObject);
        };
        this.updateSector = function (successCallback, errorCallback, dataObject) {
            update(successCallback,errorCallback,"sectors/" + dataObject.id,dataObject);
        };
        this.patchSector = function (successCallback, errorCallback, dataObject) {
           patch(successCallback,errorCallback,"sectors/" + dataObject.id,dataObject);
        };
        this.removeSector = function(successCallback, errorCallback,dataObjectId){
           remove(successCallback,errorCallback,"sectors/" + dataObjectId);
        };

        /**
         * Facciones
         */
        this.getFaction = function (successCallback, errorCallback,sectorId,factionId) {//use callback(err,data)
            get(successCallback,errorCallback,"sectors/" +sectorId + "/factions/" + factionId );
        };
        this.getAllFactions = function (successCallback, errorCallback,sectorId) {//use callback(err,data)
            get(successCallback,errorCallback,"sectors/" +sectorId + "/factions");
        };
        this.addFaction = function (successCallback, errorCallback,sectorId, dataObject) {//use callback(err,data)
            save(successCallback,errorCallback,"sectors/" + sectorId + "/factions",dataObject);
        };
        this.updateFaction = function (successCallback, errorCallback,sectorId,dataObject) {
            update(successCallback,errorCallback,"sectors/" + sectorId + "/factions/" + dataObject.id,dataObject);
        };
        this.patchFaction = function (successCallback, errorCallback,sectorId,dataObject) {
            patch(successCallback,errorCallback,"sectors/"+ sectorId + "/factions/" + dataObject.id,dataObject);
        };
        this.removeFaction = function(successCallback, errorCallback,sectorId,factionId){
            remove(successCallback,errorCallback,"sectors/" +sectorId + "/factions/" + factionId );
        };

        function get(successCallback, errorCallback,resource){
            $http.get(domain + resource).then(function (response) {
                successCallback(response.data);
            }, function (error) {
                console.log(error);
                errorCallback(error);
            });
        }

        function save(successCallback, errorCallback,resource, dataObject){
            $http.post(domain + resource,dataObject).then(function (response) {
                successCallback(response.data || null);
            }, function (error) {
                console.log(error);
                errorCallback(error);
            });
        }

        function update(successCallback, errorCallback,resource, dataObject){
            $http.put(domain + resource, dataObject).then(function (response) {
                successCallback(response.data || null);
            }, function (error) {
                console.log(error);
                errorCallback(error);
            });
        }

        function patch(successCallback, errorCallback,resource, dataObject) {
            $http.patch(domain + resource, dataObject).then(function (response) {
                successCallback(response.data || null);
            }, function (error) {
                console.log(error);
                errorCallback(error);
            });
        }

        function remove(successCallback, errorCallback,resource) {
            $http.delete(domain + resource ).then(function (response) {
                successCallback(response.data || null);
            }, function (error) {
                console.log(error);
                errorCallback(error);
            });
        }
    }]
);