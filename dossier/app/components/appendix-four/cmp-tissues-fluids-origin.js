/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('tissuesFluidsOriginModule', [])
})();

(function () {
    'use strict';

    angular
        .module('tissuesFluidsOriginModule')
        .component('cmpTissuesFluidsOrigin', {
            templateUrl: './app/components/appendix-four/tpl-tissues-fluids-origin.html',
            controller: tissuesFluidsOriginCtrl,
            controllerAs: 'tfoCtrl',
            bindings: {
                tissuesModel: '<',
                onUpdate: '&'
            }

        });

    function tissuesFluidsOriginCtrl() {

        var self = this;
        self.isSelected = "";
        self.otherTextError = false;
        self.closeOthers=true;
        self.model = {};
        self.$onInit = function () {

        }

        self.$onChanges = function (changes) {
            if (changes.tissuesModel) {
                self.model = changes.tissuesModel.currentValue;
            }
        };

        /**
         * Checks that at least one tissue has been selected
         * Checks if the other checkboz is selected with no other details
         * @returns {boolean}
         */
        self.oneTissueSourceSelected = function () {

            if (!self.model) return true;
            var tissuesArray = [
                self.model.nervousSystem,
                self.model.digestiveSystem,
                self.model.reproductiveSystem,
                self.model.immuneSystem,
                self.model.cardioSystem,
                self.model.musculoSkeletalSystem,
                self.model.otherTissues,
                self.model.skinGlandSystem
            ];
            //reset before looping
            self.isSelected = "";
            self.otherTextError = false
            //n2 not terribly efficient
            //go through the entire list looking for other text errors

            angular.forEach(self.model, function (system, key) {
                for (var i = 0; i < tissuesArray.length; i++) {
                    for (var j = 0; j < tissuesArray[i].list.length; j++) {
                        if (tissuesArray[i].list[j].value === true) {
                            //if has otherText property, check that it is filled in
                            if (tissuesArray[i].list[j].hasOwnProperty('otherText')) {
                                if (tissuesArray[i].list[j].otherText) {
                                    self.isSelected = true;
                                } else {
                                    //set error flag for other text
                                    self.otherTextError = true;
                                }
                            } else {
                                self.isSelected = true;
                            }
                        }
                    }
                }
            });
            if (self.isSelected) {
                return true;
            }
            return false;
        };
        //TODO need to: detect error, open if in error, disable all if in error
        self.tissuesDisabled = function (form) {
            if (form.$invalid) {
                self.closeOthers=false;
                return true
            }
            self.closeOthers=true;
            return false
        }

        //TODO remove, unneccesary
        self.updateNervousSystemList = function (list) {

            // console.log("list"+list);
            // self.model.nervousSystem.list = list;
            //self.onUpdate({model:self.model});

        };
        //TODO remove, unneccesary
        self.updateDigestSystemList = function (list) {

            /*   self.model.digestiveSystem.list = list;
             console.log("list"+list);
             self.onUpdate({model:self.model});*/

        };
        //TODO remove, unneccesary
        self.updateRepSystemList = function (list) {

            /*  self.model.reproductiveSystem.list = list;
             console.log("list"+list);
             self.onUpdate({model:self.model});*/

        };
        //TODO remove, unneccesary
        self.updateCardioSystemList = function (list) {

            /*  self.model.cardioSystem.list = list;
             console.log("list"+list);
             self.onUpdate({model:self.model});*/

        };
        //TODO remove, unneccesary
        self.updateImmuneSystemList = function (list) {

            /* self.model.immuneSystem.list = list;
             console.log("list"+list);
             self.onUpdate({model:self.model});*/

        };
        //TODO remove, unneccesary
        self.updateSkinGlandSystemList = function (list) {

            /*  self.model.skinGlandSystem.list = list;
             self.onUpdate({model:self.model});*/

        };
        //TODO remove, unneccesary
        self.updateMusculoSystemList = function (list) {

            /*  self.model.musculoSkeletalSystem.list = list;
             self.onUpdate({model:self.model});*/

        };

        //TODO remove, unneccesary
        self.updateOtherSystemList = function (list) {

            /*   self.model.otherTissues.list = list;
             self.onUpdate({model:self.model});*/

        };

        /**
         * Used to show/hide the error message when no value has been selected
         * @param isDirty
         * @returns {boolean}
         */
        self.showNoRecordError = function (isDirty) {
            return (!self.oneTissueSourceSelected());

        };
    }
})();
