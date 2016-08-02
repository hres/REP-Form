/**
 * Created by hcuser on 17/05/2016.
 * @ngdoc service
 */


(function () {
    'use strict';

    angular
        .module('model.companies', [

        ]);

})();



(function () {
    'use strict';

    angular
        .module('model.companies')
        .factory('CompanyAddresses', addresses);

    //factoryName.$inject = ['$parse'];

    /* @ngInject */

    function addresses() {
        var addresses= [
            {
                companyRecord: {
                    roles:[
                        {role:"ff"},
                        {role:"ff"}
                    ],
                    company: {
                        name: "Test1",
                        address: {
                            street: "",
                            city: "",
                            country: null,
                            stateList: null,
                            stateText: "",
                            zipCode: ""
                        }
                    }
                }

            },
            {
                companyRecord: {
                    roles: [

                    ],
                    company: {
                        name: "Test2",
                        address: {
                            street: "",
                            city: "",
                            country: "ESP",
                            stateList: null,
                            stateText: "",
                            zipCode: ""
                        }
                    }
                }
            }
        ];

        var service = {
            getAddresses: getAddresses,
            setAddresses:setAddresses,
            addAddress:addAddress,
            loadAddresses:loadAddresses,
            deleteAddress:deleteAddress,
            addAddressRole:addRole
        };
        return service;

        function setAddresses(newAddressList){
            addresses=newAddressList;
            console.log("this is addresses "+addresses)
        }

        function getAddresses(){
            return addresses;
        }
        function addRole(roleType,companyRecord){
            //TODO check for valid role type
            if(!companyRecord){
                console.error("No company Record for ::addRole")
                return;
            }
            var newRole= {role:roleType};
            if(!companyRecord.roles){
                companyRecord.roles=new Array()
            }
            companyRecord.roles.push(newRole);
            console.debug(companyRecord);
        }
        /*
         @ngdoc
         @param
         */
        function removeRole(roleType,companyRecord){
            if(!companyRecord){
                console.error("No company Record for ::addRole")
                return;
            }
            for(var i=0;i< companyRecord.roles.length;i++){
                if(companyRecord.roles[i].role=="roleType") {
                    companyRecord.roles.splice(i, 1);
                    return true
                }
            }
            return false
        }


        function addAddress(){

            var company= {
                companyRecord: {
                    roles: [

                    ],
                    company: {
                        name: "NEW Test 3",
                        address: {
                            street: "",
                            city: "",
                            country: null,
                            stateList: null,
                            stateText: "",
                            zipCode: ""
                        }
                    }
                }
            }
            // var obj = JSON.parse(company);
            addresses.push(company);
            console.debug(addresses);
        }
        function loadAddresses(jsonAddressList){
            //todo some kind of checking?
            addresses=jsonAddressList;
        }
        function deleteAddress(addressRecord){
            for(var i=0;i<addresses.length;i++){
                if(addresses[i]===addressRecord){
                    addresses.splice(i,1);
                    console.log("match");

                }
            }
        }

    }

})();

//TODO do we need a list of roles?
(function () {
    'use strict';

    angular
        .module('model.companies')
        .factory('AddressRoles', roles);

    //factoryName.$inject = ['dependency'];

    /!* @ngInject *!/
    function roles() {
        var roleTypes=[
            {
                id:"MANUFACTURER",
                name:"Manufacturer or Sponsor"
            },
            {
                id:"MAIL",
                name:"Mailing"
            },
            {
                id:"IMPORTER",
                name:"Canadian Importer"
            },
            {
                id:"BILLING",
                name:"Billing"
            },
            {
                id:"OTHER",
                name:"Other"
            },
            {
                id:"NOTAPPL",
                name:"Not Applicable"
            },
        ];


        function getDisplayValue(searchId){
            console.log("Inside "+searchId+" Role types "+roleTypes.length)
            for(var i=0;i<roleTypes.length;i++){

                if(roleTypes[i].id===searchId){
                    return (roleTypes[i].name)
                }

            }
            return ""
        }


        var service={
            roleTypes:roleTypes,
            getDisplayValue:getDisplayValue
        };

        return  service;

    }


})()






