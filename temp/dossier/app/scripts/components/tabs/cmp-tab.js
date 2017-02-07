/**
 * Created by Abdessamad on 7/24/2016.
 */

(function () {
    'use strict';
    angular.module('tabModule', ['tabsModule']);
})();
(function () {
    'use strict';
    angular
        .module('tabModule')
        .component('cmpTab', {
            templateUrl: 'app/scripts/components/tabs/tpl-tab.html',
            controller: tabCtrl,
            controllerAs: 'tabCtrl',
            bindings: {
                title: '@'
            },
            require: {
                tabs: '^^cmpTabs'
            },
            transclude: true

        });

    function tabCtrl() {

        var self = this;

        self.$onInit = function(){
            self.tab = {
                title : self.title,
                selected : false
            };

            self.tabs.addTab(self.tab);
        }


    }

})();
