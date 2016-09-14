/**
 * Created by dkilty on 8/6/2016.
 */
(function () {
    'use strict';

    angular
        .module('expandingTable')
        .directive('trackRecord', trackRecord);

   // directiveName.$inject = ['dependency'];

    /* @ngInject */
    function trackRecord() {
        var directive = {
            bindToController: true,
            controller: trackRecordCtrl,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
                trackRecord:'&',
                tableIndex:'@'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            //this will return the actual object from the object expression!

            //this will return the actual object from the parent scope, if it exists of course!
            //and no "parentScopeObject" is not a function, it's an object

            attrs.$observe('trackRecord', function(value){
                if(value){
                    console.log("Link record has changed"+value);
                }
            });

        }
    }

    /* @ngInject */
    function trackRecordCtrl() {

    }

})();

