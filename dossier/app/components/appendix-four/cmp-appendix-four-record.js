/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule', ['tissuesFluidsOriginModule', 'sourceAnimalModule'])
})();

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule')
        .component('cmpAppendixFourRecord', {
            templateUrl: './app/components/appendix-four/tpl-appendix-four-record.html',
            controllerAs: 'ap4RecCtrl',
            controller: app4RecCtrl,
            bindings: {
                record: '<',
                showListErrors: '&',
                onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                deleteBtn:'<',
                recordChanged:'&'
            }

        });

    function app4RecCtrl(){

        var self = this;
        self.isSourced = ""; //determines if at least one source is selected
        var emptyFluidsTissues = {
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
                    {name: "abdomen", label: "ABDOMEN", value: false},
                    {name: "collagen", label: "COLLAGEN", value: false},
                    {name: "muscle", label: "MUSCLE", value: false},
                    {name: "skull", label: "SKULL", value: false},
                    {name: "tendons-ligaments", label: "TENDONS",value: false},
                    {name: "vertebral-column", label: "VERTEBRALCOLUMN", value: false},
                    {name: "bones", label: "BONES", value:false},
                    {name: "other-musculo-skeletal", label: "MUSCLEOTHER", value: false, hasOtherDetails: true, otherText: ""}
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

        }; //TODO this should come from the service
        var emptyAnimalSource= {
            primateTypeList: [
                {label: "NONHUMANPRIMATE", type: "text", name: "nhp-type", required: false, value: ""},
                {label: "AQUATICTYPE", type: "text", name: "aqua-type", required: false, value: ""},
                {label: "AVIANTYPE", type: "text", name: "avian-type", required: false, value: ""},
                {label: "BOVINETYPE", type: "text", name: "bovine-type", required: false, value: ""},
                {label: "CANINETYPE", type: "text", name: "canine-type", required: false, value: ""},
                {label: "CAPRINETYPE", type: "text", name: "caprine-type", required: false, value: ""},
                {label: "CERVIDAETYPE", type: "text", name: "cervidae-type", required: false, value: ""},
                {label: "EQUINETYPE", type: "text", name: "equine-type", required: false, value: ""},
                {label: "FELINETYPE", type: "text", name: "feline-type", required: false, value: ""},
                {label: "OVINETYPE", type: "text", name: "ovine-type", required: false, value: ""},
                {label: "PORCINETYPE", type: "text", name: "porcine-type", required: false, value: ""},
                {label: "RODENTTYPE", type: "text", name: "rodent-type", required: false, value: ""},
                {label: "OTHERANIMALTYPE", type: "text", name: "other-animal-type", required: false, value: ""},
                {label: "CONTROLLEDPOP", type: "select", name: "controlled-pop", required: true, value: ""},
                {label: "BIOTECHDERIVED", type: "select", name: "biotech-derived", required: true, value: ""},
                {label: "CELLLINE", type: "select", name: "cell-line", required: true, value: ""},
                {label: "AGEANIMALS", type: "number", name: "age-animals", required: true, value:""}
            ],
            countryList: []
        };


        self.model = {}
        self.$onInit = function(){

        }
        self.$onChanges = function (changes) {
            if (changes.record) {
                self.model = (changes.record.currentValue);
            }

        }
        self.isSourcedSelected = function () {
            var result = (self.model.humanSourced || self.model.animalSourced)
            if (result) {
                self.isSourced = result;
            } else {
                self.isSourced = "";
            }
            return (result);

        }

        self.noSelectionError = function () {
            return ((self.appendix4RecForm.$dirty && !self.isSourcedSelected() ) || (self.showListErrors() && !self.isSourcedSelected()));
        }
        /**
         * Used to show field level errors
         * @param isInvalid
         * @param isTouched
         * @returns {boolean}  true if you should show error
         */
        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && self.showListErrors()))
        };
        self.save = function () {
            if (self.record) {
                // console.log('product details update product');
                self.onUpdate({record: self.model});
            } else {
                //  console.log('product details add product');
                self.onAddNew({record: self.model});
            }

        };

        /*self.discardChanges = function () {
            self.model = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        }*/

        self.delete = function () {
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };

        self.updateTissuesFluids = function(input){

            //console.log('apdx4 record updateTissuesFluids : ' + JSON.stringify(input));

            self.model.tissuesFluidsOrigin = input;
            self.onUpdate({record: self.model});


            /* if (self.record) {
                 self.onUpdate({record: self.model});
             }*/

        };

        self.updateAnimalSourced = function(input){

            self.model.sourceAnimalDetails = input;
            self.onUpdate({record: self.model});

        };

        /**
         * Determines whether to show or hide tissues o=r fluids
         * @returns {boolean}
         */
        self.showTissuesFluids=function(){
            if(self.model.humanSourced || self.model.animalSourced) {
                if(!self.model.tissuesFluidsOrigin) {
                    self.model.tissuesFluidsOrigin = angular.copy(emptyFluidsTissues);
                }
                return true;
            }else{
                self.model.tissuesFluidsOrigin=null;
            }
            return false;

        }
        self.showAnimalSources=function(){
            self.showTissuesFluids();
            if(self.model.animalSourced) {
                if(!self.model.sourceAnimalDetails) {
                    self.model.sourceAnimalDetails = angular.copy(emptyAnimalSource);
                    console.log("animal sources function: adding animalSources")
                }
                return true;
            }else{
                self.model.animalSourced=null;
                console.log("animal sources function: deleting animalSources")
            }
            return false;
        }

    }
})();
