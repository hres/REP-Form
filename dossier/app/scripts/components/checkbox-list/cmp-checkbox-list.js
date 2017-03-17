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
            templateUrl: 'app/scripts/components/checkbox-list/tpl-checkbox-list.html',
            controller: checkBoxListCtrl,
            controllerAs: 'chkl',
            bindings: {
                title: '@',
                commonName:'@',
                listItems: '<', //array of objects
                numberCols: '@',
                onUpdate:'&'
            }
        });

    function checkBoxListCtrl() {

        var self = this;

        self.numberColumns = 4; //default to 4
        self.colWidth = 3;


        self.$onInit = function () {
            //init items after change
            //temp as not hooked up
            //self.currentModel = self.listItems dosen't make sense doing this on init would happen on changes
        };

        self.$onChanges = function (changes) {

            if (changes.listItems) {
                self.currentModel = changes.listItems.currentValue;
            }
            if (changes.numberCols && changes.numberCols.currentValue) {
                self.numberColumns = changes.numberCols.currentValue;
                self.colWidth = Math.ceil(12 / self.numberColumns);
            }
        };
        //TODO remove?
        self.someSelected = function () {
            var object = self.roleModel;

            if (!object) return false;
            return Object.keys(object).some(function (key) {
                //console.log("cmpAddressRole someSelected: " + object[key]);
                return object[key];
            });
        };
        //TODO remove?

        /**
         * Manages the state of the other field
         * @param item
         */
        self.updateState = function (item) {
            if (!item.value) {

                item.value = false; //explicit false value

                if(item.hasOtherDetails){
                    item.otherText = "";
                }
            }
        };
      //  self.onUpdate({list:self.currentModel}); //TODO fix shouldn't have to update, should be dumb component
    }

})();


