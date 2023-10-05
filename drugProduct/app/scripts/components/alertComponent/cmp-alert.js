/**
 * Created by hcuser on 2017-06-02.
 */


(function () {
    'use strict';

    angular
        .module('alertModule',[])
})();

(function () {
    'use strict';

    angular
        .module('alertModule')
        .component('cmpAlert', {
            templateUrl: 'app/scripts/components/alertComponent/tpl-alert.html',
            transclude:true,
            bindings: {
                uiState: '<',
                msg: '@',
                myAnchor: '<',
                updateState:'&',
                type:'@'
            },
            controller: alertController,
            controllerAs: 'alertCtrl'
        });

    alertController.$inject = [];

    function alertController() {

        var vm = this;
        vm.alertVisible=false;
        vm.closeMsgAlias="CLOSE_ALERT";
        vm.anchor = null;

        vm.$onInit = function () {
            vm.alertVisible=false;
        };


        vm.$onChanges = function (changes) {

            if(changes.msg){
                vm.closeMsgAlias=changes.msg.currentValue;
            }
            if(changes.uiState){
                vm.alertVisible=changes.uiState.currentValue;
            }
            if(changes.myAnchor){
                vm.anchor=changes.myAnchor.currentValue;
            }
        };

        vm.open=function(){

            vm.updateState();
        };

        vm.close=function(){
            vm.updateState();
            if (vm.anchor) {
                document.getElementById(vm.anchor).focus();
            }
        };

        vm.isAlertVisible=function(){
            return   vm.alertVisible;
        }

    }
})();