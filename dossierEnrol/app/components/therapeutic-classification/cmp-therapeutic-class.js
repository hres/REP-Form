/**
 * Created by Abdessamad on 8/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('therapeuticClassModule', [])
})();

(function () {
    'use strict';

    angular
        .module('therapeuticClassModule')
        .component('cmpTherapeuticClass', {
            templateUrl: './components/therapeutic-classification/tpl-therapeutic-class.html',
            controller: therapeuticClassCtrl,
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&'
            }
        });


    function therapeuticClassCtrl($filter){
        var self = this;

        self.$onInit = function(){
            self.model={
                classifications : [
                    {"id":1, "name":"classification1"},
                    {"id":2, "name":"classification2"},
                    {"id":3, "name":"classification3"},
                    {"id":4, "name":"classification4"},
                    {"id":5, "name":"classification5"}
                ],
                selected:{}
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

            self.model.classifications.push(item);
            self.editRecord(item);

        };

        self.editRecord = function (item) {
            self.model.selected = item;
        };

        self.saveRecord = function (_id) {
           // console.log("Saving item: "+_id);
            var idx = self.model.classifications.indexOf(
                $filter('filter')(self.model.classifications, {id: _id}, true)[0]
            );
            self.model.classifications[idx] = self.model.selected;
            self.reset();
        };

        self.deleteRecord = function (_id) {
            //console.log("Deleting item: "+_id);

            var idx = self.model.classifications.indexOf(
                $filter('filter')(self.model.classifications, {id: _id}, true)[0]
            );
            self.model.classifications.splice(idx,1);
        };



        self.reset = function () {
            var item = self.model.selected;
            self.model.selected = {};

        };

        function getListMaxID(){

            var out = 0;
            var list = self.model.classifications;
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