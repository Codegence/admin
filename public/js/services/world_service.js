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
