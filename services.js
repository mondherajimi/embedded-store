
JSON.stringify(jsonObj);
var	cguData = jsonObj;

JSON.stringify(jsonUserObj);
var	cguUserData = jsonUserObj;

var centralJson = null;
var categoryJson = null;
var imageJson = null;
var scroller = null;
var touchobj,starty,scrollerList=[],scrollerIdList=[],imageScroll;
var UPGRADE_IN_PROGRESS = "Upgrade in progress";
var DOWNLOAD_IN_PROGRESS = "Download in progress";

function closeApplication(){
	window.close();
}
function getAppsGroupedByCategory() {
	var index = 0;
	var appsListByCategory = [];
	var catList = this.getCategoryList();
	for (var i = 0; i < catList.length; i++) {
		var appListByCatId = this.getApplicationByCatId(catList[i].id);
		if (appListByCatId.length > 0) {
			appsListByCategory[index] = appListByCatId;
			index++;
		}
	}
	appsListByCategory.length = index;

	var finalList = [];
	for (var j = 0; j < appsListByCategory.length - 1; j++) {
		finalList[j] = appsListByCategory[j + 1];
	}
	finalList[appsListByCategory.length - 1] = appsListByCategory[0];
	
	return finalList;
}

function getApplicationsByStatus(subscriptionStatus) {
	return centralJson().filter({subscriptionStatus: subscriptionStatus}).get();
}

function getApplicationsByStatusOrderBy(subscriptionStatus, orderBy) {
	return centralJson().filter({subscriptionStatus: subscriptionStatus}).order(orderBy).get();
}

function getCategoryList() {
	return categoryJson().get();
}

function getApplicationByWaid( waid ) {
    return centralJson().filter({waid: waid}).get()[0];	
}

function getApplicationByCatId(catId) {
	var catName = this.getCategoryNameById(catId);
	return centralJson().filter({category: catName}).get();
}

function getApplicatonByDate(catName) {
	var catExist= centralJson().filter({category: catName}).count();
	var appExist= centralJson().filter({name: {likenocase: catName}}).count();
	if(catExist>0){return centralJson().filter({category: catName}).order("creationDate").get();}
	if(appExist>0){return centralJson().filter({name: {likenocase: catName}}).order("creationDate").get();}
}

function getApplicatonByPopularity(catName) {
	var catExist= centralJson().filter({category: catName}).count();
	var appExist= centralJson().filter({name: {likenocase: catName}}).count();
	if(catExist>0){return centralJson().filter({category: catName}).order("popularity").get();}
	if(appExist>0){return centralJson().filter({name: {likenocase: catName}}).order("popularity").get();}
}

function getApplicatonByCatName(catName) {
	var catExist= centralJson().filter({category: catName}).count();
	var appExist= centralJson().filter({name: {likenocase: catName}}).count();
	if(catExist>0){return centralJson().filter({category: catName}).order("name").get();}
	if(appExist>0){return centralJson().filter({name: {likenocase: catName}}).order("name").get();}
}

function getCategoryById(catId) {
	return categoryJson().filter({id: catId}).get()[0];
}

function getCategoryNameById(catId) {
	return this.getCategoryById(catId).name;
}

function getApplicatonByNameLike(appName) {
	return centralJson().filter({name: {likenocase: appName}}).get();
}

function getAppsCount() {
	return centralJson().count();
}

function openCGU(){
	var targetId = event.target.parentNode.id;
	if(targetId == "" || targetId == null){
		targetId = event.target.attributes.name.nodeValue;
	}
	//NEed to pass this id to get rendered in cgu page
		var cguPage = new CGUPageView();
		//showOtherPage();
		cguPage.setElement(document.getElementById('curtainCgu')).render(targetId);
		document.getElementById('curtainCgu').style.display ="block";
		document.getElementById("bottom").innerHTML="";
		var divHeight4=document.getElementById("curtainCgu").offsetHeight;
		scroller.maxScrollY = (divHeight4-300)*-1;
		scroller.scrollTo(0,0);
}
	
function openTerms(){
	var termsPage = new TermsPageView();
	showOtherPage();
	termsPage.setElement(document.getElementById('curtain')).render();
}
function openPrivacyPolicy(){
	var policyPage = new PolicyPageView();
	showOtherPage();
	policyPage.setElement(document.getElementById('curtain')).render();
}

function openHelp(){
	scroller.maxScrollY = (90) *-1;
	scroller.scrollTo(0,0);
	showOtherPage();
	React.renderComponent(new ReactHelpDialog(), document.getElementById('curtain'));
	//var helpPage = new HelpPageView();
	//showOtherPage();
//	helpPage.setElement(document.getElementById('curtain')).render();
}

function loadFooter(){
	React.renderComponent(new ReactPageFooter(), document.getElementById('footer-content'));
}
function rejectCGU(){
//If event is null then try to read from button source // fialover
var appId = event.target.name;
if("" == appId && null != document.getElementById("cguPopupButton")){
	appId = document.getElementById("cguPopupButton").name;
}
var cgupersist = "CGU_ACCEPTED_"+appId;
localStorage.setItem(cgupersist, false);
updateCheckBox(false);
toggleCheckBox();
closeCGUPage();
}

function acceptCGU(){
//If event is null then try to read from button source // fialover
var appId = event.target.name;
var cgupersist = "CGU_ACCEPTED_"+appId;
if(localStorage.getItem(cgupersist) == "true")return;
if("" == appId && null != document.getElementById("cguPopupButton")){
	appId = document.getElementById("cguPopupButton").name;
}
localStorage.setItem(cgupersist, true);
updateCheckBox(true);
toggleCheckBox();
closeCGUPage();
}

function saveSettingsPassword(){
	localStorage.passwordBoxDisplayed = true;
	localStorage.appStorePassword = document.getElementById("appStorePassword").value;
	localStorage.appStorePassPhrase = document.getElementById("appStorePassPhrase").value;
	localStorage.appStorePassPhraseAnswer = document.getElementById("appStorePassPhraseAnswer").value;
	document.getElementById("savePassword").setAttribute("disabled","disabled");
	document.getElementById("savePassword").className = "loginBtn login-disable-btn";
	openHomePage();
}

function toggleCheckBox(){
var checkBoxElem = document.getElementById("cguCheck");
if(null == checkBoxElem)
	return;

		if(checkBoxElem.checked){
			document.getElementById("cguPopupButton").removeAttribute("disabled");
			document.getElementById("cguPopupButton").setAttribute("class","popup-btn");
		}
		else{
			document.getElementById("cguPopupButton").setAttribute("class","popup-btn  login-disable-btn");
			document.getElementById("cguPopupButton").setAttribute("disabled","disabled");
			
		}
}
	
function updateCheckBox(updatedValue){
	var checkBoxElem = document.getElementById("cguCheck");
	if(null == checkBoxElem)
		return;
	checkBoxElem.checked = updatedValue;
}

function closeCGUPage(){
	removeCguHeader();
	removeCguBody();
	//resetScroller(750);
	scroller.maxScrollY = ((divHeight1+divHeight2+divHeight3)-140)*-1;
	scroller.scrollTo(0,0);
}
function removeCguHeader(){
	var cguH = document.getElementById('cguHeader');
	if(cguH)
		document.getElementById('head_panel').removeChild(cguH);
}

function removeCguBody(){
	var cguB = document.getElementById('curtainCgu');
	if(cguB)
		cguB.innerHTML = "";
}
function showHomePage(){
	localStorage.myAppCount = getApplicationsByStatus("NOTINSTALLED").length + getApplicationsByStatus("INSTALLED").length;
	localStorage.myMessagesCount = Math.floor(Math.random()*22);
	document.getElementById("totalAppCount").innerText = parseInt(localStorage.myAppCount) + parseInt(localStorage.myMessagesCount);
	removeCguHeader();
	removeCguBody();
	document.getElementById('curtain').className = "page-panel2";
	document.getElementById('backdrop').className = "page-panel1";
	document.getElementById('curtain-myapps').className = "page-panel2";
	document.getElementById("scrollerDiv").className = 'body_panel';
	scroller.hasVerticalScroll=true;
	//scroller.maxScrollY = (totalMyAppsLength*11.36 ) *-1;
	scroller.maxScrollY = (divHeight8+25) *-1;
	scroller.scrollTo(0,0);
}

function resetScroller(maxYValue){
	//scroller.maxScrollY = ((document.body.scrollHeight) *-1) - maxYValue;
	divHeight5=document.getElementById("settingContainer").offsetHeight;
	scroller.maxScrollY = (maxYValue-50)*-1;
	scroller.scrollTo(0,0);
}
function showOtherPage(){
	document.getElementById('backdrop').className = "page-panel2";
	document.getElementById('curtain').className = "page-panel1";
	document.getElementById('curtain-myapps').className = "page-panel2";
}
var loadMyAppsFromMemory = false;
function showMyAppsPage(){
	document.getElementById('backdrop').className = "page-panel2";
	document.getElementById('curtain').className = "page-panel2";
	document.getElementById('curtain-myapps').className = "page-panel1";
	//scroller.maxScrollY = (totalMyAppsLength*100+250) *-1;
	divHeight7=document.getElementById("myAppContainer").offsetHeight;
	scroller.maxScrollY = (divHeight7-135) *-1;
	scroller.scrollTo(0,0);
}

function getImageData(objId){
	
	return imageJson({id:objId}).get()[0].data;
}
var scrollerStopped = true;
var startYInitial = 0;
function startScrolling(){
scrollerStopped = false;
}
function stopScrolling(){
startYInitial = new Date().getTime();
scrollerStopped = true;
}
var hScrolling = false
function startHScrolling(){
hScrolling = true;
}
function stopHScrolling(){
hScrolling = false;
}
function closeDialog(){
		scroller.hasVerticalScroll=true;
		scroller.maxScrollY = scrollerOffsetPrevious;
		document.getElementById("overlay-dialog").style.display = 'none';
		document.getElementById("dialogHolder").innerHTML = "";
	}
function ajaxCall(){
  $.ajax({
            type: 'POST',
            url: "http://localhost:8081/ws-server/cgudata",
            data: {},
			 headers : { 'Access-Control-Allow-Headers': 'Content-Type, x-xsrf-token'},
            success: function(data) {
            alert(data);
              },
              error: function(){
              alert("error");
              }
           });

}

function showCatApps(){
	sortLink = "sortLink1";
	searchParam = event.target.id;
	document.getElementById("overlay").style.display = 'none';
	document.getElementById("panelHolder").innerHTML = "";
	categoryAppsView = new CategoryAppsView(event.target.id);
	if(document.getElementById('cguHeader'))
	{
		document.getElementById('cguHeader').innerHTML ="";	
	}
	showOtherPage();
	categoryAppsView.setElement(document.getElementById('curtain')).render();
	}
function openRatingPopup(){
		document.getElementById("overlay-rating").style.display = 'block';
		var appId = event.target.attributes.name.nodeValue;
		React.renderComponent(new ReactRatingDialog({item:event.target.id, appId:appId}), document.getElementById('ratingHolder'));
	}
function closeRating(){
	document.getElementById("overlay-rating").style.display = 'none';
	document.getElementById("ratingHolder").innerHTML = "";
}
var ratingCount = 0;
function setRating(){
		document.getElementById("displayMsg").innerText = "Thank you!";
		var id = (event.target.id).split(" ");
		var appId = event.target.parentNode.attributes.name.nodeValue;
		id = id[0];
		ratingCount = id;
		var valid = false;
		var item;
		for(var i = 0; i < rates.length; i++)
		{
			item = rates[i];
			item.isRated = false;
			if(item.id <= id)
			{
				item.isRated = true;
				valid = true;
			}
			if(item.isRated)
				document.getElementById(item.id + " yes").className = "fa fa-star rate-entry-no";
			else
				document.getElementById(item.id + " yes").className = "fa fa-star-o rate-entry-yes";
		}
		handleButtonEnable(valid, document.getElementById("setRating_" + appId), saveRatingCount);
	}

	function saveRatingCount(){
		var appId = (event.target.id).split("_")[1];
		var itemName = event.target.attributes.name.nodeValue;
		var ratingPersist = "RATING_"+appId;
		localStorage.setItem(ratingPersist, ratingCount);
		var child = document.getElementById(itemName);
		child.parentNode.removeChild(child);	
		var obj = document.getElementById("ratingCont" + appId);
		obj.className = "visibile";
		document.getElementById("ratingDiv" + appId).className = "my-rating app-rating-stars-" + ratingCount.toString();
		closeRating();
	}
function openSettings(){
	localStorage.setItem(loginChange, true);
	document.getElementById("overlay").style.display = 'none';
	document.getElementById("panelHolder").innerHTML = "";
	var settingPage = new SettingsPageView();
	showOtherPage();
	settingPage.setElement(document.getElementById('curtain')).render();
    //Store the Confimation Message Object ...	
	confirmMessage = document.getElementById('confirmMessage');
	pwdRuleMessage = document.getElementById('pwdRuleMessage');
	}
function openLoginPage(){
	var loginPage = new LoginPageView();
	loginPage.render();
}
function openHomePage(){
	homePageView = new HomePageView();
	homePageView.render();
}

function forgotPasswordDone()
{
	if(document.getElementById('passPhraseAnswer').value == localStorage.appStorePassPhraseAnswer)
	{
		localStorage.forgotPassword = "true";
		openLoadingPage();//openHomePage();
		openSettings();
	}
	else
	{
		openLoginPage();
	}
}

function validatePassword(pass1, pass2)
{
	//Set the colors we will be using ...
	var valid = false;
	if(pass1.value != ""){
		pwdRuleMessage.innerText = "";
		if(pass1.value == pass2.value){
			//The passwords match. 
			//Set the color to the good color and inform
			//the user that they have entered the correct password 
			pass2.style.backgroundColor = goodColor;
			confirmMessage.innerText = "";
			valid = true;
		}
		else{
			if(pass2.value != "")
			{
				pass2.style.backgroundColor = badColor;
				confirmMessage.style.color = badColor;
				confirmMessage.innerText = "Passwords Do Not Match!"
				valid = false;
			}
		}
		 if(pass1.value.length < 6) {
			pwdRuleMessage.style.color = badColor;
			pwdRuleMessage.innerText = "Password must contain at least six characters!"
			valid = false;
		  }
		  re = /[0-9]/;
		  if(!re.test(pass1.value)) {
			pwdRuleMessage.style.color = badColor;
			pwdRuleMessage.innerText = "password must contain at least one number (0-9)!";
			valid = false;
		  }
		  re = /[a-z]/;
		  if(!re.test(pass1.value)) {
			pwdRuleMessage.style.color = badColor;
			pwdRuleMessage.innerText = "password must contain at least one lowercase letter (a-z)!";
			valid = false;
		  }
		  re = /[A-Z]/;
		  if(!re.test(pass1.value)) {
			pwdRuleMessage.style.color = badColor;
			pwdRuleMessage.innerText = "password must contain at least one uppercase letter (A-Z)!";
			valid = false;
		  }
	}
	else
		valid = false;
	return valid;
}
function validateSettingPagePassword()
{
	if(event.target.id=="appStorePassword"){scroller.scrollTo(0,-60);}
	//if(event.target.id=="appStoreRepeatPassword"){scroller.scrollTo(0,-230);}
	if(event.target.id=="appStorePassPhraseAnswer"){scroller.scrollTo(0,-330);}
	
	validPass = validatePassword(document.getElementById('appStorePassword'), document.getElementById('appStoreRepeatPassword'));
	var validAns = false;
	//var goodBorderColor = "#ddd";
	//var badBorderColor = "#ff6666";
	var answer = document.getElementById('appStorePassPhraseAnswer');
	if(answer.value != "")
	{
		//answer.style.borderColor = goodBorderColor;
		validAns = true;
	}
	else
	{
		//answer.style.borderColor = badBorderColor;
		//answer.focus();
		validAns = false;
	}
	
	if(localStorage.getItem(loginChange) == "true"){
	     handleButtonEnable((validPass && validAns), document.getElementById("savePassword"), saveSettingsPassword);}
	else{handleButtonEnable((validPass && validAns), document.getElementById("signUpButton"), saveSettingsPassword);}
}
function handleButtonEnable(checkValue, btn, eventListenerFn){
	console.log(localStorage.getItem(loginChange));
	if(checkValue != "" || checkValue)
	{
		btn.removeAttribute("disabled");
		if(localStorage.getItem(loginChange) == "false"){btn.className = "loginBtn0";}else{btn.className = "loginBtn";}
		btn.addEventListener("click", eventListenerFn);
	}
	else
	{
		btn.setAttribute("disabled","disabled");
		if(localStorage.getItem(loginChange) == "false"){btn.className = "loginBtnHide";}else{btn.className = "loginBtn login-disable-btn";}
		btn.removeEventListener(eventListenerFn);
	}
}

function disableFirstLaunch(){
	localStorage.setItem("FIRST_LAUNCH_COMPLETE", true);
}

function installApp() {
	var id = event.target.id;
	var appId = (event.target.id).split("_")[1];
	setAppDetailsInfo(appId, "download", true);

	document.getElementById(id).innerHTML = DOWNLOAD_IN_PROGRESS;
	document.getElementById(id).className = "download-app-text";
}
function updateApp() {
	var id = event.target.id;
	var appId = (event.target.id).split("_")[1];
	setAppDetailsInfo(appId, "update", true);

	document.getElementById(id).innerHTML = UPGRADE_IN_PROGRESS;
	document.getElementById(id).className = "download-app-text";
}
function viewAppDetailsPage(event) {
	if(hScrolling == false){
    var target=event.target.id.replace('_ic','');
	tham.appInfos( target, getAppDescriptioncallBack);
	}
}
function getAppDescriptioncallBack( status, dataObj)
{
	packageSize = dataObj.response.details.packageSize
	publicationDate = dataObj.response.details.publicationDate;
	longDescription = dataObj.response.details.longDescription;
    sc_list = dataObj.response.details.screenshots.split(",");
	for(var i = 0; i < sc_list.length; i++){if(sc_list[i]==""){sc_list.splice(i,1);}}
    console.log(sc_list);
	
	console.log("scrollerStopped "+scrollerStopped+"  hscroll "+hScrolling);
	if(scrollerStopped == false || hScrolling == true){
		scrollerStopped = true; hScrolling=false;
		return;
	}
		var targetId = (dataObj.response.shortDescription.waid);
		 appDetailPageView = new AppDetailView(targetId);
		 showOtherPage();
		 appDetailPageView.setElement(document.getElementById('curtain')).render();
}
function getAppDescription2callBack( status, dataObj)
{
sc_list = dataObj.response.details.screenshots.split(",");
}
function getImageIconApp( objId , resourceId )
{
	//if(objId!=="IconApp"){objId=objId.substring(1,0);}
	// alert("objId: "+objId+"   resourceId: "+resourceId);
	tham.resources( resourceId, getImageIconAppcallBack, objId );
}
function getImageIconAppcallBack( status, dataObj, imgId )
{
	//if(dataObj.meta.code==0){
	//if(imgId!=="IconApp"){document.getElementById(imgId+"_ic").src = dataObj.response.payload;}
	//else{
		document.getElementById(imgId+"_ic").src = dataObj.response.payload;
	//	}
	//}else{document.getElementById(imgId).src = dataIc0.response.payload;}
}
function getOneImageIconApp( objId , resourceId )
{
	tham.resources( resourceId, getOneImageIconAppcallBack, objId );
}
function getOneImageIconAppcallBack( status, dataObj, imgId )
{
	document.getElementById("IconApp").src = dataObj.response.payload;
}
function getImageScreenShotApp( objId , resourceId)
{
	tham.resourcesDetails( resourceId, getImageScreenShotAppcallBack, objId );
	img_id ++; img_sc ++;
}

function getImageScreenShotAppcallBack( status, dataObj, imgId)
{
	document.getElementById(imgId).src = dataObj.response.payload;
	tab_src.push(dataObj.response.payload);
}
function getSearchImageIconApp( objId , resourceId )
{
	tham.resources( resourceId, getSearchImageIconAppcallBack, objId );
}
function getSearchImageIconAppcallBack( status, dataObj, imgId )
{
	document.getElementById(imgId).src = dataObj.response.payload;
}
/*function getAppDetailsInfo(appId){
	if(localStorage["appDetailsInfo"] === "undefined" || (localStorage.appDetailsInfo === undefined))
		return;
	var appDetailsInfo = JSON.parse(localStorage["appDetailsInfo"]);
	for(var i = 0; i < appDetailsInfo.length; i++)
	{
		if(appDetailsInfo[i].appId == appId)
		{
			return appDetailsInfo[i];
		}
	}
	return;
}*/
var appDetailsJson = null;
function getAppDetailsInfo(appId) {
	if(appDetailsJson)
		return appDetailsJson().filter({appId: appId.toString()}).get()[0];
}

function setAppDetailsInfo(appId, option, value){
	 var appDetailsObj = getAppDetailsInfo(appId);
	 if(!appDetailsObj)
	 {
		appDetailsObj = {"appId":appId, "download":false, "update":false};
		appDetailsJson.insert(appDetailsObj);
	 }
		appDetailsJson({appId : appId.toString()}).update(function() {
												        this[option] = value;
												        return this;
												    });
	if(checkIfAllAppsDownloaded())
	{
		setButtonStatus("downloadAllBtn", DOWNLOAD_IN_PROGRESS);
	}
	if(checkIfAllAppsUpdated())
	{
		setButtonStatus("updateAllBtn", UPGRADE_IN_PROGRESS);
	}
}

function setButtonStatus(btn, txt)
{
	document.getElementById(btn).innerText = txt;
	document.getElementById(btn).className = "download-all-text";
}
function checkIfAllAppsDownloaded() {
	var downloadArr = appDetailsJson().filter({download:true}).get();
	localStorage["downloadAppCount"] = downloadApps.length - downloadArr.length;
	if(document.getElementById('downloadAppCount'))
		document.getElementById('downloadAppCount').innerHTML = localStorage["downloadAppCount"];
	if((downloadArr && downloadApps) && (downloadArr.length == downloadApps.length))
		return true;
	else
		return false;
}
function checkIfAllAppsUpdated() {
	var updateArr = appDetailsJson().filter({update:true}).get();
	localStorage["updateAppCount"] = installedApps.length - updateArr.length;
	if(document.getElementById('updateAppCount'))
		document.getElementById('updateAppCount').innerHTML = localStorage["updateAppCount"];
	if((updateArr && installedApps) && (updateArr.length == installedApps.length))
		return true;
	else
		return false;
}

var categoryItem = null;
var Router = Backbone.Router.extend({
    jsonObj: null,
    centralJson: null,
    categoryJson: null,
	imageJson: null,
    catApp: null,
    view3: null,
	totalApps: null,
    appJSON: null,
    statusMsg: null,
    menu: null,
    itid: null,
	item : null,
    /***********************************/
	
	
	
  initialize: function() {
	    centralJson = TAFFY();
	categoryJson = TAFFY();
	imageJson = TAFFY();
	imageJson.insert(images);  
   
},


  routes : {
    "" : "homePage"
  },
  homePage : function() {	
  var firstLaunchComplete = (localStorage.getItem("FIRST_LAUNCH_COMPLETE") == "true");
	  if (firstLaunchComplete){
		if(localStorage.passwordBoxDisplayed == "true")	//if password access is set, launch login page
		{
			openLoginPage();
		}
		else
		{
			openLoadingPage();//setTimeout(openHomePage,600);//
		}
	 }
	 else{
		var firstLaunchView = new FirstLaunchView();
		firstLaunchView.render();
	 }
  }
});

function catalogDispo( status, dataObj )
{
	appDetailJSON = dataObj;
	
	if(!appDetailsJson)
	{
		appDetailsJson = TAFFY();
	}
	appDetailsJson.store("appDetails_json");
	
	if (centralJson().count() == 0) {
		centralJson.insert(appDetailJSON.response.appsList);
		categoryJson.insert(categoryDetailJSON);
	} 
	if(centralJson().filter({category: "Business Tool"}).count() > 12){
		centralJson().filter({category: "Business Tool"}).limit(12).remove();
	}
		if(null == categoryItem)
		{
			categoryItem = getAppsGroupedByCategory();
	
		}
		
	localStorage.myAppCount = getApplicationsByStatus("NOTINSTALLED").length + getApplicationsByStatus("INSTALLED").length;
	
}
