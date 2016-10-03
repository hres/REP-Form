/**
 * Created by Abdessamad on 8/10/2016.
 */


(function () {
    'use strict';

    angular
        .module('checkBoxListModule', [])
})();

(function () {
    'use strict';

    angular
        .module('checkBoxListModule')
        .component('cmpCheckboxList', {
            templateUrl: './app/components/checkbox-list/tpl-checkbox-list.html',
            controller: checkBoxListCtrl,
            controllerAs: 'chkl',
            bindings: {
                title: '@',
                commonName:'@',
                listItems: '<' //array of objects
            }
        });

    function checkBoxListCtrl(){

        var self = this;
        self.$onInit = function(){
            //init items after change
            //temp as not hooked up
            self.currentModel = self.listItems
        }
        self.$onChanges = function (changes) {

            if (changes.listItems) {
                self.currentModel = self.listItems.currentValue;
            }
        }
        //TODO remove?
        self.someSelected = function () {
            var object = self.roleModel;

            if (!object) return false;
            return Object.keys(object).some(function (key) {
                //console.log("cmpAddressRole someSelected: " + object[key]);
                return object[key];
            });
        }
        //TODO remove?
        self.updateRoleModel = function () {

            self.formName.addressRole.$dirty =
                self.formName.addressRole.$touched = true;

            self.formName.addressRole.$pristine = !self.formName.addressRole.$dirty;
            self.formName.addressRole.$untouched = !self.formName.addressRole.$touched;

            self.onUpdate({$event: {roles: self.roleModel}});

        }

    }
})();


