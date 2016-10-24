/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule', ['tissuesFluidsOriginModule', 'sourceAnimalModule'])
})();

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule')
        .component('cmpAppendixFourRecord', {
            templateUrl: './app/components/appendix-four/tpl-appendix-four-record.html',
            controllerAs: 'ap4RecCtrl',
            controller: app4RecCtrl,
            bindings: {
                record: '<',
                showListErrors: '&',
                onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&'
            }

        });

    function app4RecCtrl(){

        var self = this;
        self.isSourced = ""; //determines if at least one source is selected
        self.model = {}
        self.$onInit = function(){

        }
        self.$onChanges = function (changes) {
            if (changes.record) {
                self.model = angular.copy(changes.record.currentValue);
            }

        }
        self.isSourcedSelected = function () {
            var result = (self.model.humanSourced || self.model.animalSourced)
            if (result) {
                self.isSourced = result;
            } else {
                self.isSourced = "";
            }
            return (result);

        }

        self.noSelectionError = function () {
            return ((self.appendix4RecForm.$dirty && !self.isSourcedSelected() ) || (self.showListErrors() && !self.isSourcedSelected()));
        }
        /**
         * Used to show field level errors
         * @param isInvalid
         * @param isTouched
         * @returns {boolean}  true if you should show error
         */
        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && self.showListErrors()))
        };
        self.save = function () {
            if (self.record) {
                // console.log('product details update product');
                self.onUpdate({record: self.model});
            } else {
                //  console.log('product details add product');
                self.onAddNew({record: self.model});
            }

        };

        self.discardChanges = function () {
            self.model = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        }

        self.delete = function () {
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };

        self.updateTissuesFluids = function(input){

            //console.log('apdx4 record updateTissuesFluids : ' + JSON.stringify(input));

            self.model.tissuesFluidsOrigin = input;

           /* if (self.record) {
                self.onUpdate({record: self.model});
            }*/

        };

        self.updateAnimalSourced = function(input){

            self.model.sourceAnimalDetails = input;

        };

    }
})();
