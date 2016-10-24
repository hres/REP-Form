/**
 * Created by Abdessamad on 9/25/2016.
 */


(function () {
    'use strict';

    angular
        .module('containerTypeListModule', ['expandingTable', 'containerTypeRecordModule'])
})();


(function () {
    'use strict';

    angular
        .module('containerTypeListModule')
        .component('cmpContainerTypeList', {
            templateUrl: './app/components/formulations/tpl-container-type-list.html',
            controller: containerTypeListCtrl,
            controllerAs: 'ctlCtrl',
            bindings: {
                containers: '<',
                onUpdate: '&'
            }
        });

    function containerTypeListCtrl() {

        var self = this;
        self.isDetailValid = true; //TODO": needs to be managed on delete and add
        self.$onInit = function () {

            self.newFormShown = false;

            self.colNames = [
                {label: "CONTAINER_TYPE", binding: "containerType", width: "50"},
                {label: "PACKAGE_SIZE", binding: "packageSize", width: "50"}
            ];

            self.containerList = [];

            if (self.containers) {
                self.containerList = self.containers;
            }

        };

        self.$onChanges = function (changes) {

            if (changes.containers) {
                self.containerList = changes.containers.currentValue;
            }
        };

        self.addNew = function (ing) {
            self.containerList.push(ing);
            self.newFormShown = false;
            self.resetToCollapsed = true;
            self.onUpdate({list:self.containerList});
        };

        self.updateRec = function (idx, ing) {
            self.containerList[idx] = angular.copy(ing);
            self.onUpdate({list:self.containerList});
        };

        self.deleteRec = function (idx) {
            // console.debug('containerList deleteIng: ' + idx);
            self.containerList.splice(idx, 1);
            self.resetToCollapsed = true;
            self.onUpdate({list:self.containerList});
        }
    }

})();
