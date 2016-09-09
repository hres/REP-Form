/**
 * Created by Abdessamad on 8/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('countryListModule', ['dataLists'])
})();

(function () {
    'use strict';

    angular
        .module('countryListModule')
        .component('cmpCountryList', {
            templateUrl: './components/appendix-four/tpl-country-list.html',
            controller: countryListCtrl,
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&'
            }
        });

    countryListCtrl.$inject = ['$filter','getCountriesISO3166'];


    function countryListCtrl($filter, getCountriesISO3166){
        var self = this;

        self.$onInit = function(){
            self.model={
                countries : ["UNKNOWN"].concat(getCountriesISO3166.getCountryList3Letter()),// angular.extend({}, ["UNKNOWN"], ) ,/**/
                list : [
                    {"id":1, "name":"ARG"},
                    {"id":2, "name":"CAN"},
                    {"id":3, "name":"USA"}
                ],
                selected:{},

                unknownCountryDetails : "A"
            }
        }

        // gets the template to ng-include for a table row / item
        self.getTemplate = function (item) {
            if (item.id === self.model.selected.id) return 'edit';
            else return 'display';
        };

        self.addNew = function(){

            var maxID = getListMaxID();

            //console.log("addNew maxID: " + JSON.stringify(maxID) );

            var item = {"id":maxID + 1, "name":""};

            self.model.list.push(item);
            self.editRecord(item);

        };

        self.editRecord = function (item) {
            self.model.selected = item;
        };

        self.saveRecord = function (_id) {
           // console.log("Saving item: "+_id);
            var idx = self.model.list.indexOf(
                $filter('filter')(self.model.list, {id: _id}, true)[0]
            );
            self.model.list[idx] = self.model.selected;
            self.reset();
        };

        self.deleteRecord = function (_id) {
            //console.log("Deleting item: "+_id);

            var idx = self.model.list.indexOf(
                $filter('filter')(self.model.list, {id: _id}, true)[0]
            );
            if(idx < 0) return;

            self.model.list.splice(idx,1);
        };



        self.reset = function () {
            var item = self.model.selected;
            //console.log('reset selected: ' + item.toSource());
            if(angular.isUndefined(item))
                return;

            self.deleteRecord(item.id)
            self.model.selected = {};

        };

        function getListMaxID(){

            var out = 0;
            var list = self.model.list;
            if (list) {
                for (var i = 0; i<list.length; i++) {
                    if (list[i].id > out) {
                        out = list[i].id;
                    }
                }
            }
            return out;

        }
    }
})();