/**
 * Created by Abdessamad on 7/4/2016.
 */

(function () {
    'use strict';

    angular
        .module('addressRole', [])
})();

(function () {
    'use strict';

    angular
        .module('addressRole')
        .component('cmpAddressRole', {
            templateUrl: 'app/views/tpl-address-role.html',
            controller: addressRoleCtrl,
            controllerAs: 'ar',
            bindings: {
                //formName: '<',
                record: '<',
                onUpdate: '&',
                showErrors:'&',
                isContact:'<',
                alreadySelected:'&'
            }
        });

    addressRoleCtrl.$inject = ['$scope']
    function addressRoleCtrl($scope) {

        var vm = this;
        vm.isReq=true;
        vm.isSelected="";
        vm.roleModel = {
            manufacturer: false,
            mailing: false,
            billing: false,
            repPrimary: false,
            repSecondary: false
        };
        vm.$onInit = function () {
            //after init
            console.log("onInit role details");
            //vm.noneSelected=vm.isSelected();
            if (vm.record) {
                //doesn't copy as this is a dumb component
                console.log("from record is "+JSON.stringify(vm.record));
                vm.roleModel = vm.record.addressRole;
                console.log("from record role is "+JSON.stringify(vm.roleModel));
                vm.oneSelected();
            }
        }
        vm.$onChanges=function(changes){
            console.log("role on changes event")
           if(changes.record){
               vm.roleModel=(changes.record.currentValue.addressRole);
               vm.oneSelected();
           }
        }

        vm.oneSelected = function () {
            var obj=vm.roleModel;
            for (var key in obj){
                var attrName = key;
                var attrValue = obj[key];
                if(attrValue) {
                    console.log("The role is selected?" + attrName + vm.alreadySelected({roleName: attrName}));
                }
                if(attrValue===true){
                    vm.isSelected=true;
                    return true;
                }
            }
            vm.isSelected=""
            return false
        }
        vm.isDuplicateSelected=function(toCheck){
            var obj=vm.roleModel;
            for (var key in obj){
                var attrName = key;
                var attrValue = obj[key];
                if(attrName==toCheck) {
                    if(!attrValue) return false
                    return(vm.alreadySelected({roleName: attrName}));
                }
            }
            return false
        }


        vm.showError=function(){
            if((vm.roleForm.$touched && vm.roleForm.roleMissing.$invalid) || (vm.showErrors()&&vm.roleForm.roleMissing.$invalid)){
                return true
            }
            return false
        }



    }


})();