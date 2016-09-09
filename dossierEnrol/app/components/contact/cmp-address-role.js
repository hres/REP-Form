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
            templateUrl: './components/contact/tpl-address-role.html',
            controller: addressRoleCtrl,
            controllerAs: 'ar',
            bindings: {
                formName: '<',
                record: '<',
                onUpdate: '&'
            }
        });


    function addressRoleCtrl() {

        var self = this;

        self.$onInit = function () {

            self.roleModel = {};

            if (self.record) {
                self.roleModel = self.record;
            }
        }

        self.someSelected = function () {
            var object = self.roleModel;

            if (!object) return false;
            return Object.keys(object).some(function (key) {
              //console.log("cmpAddressRole someSelected: " + object[key]);
                return object[key];
            });
        }

        self.updateRoleModel = function () {

            self.formName.addressRole.$dirty =
                self.formName.addressRole.$touched = true;

            self.formName.addressRole.$pristine = !self.formName.addressRole.$dirty;
            self.formName.addressRole.$untouched = !self.formName.addressRole.$touched;

            self.onUpdate({$event: {roles: self.roleModel}});

        }

    }


})();