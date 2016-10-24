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
        .component('cmpTissuesFluidsOrigin',{
            templateUrl: './app/components/appendix-four/tpl-tissues-fluids-origin.html',
            controller: tissuesFluidsOriginCtrl,
            controllerAs: 'tfoCtrl',
            bindings:{
                tissuesModel : '<',
                onUpdate : '&'
            }

        });

    function tissuesFluidsOriginCtrl(){

        var self = this;
        self.isSelected = "";
        self.otherTextError = false;
        self.$onInit = function(){

            self.model = {
                nervousSystem:{
                    title: "NERVOUSYSTEM", //the legend for checkbox list
                    groupName: "nervous-sys", // the group name for checkboxlist
                    list: [
                    {name: "brain", label: "BRAIN", value: false},
                    {name: "brain-stem", label: "BRAINSTEM", value: false},
                    {name: "cerebellum", label: "CEREBELLUM", value: false},
                    {name: "cerebrospinal-fluid", label: "CEROFLUID", value: false},
                    {name: "dorsal-root-ganglia", label: "DORSALROOT", value: false},
                    {name: "dura-mater", label: "DURAMATER", value: false},
                    {name: "hypothalmus", label: "HYPOTHALAMUS", value: false},
                    {name: "retina-optic", label: "RETINA", value: false},
                    {name: "spinal-cord", label: "SPINALCORD", value: false},
                    {name: "trigerminal-ganglia", label: "TRIGEMINAL", value: false},
                        {
                            name: "other-nervous",
                            label: "OTHERNERVOUS",
                            value: false,
                            hasOtherDetails: true,
                            otherText: ""
                        }
                ]},
                digestiveSystem:{
                    title: "DIGESTIVESYSTEM",
                    groupName: "digestive-sys",
                    list: [
                    {name: "appendix", label: "APPENDIX", value:false},
                    {name: "bile", label: "BILE", value:false},
                    {name: "distal-ileum", label: "DISTALILEUM", value:false},
                    {name: "large-intestine", label: "LARGEINTEST", value:false},
                    {name: "saliva-salivary", label: "SALIVA", value:false},
                    {name: "small-intestine", label: "SMALLINTESTINE", value:false},
                    {name: "stomach", label: "STOMACH", value:false},
                        {
                            name: "other-digestive",
                            label: "DIGESTIVEOTHER",
                            value: false,
                            hasOtherDetails: true,
                            otherText: ""
                        }
                ]},
                reproductiveSystem:{
                    title: "REPRODUCTSYSTEM",
                    groupName: "reproductive-sys",
                    list: [
                    {name: "milk-products", label: "MILK", value:false},
                    {name: "kidney", label: "KIDNEY", value:false},
                    {name: "colostrum", label: "COLOSTRUM", value:false},
                    {name: "mammary-glands", label: "MAMMARY", value:false},
                    {name: "ovaries", label: "OVARIES", value:false},
                    {name: "placenta", label: "PLACENTA", value:false},
                    {name: "placental-fluid", label: "PLACENTAFLUID", value:false},
                    {name: "semen", label: "SEMEN", value:false},
                    {name: "testes", label: "TESTES", value:false},
                    {name: "urine", label: "URINE", value:false},
                        {
                            name: "other-reproductive",
                            label: "OTHERREPROD",
                            value: false,
                            hasOtherDetails: true,
                            otherText: ""
                        }
                ]},
                cardioSystem:{
                    title: "CARDIOSYSTEM",
                    groupName: "cardio-sys",
                    list: [
                    {name: "heart-pericardium", label: "HEART", value:false},
                    {name: "lung", label: "LUNG", value:false},
                    {name: "nasal-fluid", label: "NASALFLUID", value:false},
                    {name: "trachea", label: "TRACHEA", value:false},
                        {
                            name: "other-cardio-respiratory",
                            label: "CARDIOOTHER",
                            value: false,
                            hasOtherDetails: true,
                            otherText: ""
                        }
                ]},
                immuneSystem:{
                    title: "IMMUNESYSTEM",
                    groupName: "immune-sys",
                    list: [
                    {name: "lymph-nodes", label: "LYMPH", value:false},
                    {name: "spleen", label: "SPLEEN", value:false},
                    {name: "thymus", label: "THYMUS", value:false},
                    {name: "tonsils", label: "TONSILS", value:false},
                        {
                            name: "other-immune",
                            label: "IMMUNEOTHER",
                            value: false,
                            hasOtherDetails: true,
                            otherText: ""
                        }
                ]},
                skinGlandSystem:{
                    title: "SKINGLANDSYSTEM",
                    groupName: "skin-gland-sys",
                    list: [
                    {name: "adrenal-gland", label: "ADRENAL", value:false},
                    {name: "hair-hooves-feathers", label: "HAIR", value:false},
                    {name: "liver", label: "LIVER", value:false},
                    {name: "pancreas", label: "PANCREAS", value:false},
                    {name: "pituitary", label: "PITUARYGLAND", value:false},
                    {name: "skin-hides", label: "SKINHIDES", value:false},
                    {name: "thyroid-parathyroid", label: "THYROID", value:false},
                        {
                            name: "other-skin-glandular",
                            label: "SKINOTHER",
                            value: false,
                            hasOtherDetails: true,
                            otherText: ""
                        }
                ]},
                musculoSkeletalSystem:{
                    title: "Musculo Skeletal System",
                    groupName: "musculo-skeletal-sys",
                    list: [
                    {name: "abdomen", label: "ABDOMEN", value:false},
                    {name: "skull", label: "SKULL", value:false},
                    {name: "bones", label: "BONES", value:false},
                    {name: "collagen", label: "COLLAGEN", value:false},
                    {name: "tendons-ligaments", label: "TENDONS", value:false},
                    {name: "vertebral-column", label: "VERTEBRALCOLUMN", value:false},
                    {name: "muscle", label: "MUSCLE", value:false},
                        {
                            name: "other-musculo-skeletal",
                            label: "MUSCLEOTHER",
                            value: false,
                            hasOtherDetails: true,
                            otherText: ""
                        }
                ]},
                otherTissues:{
                    title: "OTHERTISSUE",
                    groupName: "other-tissues",
                    list: [
                    {name: "adipose", label: "ADIPOSE", value:false},
                    {name: "ascites", label: "ASCITES", value:false},
                    {name: "antler-velvet", label: "ANTLERV", value:false},
                    {name: "serum", label: "SERUM", value:false},
                    {name: "whole-blood", label: "WHOLEBLOOD", value:false},
                    {name: "plasma", label: "PLASMA", value:false},
                    {name: "embryonic-tissue", label: "EMBRYONICTISS", value:false},
                    {name: "fetal-tissue", label: "FETALTISS", value:false},
                    {name: "bone-marrow", label: "BONEMARROW", value:false},
                    {name: "eyes-cornea", label: "EYESCORNEA", value:false},
                    {name: "gall-bladder", label: "GALL", value:false},
                        {
                            name: "other-fluids-tissues",
                            label: "OTHERFLUIDSEL",
                            value: false,
                            hasOtherDetails: true,
                            otherText: ""
                        }
                ]
            }

            };

            if(self.tissuesModel){
                self.model = self.tissuesModel;
            }

        }


        self.$onChanges = function (changes) {
            if(changes.tissuesModel){
                self.model = changes.tissuesModel.currentValue;
            }
        };

      /*  self.$doCheck = function () {
            if (!angular.equals(self.model.nervousSystem.list, self.tissuesModel.nervousSystem.list)) {
                console.log('tissues fluids nervousSystem model changed ');
            }
        };*/
        /**
         * Checks that at least one tissue has been selected
         * Checks if the other checkboz is selected with no other details
         * @returns {boolean}
         */
        self.oneTissueSourceSelected = function () {
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
            if (self.isSelected) {
                return true;
            }
            return false;
        };

        self.updateNervousSystemList = function(list){

            self.model.nervousSystem.list = list;
            self.onUpdate({model:self.model});

        };

        self.updateDigestSystemList = function(list){

            self.model.digestiveSystem.list = list;
            self.onUpdate({model:self.model});

        };

        self.updateRepSystemList = function(list){

            self.model.reproductiveSystem.list = list;
            self.onUpdate({model:self.model});

        };

        self.updateCardioSystemList = function(list){

            self.model.cardioSystem.list = list;
            self.onUpdate({model:self.model});

        };

        self.updateImmuneSystemList = function(list){

            self.model.immuneSystem.list = list;
            self.onUpdate({model:self.model});

        };

        self.updateSkinGlandSystemList = function(list){

            self.model.skinGlandSystem.list = list;
            self.onUpdate({model:self.model});

        };

        self.updateMusculoSystemList = function(list){

            self.model.musculoSkeletalSystem.list = list;
            self.onUpdate({model:self.model});

        };


        self.updateOtherSystemList = function(list){

            self.model.otherTissues.list = list;
            self.onUpdate({model:self.model});

        };
        self.showNoRecordError = function (isDirty) {
            return (!self.oneTissueSourceSelected());

        };
    }
})();
