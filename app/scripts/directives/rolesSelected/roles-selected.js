/**
 * Created by dkilty on 08/08/2016.
 */


(function () {
    'use strict';

    angular
        .module('hcValidation')
        .directive('rolesSelected', rolesSelected);

   // directiveName.$inject = ['dependency'];

    /* @ngInject */
    function rolesSelected() {
        var directive = {
            require:'ngModel',
            //bindToController: true,
           // controller: ControllerName,
           // controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
                rolesSelected: '='
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
           /* ngModel.$validators.required = function(modelValue) {
                //true or false based on required validation


            };*/

            ngModel.$validators.rolesSelected= function(modelValue) {
                //true or false based on custome dir validation
                //return modelValue == scope.otherModelValue;
                return(rolesSelected)
             /*   var roleType=attrs["roleType"]
                if(!rolesSelected ||rolesSelected.length<1) return true;
                for(var i=0; i<rolesSelected.length;i++){
                    if(rolesSelected[i].toUpperCase()===roleType.toUpperCase()){
                        return false;
                    }
                }*/
            };
            scope.$watch("rolesSelected", function() {
                ngModel.$validate();
            });

        }
    }

    /*ControllerName.$inject = ['dependency'];

    /!* @ngInject *!/
    function ControllerName(dependency) {

    }*/

})();

