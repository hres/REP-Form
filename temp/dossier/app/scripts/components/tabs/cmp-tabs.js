/**
 * Created by Abdessamad on 7/24/2016.
 */
(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('tabsModule', ['formulationsModule', 'appendixFourModule']);
})();

(function () {
    'use strict';
    angular.module('tabsModule').component('cmpTabs', {
        templateUrl: 'app/scripts/components/tabs/tpl-tabs.html',
        controller: tabsCtrl,
        controllerAs: 'tabsCtrl',
        bindings: {
            formulationList : '<',
            appendix4List : '<',
            recordChanged: '&',
            service: '<'
        }
    });

    tabsCtrl.$inject = ['$scope'];


    function tabsCtrl($scope) {

        var self = this;
        self.tabs = [
            {
                label: "FORMULATIONS",
                selected: true,
                disabled: false,
                errors: true,
                form: {}
            },
            {
                label: "APPENDIX4",
                selected: false,
                disabled: false,
                errors: false,
                form: {}
            }
        ];
        self.$onInit = function () {

            //console.log(self.tabs[0].form.$invalid)
        };
        self.$onChanges = function () {
            /*  if(changes.service){

             self.dosService=changes.service.currentValue;
             }*/

        };

        self.selectTab = function (idx) {

            /*  angular.forEach(self.tabs, function (tab) {
                    tab.selected = false;
             tab.errors=tab.form.$invalid;
             });*/

            for (var i = 0; i < self.tabs.length; i++) {
                self.tabs[i].selected = false;
                if (idx !== i) {
                    self.tabs[i].errors = self.tabs[i].form.$invalid;
                }
            }

                self.tabs[idx].selected = true;
            //self.tabs[idx].errors= self.tabs[idx].form.$invalid
        };
    }

})();
