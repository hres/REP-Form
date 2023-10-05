/**
 * Created by Abdessamad on 8/13/2016.
 */


(function () {
    'use strict';

    angular
        .module('drugUseModule', ['checkBoxListModule'])
})();

(function () {
    'use strict';

    angular
        .module('drugUseModule')
        .component('cmpDrugUse', {
            templateUrl: 'app/scripts/components/drug-use/tpl-drug-use.html',
            controller: drugUseCtrl,
            controllerAs: 'duCtrl',
            bindings: {
                listItems: '<', //array of objects
                showListErrors: '&',
                parentDirty: '<'
            }
        });

    function drugUseCtrl(){
        var self = this;

        self.$onInit = function(){
            self.commonName = "drugUse";
            self.myList = [];

            if (self.listItems) {
                self.myList = self.listItems;
            }
        };


        self.$onChanges = function (changes) {

            if (changes.listItems) {
                self.myList = changes.listItems.currentValue;
            }
        };

        self.isDrugUseSelected = function () {
            if (!self.myList) {
                return true;
            }
            for (var i = 0; i < self.myList.length; i++) {
                if (self.myList[i].value) {
                    return true;
                }
            }
            return false;
        };
        self.showNoRecordError = function (isInvalid) {
            return ((self.parentDirty && !self.isDrugUseSelected() ) || (self.showListErrors() && !self.isDrugUseSelected()));
        }



    }
})();
