/**
 * Created by dkilty on 29/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('activityRecord', ['dinModule'])
})();

(function () {
    'use strict';

    angular
        .module('activityRecord')
        .component('cmpActivityRecord', {
            templateUrl: 'app/scripts/components/relatedActivity/tpl-related-activity.html',
            controller: activityRecCtrl,
            controllerAs: 'activityCtrl',
            bindings: {
                activityRecord: '<',
                updateValid: '&',
                onDelete: '&',
                isAmend: '<',
                isDetailValid: '&',
                activityList: '<',
                onUpdate: '&'

            }
        });
    activityRecCtrl.$inject = ['$scope']

    function activityRecCtrl($scope) {
        var vm = this;
        vm.savePressed = false;
        vm.formAmend = false;
        vm.recordReadOnly = false; //needed for din
        //vm.isNotEditable = false;
        //TODO get  model from a servide
        vm.activityModel={};

        vm.$onInit = function () {

        };

        /**
         * Due to binding with table expander this method does not get called
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.activityRecord) {
                vm.activityModel = angular.copy(changes.activityRecord.currentValue);

            }
            if (changes.activityList) {
                console.log("Changes in the value" + changes.activityList.currentValue)
                vm.activityTypesArray = changes.activityList.currentValue;
            }
            if (changes.isAmend) {
                vm.formAmend = changes.isAmend.currentValue;
                vm.setNotEditable();
            }
        };

        vm.addDin=function(){
            if (!(vm.activityModel.assocDins instanceof Array)) {
                vm.activityModel.assocDins = [];
            }
            vm.activityModel.assocDins.push({dinNumber: ""})
            ///form is invalid if adding a din
            vm.isDetailValid({state: false});

        };

        vm.deleteDin=function(index){
            //using index in
            if(index> vm.activityModel.assocDins.length-1){
                return;
            }
            vm.activityModel.assocDins.splice(index, 1);
            vm.isDetailValid({state: false});
        }


        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            vm.onDelete({addressId: vm.activityModel.addressID});
        };
        /* @ngdoc method -discards the changes and reverts to the model
         *
         */
        vm.discardChanges = function (form) {
            if (vm.activityRecForm.$pristine) return;
            var currRecord = vm.activityRecord;
            vm.activityModel = angular.copy(currRecord);
            vm.setNotEditable(); //case of amend
           // vm.addressRecForm.$setPristine();
            vm.isDetailValid({state: vm.activityRecForm.$valid});
            vm.savePressed = false;
        };

        /**
         * Used to update the add button state by transmitting if valid or not
         */
        $scope.$watch('activityCtrl.activityRecForm.$dirty', function () {
            if (vm.activityRecForm.$dirty) {
                vm.isDetailValid({state: false})
            }
        }, true);

        /**
         * Updates the contact model used by the save button
         */
        vm.updateActivityModel = function () {
            if (vm.activityRecForm.$valid) {
                vm.isDetailValid({state: true});
                vm.activityRecForm.$setPristine();
                vm.onUpdate({rec: vm.activityModel});
            }
            vm.savePressed = true;
        };
        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showErrors = function () {

            return (vm.savePressed)
        };
        vm.isDinInvalid=function(index){
            return !(vm.activityModel.assocDins[index].dinNumber && vm.activityModel.assocDins[index].dinNumber.length === 8);
        }

        /**
         * Controls errors state of an individual UI control. Since cannot pass the control for some reason
         * pass the needed state variables... very annoying
         * @param isTouched
         * @param isInvalid
         * @returns {boolean}
         */
        vm.showError = function (isTouched, isInvalid) {

            return (isInvalid && isTouched) || (vm.showErrors() && isInvalid );
        }


        /**
         * @ngdoc method used to determine if record should be editable. Used for amend
         * @returns {boolean}
         */
        vm.setNotEditable = function () {
            vm.recordReadOnly = vm.formAmend && !vm.activityModel.amendRecord;
            return (vm.recordReadOnly);
        }

    }


})();