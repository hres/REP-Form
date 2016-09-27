/**
 * Created by Abdessamad on 7/24/2016.
 */
(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('tabsModule', ['formulationsModule','appendixFourModule']);
})();

(function () {
    'use strict';
    angular.module('tabsModule').component('cmpTabs', {
        templateUrl: './app/components/tabs/tpl-tabs.html',
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
                    selected: true,
                    disabled: false
                },
                {
                    label: "Appendix 4",
                    selected: false,
                    disabled: false
                }
            ];
        };

        self.selectTab = function (idx) {

               angular.forEach(self.tabs, function (tab) {
                    tab.selected = false;
                });

                self.tabs[idx].selected = true;
        };
    }

})();
