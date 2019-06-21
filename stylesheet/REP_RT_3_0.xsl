<?xml version="1.0" encoding="utf-8"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema">
	<xsl:param name="language" select="'eng'"/>
	<xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
	<xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
	<xsl:template match="/">
		<html>
			<head>
				<meta http-equiv="X-UA-Compatible" content="IE=9"/>
				<style type="text/css">
<xsl:text disable-output-escaping="yes" >
html {
    font-family: sans-serif;
	font-size: 10px;
    -webkit-tap-highlight-color: transparent
    display: block;
    color: -internal-root-color;
}

body {
	background: #f9f9f9;
    line-height: 1.4375;
    color: #333;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    margin: 0;
}
, :after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05)
}

.well blockquote {
    border-color: #ddd;
    border-color: rgba(0, 0, 0, .15)
}

.well-lg {
    padding: 24px;
    border-radius: 6px
}

.well-sm {
    padding: 9px;
    border-radius: 3px
}
article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
    display: block
}
.panel {
    margin-bottom: 23px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05)
}

.panel-body {
    padding: 15px
}

.panel-body:after, .panel-body:before {
    content: " ";
    display: table
}

.panel-body:after {
    clear: both
}

.panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px
}

.panel-heading .dropdown .dropdown-toggle {
    color: inherit
}

.panel-title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 18px;
    color: inherit
}

.panel-title a {
    color: inherit
}

.panel-footer {
    padding: 10px 15px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px
}

.panel .list-group, .panel .panel-collapse .list-group {
    margin-bottom: 0
}

.panel .list-group .list-group-item, .panel .panel-collapse .list-group .list-group-item {
    border-width: 1px 0;
    border-radius: 0
}

.panel .list-group:first-child .list-group-item:first-child, .panel .panel-collapse .list-group:first-child .list-group-item:first-child {
    border-top: 0;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px
}

.panel .list-group:last-child .list-group-item:last-child, .panel .panel-collapse .list-group:last-child .list-group-item:last-child {
    border-bottom: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px
}
.panel-default {
    border-color: #ddd
}
.panel-default .panel-heading {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd
}

.panel-default  .panel-heading + .panel-collapse .panel-body {
    border-top-color: #ddd
}

.panel-default  .panel-heading .badge {
    color: #f5f5f5;
    background-color: #333
}

.panel-default  .panel-footer + .panel-collapse .panel-body {
    border-bottom-color: #ddd
}
.panel-primary {
    border-color: #2572b4
}
.panel-primary  .panel-heading {
    color: #fff;
    background-color: #2572b4;
    border-color: #2572b4
}

.panel-primary  .panel-heading + .panel-collapse .panel-body {
    border-top-color: #2572b4
}

.panel-primary  .panel-heading .badge {
    color: #2572b4;
    background-color: #fff
}

.panel-primary  .panel-footer + .panel-collapse .panel-body {
    border-bottom-color: #2572b4
}
.panel-title {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 18px;
    color: inherit
}

.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    font-family: Helvetica, Arial, sans-serif
}
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
}
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    line-height: 1.1;
    color: inherit;
}
h1 {
    margin: .67em 0;
}

h1 {
    border-bottom: 1px solid #af3c43;
    font-size: 34px;
    margin-bottom: .2em;
    margin-top: 1.25em;
    padding-bottom: .2em
}
table {
    background-color: transparent;
    display: table;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
.table tbody tr td, .table tbody tr th, .table tfoot tr td, .table tfoot tr th, .table thead tr td, .table thead tr th {
    padding: 8px;
    line-height: 1.4375;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}
table.dataTable, table.dataTable td, table.dataTable th {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}
td, th {
    padding: 0
}
table.dataTable {
    border-collapse: separate;
    border-spacing: 0;
    margin: 0 auto;
    width: 100% !important;
}
table.dataTable, table.dataTable td, table.dataTable th {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}
.panel .table-responsive:last-child .table:last-child, .panel .table:last-child {
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
}
.dataTables_wrapper .dataTables_scroll, table.dataTable {
    clear: both;
}
tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
.table-striped tbody tr:nth-child(odd) {
    background-color: #f5f5f5;
}
table.dataTable tbody tr {
    background-color: #fff;
}
.row {
    margin-left: -15px;
    margin-right: 15px;
}

.row:after, .row:before {
    content: " ";
    display: table
}

.row:after {
    clear: both
}
.col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
    position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
}

.col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
    float: left;
}

.col-xs-12 {
    width: 100%;
}
.col-md-12 {
	width: 100%;
}
.col-xs-6 {
    width: 48%;
}
.col-md-5 {
    width: 40%;
}
.col-xs-2 {
    width: 16.6666666667%;
}
.col-xs-1 {
    width: 8.3333333333%
}
.col-xs-11 {
    width: 91.6666666667%
}

legend {
    padding-inline-start: 2px;
    padding-inline-end: 2px;
    display: block;
    width: 100%;
    padding: 0;
    margin-bottom: 23px;
    font-size: 24px;
    line-height: inherit;
    color: #333;
    border: 0;
    border-bottom: 0;
    float: left;
}
.form-group {
    margin-bottom: 15px;
}
.col-md-6 {
    width: 48%;
}
.col-xs-3 {
    width: 25%;
}
.col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9 {
    float: left;
}
.alert-info, .label-info, .label-info[href]:active, .label-info[href]:focus, .label-info[href]:hover, details.alert.alert-info, details.alert[open].alert-info
 {
    background: #d7faff;
    border-color: #269abc;
}
.alert-danger, .alert-info, .alert-success, .alert-warning, .label-danger, .label-danger[href]:active, .label-danger[href]:focus, .label-danger[href]:hover, .label-default, .label-default[href]:active, .label-default[href]:focus, .label-default[href]:hover, .label-info, .label-info[href]:active, .label-info[href]:focus, .label-info[href]:hover, .label-primary, .label-primary[href]:active, .label-primary[href]:focus, .label-primary[href]:hover, .label-success, .label-success[href]:active, .label-success[href]:focus, .label-success[href]:hover, .label-warning, .label-warning[href]:active, .label-warning[href]:focus, .label-warning[href]:hover {
    color: #000;
}
.alert-warning, .label-warning, .label-warning[href]:active, .label-warning[href]:focus, .label-warning[href]:hover, details.alert.alert-warning, details.alert[open].alert-warning {
    background: #f9f4d4;
    border-color: #f90;
}
.alert-success, .label-success, .label-success[href]:active, .label-success[href]:focus, .label-success[href]:hover, details.alert.alert-success, details.alert[open].alert-success {
    background: #d8eeca;
    border-color: #278400;
}
.alert, .label {
    border-radius: 0;
    border-style: solid;
    border-width: 0 0 0 4px;
}
.alert {
    padding: 15px;
    margin-bottom: 23px;
    border: 1px solid transparent;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
ol, ul {
    margin-top: 0;
    margin-bottom: 11.5px;
}
span.mouseHover:hover {
	border: 1px solid black;
}
.c-checkbox {
	border-style: solid;
	border-width: thin;
	font-size: xx-small;
	font-weight: 900;
	margin-left: 15px;
	margin-right: 15px;
	padding-left: 2px;
	vertical-align: 2px;
}
span.normalWeight {
	font-weight: 100;
}
.padLeft3 {
	padding-left: 3px;
}
.nowrap {
	white-space: nowrap;
}
</xsl:text>
				</style>
			</head>
            <body>
				<xsl:if test="count(TRANSACTION_ENROL) &gt; 0"> <xsl:apply-templates select="TRANSACTION_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	
	<!-- Transaction Enrolment -->
	<xsl:template match="TRANSACTION_ENROL">
		<h1>Regulatory Transaction Template: Regulatory Enrolment Process (REP)</h1>
					<div class="well well-sm" >
						<TABLE border="1" cellspacing="2" cellpadding="2" style="table-layout: fixed; width: 100%;word-wrap: break-word;">
							<TR>
								<TD style="text-align: center;font-weight:bold;">Company ID</TD>
								<TD style="text-align: center;font-weight:bold;">Dossier Type</TD>
								<TD style="text-align: center;font-weight:bold;">Dossier ID</TD>
								<TD style="text-align: center;font-weight:bold;">Date Last Saved</TD>
							</TR>
							<TR>
								<TD style="text-align: center;"> <span class="mouseHover"><xsl:apply-templates select="ectd/company_id" /></span> </TD>
								<TD style="text-align: center;"> <span class="mouseHover"><xsl:value-of select="ectd/dossier_type" /></span> </TD>
								<TD style="text-align: center;"> <span class="mouseHover">HC6-024-<xsl:apply-templates select="ectd/dossier_id" /></span> </TD>
								<TD style="text-align: center;"> <span class="mouseHover"><xsl:apply-templates select="date_saved" /></span> </TD>
							</TR>
						</TABLE>
					</div>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Regulatory Information</h2>
				</div>
				<div class="panel-body">										
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<strong> Product Name:&#160; </strong>
								<span class="mouseHover">
									<xsl:value-of select="ectd/product_name"/>
								</span>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<strong> Will the submission be signed / filed by a third party on behalf of the manufacturer / sponsor?&#160; </strong>
								<span class="mouseHover"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_third_party"/></xsl:call-template>
								</span>
							</div>
							<xsl:if test="is_third_party = 'Y'">
							<div class="col-xs-11">
								<div class="alert alert-info">
									A letter of authorization signed by the manufacturer/sponsor company must be provided in section 1.2.1 of the regulatory transaction.
								</div>
							</div>
							</xsl:if>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<strong> Was this regulatory activity approved for priority review?&#160; </strong>
								<span class="mouseHover"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_priority"/></xsl:call-template>
								</span>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<strong> Was this regulatory activity approved for NOC/C review?&#160; </strong>
								<span class="mouseHover"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_noc"/></xsl:call-template>
								</span>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<strong> Is this regulatory activity an Administrative Submission or does this regulatory activity contain an administrative component?&#160; </strong>
								<span class="mouseHover"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_admin_sub"/></xsl:call-template>
								</span>
							</div>
						</div>
						<xsl:if test="is_admin_sub = 'Y'">
						<div class="row">
							<div class="col-xs-12">
								<strong> Reason for Administrative Submission or administrative component&#160; </strong>
								<span class="mouseHover"><xsl:value-of select="sub_type"/>
								</span>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<strong> Reason for Administrative Submission or administrative component Description&#160; </strong>
							</div>
								<xsl:call-template name="converter"><xsl:with-param name="value" select="sub_type/@id"/></xsl:call-template>
						</div>
						</xsl:if>
					</div>

					<div class="well well-sm" >
								<header class="panel-heading" >
									<h4 class="panel-title" >Transaction Details</h4>
								</header>								
							<div class="row">
								
								<div class="panel-body" >
										<xsl:for-each select="ectd/lifecycle_record">
													<fieldset>
														<legend>Transaction Details Record</legend>
														<div class="row">
															<div class="form-group col-md-6">
															<strong class="padLeft3">Control Number:&#160;</strong><span class="mouseHover"><xsl:value-of select="control_number"/></span>
															</div>
														</div>
														<div class="row">
														</div>
														<div class="row">
															<div class="col-xs-6">
															<strong class="padLeft3">Regulatory Activity Lead:&#160;</strong><span class="mouseHover"><xsl:value-of select="regulatory_activity_lead"/></span>
															</div>
															<div class="col-xs-6">
															<strong>Regulatory Activity Type:&#160;</strong><span class="mouseHover"><xsl:value-of select="regulatory_activity_type"/></span>
															</div>
														</div>
														<div class="row">
															<div class="form-group col-md-12">
															<strong>Regulatory Transaction Description:&#160;</strong><span class="mouseHover"><xsl:value-of select="transaction_description"/></span>
															</div>
														</div>
														<div class="row">
															<div class="col-md-12">
															<strong>Requester of solicited information:&#160;</strong>
															</div>
															<div class="col-md-12">
																<strong class="col-xs-1">&#160;</strong>
																<span class="col-xs-6 mouseHover"><xsl:call-template name="break"><xsl:with-param name="text" select="requester_of_solicited_information"/></xsl:call-template></span>
															</div>

															<div class="col-md-12">
																<span class="col-xs-2">Requester 1:&#160;</span>
																<span class="col-xs-3 mouseHover"><xsl:value-of select="requester_name"/></span>
																<span class="col-xs-1">Code:&#160;</span>
																<span class="col-xs-3"><span class=" mouseHover"><xsl:value-of select="requester_name/@id"/></span></span>
															</div>
															<xsl:if test="requester_name2 != ''">
															<div class="col-md-12">
																<span class="col-xs-2">Requester 2:&#160;</span>
																<span class="col-xs-3 mouseHover"><xsl:value-of select="requester_name2"/></span>
																<span class="col-xs-1">Code:&#160;</span>
																<span class="col-xs-3"><span class=" mouseHover"><xsl:value-of select="requester_name2/@id"/></span></span>
															</div>
															</xsl:if>
															<xsl:if test="requester_name3 != ''">
															<div class="col-md-12">
																<span class="col-xs-2">Requester 3:&#160;</span>
																<span class="col-xs-3 mouseHover"><xsl:value-of select="requester_name3"/></span>
																<span class="col-xs-1">Code:&#160;</span>
																<span class="col-xs-3"><span class="mouseHover"><xsl:value-of select="requester_name3/@id"/></span></span>
															</div>
															</xsl:if>
														</div>
													</fieldset>
										</xsl:for-each>
								</div>
							</div>
						</div>

					<h4>Name of Regulatory Project Manager, if known: &#160;</h4>
					
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<span class="mouseHover"> <xsl:apply-templates select="regulatory_project_manager1" /> </span>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<span class="mouseHover"> <xsl:apply-templates select="regulatory_project_manager2" /> </span>
							</div>
						</div>
					</div>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<strong> Are new or revised fees associated with this transaction?&#160; </strong>
								<span class="mouseHover"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="is_fees"/></xsl:call-template>
								</span>
							</div>
						</div>
					</div>

				</div>		
			</div>
			<xsl:if test="is_fees = 'Y'">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Fees</h2>
				</div>
				<div class="panel-body">
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<strong> Submission Class:&#160; </strong>
								<span class="mouseHover">
									<xsl:value-of select="fee_details/submission_class"/>
								</span>
								<strong>&#160;&#160;Fees:&#160;</strong>
								<span class="mouseHover">$<xsl:value-of select="fee_details/fee"/></span>
							</div>
							<div class="col-xs-12">
								<strong>Submission Description:&#160;</strong>
								<span class="mouseHover">
									<xsl:value-of select="fee_details/submission_description"/>
								</span>
							</div>
						</div>
					</div>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<strong>A deferral of payment is requested with this transaction?&#160; </strong>
								<span class="mouseHover"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="fee_details/deferral_request"/></xsl:call-template>
								</span>
							</div>
							<div class="col-xs-12">
								<strong>Fee Remission is requested with this transaction?&#160; </strong>
								<span class="mouseHover"><xsl:call-template name="YesNoUnknow"><xsl:with-param name="value" select="fee_details/fee_remission"/></xsl:call-template>
								</span>
							</div>
							<xsl:if test="fee_details/fee_remission = 'Y'">
							<div class="col-xs-12">
								<strong>Anticipated gross revenue for this drug product during the fee verification period:&#160; </strong>
								<span class="mouseHover">$<xsl:value-of select="fee_details/gross_revenue"/></span>
								<strong> &#160;&#160;10% of anticipated gross revenue:&#160; </strong>
								<span class="mouseHover">$<xsl:value-of select="fee_details/percent_gross"/></span>
							</div>
							<div class="col-xs-12">
								<xsl:choose>
								<xsl:when test="fee_details/fee &lt; fee_details/percent_gross">
								<div class="alert alert-warning">
								You are not eligible to apply for fee remission. The submission fee is less than 10% of anticipated gross revenues.
								</div>
								</xsl:when>
								<xsl:otherwise>
								<div class="alert alert-success">
								You are eligible to apply for fee remission. The submission fee is greater than 10% of anticipated gross revenues.
								</div>
								</xsl:otherwise>
								</xsl:choose>
							</div>
							</xsl:if>
						</div>
					</div>
					<xsl:if test="fee_details/deferral_request = 'Y' or fee_details/fee_remission = 'Y'">
					<h4>Required Documentation</h4>
					<div class="well well-sm" >
						<xsl:if test="fee_details/deferral_request = 'Y'">
						<div class="row">
							<div class="col-xs-12">
								<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/required_docs/deferral_statement"/></xsl:call-template>
								<span class="mouseHover">The statement supporting the deferral request is included.</span>
							</div>
						</div>
						</xsl:if>
						<xsl:if test="fee_details/fee_remission = 'Y' and fee_details/submission_class/fee &gt; fee_details/percent_gross">
						<div class="row">
							<div class="col-xs-12">
								<strong>Please include the required signed statement AND at least one of the support documentation to establish that the applicable fee payable is greater than 10% of the anticipated gross revenue from sales of the drug product in Canada during the fee verification period.</strong>
							</div>
							<div class="col-xs-12">
								<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/required_docs/remission_certified"/></xsl:call-template>
								<span class="mouseHover">A statement signed by the individual responsible for the applicant's financial affairs is included to certify that the fee payable is greater than 10% of the anticipated gross revenue</span>
							</div>
							<div class="col-xs-12">
								<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/required_docs/est_market_share"/></xsl:call-template>
								<span class="mouseHover">Estimated market share (that is [i.e.], product's market potential compared to the total market for similar products in Canada)</span>
							</div>
							<div class="col-xs-12">
								<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/required_docs/comparison_products"/></xsl:call-template>
								<span class="mouseHover">Comparison to similar products on the Canadian market or other similar markets (e.g., United States, European Union)</span>
							</div>
							<div class="col-xs-6">
								<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/required_docs/sales_history"/></xsl:call-template>
								<span class="mouseHover">Sales history prior to product upgrades or sales history of similar products</span>
							</div>
							<div class="col-xs-6">
								<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/required_docs/market_plan"/></xsl:call-template>&#160;
								<span class="mouseHover">Marketing plan/product plan for the drug product</span>
							</div>
							<div class="col-xs-6">
								<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/required_docs/avg_sale_price"/></xsl:call-template>
								<span class="mouseHover">Average sale price and demand</span>
							</div>
							<div class="col-xs-6">
								<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/required_docs/other"/></xsl:call-template>&#160;
								<span class="mouseHover">Other</span>
							</div>
							<xsl:if test="fee_details/required_docs/other = 'Y'">
							<div class="col-xs-12">
								<strong>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;Other:&#160;</strong>
								<span class="mouseHover"><xsl:value-of select="fee_details/required_docs/other_details"/></span>
							</div>
							</xsl:if>
						</div>
						</xsl:if>
					</div>
					</xsl:if>

					<h3>Payment</h3>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<div class="alert alert-info">
							<xsl:choose>
							<xsl:when test="fee_details/deferral_request = 'N' and fee_details/fee_remission = 'N'">
								<xsl:choose>
								<xsl:when test="fee_details/submission_class/fee &lt; 10000">
								<p>Fees of $10,000 or less must be paid at the time of filing of the submission, supplement or application. Please complete the Advance Payment Details for Drug Submissions and Master Files.</p>
								</xsl:when>
								<xsl:otherwise>
								<p>Review fees must not be included with the submission, supplement or application. Sponsors will be invoiced for fees of more than $10,000.</p>
								</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:when test="fee_details/fee_remission = 'N' and fee_details/deferral_request = 'Y'">
								<p>You are applying for a deferral. Please send no payment with this form.</p>
							</xsl:when>
							<xsl:when test="fee_details/fee_remission = 'Y' and fee_details/deferral_request = 'N'">
								<p>Please pay the remission processing fee of $590 using the Advance Payment Details for Drug Submissions and Master Files.</p>
							</xsl:when>
							<xsl:otherwise>
								<p>Please pay the remission processing fee of $590 using the Advance Payment Details for Drug Submissions and Master Files.</p>
							</xsl:otherwise>
							</xsl:choose>
								</div>
							</div>
							<xsl:if test="fee_details/submission_class/fee &lt; 10000 and (fee_details/deferral_request = 'N' or fee_details/fee_remission = 'Y')">
							<div class="col-xs-12">
								<h4>Please select all the payment methods you intend to use</h4>
							</div>
							<div class="col-xs-12">
					            <strong>
										<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/payment_method/bill_payment"/></xsl:call-template>
								<span style="font-weight:normal;" class="mouseHover">Bill Payment Service Option (preferred method)</span>&#160;&#160;</strong>
					            <strong>
										<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/payment_method/existing_credit"/></xsl:call-template>
								<span style="font-weight:normal;" class="mouseHover">Existing credit</span>&#160;&#160;</strong>
					            <strong>
										<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/payment_method/bank_wire"/></xsl:call-template>
								<span style="font-weight:normal;" class="mouseHover">Wire (include bank confirmation)</span></strong>
							</div>
							<div class="col-xs-12">
					            <strong>
										<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/payment_method/credit_card"/></xsl:call-template>
								<span style="font-weight:normal;" class="mouseHover">Mastercard / Visa / Amex / Visa Debit / JCB International</span>&#160;&#160;</strong>
					            <strong>
										<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/payment_method/cheque"/></xsl:call-template>
								<span style="font-weight:normal;" class="mouseHover">Cheque</span>&#160;&#160;</strong>
					            <strong>
										<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/payment_method/money_order"/></xsl:call-template>
								<span style="font-weight:normal;" class="mouseHover">Money Order</span>&#160;&#160;</strong>
					            <strong>
										<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="fee_details/payment_method/bank_draft"/></xsl:call-template>
								<span style="font-weight:normal;" class="mouseHover">International Bank Draft</span></strong>
							</div>
							</xsl:if>
						</div>
					</div>

				</div>
			</div>
			</xsl:if>
			
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Regulatory Activity Contact for THIS transaction</h2>
				</div>
				<div class="panel-body">
					<h4>Regulatory Activity Contact for THIS transaction</h4>
					<strong>A. Company Information: </strong>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<strong>Company Name (Full legal Name - no abbreviations)</strong>
							</div>
							<div class="col-xs-12">
								<span class="mouseHover"><xsl:apply-templates select="company_name" /> </span>
							</div>
						</div>
					</div>
					<strong>B. Address Information: </strong>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<strong class="col-xs-2">Street / Suite</strong>
								<span class="mouseHover"> <xsl:apply-templates select="regulatory_activity_address/street_address" /> </span>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<strong class="col-xs-2">City / Town </strong>
								<span class="mouseHover"> <xsl:apply-templates select="regulatory_activity_address/city" /> </span>
								<strong> &#160;&#160;Province&#160;&#160; </strong>
								<span class="mouseHover"> <xsl:choose><xsl:when test="(regulatory_activity_address/country/@id = 'CAN') or (regulatory_activity_address/country/@id = 'USA')"><xsl:value-of select="regulatory_activity_address/province_lov" /></xsl:when><xsl:otherwise><xsl:value-of select="regulatory_activity_address/province_text" /></xsl:otherwise></xsl:choose> </span>
								<strong> &#160;&#160;Country&#160;&#160; </strong>
								<span class="mouseHover"> 
								<xsl:choose>
								<xsl:when test="$language = 'fra'">
									<xsl:value-of select="regulatory_activity_address/country/@label_fr"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="regulatory_activity_address/country/@label_en"/>
								</xsl:otherwise>
								</xsl:choose>
								</span>
							</div>
							<div class="col-xs-12">
								<strong class="col-xs-2">Postal / ZIP Code </strong>
								<span class="mouseHover"> <xsl:apply-templates select="regulatory_activity_address/postal_code" /> </span>
							</div>
						</div>
					</div>
					<h4>C. Company Representative: </h4>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<strong class="col-xs-3"> Job Title&#160;&#160; 
								<span class="mouseHover" style="font-weight:normal;"> <xsl:apply-templates select="regulatory_activity_contact/job_title" /> </span></strong>
								<strong class="col-xs-3">&#160;</strong>
								<strong class="col-xs-4"> Language of Correspondance&#160;&#160; 
								<span class="mouseHover" style="font-weight:normal;"><xsl:value-of select="regulatory_activity_contact/language_correspondance"/></span></strong>
							</div>
							<div class="col-xs-12">
								<strong class="col-xs-3">First Name&#160;&#160;
								<span class="mouseHover" style="font-weight:normal;"> <xsl:value-of select="regulatory_activity_contact/given_name" /> </span> </strong>
								<strong class="col-xs-3"> Initials&#160;&#160;
								<span class="mouseHover" style="font-weight:normal;"> <xsl:value-of select="regulatory_activity_contact/initials" /> </span> </strong>
								<strong class="col-xs-3"> Last Name&#160;&#160;
								<span class="mouseHover" style="font-weight:normal;"> <xsl:value-of select="regulatory_activity_contact/surname" /> </span> </strong>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<strong style="width:50%; float:left;padding-left:15px;padding-right:15px;">Phone Number&#160;&#160;
								<span class="mouseHover" style="font-weight:normal;"> <xsl:value-of select="regulatory_activity_contact/phone_num" /> </span>&#160;&#160;
								Ext &#160;&#160;
								<span class="mouseHover" style="font-weight:normal;"> <xsl:value-of select="regulatory_activity_contact/phone_ext" /> </span> </strong>
								<strong class="col-xs-3">&#160;&#160;&#160;&#160;&#160;&#160;&#160;Fax Number&#160;&#160; 
								<span class="mouseHover" style="font-weight:normal;"> <xsl:value-of select="regulatory_activity_contact/fax_num" /> </span></strong>
							</div>
							<div class="col-xs-12">
								<strong class="col-xs-2">Email&#160;&#160;
								<span class="mouseHover" style="font-weight:normal;"> <xsl:value-of select="regulatory_activity_contact/email" /> </span></strong>
							</div>
						</div>
					</div>
					<div class="well well-sm" >
						<div class="row">
							<div class="col-xs-12">
								<strong>
										<xsl:call-template name="hp-checkbox"><xsl:with-param name="value" select="confirm_regulatory_contact"/></xsl:call-template>
								<span class="mouseHover">I confirm that the above regulatory activity contact information is  valid.</span></strong>
							</div>
						</div>
					</div>
					
				</div>		
			</div>
		</section>
	</xsl:template>
	<xsl:template name="YesNoUnknow">
		<xsl:param name="value" select="/.."/>
		<xsl:choose>
		<xsl:when test="$value = 'Y'">
			<xsl:value-of select="'Yes'"/>
		</xsl:when>
		<xsl:when test="$value = 'N'">
			<xsl:value-of select="'No'"/>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="'UNKNOWN'"/>
		</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="hp-checkbox">
		<xsl:param name="value" select="/.."/>
		<span class="c-checkbox">
		<xsl:choose>
			<xsl:when test="$value = 'Y'">
				X
			</xsl:when>
			<xsl:otherwise>
				&#160;&#160;
			</xsl:otherwise>
		</xsl:choose>
		</span>
	</xsl:template>
	<xsl:template name="CapitalFirstLetter">
		<xsl:param name="value" select="/.."/>
		<xsl:value-of select="translate(substring($value,1,1), $smallcase, $uppercase)"/>
		<xsl:value-of select="translate(substring($value,2), $uppercase, $smallcase)"/>
	</xsl:template>
	<xsl:template name="converter">
		<xsl:param name="value" select="/.."/>
		<xsl:choose>
			<xsl:when test=" 'en' = $value">
				<xsl:value-of select="'English'"/>
			</xsl:when>
			<xsl:when test=" 'fr' = $value">
				<xsl:value-of select="'French'"/>
			</xsl:when>
			<xsl:when test=" 'SALUT_MR' = $value">
				<xsl:value-of select="'Mr.'"/>
			</xsl:when>
			<xsl:when test=" 'SALUT_MS' = $value">
				<xsl:value-of select="'Ms.'"/>
			</xsl:when>
			<xsl:when test=" 'SALUT_DR' = $value">
				<xsl:value-of select="'Dr.'"/>
			</xsl:when>
			<xsl:when test=" 'SALUT_MRS' = $value">
				<xsl:value-of select="'Mrs.'"/>
			</xsl:when>
			<xsl:when test=" 'AB' = $value"><xsl:value-of select="'Alberta'"/></xsl:when>
			<xsl:when test=" 'BC' = $value"><xsl:value-of select="'British Columbia'"/></xsl:when>
			<xsl:when test=" 'MB' = $value"><xsl:value-of select="'Manitoba'"/></xsl:when>
			<xsl:when test=" 'NB' = $value"><xsl:value-of select="'New Brunswick'"/></xsl:when>
			<xsl:when test=" 'NL' = $value"><xsl:value-of select="'Newfoundland and Labrador'"/></xsl:when>
			<xsl:when test=" 'NT' = $value"><xsl:value-of select="'Northwest Territories'"/></xsl:when>
			<xsl:when test=" 'NS' = $value"><xsl:value-of select="'Nova Scotia'"/></xsl:when>
			<xsl:when test=" 'NU' = $value"><xsl:value-of select="'Nunavut'"/></xsl:when>
			<xsl:when test=" 'ON' = $value"><xsl:value-of select="'Ontario'"/></xsl:when>
			<xsl:when test=" 'PE' = $value"><xsl:value-of select="'Prince Edward Island'"/></xsl:when>
			<xsl:when test=" 'QC' = $value"><xsl:value-of select="'Quebec'"/></xsl:when>
			<xsl:when test=" 'SK' = $value"><xsl:value-of select="'Saskatchewan'"/></xsl:when>
			<xsl:when test=" 'YT' = $value"><xsl:value-of select="'Yukon'"/></xsl:when>
			<xsl:when test=" 'AL' = $value"><xsl:value-of select="'Alabama'"/></xsl:when>
			<xsl:when test=" 'AK' = $value"><xsl:value-of select="'Alaska'"/></xsl:when>
			<xsl:when test=" 'AZ' = $value"><xsl:value-of select="'Arizona'"/></xsl:when>
			<xsl:when test=" 'AR' = $value"><xsl:value-of select="'Arkansas'"/></xsl:when>
			<xsl:when test=" 'CA' = $value"><xsl:value-of select="'California'"/></xsl:when>
			<xsl:when test=" 'CO' = $value"><xsl:value-of select="'Colorado'"/></xsl:when>
			<xsl:when test=" 'CT' = $value"><xsl:value-of select="'Connecticut'"/></xsl:when>
			<xsl:when test=" 'DE' = $value"><xsl:value-of select="'Delaware'"/></xsl:when>
			<xsl:when test=" 'FL' = $value"><xsl:value-of select="'Florida'"/></xsl:when>
			<xsl:when test=" 'GA' = $value"><xsl:value-of select="'Georgia'"/></xsl:when>
			<xsl:when test=" 'HI' = $value"><xsl:value-of select="'Hawaii'"/></xsl:when>
			<xsl:when test=" 'ID' = $value"><xsl:value-of select="'Idaho'"/></xsl:when>
			<xsl:when test=" 'IL' = $value"><xsl:value-of select="'Illinois'"/></xsl:when>
			<xsl:when test=" 'IN' = $value"><xsl:value-of select="'Indiana'"/></xsl:when>
			<xsl:when test=" 'IA' = $value"><xsl:value-of select="'Iowa'"/></xsl:when>
			<xsl:when test=" 'KS' = $value"><xsl:value-of select="'Kansas'"/></xsl:when>
			<xsl:when test=" 'KY' = $value"><xsl:value-of select="'Kentucky'"/></xsl:when>
			<xsl:when test=" 'LA' = $value"><xsl:value-of select="'Louisiana'"/></xsl:when>
			<xsl:when test=" 'ME' = $value"><xsl:value-of select="'Maine'"/></xsl:when>
			<xsl:when test=" 'MD' = $value"><xsl:value-of select="'Maryland'"/></xsl:when>
			<xsl:when test=" 'MA' = $value"><xsl:value-of select="'Massachusetts'"/></xsl:when>
			<xsl:when test=" 'MI' = $value"><xsl:value-of select="'Michigan'"/></xsl:when>
			<xsl:when test=" 'MN' = $value"><xsl:value-of select="'Minnesota'"/></xsl:when>
			<xsl:when test=" 'MS' = $value"><xsl:value-of select="'Mississippi'"/></xsl:when>
			<xsl:when test=" 'MO' = $value"><xsl:value-of select="'Missouri'"/></xsl:when>
			<xsl:when test=" 'MT' = $value"><xsl:value-of select="'Montana'"/></xsl:when>
			<xsl:when test=" 'NE' = $value"><xsl:value-of select="'Nebraska'"/></xsl:when>
			<xsl:when test=" 'NV' = $value"><xsl:value-of select="'Nevada'"/></xsl:when>
			<xsl:when test=" 'NH' = $value"><xsl:value-of select="'New Hampshire'"/></xsl:when>
			<xsl:when test=" 'NJ' = $value"><xsl:value-of select="'New Jersey'"/></xsl:when>
			<xsl:when test=" 'NM' = $value"><xsl:value-of select="'New Mexico'"/></xsl:when>
			<xsl:when test=" 'NY' = $value"><xsl:value-of select="'New York'"/></xsl:when>
			<xsl:when test=" 'NC' = $value"><xsl:value-of select="'North Carolina'"/></xsl:when>
			<xsl:when test=" 'ND' = $value"><xsl:value-of select="'North Dakota'"/></xsl:when>
			<xsl:when test=" 'OH' = $value"><xsl:value-of select="'Ohio'"/></xsl:when>
			<xsl:when test=" 'OK' = $value"><xsl:value-of select="'Oklahoma'"/></xsl:when>
			<xsl:when test=" 'OR' = $value"><xsl:value-of select="'Oregon'"/></xsl:when>
			<xsl:when test=" 'PA' = $value"><xsl:value-of select="'Pennsylvania'"/></xsl:when>
			<xsl:when test=" 'RI' = $value"><xsl:value-of select="'Rhode Island'"/></xsl:when>
			<xsl:when test=" 'SC' = $value"><xsl:value-of select="'South Carolina'"/></xsl:when>
			<xsl:when test=" 'SD' = $value"><xsl:value-of select="'South Dakota'"/></xsl:when>
			<xsl:when test=" 'TN' = $value"><xsl:value-of select="'Tennessee'"/></xsl:when>
			<xsl:when test=" 'TX' = $value"><xsl:value-of select="'Texas'"/></xsl:when>
			<xsl:when test=" 'UT' = $value"><xsl:value-of select="'Utah'"/></xsl:when>
			<xsl:when test=" 'VT' = $value"><xsl:value-of select="'Vermont'"/></xsl:when>
			<xsl:when test=" 'VA' = $value"><xsl:value-of select="'Virginia'"/></xsl:when>
			<xsl:when test=" 'WA' = $value"><xsl:value-of select="'Washington'"/></xsl:when>
			<xsl:when test=" 'WV' = $value"><xsl:value-of select="'West Virginia'"/></xsl:when>
			<xsl:when test=" 'WI' = $value"><xsl:value-of select="'Wisconsin'"/></xsl:when>
			<xsl:when test=" 'WY' = $value"><xsl:value-of select="'Wyoming'"/></xsl:when>
			<xsl:when test="'ADDITIONAL_PRODUCT_CHGE' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">When the manufacturer wants to request an additional product name, for a previously approved product, that does not require a brand name or Look-Alike-Sound-Alike assessment.  (New DIN is issued)</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						Note: A new dossier ID maybe required. Contact Health Canada for more information (hc.eReview.sc@canada.ca).
						<p>On this form: Use existing company ID and dossier ID, unless a new dossier ID was assigned by Health Canada.</p>
					</div></div>
			</xsl:when>
			<xsl:when test="'PRODUCT_NAME_CHGE' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">A change to an existing product name, for a previously approved product, that does not require a brand name or Look-Alike-Sound-Alike assessment.</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						On the RA template: Use existing company ID and dossier ID.
					</div></div>
			</xsl:when>
			<xsl:when test="'OWNERSHIP_CHGE' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">When a manufacturer transfers the possession and responsibility for a product to another manufacturer. (DIN stays the same)</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						Note: Dossier ID will be transferred from the previous owner if all DINs within the dossier are being transferred. Alternatively, contact Health Canada for more information (eReview@canada.ca).
						<p>On this template: Use company ID for new owner and use existing dossier ID, unless a new dossier ID was assigned by Health Canada.</p>
					</div></div>
			</xsl:when>
			<xsl:when test="'LICENGSING' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">An agreement between two manufacturers whereby one manufacturer (licensor) supplies a drug product to another manufacturer (licensee) for sale under the second manufacturer's name.</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						Note: A new Dossier ID is required if the proposed product(s) are not previously approved (i.e. no dossier ID already exists).  Except in the cases of a replace source cross-licensing. Contact Health Canada for more information (eReview@canada.ca).
						<p>On the RA template: Use the company ID for new owner (licensee) and and use existing dossier ID, unless a new dossier ID was assigned by Health Canada.</p>
					</div></div>
			</xsl:when>
			<xsl:when test="'PRODUCT_MANUFACT_NAME_CHGE' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">A change to the manufacturer's name and the product name.</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						Note: An amended CO XML is required. A new company ID will be issued for the substantive name change.
						<p>On the RA template: Use new company ID (associated with new manufacturer's name) and existing dossier ID.</p>
					</div></div>
			</xsl:when>
			<xsl:when test="'MANUFACT_NAME_CHGE' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">A change to the manufacturer's name.</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						Note: An amended CO XML is required. A new company ID will be issued for the substantive name change.
						<p>On the RA template: Use new company ID (associated with new manufacturer's name) and existing dossier ID.</p>
					</div></div>
			</xsl:when>
			<xsl:when test="'MERGER' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">The combining of two or more manufacturers into one, through a purchase, acquisition, a pooling of interests, or purchase of controlling interest in one manufacturer by another manufacturer, in order to take over assets and/or operations.</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						Note: If merger/buyout resulted in a change in company name, an amended company enrolment is required. A new company ID will be issued. Dossier ID will remain the same as the dossier will be transferred from the previous owner to the new owner.
						<p>On this form: Use company ID for new owner and existing dossier ID.</p>
					</div></div>
			</xsl:when>
			<xsl:when test="'POSTAUTH_CHEMISTRY_CHGE' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">For schedule C and D products. Chemistry and Manufacturing information updates to match the Chemistry updates of the licensor.</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						On the RA template: Use existing company ID and dossier ID.
					</div></div>
			</xsl:when>
			<xsl:when test="'POSTAUTH_LABEL_CHGE' = $value">
					<div class="col-xs-12">
					<ul><li><span class="mouseHover">Label update (including but not limited to Product Monograph update, inner and outer label update) to match label updates of the licensor.</span></li></ul>
					</div>
					<div class="col-xs-12">
					<div class="alert alert-info">
						On the RA template: Use existing company ID and dossier ID.
					</div></div>
			</xsl:when>
		</xsl:choose>		
	</xsl:template>
	<xsl:template name="break">
	  <xsl:param name="text" select="string(.)"/>
	  <xsl:choose>
	    <xsl:when test="contains($text, '&#xa;')">
	      <xsl:value-of select="substring-before($text, '&#xa;')"/>
	      <br/>
	      <xsl:call-template name="break">
	        <xsl:with-param name="text" select="substring-after($text, '&#xa;')"/>
	      </xsl:call-template>
	    </xsl:when>
	    <xsl:otherwise>
	      <xsl:value-of select="$text"/>
	    </xsl:otherwise>
	  </xsl:choose>
	</xsl:template>
</xsl:transform><!-- Stylus Studio meta-information - (c) 2004-2009. Progress Software Corporation. All rights reserved.

<metaInformation>
	<scenarios>
		<scenario default="yes" name="Scenario1" userelativepaths="no" externalpreview="yes" url="file:///c:/Users/hcuser/Downloads/hcreprt-2019-06-07-1027.xml" htmlbaseurl="" outputurl="file:///c:/Users/SPM/test/TRANSACTION.html" processortype="saxon8"
		          useresolver="yes" profilemode="0" profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath=""
		          postprocessgeneratedext="" validateoutput="no" validator="internal" customvalidator="">
			<parameterValue name="cssFile" value="'file:///C:/Users/hcuser/git/XSLT/Pharma-Bio-REP/v_3_0/Style-Sheets/ip400-1.css'"/>
			<advancedProp name="sInitialMode" value=""/>
			<advancedProp name="schemaCache" value="||"/>
			<advancedProp name="bXsltOneIsOkay" value="true"/>
			<advancedProp name="bSchemaAware" value="true"/>
			<advancedProp name="bGenerateByteCode" value="true"/>
			<advancedProp name="bXml11" value="false"/>
			<advancedProp name="iValidation" value="0"/>
			<advancedProp name="bExtensions" value="true"/>
			<advancedProp name="iWhitespace" value="0"/>
			<advancedProp name="sInitialTemplate" value=""/>
			<advancedProp name="bTinyTree" value="true"/>
			<advancedProp name="xsltVersion" value="2.0"/>
			<advancedProp name="bWarnings" value="true"/>
			<advancedProp name="bUseDTD" value="false"/>
			<advancedProp name="iErrorHandling" value="fatal"/>
		</scenario>
	</scenarios>
	<MapperMetaTag>
		<MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/>
		<MapperBlockPosition></MapperBlockPosition>
		<TemplateContext></TemplateContext>
		<MapperFilter side="source"></MapperFilter>
	</MapperMetaTag>
</metaInformation>
-->