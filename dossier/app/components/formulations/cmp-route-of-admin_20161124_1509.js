/**
 * Created by Abdessamad on 9/26/2016.
 */

(function () {
    'use strict';

    angular
        .module('roaModule', ['dossierDataLists'])
})();

(function () {
    'use strict';

    angular
        .module('roaModule')
        .component('cmpRoa', {
            templateUrl: './app/components/formulations/tpl-route-of-admin_20161124_1509.html',
            controller: roaController,
            controllerAs: 'roaCtrl',
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&',
                showErrors: '&'
            }
        });


    roaController.$inject = ['$filter', 'DossierLists'];
    function roaController($filter, DossierLists) {
        var self = this;
        self.noRoa="";
        self.roaList = DossierLists.getRoa();
        self.$onInit = function () {

            self.model = {
                list: []
            }

            if(self.listItems){
                self.model.list = self.listItems;
            }
           self.noRoaRecs();
        };

        self.getTemplate = function (item) {
            if (item.id === self.model.selected.id) return 'editRoa';
            else return 'displayRoa';
        };


        self.addNew = function () {

            var maxID = getListMaxID();

            //console.log("addNew maxID: " + JSON.stringify(maxID) );

            var item = {"id": maxID + 1, "roa": "", 'otherRoaDetails': ""};

            self.model.list.push(item);
            self.editRecord(item);
            self.onUpdate({list:self.model.list});

        };


        self.editRecord = function (item) {
            self.model.selected = item;
        };

        self.saveRecord = function (_id) {
            // console.log("Saving item: "+_id);
            var idx = self.model.list.indexOf(
                $filter('filter')(self.model.list, {id: _id}, true)[0]
            );
            self.model.list[idx] = self.model.selected;
            self.onUpdate({list:self.model.list});
            self.reset();
        };

        self.deleteRecord = function (_id) {
            //console.log("Deleting item: "+_id);

            var idx = self.model.list.indexOf(
                $filter('filter')(self.model.list, {id: _id}, true)[0]
            );
            if (idx < 0) return;

            self.model.list.splice(idx, 1);
            self.onUpdate({list:self.model.list});
        };


        self.reset = function () {
            var item = self.model.selected;
            //console.log('reset selected: ' + item.toSource());
            if (angular.isUndefined(item))
                return;

            // self.deleteRecord(item.id)
            self.model.selected = {};

        };
        /**
         * Shows and hides errors for a control
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && self.showErrors()))
        }
        /**
         * Sets the state of the other Roa details text box
         */
        self.isRoaOther = function (index) {
            var idx = self.model.list.indexOf(
                $filter('filter')(self.model.list, {id: index}, true)[0]
            );
            if (!idx) return false;
            if (self.model.list[idx].roa === DossierLists.getOtherValue()) {
                return true;
            } else {
                self.model.list[idx].otherRoaDetails = "";
                return false;
            }
        };

        function getListMaxID() {

            var out = 0;
            var list = self.model.list;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id > out) {
                        out = list[i].id;
                    }
                }
            }
            return out;

        }

        /***
         * Shows the no ROA of error
         * TODO: Not show this until someone saves?
         * @returns {boolean}
         */
        self.noRoaRecs=function(){
            if(!self.model){
                self.noRoa="";
                return false;
            }
            if(!self.model.list || self.model.list.length===0){
                self.noRoa="";
                return true;
            }
            self.noRoa= self.model.list.length;
            return false;

        }


    }
})();

