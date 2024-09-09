import{$ as u,A as x,Aa as _e,Ba as ve,Ca as ge,D as oe,E as T,Ea as O,Ga as Ee,H as ne,Ha as Ce,I as p,Ia as L,J as s,Ja as ye,K as a,Ka as Se,L as E,M as Y,N as Z,Na as q,O as B,Oa as Fe,P as v,Pa as G,Q as _,Qa as ee,R as M,Ra as P,S as w,Sa as be,T as A,Ta as xe,U as c,Ua as j,V as f,W as I,Y as ae,Z as R,Za as H,_ as m,_a as Te,aa as se,ab as te,ca as $,cb as C,db as Q,eb as Ie,fb as U,gb as Me,h as re,hb as X,ia as N,ib as we,j as S,ja as k,jb as K,kb as Ae,l as V,lb as z,mb as Le,nb as W,o as F,ob as De,p as b,sa as le,ta as ce,ua as de,va as pe,wa as me,x as ie,xa as ue,ya as he,z as i,za as fe}from"./chunk-RFERAXR7.js";function Ne(l,d){l&1&&(Y(0),s(1,"p"),c(2,'First time users of this form cannot select a file to load and must create an XML file by completing all the required fields below and clicking on the "Generate XML" button at the bottom of this form. For subsequent uses of this form, you can either upload a file by clicking on the "Choose file" button and selecting the .hcsc file or .xml file or you can complete the required fields below to generate a .xml file.'),E(3,"br"),c(4,' If you partially complete the form and click on the "Save Working Copy" button at the bottom of the form it will save a copy on the local workstation for completion at a later time. The file will be saved in the .hcsc file format. If you are using a previously submitted .xml file, please update the appropriate fields and verify that the details are accurate for the current transaction prior to filing. '),E(5,"br"),c(6," Note: The working copies (files with extension .hcsc) should never be sent to Health Canada."),a(),Z())}function ke(l,d){l&1&&(Y(0),s(1,"p"),c(2,"Les nouveaux utilisateurs du formulaire ne peuvent pas s\xE9lectionner et t\xE9l\xE9charger un fichier. Ceci \xE9tant dit, ils doivent cr\xE9er un fichier XML en remplissant les champs obligatoires ci-dessous et en cliquant sur le bouton \xABG\xE9n\xE9rer le XML\xBB au bas du formulaire."),E(3,"br"),c(4," Pour les utilisations ult\xE9rieures de ce formulaire, vous pouvez soit t\xE9l\xE9charger un fichier en cliquant sur le bouton \xABChoisir un fichier\xBB et en s\xE9lectionnant le fichier en format .hcsc ou .xml, soit remplir les champs obligatoires ci-dessous afin de g\xE9n\xE9rer un fichier \xAB.xml\xBB."),E(5,"br"),c(6,"Si vous remplissez partiellement le formulaire et souhaiter proc\xE9der ult\xE9rieurement, cliquez sur le bouton \xABEnregistrer la copie de travail\xBB au bas du formulaire. Une copie sera enregistr\xE9e sur le poste de travail en format .hcsc. Si vous utilisez un fichier .xml pr\xE9c\xE9demment soumis, veuillez mettre \xE0 jour les champs appropri\xE9s et v\xE9rifier que les d\xE9tails sont exacts pour la transaction actuelle avant de d\xE9poser le formulaire."),E(7,"br"),c(8," Remarque : les copies de travail (fichiers portant l'extension .hcsc) ne doivent jamais \xEAtre envoy\xE9es \xE0 Sant\xE9 Canada."),a(),Z())}var Ve=(()=>{let d=class d{};d.\u0275fac=function(t){return new(t||d)},d.\u0275cmp=V({type:d,selectors:[["app-filereader-instruction"]],inputs:{lang:"lang"},standalone:!0,features:[R],decls:4,vars:2,consts:[[1,"row"],[1,"col-lg-12","col-md-12","col-sm-12","col-xs-12"],[4,"ngIf"]],template:function(t,r){t&1&&(s(0,"div",0)(1,"div",1),T(2,Ne,7,0,"ng-container",2)(3,ke,9,0,"ng-container",2),a()()),t&2&&(i(2),p("ngIf",r.lang==="en"),i(),p("ngIf",r.lang==="fr"))},dependencies:[k,N],encapsulation:2});let l=d;return l})();var J=(()=>{let d=class d{constructor(e,t,r,n,h,g,D,y){this._regulatoryInfoService=e,this._addressDetailsService=t,this._contactDetailsService=r,this._feeService=n,this._certificationService=h,this._entityBaseService=g,this._utilsService=D,this._globalService=y}getReactiveModel(e){return e?e.group({notApplicable:[!1,[]],contactInfoConfirm:[!1,pe.requiredTrue]}):null}getEmptyEnrol(){return{TRANSACTION_ENROL:this.getEmptyTransactionEnrol()}}getEmptyMasterFileFeeModel(){return{are_there_access_letters:null,number_of_access_letters:"",who_responsible_fee:"",account_number:"",cra_business_number:""}}getEmptyAddressDetailsModel(){return{company_name:"",street_address:"",city:"",country:void 0,province_lov:void 0,province_text:"",postal_code:""}}getEmptyContactModel(){return{given_name:"",surname:"",language_correspondance:void 0,job_title:"",phone_num:"",phone_ext:"",fax_num:"",email:""}}getEmptyTransactionEnrol(){return{template_type:"PHARMA",date_saved:void 0,software_version:"",form_language:"",check_sum:"",ectd:this.getEmptyEctd(),contact_info:this.getEmptyContactInfo(),fee_details:this.getEmptyMasterFileFeeModel(),certify_accurate_complete:!1,full_name:"",submit_date:void 0,consent_privacy:!1}}getEmptyEctd(){return{company_id:"unassigned",dossier_id:"",dossier_type:{_id:"D25"},product_name:"",product_protocol:"",lifecycle_record:this.getEmptyLifecycleRecord()}}getEmptyLifecycleRecord(){return{control_number:"000000",master_file_number:"",master_file_use:void 0,regulatory_activity_lead:{_id:"B14-20160301-07"},regulatory_activity_type:void 0,sequence_description_value:void 0,sequence_from_date:void 0,transaction_description:void 0,requester_of_solicited_information:"",revise_trans_desc_request:"",revised_trans_desc:void 0}}getEmptyContactInfo(){return{holder_name_address:this.getEmptyAddressDetailsModel(),holder_contact:this.getEmptyContactModel(),agent_not_applicable:void 0,agent_name_address:this.getEmptyAddressDetailsModel(),agent_contact:this.getEmptyContactModel(),contact_info_confirm:!1}}mapDataModelToFormModel(e,t){t.controls.notApplicable.setValue(this._utilsService.toBoolean(e.agent_not_applicable))}mapRequiredFormsToOutput(e,t,r){this._regulatoryInfoService.mapFormModelToDataModel(t,e.ectd),this._certificationService.mapFormModelToDataModel(r,e)}mapAddressFormContactFormToOutput(e,t,r){if(e.agent_not_applicable){let n=t.filter(g=>g.addrType===C.HOLDER)[0];n?this._addressDetailsService.mapFormModelToDataModel(n.value,e.holder_name_address):console.error("mapAddressFormContactFormToOutput ~ No holder address found"),e.agent_name_address=null;let h=r.filter(g=>g.contactType===C.HOLDER)[0];h?this._contactDetailsService.mapFormModelToDataModel(h.value,e.holder_contact):console.error("mapAddressFormContactFormToOutput ~ No holder contact found"),e.agent_contact=null}else t.forEach(n=>{n.addrType===C.HOLDER?this._addressDetailsService.mapFormModelToDataModel(n.value,e.holder_name_address):n.addrType===C.AGENT&&this._addressDetailsService.mapFormModelToDataModel(n.value,e.agent_name_address)}),r.forEach(n=>{n.contactType===C.HOLDER?this._contactDetailsService.mapFormModelToDataModel(n.value,e.holder_contact):n.contactType===C.AGENT&&this._contactDetailsService.mapFormModelToDataModel(n.value,e.agent_contact)})}mapFeeFormToOutput(e,t){this._feeService.mapFormModelToDataModel(t,e)}};d.\u0275fac=function(t){return new(t||d)(S(Ie),S(Ae),S(Le),S(we),S(Me),S(q),S(L),S(Q))},d.\u0275prov=re({token:d,factory:d.\u0275fac});let l=d;return l})();function je(l,d){if(l&1&&(E(0,"control-messages",49),m(1,"formControl")),l&2){let o=_(2);p("showError",o.showErrors)("control",u(1,2,o.masterFileForm.controls.notApplicable))}}function He(l,d){if(l&1){let o=B();s(0,"app-address-details",28),v("errorList",function(t){F(o);let r=_(2);return b(r.processAgentAddressErrors(t))}),a()}if(l&2){let o=_(2);p("showErrors",o.showErrors)("addressModel",o.agentAddressModel)("addrType",o.agent)("addrGroupLabelKey","label.agent")}}function Qe(l,d){if(l&1){let o=B();s(0,"section",24)(1,"header",7)(2,"h3",8),c(3),m(4,"translate"),a()(),s(5,"div",12)(6,"app-contact-details",29),v("errorList",function(t){F(o);let r=_(2);return b(r.processAgentContactErrors(t))}),a()()()}if(l&2){let o=_(2);i(3),f(u(4,5,"heading.agent.contact")),i(3),p("showErrors",o.showErrors)("contactDetailsModel",o.agentContactModel)("contactType",o.agent)("contactGroupLabelKey","label.agent")}}function Ue(l,d){if(l&1&&(E(0,"control-messages",50),m(1,"formControl")),l&2){let o=_(2);p("showError",o.showErrors)("control",u(1,2,o.masterFileForm.controls.contactInfoConfirm))}}function Xe(l,d){if(l&1){let o=B();s(0,"div")(1,"section",6)(2,"header",7)(3,"h2",8),c(4),m(5,"translate"),a()(),s(6,"div",12)(7,"section",24)(8,"header",25)(9,"h3",8),c(10),m(11,"translate"),s(12,"sup",26)(13,"a",27)(14,"span",11),c(15),m(16,"translate"),a(),c(17),a()()()(),s(18,"div",12)(19,"app-address-details",28),v("errorList",function(t){F(o);let r=_();return b(r.processAddressErrors(t))}),a()()(),s(20,"section",24)(21,"header",7)(22,"h3",8),c(23),m(24,"translate"),a()(),s(25,"div",12)(26,"app-contact-details",29),v("errorList",function(t){F(o);let r=_();return b(r.processContactErrors(t))}),a()()(),s(27,"section",24)(28,"header",25)(29,"h3",8),c(30),m(31,"translate"),s(32,"sup",30)(33,"a",31)(34,"span",11),c(35),m(36,"translate"),a(),c(37),a()()()(),s(38,"div",12)(39,"div",32)(40,"div",33)(41,"div",34)(42,"label",35),T(43,je,2,4,"control-messages",36),s(44,"input",37),m(45,"formControl"),m(46,"translate"),v("change",function(){F(o);let t=_();return b(t.agentInfoOnChange())}),a(),s(47,"span",38)(48,"b"),c(49),m(50,"translate"),a()()()()()(),T(51,He,1,4,"app-address-details",39),a()(),T(52,Qe,7,7,"section",40),s(53,"div",41)(54,"div",42)(55,"label",43)(56,"input",44),m(57,"formControl"),v("blur",function(){F(o);let t=_();return b(t.processErrors())})("change",function(t){F(o);let r=_();return b(r.onChanged(t,"contactInfoConfirm"))}),a(),s(58,"span")(59,"b"),c(60),m(61,"translate"),a()(),s(62,"strong",45),c(63),m(64,"translate"),s(65,"sup",46)(66,"a",47)(67,"span",11),c(68),m(69,"translate"),a(),c(70),a()()(),T(71,Ue,2,4,"control-messages",48),a()()()()()()}if(l&2){let o=_();i(4),f(u(5,28,"panel.title.contactInfo")),i(6),I("",u(11,30,"heading.holder.address")," "),i(5),f(u(16,32,"instruction")),i(2),f(o.helpIndex.holderAddrIndx),i(2),p("showErrors",o.showErrors)("addressModel",o.holderAddressModel)("addrType",o.holder)("addrGroupLabelKey","label.holder"),i(4),f(u(24,34,"heading.holder.contact")),i(3),p("showErrors",o.showErrors)("contactDetailsModel",o.holderContactModel)("contactType",o.holder)("contactGroupLabelKey","label.holder"),i(4),I("",u(31,36,"heading.agent.address")," "),i(5),f(u(36,38,"instruction")),i(2),f(o.helpIndex.agentAddrIndx),i(6),p("ngIf",o.masterFileForm.controls.notApplicable.invalid),i(),p("formControl",u(45,40,o.masterFileForm.controls.notApplicable)),ne("aria-label",u(46,42,"agent.not.applicable")),i(5),f(u(50,44,"not.applicable")),i(2),p("ngIf",!o.notApplicable),i(),p("ngIf",!o.notApplicable),i(4),p("formControl",u(57,46,o.masterFileForm.controls.contactInfoConfirm)),i(4),f(u(61,48,"info.confirmation")),i(3),I("",u(64,50,"commmon.required.bracket")," "),i(5),f(u(69,52,"instruction")),i(2),f(o.helpIndex.confmValidIndx),i(),p("ngIf",o.masterFileForm.controls.contactInfoConfirm.invalid)}}function Ke(l,d){if(l&1){let o=B();s(0,"div")(1,"section",6)(2,"header",7)(3,"h2",8),c(4),m(5,"translate"),a()(),s(6,"div",12)(7,"app-master-file-fee",51),v("errorList",function(t){F(o);let r=_();return b(r.processTransFeeErrors(t))}),a()()()()}if(l&2){let o=_();i(4),f(u(5,3,"panel.title.fees")),i(3),p("showErrors",o.showErrors)("dataModel",o.transFeeModel)}}var wt=(()=>{let d=class d{constructor(e,t,r,n,h,g,D,y){this._fb=e,this.cdr=t,this._baseService=r,this._globalService=n,this._utilsService=h,this.fileServices=g,this._versionService=D,this._checkSumService=y,this._regulatoryInfoErrors=[],this._transFeeErrors=[],this._addressErrors=[],this._contactErrors=[],this._agentAddressErrors=[],this._agentContactErrors=[],this._contactConfirmError=[],this._certficationErrors=[],this.errorList=[],this.headingLevel="h2",this.rootTagText=H,this.versionTagPath=Te,this.startCheckSumVersionNum=2,this.notApplicable=!1,this.holder=C.HOLDER,this.agent=C.AGENT,this.noContactTxDescs=["12","14"],this.noFeeTxDescs=["1","3","5","8","9","12","14","20"],this.selectedTxDescSignal=oe(""),this.showContact=$(()=>this.selectedTxDescSignal()===""?!0:!this.noContactTxDescs.includes(this.selectedTxDescSignal())),this.showFee=$(()=>this.selectedTxDescSignal()===""?!0:!this.noFeeTxDescs.includes(this.selectedTxDescSignal())),this.showContactFlag=!0,this.showFeeFlag=!0,this.showErrors=!1}ngOnInit(){this.masterFileForm||(this.masterFileForm=this._baseService.getReactiveModel(this._fb));try{this._globalService.enrollment?this.enrollModel=this._globalService.enrollment:(this.enrollModel=this._baseService.getEmptyEnrol(),this._globalService.enrollment=this.enrollModel),this.transactionEnrollModel=this.enrollModel[this.rootTagText],this._initModels(this.transactionEnrollModel),this.lang=this._globalService.currLanguage,this.helpIndex=this._globalService.helpIndex,this.devEnv=this._globalService.devEnv,this.byPassCheckSum=this._globalService.byPassChecksum}catch(e){console.error(e)}}ngAfterViewInit(){document.location.href="#def-top",this.msgList.changes.subscribe(e=>{let t=[];this._updateErrorList(e),this.processErrors()}),this.msgList.notifyOnChanges()}_updateErrorList(e){let t=[];e&&e.forEach(r=>{r.label==="info.confirmation"&&t.push(r)}),this._contactConfirmError=t}processErrors(){this.errorList=[],this.errorList=this.errorList.concat(this._regulatoryInfoErrors),this.showContact()&&(this.errorList=this.errorList.concat(this._addressErrors.concat(this._contactErrors)),this.notApplicable||(this.errorList=this.errorList.concat(this._agentAddressErrors.concat(this._agentContactErrors))),this.errorList=this.errorList.concat(this._contactConfirmError)),this.showFee()&&(this.errorList=this.errorList.concat(this._transFeeErrors)),this.errorList=this.errorList.concat(this._certficationErrors),this.cdr.detectChanges()}processRegulatoryInfoErrors(e){this._regulatoryInfoErrors=e,this.processErrors()}processContactErrors(e){this._contactErrors=e,this.processErrors()}processTransFeeErrors(e){this._transFeeErrors=e,this.processErrors()}processCertificationErrors(e){this._certficationErrors=e,this.processErrors()}processAddressErrors(e){this._addressErrors=e,this.processErrors()}processAgentAddressErrors(e){this._agentAddressErrors=e,this.processErrors()}processAgentContactErrors(e){this._agentContactErrors=e,this.processErrors()}hideErrorSummary(){return this.showErrors&&this.errorList&&this.errorList.length>0}saveXmlFile(){this.showErrors=!0,this.processErrors(),this._saveXML()}saveWorkingCopyFile(){let e=this._prepareForSaving(!1),t=this._generateFileName(e[H]);this.fileServices.saveJsonToFile(e,t,null)}processFile(e){e.data!==null&&(this.transactionEnrollModel=e.data.TRANSACTION_ENROL,this._initModels(this.transactionEnrollModel),this.setSelectedTxDesc(this.ectdModel.lifecycle_record?.sequence_description_value?._id),this._baseService.mapDataModelToFormModel(this.transactionEnrollModel.contact_info,this.masterFileForm),this.agentInfoOnChange())}_initModels(e){this.ectdModel=e.ectd,e.contact_info!=null&&(this.holderAddressModel=e.contact_info.holder_name_address,this.holderContactModel=e.contact_info.holder_contact,this.agentAddressModel=e.contact_info.agent_name_address,this.agentContactModel=e.contact_info.agent_contact),e.fee_details!=null&&(this.transFeeModel=e.fee_details)}preload(){}setSelectedTxDesc(e){this.selectedTxDescSignal.set(e),this.showContact()||(this.holderAddressModel=this._baseService.getEmptyAddressDetailsModel(),this.holderContactModel=this._baseService.getEmptyContactModel(),this.agentAddressModel=this._baseService.getEmptyAddressDetailsModel(),this.agentContactModel=this._baseService.getEmptyContactModel(),this._addressErrors=[],this._agentAddressErrors=[],this._contactErrors=[],this._agentContactErrors=[]),this.showFee()||(this.transFeeModel=this._baseService.getEmptyMasterFileFeeModel(),this._transFeeErrors=[]),this.processErrors()}unloadNotification(e){e.returnValue=!0}_saveXML(){if(this.errorList&&this.errorList.length<1){let e=this._prepareForSaving(!0),t=this._generateFileName(e[H]),r=this._versionService.getApplicationMajorVersionWithUnderscore(this._globalService.appVersion),n=te.toUpperCase()+"_RT_"+r+".xsl";this.fileServices.saveXmlToFile(e,t,!0,n);return}document.location.href="#topErrorSummaryId"}_prepareForSaving(e){let t=this._baseService.getEmptyTransactionEnrol(),r=this.regulatoryInfoComponent.getFormValue(),n=this.certificationComponent.getFormValue();if(this._baseService.mapRequiredFormsToOutput(t,r,n),this.showContact()){t.contact_info.agent_not_applicable=this.masterFileForm.controls.notApplicable.value,t.contact_info.contact_info_confirm=this.masterFileForm.controls.contactInfoConfirm.value,console.log(t.contact_info.agent_not_applicable,t.contact_info.contact_info_confirm);let g=this.addressComponents.map(y=>({addrType:y.addrType,value:y.getFormValue()})),D=this.contactDetailsComponents.map(y=>({contactType:y.contactType,value:y.getFormValue()}));this._baseService.mapAddressFormContactFormToOutput(t.contact_info,g,D)}else t.contact_info=null;if(this.showFee()){let g=this.feeComponent.getFormValue();this._baseService.mapFeeFormToOutput(t.fee_details,g)}else t.fee_details=null;t.date_saved=this._utilsService.getFormattedDate("yyyy-MM-dd-hhmm"),t.software_version=this._globalService.appVersion,t.form_language=this._globalService.currLanguage;let h={TRANSACTION_ENROL:t};return e&&(h.TRANSACTION_ENROL[ee]="",h.TRANSACTION_ENROL[ee]=this._checkSumService.createHash(h)),console.log("_prepareForSaving ~ output",JSON.stringify(h,null,2)),h}_generateFileName(e){return te+"-"+e.ectd.dossier_id+"-"+e.date_saved}agentInfoOnChange(){this.notApplicable=this.masterFileForm.controls.notApplicable.value,this.notApplicable&&(this.agentAddressModel=this._baseService.getEmptyAddressDetailsModel(),this.agentContactModel=this._baseService.getEmptyContactModel(),this._agentAddressErrors=null,this._agentContactErrors=null),this.processErrors()}onChanged(e,t){e?.target?.checked===!1&&this.masterFileForm.controls[t].reset()}checkDateValidity(e){this._utilsService.checkInputValidity(e,this.masterFileForm.get("submitDate"),"invalidDate")}};d.\u0275fac=function(t){return new(t||d)(x(ve),x(se),x(J),x(Q),x(L),x(G),x(j),x(P))},d.\u0275cmp=V({type:d,selectors:[["app-form-base"]],viewQuery:function(t,r){if(t&1&&(M(U,5),M(K,5),M(X,5),M(O,5),M(z,5),M(W,5)),t&2){let n;w(n=A())&&(r.regulatoryInfoComponent=n.first),w(n=A())&&(r.feeComponent=n.first),w(n=A())&&(r.certificationComponent=n.first),w(n=A())&&(r.msgList=n),w(n=A())&&(r.addressComponents=n),w(n=A())&&(r.contactDetailsComponents=n)}},hostBindings:function(t,r){t&1&&v("beforeunload",function(h){return r.unloadNotification(h)},!1,ie)},standalone:!0,features:[ae([G,L,j,P,Fe,q,J]),R],decls:53,vars:38,consts:[[1,"container-fluid","wb-frmvld","wb-init","wb-frmvld-inited"],["name","MasterFileForm","novalidate","",3,"formGroup"],[1,"row","mrgn-tp-md"],[1,"col-md-12"],[1,"text-right"],["id","securityInfo",1,"fa","fa-shield","fa-sm"],[1,"panel","panel-primary","mrgn-tp-lg"],[1,"panel-heading","clearfix"],[1,"panel-title"],["id","tr1-rf"],["href","#tr1",1,"fn-lnk","mrgn-tp-md"],[1,"wb-inv"],[1,"panel-body"],[3,"complete","rootTag","lang","versionTagPath","startCheckSumVersion","byPassCheckSum","devEnv"],["fileUploadInstruction","",3,"lang"],["id","topErrorSummaryId"],["headingPreamble","errorSummary.masterfile",3,"hiddenSummary","errorList","headingLevel"],[3,"errorList","trDescUpdated","showErrors","dataModel"],[4,"ngIf"],[3,"errorList","showErrors"],[1,"row","btn-group-sm"],[1,"form-group","col-md-4"],["type","button",1,"btn","btn-default","btn-lg","active",3,"click"],["type","button",1,"btn","btn-primary","btn-lg","active",3,"click"],[1,"panel","panel-default"],[1,"panel-heading","clearfix","group-beside"],["id","tr3-rf"],["href","#tr3",1,"fn-lnk"],[3,"errorList","showErrors","addressModel","addrType","addrGroupLabelKey"],[3,"errorList","showErrors","contactDetailsModel","contactType","contactGroupLabelKey"],["id","tr4-rf"],["href","#tr4",1,"fn-lnk"],[1,"row","rep-margin-left"],[1,"col-xs-12"],[1,"checkbox"],["for","notApplicableId"],["parentId","mfDetails","controlId","notApplicableId","label","notApplicable",3,"showError","control",4,"ngIf"],["name","notApplicableName","type","checkbox","id","notApplicableId",3,"change","formControl"],["aria-hidden","true"],[3,"showErrors","addressModel","addrType","addrGroupLabelKey","errorList",4,"ngIf"],["class","panel  panel-default",4,"ngIf"],[1,"col-xs-12","full-width"],[1,"checkbox","required"],["for","contactInfoConfirmId"],["name","contactInfoConfirmName","type","checkbox","id","contactInfoConfirmId",3,"blur","change","formControl"],[1,"required"],["id","tr5-rf"],["href","#tr5",1,"fn-lnk"],["parentId","mfContactInfoConfirm","controlId","contactInfoConfirmId","label","info.confirmation",3,"showError","control",4,"ngIf"],["parentId","mfDetails","controlId","notApplicableId","label","notApplicable",3,"showError","control"],["parentId","mfContactInfoConfirm","controlId","contactInfoConfirmId","label","info.confirmation",3,"showError","control"],[3,"errorList","showErrors","dataModel"]],template:function(t,r){t&1&&(s(0,"div",0)(1,"form",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"span",5)(6,"strong"),c(7),m(8,"translate"),a()()()()(),s(9,"div")(10,"section",6)(11,"header",7)(12,"h2",8),c(13),m(14,"translate"),s(15,"sup",9)(16,"a",10)(17,"span",11),c(18),m(19,"translate"),a(),c(20),a()()()(),s(21,"div",12)(22,"lib-file-reader",13),v("complete",function(h){return r.processFile(h)}),E(23,"app-filereader-instruction",14),a()()()(),s(24,"div",15),E(25,"lib-error-summary",16),a(),s(26,"div")(27,"section",6)(28,"header",7)(29,"h2",8),c(30),m(31,"translate"),a()(),s(32,"div",12)(33,"app-regulatory-information",17),v("errorList",function(h){return r.processRegulatoryInfoErrors(h)})("trDescUpdated",function(h){return r.setSelectedTxDesc(h)}),a()()(),T(34,Xe,72,54,"div",18)(35,Ke,8,5,"div",18),a(),s(36,"div")(37,"section",6)(38,"header",7)(39,"h2",8),c(40),m(41,"translate"),a()(),s(42,"div",12)(43,"app-certification",19),v("errorList",function(h){return r.processCertificationErrors(h)}),a()()()(),s(44,"div",20)(45,"div",21)(46,"button",22),v("click",function(){return r.saveWorkingCopyFile()}),c(47),m(48,"translate"),a()(),s(49,"div",21)(50,"button",23),v("click",function(){return r.saveXmlFile()}),c(51),m(52,"translate"),a()()()()()),t&2&&(i(),p("formGroup",r.masterFileForm),i(6),I("\xA0",u(8,24,"PROTECTED_B"),""),i(6),I("",u(14,26,"load.file")," "),i(5),f(u(19,28,"instruction")),i(2),f(r.helpIndex.loadFileIndx),i(2),p("rootTag",r.rootTagText)("lang",r.lang)("versionTagPath",r.versionTagPath)("startCheckSumVersion",r.startCheckSumVersionNum)("byPassCheckSum",r.byPassCheckSum)("devEnv",r.devEnv),i(),p("lang",r.lang),i(2),p("hiddenSummary",r.hideErrorSummary())("errorList",r.errorList)("headingLevel",r.headingLevel),i(5),f(u(31,30,"panel.title.regulatoryInfo")),i(3),p("showErrors",r.showErrors)("dataModel",r.ectdModel),i(),p("ngIf",r.showContact()),i(),p("ngIf",r.showFee()),i(5),f(u(41,32,"panel.title.certification")),i(3),p("showErrors",r.showErrors),i(4),I(" ",u(48,34,"save.working.copy")," "),i(4),I(" ",u(52,36,"generate.final")," "))},dependencies:[k,N,ce,le,ge,he,de,me,ue,fe,_e,xe,be,Se,Ee,O,ye,Ce,De,U,z,W,K,X,Ve],encapsulation:2});let l=d;return l})();export{wt as FormBaseComponent};
