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
            templateUrl: './app/components/formulations/tpl-container-type-record_20161124_1509.html',
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
                isDetailValid: '&'
            }

        });
    containerTypeRecCtrl.$inject=['$scope'];
    function containerTypeRecCtrl($scope) {

        var self = this;
        self.savePressed=false;
        self.$onInit = function () {
            self.savePressed=false;
            self.ctModel = {};

            if(self.record){
                self.ctModel = angular.copy(self.record);
            }
            self.backup = angular.copy(self.ctModel);
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
        }

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
            return((isInvalid && isTouched) /* TODO add showErrors||(isInvalid && self.showErrors())*/)
        }

        $scope.$watch('ctrCtrl.containerTypeForm.$dirty', function () {
            self.isDetailValid({state: !self.containerTypeForm.$dirty});
        }, true);
    }

})();
