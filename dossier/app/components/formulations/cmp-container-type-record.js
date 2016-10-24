/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule', [])
})();

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule')
        .component('cmpContainerTypeRecord', {
            templateUrl: './app/components/formulations/tpl-container-type-record.html',
            controllerAs: 'ctrCtrl',
            controller: containerTypeRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&'
            }

        });
    function containerTypeRecCtrl() {

        var self = this;
        self.savePressed=false;
        self.$onInit = function () {

            self.ctModel = {};

            if(self.record){
                self.ctModel = self.record;
            }
        };

        self.save = function () {
            if(self.containerTypeForm.$valid) {
                if (self.record) {
                    // console.log('product details update product');
                    self.onUpdate({cType: self.ctModel});
                } else {
                    //  console.log('product details add product');
                    self.onAddIng({cType: self.ctModel});
                }
                self.savePressed=false;
                self.containerTypeForm.$setPristine();
            }else{
                self.savePressed=true;
            }

        };

        self.discardChanges = function(){
            self.ctModel = self.record ? self.record : {};
            self.onCancel();
        }

        self.delete = function(){
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };
        /**
         * Manages visibility of error messages for an indvidual control
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        self.showError=function(isInvalid, isTouched){
            return((isInvalid && isTouched)||(isInvalid && self.showErrors() ||(isInvalid &&self.savePressed)))
        }


    }

})();
