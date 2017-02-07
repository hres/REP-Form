/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('appendixFourModule', ['expandingTable','appendix4RecordModule'])
})();

(function () {
    'use strict';
    angular
        .module('appendixFourModule')
        .component('cmpAppendixFour',{
            templateUrl: 'app/scripts/components/appendix-four/tpl-appendix-four.html',
            controller: appendixFourCtrl,
            controllerAs: 'ap4Ctrl',
            bindings: {

                ingredients : '<',
                recordChanged: '&',
                service: '<'
            }
        });

    function appendixFourCtrl(){

        var self=this;
        self.selectRecord = -1; //the record to select, initially select non
        self.resetToCollapsed = true;
        self.colNames = [
            {label: "INGRED_NAME", binding: "ingredientName", width: "98"}
        ];
        self.ingredientList=[];

        self.$onInit = function(){
            self.newFormShown = false;
            self.isDetailValid = true; //TODO needs to be managed in ADD and delete

            if(!self.ingredientList){
                self.ingredientList = [];
               // self.ingredientList = self.ingredients;
            }
        };

        self.$onChanges = function (changes) {

            if (changes.ingredients) {
                self.ingredientList = changes.ingredients.currentValue;
            }
        };


        self.addNew = function () {
            var newRecord = {
                "id":(getListMaxID() + 1),
                "ingredientName": ""
            };
            self.ingredientList.push(newRecord);
            self.resetToCollapsed= !self.resetToCollapsed;;
            self.selectRecord=( self.ingredientList.length-1);

        };

        function getListMaxID() {
            var out = 0;
            var list = self.ingredientList;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id > out) {
                        out = list[i].id;
                    }
                }
            }
            return out;
        }

        self.update = function (idx, ing) {
            //self.ingredientList[idx] = angular.copy(ing);
        };

        self.delete = function (idx) {
            //console.debug('frmList delete: ' + idx);
            if (self.ingredientList.splice(idx, 1))
                self.resetToCollapsed = true;

        }

    }
})();
