/**
 * Created by dkilty on 22/09/2016.
 */


(function () {
    'use strict';
    angular
        .module('repContactService', [])
})();


(function () {
    'use strict';
    angular
        .module('repContactService')
        .factory('RepContactService', RepContactService);

    function RepContactService() {

        //constructor
        function RepContactService() {

        }

        RepContactService.prototype = {
            _default: {}
        };
        RepContactService.prototype.getPrimaryRole=function(){
            return "PRIMARY";
        }
        RepContactService.prototype.getSecondaryRole=function(){
            return "SECONDARY";
        }

        RepContactService.prototype.createRepContact = function(repContactList){
            if(!repContactList) return;
            var PRIMARY=this.getPrimaryRole();
            var SECONDARY=this.getSecondaryRole()
            var contact = _createDefaultRepContact();

            var currentContacts = repContactList;
            if (currentContacts.length == 0) {
                contact.repRole = PRIMARY;
            } else {
                contact.repRole = PRIMARY;
                for (var i = 0; i < currentContacts.length; i++) {
                    if (currentContacts[i].repRole == PRIMARY) {
                        contact.repRole = SECONDARY;
                        break;
                    }
                }
            }
            return contact
        };


        return RepContactService;
    }


    /**
     * Creates a default REP contact with no role assigned
     * @returns {*}
     * @private
     */
    function _createDefaultRepContact(){

        var repcontact=  _createContactModel();
        repcontact.repRole = "";
        repcontact.amend=false
        return repcontact
    }


    function _createContactModel() {
        var contact = {};
        contact.salutation = "";
        contact.givenName = "";
        contact.initials = "";
        contact.surname = "";
        contact.title = "";
        contact.language = "";
        contact.phone = "";
        contact.phoneExt = "";
        contact.fax = "";
        contact.email = "";
        return contact;
    }



})();
