/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule', [])
})();

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule')
        .component('cmpContainerTypeRecord', {
            templateUrl: 'app/scripts/components/formulations/tpl-container-type-record.html',
            controllerAs: 'ctrCtrl',
            controller: containerTypeRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&',
                isDetailValid: '&',
                recordIndex:'<'
            }

        });
    containerTypeRecCtrl.$inject=['$scope'];
    function containerTypeRecCtrl($scope) {

        var self = this;
        self.savePressed=false;
        self.ctModel = { //TODO move to service
            "containerType": "",
            "packageSize": "",
            "shelfLifeYears": undefined,
            "shelfLifeMonths": undefined,
            "tempMin": undefined,
            "tempMax": undefined
        };
        self.backup = angular.copy(self.ctModel);
        self.$onInit = function () {
            self.savePressed=false;

            /* if(self.record){
                self.ctModel = angular.copy(self.record);
            }
             self.backup = angular.copy(self.ctModel);*/
        };

        self.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                self.ctModel = angular.copy(changes.record.currentValue);
                self.ctModel.shelfLifeYears = Number(changes.record.currentValue.shelfLifeYears);
                self.ctModel.shelfLifeMonths = Number(changes.record.currentValue.shelfLifeMonths);
                self.ctModel.tempMin = Number(changes.record.currentValue.tempMin);
                self.ctModel.tempMax = Number(changes.record.currentValue.tempMax);
                self.backup = angular.copy(self.ctModel);
            }

        };

        self.save = function () {
            if(self.containerTypeForm.$valid) {
                if (self.record) {
                    // console.log('product details update product');
                    self.onUpdate({cType: self.ctModel});

                } else {
                    //  console.log('product details add product');
                    self.onAddIng({cType: self.ctModel});
                }
                self.containerTypeForm.$setPristine();
                self.savePressed=false;
            }else{
                self.savePressed=true;
            }

        };

        self.discardChanges = function(){
            self.ctModel = angular.copy(self.backup);
            self.containerTypeForm.$setPristine();
            self.onCancel();
        };

        self.delete = function(){
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };
        /**
         * Manages visibility of error messages for an indvidual control
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        self.showError=function(isInvalid, isTouched){
            return ((isInvalid && isTouched) || (isInvalid && self.savePressed) /* TODO add showErrors||(isInvalid && self.showErrors())*/)
        };

        $scope.$watch('ctrCtrl.containerTypeForm.$dirty', function () {
            self.isDetailValid({state: !self.containerTypeForm.$dirty});
        }, true);
    }

})();
