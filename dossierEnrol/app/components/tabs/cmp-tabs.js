/**
 * Created by Abdessamad on 7/24/2016.
 */
(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('tabsModule', ['appendixFourModule']);
})();

(function () {
    'use strict';
    angular.module('tabsModule').component('cmpTabs', {
        templateUrl: './components/tabs/tpl-tabs.html',
        controller: tabsCtrl,
        controllerAs: 'tabsCtrl',
        bindings: {}
    });

    tabsCtrl.$inject = ['$scope'];


    function tabsCtrl($scope) {

        var self = this;

        self.$onInit = function () {
            self.tabs = [
                {
                    label: "Formulations",
                    selected: false,
                    disabled: true
                },
                {
                    label: "Appendix 4",
                    selected: true,
                    disabled: false
                }
            ];
        };

        self.selectTab = function (idx) {

            if (!self.tabs[idx].disabled) {

                angular.forEach(self.tabs, function (tab) {
                    //  console.log('tabsModule item: ' + tab.toSource());
                    tab.selected = false;
                });

                self.tabs[idx].selected = true;
            }

        };
    }

})();
