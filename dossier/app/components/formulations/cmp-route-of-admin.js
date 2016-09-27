/**
 * Created by Abdessamad on 9/26/2016.
 */

(function () {
    'use strict';

    angular
        .module('roaModule', [])
})();

(function () {
    'use strict';

    angular
        .module('roaModule')
        .component('cmpRoa', {
            templateUrl: './app/components/formulations/tpl-route-of-admin.html',
            controller: roaCtrl,
            controllerAs: 'roaCtrl',
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&'
            }
        });



    function roaCtrl($filter){
        var self = this;

        self.$onInit = function(){

            self.model={
                list : [
                    {"id":1, "name":"Transdermal1"},
                    {"id":2, "name":"Transdermal2"},
                    {"id":3, "name":"Transdermal3"}
                ],

                roa :["Transdermal1", "Transdermal2", "Transdermal3", "Transdermal4", "OTHER"],
                selected:{}
            }
        };

        self.getTemplate = function (item) {
            if (item.id === self.model.selected.id) return 'editRoa';
            else return 'displayRoa';
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

           // self.deleteRecord(item.id)
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

