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
            templateUrl: './app/components/therapeutic-classification/tpl-therapeutic-class.html',
            controller: therapeuticClassCtrl,
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&',
                showErrors: '&'
            }
        });


    function therapeuticClassCtrl($filter){
        var self = this;

        self.model = {
            classifications: [],
            selected: {}
        };

        self.$onInit = function(){

            if(self.listItems){
                self.model.classifications = self.listItems;
            }
        };

        self.$onChanges = function (changes) {

            if (changes.listItems) {
                self.model.classifications = changes.listItems.currentValue;
            }
        };

        // gets the template to ng-include for a table row / item
        self.getTemplate = function (item) {
            if (item.id === self.model.selected.id) return 'editClass';
            else return 'displayClass';
        };

        self.addNew = function(){

            var maxID = self.model.classifications.length;//getListMaxID();

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

        self.deleteRecord = function (idx) {
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

        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && self.showErrors()) )
        }


    }
})();