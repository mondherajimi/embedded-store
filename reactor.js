/*
* REACT COMPONENTS for Home Page
**/
var loginChange;
var sortLink = "sortLink1";
var searchParam;
var confirmMessage;
var pwdRuleMessage;
var alertMessage;
var img_id=1111;
var img_sc=0;
var target_sc;
var tab_src=[];

var ReactItem = React.createClass({displayName: 'ReactItem',
    render: function() {
       
        var item = this.props.item;
	
       return (
	   
            React.DOM.li({id:"", className:"app-category-listli"}, React.DOM.div( {className:"app-category-item", id:item.waid, onClick:viewAppDetailsPage}, 
			React.DOM.div({id:item.waid, className:"app-icon-container"}, 
			//React.DOM.img({id:item.waid, src:getImageData("img/app/ic" + "\_" + item.icon +".jpg"), width:"60", height:"60", alt:""})),
			React.DOM.img({id:item.waid+"_ic", src:getImageIconApp(item.waid, item.icon), width:"60", height:"60", alt:""})),
			React.DOM.p({id:"", className:"app-name"}, 
			React.DOM.b({id:""}, item.name)),
			React.DOM.p({id:"", className:"app-name app-name-category"}, item.category),
			React.DOM.div({id:"", className:"app-rating app-rating-stars-"+item.globalRate}),
			React.DOM.p({id:"", className:"app-price"}, 
			React.DOM.span({id:""}, item.pricing), React.DOM.sup({id:item.waid}, item.commission + ''))))
        );
    }
});

var ReactCategoryHeaderItem = React.createClass({displayName: 'ReactCategoryHeaderItem',
    render: function() {
       
        var item = this.props.item;
         
       return (
           React.DOM.div({className:"app_sction_header"}, React.DOM.div({className:"title-head-bar"}),
		   React.DOM.div({className:"app_section_title"}, 'Latest ', React.DOM.b(null, item.category)),
		   React.DOM.div({className:"app-seeAll"}, React.DOM.a({id:item.category, onClick:this.openSeeAllApp}, React.DOM.i({className:"fa fa-chevron-circle-right"}), 'See all')))
        );
    },
	
	openSeeAllApp: function(event){
		sortLink = "sortLink1";
		searchParam = event.currentTarget.id;
		categoryAppsView = new CategoryAppsView(event.currentTarget.id);
		showOtherPage();
		categoryAppsView.setElement(document.getElementById('curtain')).render();
	}
});
var ReactAppsCategoryList = React.createClass({displayName: 'ReactAppsCategoryList',
    render: function() {
			var item = this.props.item;
		    var currentCatIndex = this.props.indx;
	
		    //var id = "scroller"+item.waid;
			var id = "scroller"+currentCatIndex;
			scrollerIdList.push(id);
			
            return (
			React.DOM.div({className:"app_category"},
                ReactCategoryHeaderItem( {item:item[0]}),
				React.DOM.span(null,
				React.DOM.div({className:"app-category-container"},React.DOM.div({id:id},React.DOM.div({},
				React.DOM.ul({className:"app-category-list", id:"app-cat" + currentCatIndex})))))
				)
            );
        return (
            React.DOM.div(null, rows)
        );
    }
});
	
var ReactPageHeader = React.createClass({displayName: 'ReactPageHeader',
    render: function() {
	var totalAppCount = parseInt(localStorage.myAppCount) + parseInt(localStorage.myMessagesCount);
       return (
				React.DOM.header({className:"head_panel"}, 
					React.DOM.div({className:"button-container", id:"htmlpanel"},
						React.DOM.div({className:"app-count",id:'totalAppCount'}, totalAppCount),
						React.DOM.input({type:"button", className:"head_btn_search", id:"search-btn", onClick:this.toggleLeftModalHandler}),
						React.DOM.a({id:"logoClick", className:"head_btn_logo"}),
						React.DOM.input({type:"button", className:"head_btn_user", id:"head-user-btn", onClick:this.toggleRightModalHandler})
				),React.DOM.div({id:"overlay",className:"overlay",onClick:this.closeModal}),React.DOM.div({id:"panelHolder"}),
				React.DOM.div({id:"overlay-rating",className:"overlay",onClick:closeRating}),React.DOM.div({className:"rate-dialog", id:"ratingHolder"}))
        );
    },
	toggleRightModalHandler: function(){
	document.getElementById("webmailContainer").style.display="none";
	//document.getElementById("panelHolder").style.display="none";
	document.getElementById("overlay").style.display = 'block';
	var panelView = new PanelView();
	panelView.render();
	//document.getElementById("panelHolder").style.display="block";

	},
	toggleLeftModalHandler: function(){
	document.getElementById("overlay").style.display = 'block';
	//document.getElementById("panelHolder").style.display="none";
	var panelView = new PanelRightView();
	panelView.render();
	//document.getElementById("panelHolder").style.display="block";

	},
	closeModal: function(){
		document.getElementById("overlay").style.display = 'none';
		document.getElementById("panelHolder").innerHTML = "";
	}
	
	
});

var ReactPageCarousel = React.createClass({displayName: 'ReactPageCarousel',
    render: function() {
       return (
				React.DOM.img({className:"carouselImage", id:"carouselImage", 
				src: getImageData("img/c1.jpg"), onLoad:this.checkImageLoad})
				
        );
    },
	checkImageLoad:function(){
		cardsView.setElement( document.getElementById('cardsContainer')).render();
	}
});

var ReactPageFooter = React.createClass({displayName: 'ReactPageFooter',
	render:function(){
		return (
					React.DOM.footer(null,
					React.DOM.div({className:"app-cat-divider"}, 
						React.DOM.div({className:"circle-ic"}, React.DOM.i({className:"fa fa-circle footer-icon-circle"})),
						React.DOM.div({className:"divider-bar"}),
						React.DOM.div(null, React.DOM.i({className:"fa fa-circle footer-icon-circle"}))),
					React.DOM.ul({id:"footer-nav"},                	
						React.DOM.li(null, React.DOM.a({onClick:openTerms}, 'Terms & Conditions')),
						React.DOM.li(null, React.DOM.a({onClick:openPrivacyPolicy}, 'Privacy Policy')),
						React.DOM.li(null, React.DOM.a(null, 'Contact us')),
						React.DOM.li(null, React.DOM.a({onClick:openHelp}, 'Help'))),                            
					React.DOM.div({className:"footer-brand"}))
		);
	}
});


/*
* View COMPONENTS for Home Page
**/
 var cardsView = null;
 var carouselView = null;
 var homePageView = null;
 var divHeight8;
 localStorage.myAppCount = 10;//getApplicationsByStatus("NOTINSTALLED").length + getApplicationsByStatus("INSTALLED").length;
 localStorage.myMessagesCount = 12;

 var HomePageView = Backbone.View.extend({
  el: 'body',
  template: '<div><header class="head_panel" id="head_panel"></header>'+
				'<div class="terminal">'+
					'<iframe class="webmailContainer" src="Webmail/inbox.html" id="webmailContainer"></iframe>'+
					'<div id="mainContent" class="body_panel">'+
						'<div id="scrollerDiv">'+
							'<div id="backdrop" class="page-panel1">'+
								'<div class="carousel-container" id="carouselContainer"></div>'+
								'<div id="cardsContainer" class="cards-container"></div>'+
								'<div id="footer-content-home" class="footer-container"></div>'+
							'</div>'+
							'<div id="curtainCgu" class="cgupanel">'+
							'</div>'+
							'<div id="curtain" class="page-panel2">'+
								'<div id="footer-content" class="footer-container"></div>'+
							'</div>'+
							'<div id="curtain-myapps" class="page-panel2">'+
								'<div id="footer-content-myapps" class="footer-container"></div>'+
							'</div>'+								
						'<div>'+
					'</div>'+
				'</div>'+
			'</div>',
   initialize: function () {
		this.headerView = new HeaderView();
		carouselView = new CarouselView();
		this.render = _.wrap(this.render, function(render) {
				this.loadHeaderContent();
				render();						
				this.afterRender();
			});							
    },
	events: {
        'click #logoClick': 'viewHomePage'
    },
	viewHomePage: function () {
		document.getElementById("webmailContainer").style.display="none";
		showHomePage();
    },
	  render: function() {
		carouselView.render();
	    return this;
	  },
		afterRender: function () {
        if(scroller != null){
				try{
				scroller.destroy();
				}catch(e){}
				scroller = null;
			}
			scroller = new IScroll('#mainContent', {shrinkScrollbars: 'clip', bounce:false, scrollX: false, scrollY: true, 
						useTransition:false, bindToWrapper: true, disableMouse: false,  momentum: true, deceleration: 0.0008,
						bounceTime: 300, probeType: 1, tap:false, fadeScrollbars: false,  HWCompositing: true, disablePointer: true});
			scroller.on('scrollStart', startScrolling);
			scroller.on('scrollEnd', stopScrolling);
			scroller.hasVerticalScroll = true;
			
		    divHeight8=document.getElementById("cardsContainer").offsetHeight;
	        scroller.maxScrollY = (divHeight8+25) *-1;
			scroller.scrollTo(0,0);			
		},
		loadHeaderContent:function(){
			this.$el.html(this.template);
			
			//scroller.maxScrollY = (totalMyAppsLength*11.36 ) *-1;
			
			this.headerView.render();
	}
});

var HeaderView = Backbone.View.extend({   	
	render: function() {
			React.renderComponent(new ReactPageHeader(), document.getElementById('head_panel'));
        return this;
    }
});
var CarouselView = Backbone.View.extend({   
	initialize: function () {
        cardsView = new CardsView();
    },
	render: function() {
			React.renderComponent(new ReactPageCarousel(), document.getElementById('carouselContainer'));
			item = categoryItem;
			categoryView = new CategoryView();		
    }
});
var categoryView = null;
var CardsView = Backbone.View.extend({   
	/*events: {
       'click .app-category-item': 'viewAppDetailsPage'
    },*/
	
	render: function() {
			item = categoryItem;
			categoryView.render(0);
			React.renderComponent(new ReactPageFooter(), document.getElementById('footer-content-home'));
			this.afterRender();
        return this;
    },
	afterRender: function(){
		for(var i = 0 ; i< scrollerIdList.length;i++){
			var scrollHorizontal = new IScroll("#"+scrollerIdList[i], {shrinkScrollbars: 'clip', bounce:false, scrollX: true, scrollY: false, 
						useTransition:false, bindToWrapper: true, disableMouse: false,  momentum: true, deceleration: 0.0008,
						bounceTime: 300, probeType: 1, HWCompositing: true, disablePointer: true, disableTouch: true});
			scrollHorizontal.hasHorizontalScroll=true;
			scrollHorizontal.maxScrollX = (categoryItem[i].length*26)*-1;
			scrollHorizontal.on('scrollStart', startHScrolling);
			scrollHorizontal.on('scrollEnd', stopHScrolling);
			if(categoryItem[i].length<=3){
				scrollHorizontal.destroy();
			}
			scrollerList.push(scrollHorizontal);
		}
		
	}
});
var hpCard = null;
var CategoryView = Backbone.View.extend({   
	initialize: function() {
		scrollerIdList=[],scrollerList=[];
		var cardsCont = document.getElementById('cardsContainer');
		 for(var j = 0; j < categoryItem.length; j++)
			 {
				 var divi = document.createElement('div');
				 divi.className = 'app_category_placeholder';
				 divi.id ='category-container' + j;
				 cardsCont.appendChild(divi);
				 var spanEle = document.createElement('span');
				 spanEle.innerHTML = "Loading " + categoryItem[j][0].category;
				 spanEle.className = 'cat_placeholder_loading_txt';
				 divi.appendChild(spanEle);
				 
				document.getElementById('category-container' + j).className = '';
				
				React.renderComponent(new ReactAppsCategoryList({item:categoryItem[j], indx:j}), document.getElementById('category-container' + j));
				hpCard = new HPAppItemView(categoryItem[j], j);
			 }
			return this;
	},
	render: function(catIndex) {		 
		if(catIndex < categoryItem.length)
		{
			for(var i = 0; i < categoryItem[catIndex].length; i++)
			{
				hpCard.render(categoryItem[catIndex][i], catIndex, i);
			}
			catIndex++;
			//render the next category 
			categoryView.render(catIndex);
		}	
		return this;
    }
});
var HPAppItemView = Backbone.View.extend({   
	initialize: function(item, currentCatIndex) {
		 for(var j = 0; j < item.length; j++)
		 {
			 var divi = document.createElement('div');
		     divi.className = 'app-category-item';
		     divi.id ='app-category-item' + currentCatIndex + j;
			 var spanEle = document.createElement('span');
			// spanEle.innerHTML = "Loading...";
			 spanEle.className = 'loading_txt_hp_card';
		     document.getElementById('app-cat' + currentCatIndex).appendChild(divi);
			 divi.appendChild(spanEle);
		 }
	},
	render: function(appItem, catIndex, cardIndex) {		 
		var ele = document.getElementById('app-category-item' + catIndex + cardIndex);
		ele.className = "";
		React.renderComponent(new ReactItem({item:appItem}), ele);
	return this;
    }
});


/******************************App Details Page*****************************/
/*
* REACT COMPONENTS for App Details Page
**/
var ReactADInfoContainer = React.createClass({displayName: 'ReactADInfoContainer',
    render: function() {
       
        var item = this.props.app;
		var index = parseInt(this.props.index); 
		var buyThisApp = "BUY THIS APP";
		if(getApplicationByWaid(String(item.waid)).subscriptionStatus== "SUBSCRIBED"){
			buyThisApp = "Install in progress";
		}
		 
       return (
	   
	   React.DOM.div(null,
				React.DOM.div({className:"app-info-container"}, 
					React.DOM.section({className:"container"},
						React.DOM.div({className:"left app-details-img-cont-header"}, 
						//React.DOM.img({src:"img/app/ic" + "\_" + item.icon +".jpg", width:"60", height:"60", alt:"Ingenico", className:"app-details-img-header", onLoad:this.loadAppDetailsImg})),
						  React.DOM.img({id:"IconApp", src:getOneImageIconApp("IconApp", item.icon), width:"60", height:"60", alt:"Ingenico", className:"app-details-img-header", onLoad:this.loadAppDetailsImg})),
						React.DOM.div({className:"left app-details-header-cont, app-details-header-right"}, 
							React.DOM.div({className:"app-details-title-container"},
							    React.DOM.p({className:"app-details-header-title"}, item.name, React.DOM.br(null), React.DOM.span({className:"app-info"}, item.category))),
							React.DOM.div(null, React.DOM.div({className:"app-info-black"}, item.creator), 
												React.DOM.div({className:"app-details-app-seeAll"}, React.DOM.i({className:"fa fa-chevron-circle-right"}), "See details")),
							
							React.DOM.div({className:"container app-details-header-cont"}, 
								React.DOM.div({className:"left acc-user-rating-header"}, React.DOM.div(null, item.globalRate, React.DOM.span({className:"app-rating-info-header"}, item.nbRate)),
									React.DOM.div({className:"app-rating app-rating-stars-"+item.globalRate})),
								React.DOM.div({className:"right acc-download-header-right"}, React.DOM.div(null, item.nbDownload), 
									React.DOM.div({className:"app-details-app-seeAll acc-download-link"}, React.DOM.i({className:"fa fa-download"}, "Download"))),
								React.DOM.div({className:"center vertical-divider-header"}))
								))),
								
				React.DOM.div({className:"buy-app-container"}, 
					React.DOM.div({className:"container"}, 
						React.DOM.div({className:"left buy-app-sale-price-cont-left"}, 
							React.DOM.div({className:"buy-app-sale-price"},
								React.DOM.p({className:"app-details-app-price"},item.pricing, React.DOM.sup({className:"app-details-sup-price"}),//, item.commission
								React.DOM.sub({className:"app-details-sup-price"}, "")), React.DOM.a({className:"buy-app-sale-price-link"}, "SALE PRICE"))),
								
						React.DOM.div({className:"right buy-app-sale-price-cont-right"}, 
							React.DOM.div({className:"buy-app-sale-price-comm"},
								React.DOM.p({className:"app-details-app-price"}, item.commission, React.DOM.sup({className:"app-details-sup-price"}, "")),
								React.DOM.a({className:"buy-app-sale-price-link"}, "YOUR COMMISSION"))),
								
						React.DOM.div({className:"center buy-app-diverder-bar"})
					),
						React.DOM.div({className:"buy-app-commission"}),
						
						React.DOM.div({className:"buy-app-btn-container"}, React.DOM.div(null, 
							React.DOM.a( null, React.DOM.button( {id:"buy-app-btn", className:"buy-app-btn", onClick:this.getLicenseData, name:item.waid}, buyThisApp))))
							),React.DOM.div({id:"overlay-dialog",className:"overlay",onClick:closeDialog}),React.DOM.div({className:"dialog", id:"dialogHolder"})
			)
        );
    },
	loadAppDetailsImg:function(){
		appDetailItemView.setElement(document.getElementById('appDetailImgContainer')).render();
	},
	getLicenseData: function(){
		//ajaxCall();
		if(getApplicationByWaid(String(event.target.name)).subscriptionStatus== "SUBSCRIBED"){
			return;
		}
		scroller.scrollTo(0,0);
		scrollerOffsetPrevious = scroller.maxScrollY;
		scroller.maxScrollY=0;
		document.getElementById("overlay-dialog").style.display = 'block';
		React.renderComponent(new ReactDialog({waid:event.target.name}), document.getElementById('dialogHolder'));
		
		var cguAccepted = "CGU_ACCEPTED_"+event.target.name;
		cguAccepted = (localStorage.getItem(cguAccepted) == "true");
		
		if(cguAccepted){
			document.getElementById("cguPopupButton").removeAttribute("disabled");
			document.getElementById("cguCheck").checked=true;
		}
		else{
			document.getElementById("cguPopupButton").setAttribute("disabled","disabled");
			document.getElementById("cguCheck").checked=false;
			document.getElementById("cguPopupButton").setAttribute("class","popup-btn  login-disable-btn");
		}
		
		
	}
});

var scrollerOffsetPrevious = 0;
var ReactADAccContent = React.createClass({displayName: 'ReactADAccContent',
    render: function() {
	var item = this.props.scope;
       return (
				 React.DOM.div(null, React.DOM.div({className:"panel panel-default ng-isolate-scope"},
						React.DOM.div({className:"panel-heading"},
						   React.DOM.h4({className:"panel-title"},
							 React.DOM.a({className:"accordion-toggle"}, "Description")))),
					 React.DOM.div({className:"panel-collapse collapse in"},
						React.DOM.div({className:"panel-body"},
						   React.DOM.h6({className:"acc-content-header"},
							  React.DOM.b(null, item.shortDescription)),
						   React.DOM.div({className:"container app-user-rating-main-container"},
							  React.DOM.div({className:"left"},
								 React.DOM.div({className:"acc-content-rating"},
									React.DOM.h6({className:"acc-content-header"},
									  React.DOM.b(null," Users rating")),
									React.DOM.div({className:"acc-user-rating"},
									   React.DOM.h1(null, item.globalRate),
									   React.DOM.div({className:"app-rating app-rating-stars-"+item.globalRate}),
									   React.DOM.div({className:"app-rating-info"}, item.nbRate)))),
							  React.DOM.div({className:"center"},
								 React.DOM.ul({className:"app-user-rating-container"}))),
						   React.DOM.a({className:"app-details-cgu-heading", onClick:openCGU} , React.DOM.h4({id: item.waid}, "CGU", React.DOM.i({className:"fa fa-chevron-right app-details-cgu-link"})))
						)),
						 React.DOM.div({className:"app-details-acc-content"},
							React.DOM.div({className:"panel panel-default ng-isolate-scope"},
							   React.DOM.div({className:"panel-heading"},
								  React.DOM.h4({className:"panel-title"},
									 React.DOM.a({className:"accordion-toggle"}," Business Information")))),
							React.DOM.div({className:"panel-collapse collapse in"},
							   React.DOM.div({className:"panel-body"},
								  //React.DOM.div({id:"businessInfo"}, item.longDescription))),
								   React.DOM.div({id:"businessInfo"}, longDescription))),
							React.DOM.div({className:"panel panel-default ng-isolate-scope"},
							   React.DOM.div({className:"panel-heading"},
								  React.DOM.h4({className:"panel-title"},
									 React.DOM.a({className:"accordion-toggle "}, "Editor Information"))),
							   React.DOM.div({className:"panel-collapse collapse in"},
								  React.DOM.div({className:"panel-body"},
										React.DOM.h6({className:"acc-content-header"}, React.DOM.b(null,"Editor: "), item.editorInformation),
										React.DOM.h6({className:"acc-content-header"}, React.DOM.b(null,"Category: "), item.category),
										React.DOM.h6({className:"acc-content-header"}, React.DOM.b(null,"Publish: "), publicationDate),
										React.DOM.h6({className:"acc-content-header"}, React.DOM.b(null,"Updated: "), "Oct 12, 2014"),
										React.DOM.h6({className:"acc-content-header"}, React.DOM.b(null,"Version: "), item.version),
										React.DOM.h6({className:"acc-content-header"}, React.DOM.b(null,"Size: "), packageSize),
										React.DOM.h6({className:"acc-content-header"}, React.DOM.b(null,"Compatibility: "), "Requires Telium 3.0 or later"))))))
						
        );
    }
});

var ReactADImgList = React.createClass({displayName: 'ReactADImgList',
    render: function() {
	  var scope = this.props.scope;
	  //var items = scope.screenshots;
	    //alert(JSON.stringify(item.response.appsList, null, 4));
		  img_id=1111;
          img_sc=0;
        var rows = _.map(sc_list, function(item) {
            return (
			React.DOM.li(null,
			React.DOM.div({className:"app-details-img-container"},
				//React.DOM.div(null,  React.DOM.img({src:getImageData("img/app/sc" + "\_" + item +".jpg"), width:"150", height:"260", alt:""}) )
                  React.DOM.div(null,  React.DOM.img({id:img_id, src:getImageScreenShotApp(img_id, sc_list[img_sc]), width:"150", height:"260", alt:"",onClick:openScreenShot}) )	
				))
	   );
        });
		
        return (
            React.DOM.div(null, rows)
        );
    }
});

function openScreenShot(){
	if(hScrolling == false && scrollerStopped == true){
	    if(target_sc!=event.target.src){target_sc=event.target.src;}
		document.getElementById("overlay").style.display = 'block';
		React.renderComponent(new ReactScreenShotPanel(), document.getElementById('panelHolder'));
}
}
var ReactScreenShotPanel = React.createClass({displayName: 'ReactScreenShotPanel',
    render: function() {
       return (		
		React.DOM.div({className:"screen_shot_panel", title:"Click To Next ScreenShot"},
		React.DOM.img({src:target_sc, width:"230", height:"400", alt:"", onClick:navigateScreenShot}))				
        );
    }	
});

function navigateScreenShot(){
	    target_sc=event.target.src;
		for(var i = 0; i < tab_src.length; i++){
			if(tab_src[i]==target_sc){
				target_sc=tab_src[i+1];
				
				if(i==tab_src.length-1){target_sc=tab_src[0];}
				break;
			}
		}
		React.renderComponent(new ReactScreenShotPanel(), document.getElementById('panelHolder'));
}
/*
* View COMPONENTS for App Details Page
**/
var appDetailPageView = null;
var appDetailItemView = null;
var appDetailsObj = null;

var AppDetailView = Backbone.View.extend({ 
	template:'<div>'+
				'<div class="appDetailContainer" id="appDetailContainer"></div>'+
				'<div id="appDetailImgContainer" class="appDetailImgContainer"></div>'+
				'<div id="footer-content" class="footer-container"></div>'+
			'</div>',
	initialize: function (targetId) {
		removeCguHeader();
		removeCguBody();
        appDetailItemView = new AppDetailItemView(targetId);
		var waid = targetId;
		appDetailsObj = getApplicationByWaid(String(waid));
		document.getElementById("scrollerDiv").className = 'body_panel_white';
    },
	render: function() {			
			this.$el.html(this.template);
			React.renderComponent(new ReactADInfoContainer({app:appDetailsObj}), document.getElementById('appDetailContainer'));
			loadFooter();
			//scroller.maxScrollY = (document.body.scrollHeight+900) *-1;

			return this;
    }
});
var divHeight1, divHeight2, divHeight3;

var AppDetailItemView = Backbone.View.extend({   
	template:'<div id="appDetailItemView" class="appDetailItemView">'+
				'<ul id="appDetailImgList" class="app-details-img-list"></ul>'+
				'<div id="appDetailDescription" class="appDetailDescription-container"></div>'+
			 '</div>',
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactADImgList({scope:appDetailsObj}), document.getElementById('appDetailImgList'));
			React.renderComponent(new ReactADAccContent({scope:appDetailsObj}), document.getElementById('appDetailDescription'));
			//var divi = document.getElementById('businessInfo');
			//divi.innerHTML = appDetailsObj.longDescription;
		/*if(imageScroll){
			imageScroll.destroy();
			imageScroll = null;
		}*/
		imageScroll = new IScroll("#appDetailImgList", {shrinkScrollbars: 'clip', bounce:false, scrollX: true, scrollY: false, 
		useTransition: false, bindToWrapper: true,disableMouse: false,  momentum: true, deceleration: 0.0008,
		bounceTime: 300, probeType: 1,  HWCompositing: true, disablePointer: true, disableTouch: true});
		imageScroll.hasHorizontalScroll=true;
		//var lengthImage = appDetailsObj.screenshots;
		var lengthImage = sc_list;
		if(lengthImage != null && lengthImage.length > 1){
		//lengthImage = lengthImage.length;
		imageScroll.maxScrollX = (lengthImage.length*105)*-1;
		imageScroll.on('scrollStart', startHScrolling);
		imageScroll.on('scrollEnd', stopHScrolling);
		scroller.on('scrollStart', startScrolling);
		scroller.on('scrollEnd', stopScrolling);
		}else{
			lengthImage = 0;
			imageScroll.destroy();
			imageScroll = null;
		}
		//scrollerList.push(imageScroll);
divHeight1 = document.getElementById('appDetailContainer').offsetHeight;
divHeight2 = document.getElementById('appDetailDescription').offsetHeight;
divHeight3 = document.getElementById('footer-content').offsetHeight;

			scroller.maxScrollY = ((divHeight1+divHeight2+divHeight3)-140)*-1;
			scroller.scrollTo(0,0);		
		return this;
    },
});

/***********************************************Category/Search Result Page**************************************/
/*
* REACT COMPONENTS for Search Result Page
**/
var divHeight;
var ReactCatAppItem = React.createClass({displayName: 'ReactCatAppItem',
    render: function() {
       
        var item = this.props.item;
		var index = parseInt(this.props.index);
       return (
	   
	             React.DOM.div({id:item.waid,onClick:viewAppDetails},
					React.DOM.div({className:"app_details-icon"},
						React.DOM.a(null,
						//React.DOM.img({id:index, src:getImageData("img/app/ic" + "\_" + item.icon +".jpg"), width:"60", height:"60", alt:"", onLoad:this.loadNextCategoryApp}))),
						React.DOM.img({id:index+"_ic_search", src:getSearchImageIconApp(index+"_ic_search", item.icon), width:"60", height:"60", alt:"", onLoad:this.loadNextCategoryApp}))),
					React.DOM.div({className:"app_details-Appname"},
							React.DOM.p({id:item.waid, className:"app-name", onClick:viewAppDetails},
								React.DOM.b({id:item.waid}, item.name)) ,
							React.DOM.p({className:"app-name app-name-category"}, item.category),
							React.DOM.div({className:"app-rating app-rating-stars-"+item.globalRate})),
					React.DOM.div({className:"search-result-divider"}),
					React.DOM.div({className:"search-result-price"},
						React.DOM.p({className:"app-price"}, 
							React.DOM.b(null, item.pricing, React.DOM.sup({className:"sup-price"}, '.' , item.commission ,''))),
						React.DOM.span({id:item.waid, className:"app-seeAll"},
							React.DOM.a({id:item.waid, className:"app-seeAll", onClick:viewAppDetails}, 
							React.DOM.i({id:item.waid, className:"fa fa-chevron-circle-right"}), 'See'))
							))
        );
    },
	
	loadNextCategoryApp: function(event){
	var nextIndexToLoad = parseInt(event.target.id) + 1;
	var isLoad = !(nextIndexToLoad % noOfItemsToLoad);
	if(isLoad)
	{
		if(nextIndexToLoad < catAppsObj.length)
		{
			categoryAppItemView.render(nextIndexToLoad);
		}else{
		scroller.hasVerticalScroll = true;
        var obj = document.getElementById('search-result-main-container');
        divHeight=obj.offsetHeight;

		scroller.maxScrollY = (divHeight-48) *-1;
	}
	}
	}//,
	
});

function viewAppDetails  (event) {
	var timeDiff = new Date().getTime()  - startYInitial;
	console.log(timeDiff);
	if(scrollerStopped == false || timeDiff < 20){
		scrollerStopped = true;
		return;
	}
		var targetId = event.currentTarget.id;
		 appDetailPageView = new AppDetailView(targetId);
		 showOtherPage();
		 appDetailPageView.setElement(document.getElementById('curtain')).render();
    }
	
var ReactCatAppsHeader = React.createClass({displayName: 'ReactCatAppsHeader',
    render: function() {
       
	  var scope = this.props.item;
	  //var searchParam = this.props.searchParam;
      var items = scope;
            return (
				React.DOM.section(null,
				React.DOM.div({className:"search-result_sction_header"},
				React.DOM.div({className:"search-result_title-head-bar"}),
				React.DOM.div({className:"search-result_section_title"},
					searchParam + " : " , React.DOM.span({className:"search-result_apps_title"}, React.DOM.b(null, items.length, 'app(s)')))),
				
				React.DOM.div({id:"searchNavcontainer"}, React.DOM.ul(null,
				React.DOM.li(null, React.DOM.a({ id:"sortLink1", className:"active", onClick: this.sortApps}, 'New |'),
				React.DOM.a({ id:"sortLink2", className:"none", onClick: this.sortApps}, 'Best download |'), React.DOM.a({ id:"sortLink3", className:"none", onClick: this.sortApps}, 'Name')))),
				
				React.DOM.div({className:"search-result-main-container", id:"search-result-main-container"})
				)
				
            );
        return (
            React.DOM.div(null, rows)
        );
    },
	sortApps: function(){
		
    sortLink=event.target.id;
	
	//document.getElementById("overlay").style.display = 'none';
	//document.getElementById("panelHolder").innerHTML = "";
	categoryAppsView = new CategoryAppsView(searchParam);
	/*if(document.getElementById('cguHeader'))
	{
		document.getElementById('cguHeader').innerHTML ="";	
	}*/
	//showOtherPage();
	categoryAppsView.setElement(document.getElementById('curtain')).render();
	
	document.getElementById("sortLink1").className="none";
	document.getElementById("sortLink2").className="none";
	document.getElementById("sortLink3").className="none";
	document.getElementById(sortLink).className="active";
	}
});

/*
* View COMPONENTS for Search Result Page
**/
var catAppsObj = null;
var categoryAppsView = null;
var categoryAppItemView = null;

var CategoryAppsView = Backbone.View.extend({   
	template:'<div>'+
				'<div class="categoryAppContainer" id="categoryAppContainer"></div>'+
				'<div id="footer-content" class="footer-container"></div>'+
			'</div>',
	initialize: function (searchParam) {
		var catAppsObjOri;
		removeCguHeader();
		removeCguBody();
		if (sortLink=="sortLink1"){catAppsObjOri = getApplicatonByDate(searchParam);}
		if (sortLink=="sortLink2"){catAppsObjOri = getApplicatonByPopularity(searchParam);}
		if (sortLink=="sortLink3"){catAppsObjOri = getApplicatonByCatName(searchParam);}
		catAppsObj = [];
        
			for(i = 0; i < catAppsObjOri.length; i++)
			{
				catAppsObj.push(catAppsObjOri[i]);
			}
 
		document.getElementById("scrollerDiv").className = 'body_panel';		
    },
	render: function() {	
			this.$el.html(this.template);
			React.renderComponent(new ReactCatAppsHeader({item:catAppsObj, searchParam:catAppsObj[0].category}), document.getElementById('categoryAppContainer'));
			categoryAppItemView = new CategoryAppItemView();		
			categoryAppItemView.setElement(document.getElementById('search-result-main-container')).render('0');
			loadFooter();
			scroller.hasHorizontalScroll=true;
			//scroller.maxScrollY = (catAppsObj.length*100) *-1;
			scroller.scrollTo(0,0);

			return this;
    }
});

var nxtItemToLoad = null,noOfItemsToLoad=1;
var CategoryAppItemView = Backbone.View.extend({   
	initialize: function() {
		 for(var j = 0; j < catAppsObj.length; j++)
		 {
			 var divi = document.createElement('div');
		     divi.className = 'search-result-container';
		     divi.id ='search-result-container' + j;
			 var spanEle = document.createElement('span');
			 spanEle.innerHTML = "Loading...";
			 spanEle.className = 'loading_txt';
		     document.getElementById('search-result-main-container').appendChild(divi);
			 divi.appendChild(spanEle);
		 }
	},
	render: function(index) {		 
		nxtItemToLoad = parseInt(index);	
		for(var i = 0; i < noOfItemsToLoad; i++)
		{
			var indx = (nxtItemToLoad + i);
			if(indx < catAppsObj.length)
			{
				React.renderComponent(new ReactCatAppItem({item:catAppsObj[indx], index:indx}), document.getElementById('search-result-container' + indx));
			}else{
			
				document.getElementById('search-result-main-container').setAttribute("class","search-result-main-container search-result-noresult");
				document.getElementById('search-result-main-container').innerText = "Not Found !";
		        document.getElementById("searchNavcontainer").style.display = 'none';
				//scroller.hasVerticalScroll = true;
				scroller.maxScrollY = -43;
				scroller.scrollTo(0,0);
			}
		}
	return this;
    }
});


/*************************CGU Page*********************************************/
/*
* REACT COMPONENTS for CGU Page
**/
var ReactCGUContent = React.createClass({displayName: 'ReactCGUContent',
    render: function() {
		var appId = this.props.itemId;
		var cguUserMoreData = cguUserData.slice();
		//for(var i = 3; i < 30; i++)
		//{
		//	var indx = i % 3;
		//	cguUserMoreData.push(cguUserData[indx]);
		//}
	
	var cgupersist = "CGU_ACCEPTED_"+appId;
	var cguStatus = localStorage.getItem(cgupersist);
	var cguLabel = "Reject";

       return (
	   
            React.DOM.section({className:"cgu-container", id:"top"},
				React.DOM.div({className:"cgu-terms-title"},
					'TERMS AND CONDITIONS'),
				React.DOM.div(null,	'Last Updated: October 7, 2014'),
				React.DOM.div(null,
					React.DOM.h2({className:"cgu-terms-title"},
						React.DOM.div({className:"cgu-head-circle"},
							React.DOM.div({className:"cgu-title-part"}, 'PART1:')),
						React.DOM.div({className:"cgu-sub-title"}, 'BOOKING SERVICE TERMS')),
					
					React.DOM.ol(null, ReactCGUItem({scope:cguData}))),
				React.DOM.div(null,
					React.DOM.h2({className:"cgu-terms-title"},
						React.DOM.div({className:"cgu-head-circle"},
							React.DOM.div({className:"cgu-title-part"}, 'PART2:USER TERMS'))),
						
					React.DOM.div({className:"cgu-content"}, React.DOM.p(null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,'+
					'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'+
						'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '+
						'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '+
						'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')),
					React.DOM.ol(null,
						 ReactCGUItem({scope:cguUserMoreData})
					))  ,
				
				React.DOM.section({id:"bottom", className:"container cgu-btn"},
					React.DOM.div({className:"left", onClick: this.viewAppDetail}, React.DOM.button({onClick:rejectCGU, id:"cguRejectBtn", className:"loginBtn cgu-btn-ok", name:appId}, cguLabel)),
					React.DOM.div({className:"right", onClick: this.viewAppDetail}, React.DOM.button({onClick:acceptCGU, id:"cguAcceptBtn",className:"loginBtn", name:appId}, 'Accept'))))

        );
    },
	viewAppDetail: function(){
	}
});
var ReactCGUItem = React.createClass({displayName: 'ReactCGUItem',
    render: function() {
	  var items = this.props.scope;      
      var rows = _.map(items, function(item) {
            return (
                React.DOM.li(null,
					React.DOM.h3({className:"cgu-terms-title"}, item.heading),
					React.DOM.p(null, item.content))
            );
        });

        return (
            React.DOM.div(null, rows)
        );
    }
});

var ReactCGUHeader = React.createClass({displayName: 'ReactCGUHeader',
   render: function() {
            return (
                React.DOM.section({className:"cgu-header-container"},
				React.DOM.span({className:"closeBtn", onClick:this.viewAppDetail},
					React.DOM.a(null, React.DOM.i({className:"fa fa-times fa-2x login-close-btn", onClick:closeCGUPage}))),
				
					 React.DOM.div({className:"cgu_sction_header"},
						React.DOM.div({className:"cgu-title-head-bar"}),
						React.DOM.div({className:"cgu_section_title"}, 'CGU')),
					
					React.DOM.div({id:"cguNavcontainer"},
						React.DOM.ul(null,
							React.DOM.li(null,
								React.DOM.a({onClick:this.scrollToStart}, 'Start of CGU |'),
								
								React.DOM.a({onClick:this.scrollToEnd}, 'End of CGU')))))
            );
        return (
            React.DOM.div(null, rows)
        );
    },
	scrollToEnd:function(){
		scroller.scrollToElement(document.getElementById('bottom'));
	},
	scrollToStart:function(){
		scroller.scrollTo(0,0);
	},
	viewAppDetail:function(){
	}
});
	
/*
* View COMPONENTS for  CGU Page
**/
var CGUPageView = Backbone.View.extend({   
	template:'<div>'+
				'<div class="cguContainer" id="cguContainer"></div>'+
			'</div>',
	initialize: function () {
		var myNode = document.getElementById("scrollerDiv");
		myNode.className = 'body_panel_white';
		var cguDiv = document.createElement('div');
		cguDiv.id = 'cguHeader';
		document.getElementById('head_panel').appendChild(cguDiv);
    },
	render: function(waid) {
			this.$el.html(this.template);
			React.renderComponent(new ReactCGUContent({itemId:waid}), document.getElementById('cguContainer'));
			React.renderComponent(new ReactCGUHeader(), document.getElementById('cguHeader'));
			
			var cgupersist = "CGU_ACCEPTED_"+waid;
			var cguStatus = localStorage.getItem(cgupersist);
			
			if(cguStatus == "true"){
				document.getElementById("cguAcceptBtn").setAttribute("class","loginBtn cgu-btn-ok");
				document.getElementById("cguRejectBtn").setAttribute("class","loginBtn");
			}else{
				document.getElementById("cguAcceptBtn").setAttribute("class","loginBtn");
				document.getElementById("cguRejectBtn").setAttribute("class","loginBtn  cgu-btn-ok");
			}
			if(getApplicationByWaid(String(waid)).subscriptionStatus=="SUBSCRIBED"){
				document.getElementById("bottom").innerHTML="";
			}
			
			return this;
    }
});


var PanelView = Backbone.View.extend({   	
	render: function() {
			React.renderComponent(new ReactRightPanel(), document.getElementById('panelHolder'));
			document.getElementById("myAppCount").innerText = parseInt(localStorage.myAppCount);
			document.getElementById("myMessagesCount").innerText = parseInt(localStorage.myMessagesCount);

        return this;
    }
});

var ReactRightPanel = React.createClass({displayName: 'ReactRightPanel',
    render: function() {
       return (
				React.DOM.div({className:"side_panel_right"},
		React.DOM.div({className:"right-panal-title"},'Welcome Restaurant LG'),                   
		React.DOM.ul(null,
			React.DOM.li({onClick:this.openMyApps},React.DOM.div({className:"rpanal-myapps-icon"},React.DOM.span({id:"myAppCount"},localStorage.myAppCount),React.DOM.div({className:"app-count-rightpanal"})),'My Apps'),
			React.DOM.li({onClick:this.openAccounts},React.DOM.div({className:"rpanal-myacc-icon"}),'My Account'),
			React.DOM.li({onClick:openSettings},React.DOM.div({className:"rpanal-setting-icon"}),'Settings'),
			React.DOM.li({onClick:this.openMyMessages},React.DOM.div({className:"rpanal-myapps-icon"},React.DOM.span({id:"myMessagesCount"},localStorage.myMessagesCount),React.DOM.div({className:"app-count-rightpanal"})),'My Messages'),
			React.DOM.li( {className:"logout", onClick:closeApplication},'Exit')))	
        );
    },
	checkImageLoad:function(){
		
	},
	/*openHomePage:function(){
		document.getElementById("overlay").style.display = 'none';
		document.getElementById("panelHolder").innerHTML = "";
		//homePageView = new HomePageView();
		//homePageView.render();	
		showHomePage();
		scroller.hasVerticalScroll = true;
	},*/
	openAccounts:function(){
		document.getElementById("overlay").style.display = 'none';
		document.getElementById("panelHolder").innerHTML = "";
		var accountPage = new MyAccountPageView();
		showOtherPage();
		accountPage.setElement(document.getElementById('curtain')).render();
	},
	openMyApps: function(){
		document.getElementById("overlay").style.display = 'none';
		document.getElementById("panelHolder").innerHTML = "";
		
		if(!loadMyAppsFromMemory)
		{
			var appPage = new MyAppPageView();
			appPage.setElement(document.getElementById('curtain-myapps')).render();
		}
		showMyAppsPage();
	},
	openMyMessages:function(){
		document.getElementById("overlay").style.display = 'none';
		document.getElementById("panelHolder").innerHTML = "";
		document.getElementById("webmailContainer").style.display="block";
	}
});


var SidePanelLeftView = React.createClass({displayName: 'SidePanelLeftView',
    render: function() {
 var scope = this.props.scope;
       var items = getAppsGroupedByCategory();
		
        var rows = _.map(items, function(item) {
            return (
			React.DOM.li({id:item[0].category,onClick:showCatApps}, React.DOM.i({id:item[0].category,className:"fa fa-circle"}),
			React.DOM.span({id:item[0].category},item[0].category))
            );
        });
        return (
            React.DOM.div(null, rows)
        );
		scroller.hasHorizontalScroll = true;
    }
});

var ReactLeftPanel = React.createClass({displayName: 'ReactLeftPanel',
    render: function() {
       return (
				
		React.DOM.div({className:"side_panel_left"},
		React.DOM.div({className:"left-panal-title"},'Categories'),
		React.DOM.ul({className:"panel-category-list"}, SidePanelLeftView({scope:""}) ),
		React.DOM.div({className:"sidebar-search"},	React.DOM.input({type:"text",id:"search",placeholder:"Search by Name"}),
			React.DOM.input({type:"button", className:"sidebar-search-icon",id:"search-btn",onClick:this.showResultPage})
		))				
        );
    },
	showResultPage:function(){
		console.log("scrollerStopped "+scrollerStopped+"  hscroll "+hScrolling);
		scroller.hasHorizontalScroll=true;
	if(scrollerStopped == false || hScrolling == true){
		scrollerStopped = true; hScrolling=false;
		return;
	}
	
		//var searchParam = document.getElementById("search").value;
		searchParam = document.getElementById("search").value;
		if(searchParam == null) return;
		document.getElementById("overlay").style.display = 'none';
		document.getElementById("panelHolder").innerHTML = "";
		searchView = new SearchResultView(searchParam);
		showOtherPage();
		searchView.setElement(document.getElementById('curtain')).render();
		scroller.hasHorizontalScroll=true;
	}
});

var PanelRightView = Backbone.View.extend({   	
	render: function() {
			React.renderComponent(new ReactLeftPanel(), document.getElementById('panelHolder'));
        return this;
    }
});

var searchTerm = null;
var SearchResultView = Backbone.View.extend({   
	template:'<div>'+
				'<div class="searchAppContainer" id="searchAppContainer"></div>'+
				'<div id="footer-content" class="footer-container"></div>'+
			'</div>',
	initialize: function (searchParam) {
	searchTerm = searchParam;
		var catAppsObjOri = getApplicatonByNameLike(searchParam);
		catAppsObj = [];

			for(i = 0; i < catAppsObjOri.length; i++)
			{
				catAppsObj.push(catAppsObjOri[i]);
			}
			
		var myNode = document.getElementById("scrollerDiv");
		myNode.className = 'body_panel';
		removeCguHeader();
		removeCguBody();
    },
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactCatAppsHeader({item:catAppsObj,searchParam:searchTerm}), document.getElementById('searchAppContainer'));
			categoryAppItemView = new CategoryAppItemView();		
			categoryAppItemView.setElement(document.getElementById('search-result-main-container')).render('0');
			loadFooter();	
			//scroller.hasVerticalScroll = true;
			//scroller.maxScrollY = (catAppsObj.length*100+370) *-1;
			//scroller.scrollTo(0,0);
			return this;
    }
});

var divHeight5;
var SettingsPageView = Backbone.View.extend({  
	template:'<div>'+
				'<div class="settingContainer" id="settingContainer"></div>'+
				'<div id="footer-content" class="footer-container"></div>'+
			'</div>', 
	initialize: function () {
		removeCguHeader();
		removeCguBody();
		document.getElementById("scrollerDiv").className = 'body_panel_white';
    },
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactSettingsPage(), document.getElementById('settingContainer'));
			loadFooter();
			
			//setting default value to appStorePassPhraseAnswer
			var appStorePasswordAnswer = document.getElementById('appStorePassPhraseAnswer');
			if(appStorePasswordAnswer){
				setCibulCalendar('appStorePassPhraseAnswer', {range:false});
				document.getElementById('appStorePassPhraseAnswer').addEventListener("change", validateSettingPagePassword);
				document.getElementById('appStorePassPhraseAnswer').addEventListener("click", validateSettingPagePassword);
			}
			
			if(localStorage.appStorePassword === undefined || localStorage.appStorePassword == "")
			{
				localStorage.appStorePassword = "";
				localStorage.appStorePassPhrase = "";
				localStorage.appStorePassword = "";
				localStorage.appStorePassPhraseAnswer = "";
			}
			else
			{
				document.getElementById("appStoreRepeatPassword").value = localStorage.appStorePassword;
				document.getElementById("appStorePassword").value = localStorage.appStorePassword;
				document.getElementById("appStorePassPhrase").value = localStorage.appStorePassPhrase;
				document.getElementById("appStorePassPhraseAnswer").value = localStorage.appStorePassPhraseAnswer;
				document.getElementById("savePassword").removeAttribute("disabled");
			}
			if(localStorage.passwordBoxDisplayed == "true"){
				document.getElementById("passwordBox").style.display="none";
				if(localStorage.forgotPassword == "true"){
					document.getElementById("passwordBox").style.display="block";
					document.getElementById("savePassword").removeAttribute("disabled");
					document.getElementById("savePassword").addEventListener("click", saveSettingsPassword);
					localStorage.forgotPassword = "false";
				}
				//resetScroller(0);
			}
			
			var liList = document.getElementById("settingContainer").getElementsByTagName("li");
			
			for(var i=0;i<4;i++){
				liList[i].addEventListener("click", removeFocus, true);
			}
			divHeight5=document.getElementById("settingContainer").offsetHeight;
			scroller.maxScrollY = (divHeight5-50) *-1;
			scroller.scrollTo(0,0);
			return this;
    }
});

function  removeFocus(){
var elem = event.target.classList.contains("passwordTextbox");
	if(!elem){
		document.getElementById("appStorePassword").blur();
		document.getElementById("appStoreRepeatPassword").blur();
	}
	//scroller.maxScrollY = ((document.body.scrollHeight) *-1) - 50;
	scroller.hasVerticalScroll = true;
	divHeight5=document.getElementById("settingContainer").offsetHeight;
	scroller.maxScrollY = (divHeight5-50)*-1;
}
var ReactSettingsPage = React.createClass({displayName: 'ReactSettingsPage',
    render: function() {
	var disabledStateClass =  "loginBtn";
	if(localStorage.appStorePassword == "" || localStorage.appStorePassword === undefined)
	{
		disabledStateClass =  "loginBtn  login-disable-btn";
	}
       return (
			React.DOM.section({className:"settings-container"},
				React.DOM.div(null,
				   React.DOM.ul({className:"settings-list"},
				   React.DOM.li(null,
					React.DOM.h1({className:"settings-header"},
					React.DOM.div({className:"container"},
						React.DOM.div({className:"settings-btn-icon left"}),
						React.DOM.div({className:"settings-header"},'Settings')
					)
				)
					  ),
					  React.DOM.li(null,
						React.DOM.div(null,'Activate Apps automatic updates',
							React.DOM.div({className:"onoffswitch right",id:"0",onClick:this.toggleControl},
								React.DOM.input({type:"checkbox",name:"onoffswitch",className:"onoffswitch-checkbox",id:"myonoffswitch",checked:  localStorage.automaticUpdates == 'true'}),
								React.DOM.label({className:"onoffswitch-label",for:"myonoffswitch",id:"0"},
									React.DOM.span({className:"onoffswitch-inner",id:"0"}),
									React.DOM.span({className:"onoffswitch-switch",id:"0"})
								)
							)
						)
					),
				React.DOM.li(null,
					  React.DOM.div(null,'Activate my password',
							React.DOM.div({className:"onoffswitch right",id:"1",onClick:this.toggleControl},
							React.DOM.input({type:"checkbox",name:"onoffswitch",className:"onoffswitch-checkbox",id:"myonoffswitch1",checked:  localStorage.passwordBoxDisplayed == 'true'}),
								React.DOM.label({className:"onoffswitch-label",for:"myonoffswitch1",id:"1"},
									React.DOM.span({className:"onoffswitch-inner",id:"1"}),
									React.DOM.span({className:"onoffswitch-switch",id:"1"})
								   )
								)
							)
					  ),React.DOM.li({id:"passwordBox", className:"cgupanel"}, React.DOM.div({className:"labelCenter"},"Enter your AppStore password"),
						React.DOM.input({className:"passwordTextbox password-field", id: "appStorePassword", type:"password", onKeyUp:validateSettingPagePassword}),
						React.DOM.span({id:"pwdRuleMessage", className:"confirmMessage"}),
						React.DOM.div({className:"labelCenter"},"Confirm your AppStore password"),
						React.DOM.input({type:"password", id:"appStoreRepeatPassword", className:"passwordTextbox password-field", onKeyUp:validateSettingPagePassword}),
						React.DOM.span({id:"confirmMessage", className:"confirmMessage"}),
						React.DOM.div({className:"labelCenter"},"Passphrase for forgotten password"),
						React.DOM.select({className:"passwordTextbox", id: "appStorePassPhrase", onChange:validateSettingPagePassword}, [
						React.DOM.option({key: 'shop_date', value: 'Date of my first shop opening'}, 'Date of my first shop opening'),
						React.DOM.option({key: 'house_date', value: 'Date of my first house'}, 'Date of my first house'),
						 React.DOM.option({key: 'girlfriend_date', value: 'Date of my first girlfriend'}, 'Date of my first girlfriend'),
						  React.DOM.option({key: 'car_date', value: 'Date of my first car'}, 'Date of my first car')]),
					React.DOM.div({className:"labelCenter"},"Answer for passphrase"),
					React.DOM.input({type:"text", className:"passwordTextbox", id: "appStorePassPhraseAnswer", value:localStorage.appStorePassPhraseAnswer}),
						React.DOM.button({id:"savePassword",className:disabledStateClass, disabled:"disabled"}, 'Done')
					  )
				  )
				)
			)
        );
    },
	toggleControl:function(){
		var idClicked = event.target.id;
		var control = null;
		if(idClicked == 0){
			control = document.getElementById("myonoffswitch");
			if(control.checked){
					localStorage.automaticUpdates = false;
					resetScroller();
				}else{
					localStorage.automaticUpdates = true;
					resetScroller();
				}
			control.checked=!(control.checked);
		}else if(idClicked == 1){
			control = document.getElementById("myonoffswitch1");
				if(control.checked){
					localStorage.passwordBoxDisplayed = false;
					document.getElementById("passwordBox").style.display="none";
					resetScroller();
				}else{
						document.getElementById("savePassword").addEventListener("click", saveSettingsPassword);
						document.getElementById("passwordBox").style.display="block";
						resetScroller();
					}
			control.checked=!(control.checked);
			
		}
		//if(!control.checked)
		//	openSettings();
		scroller.hasVerticalScroll=true;
	}
});

	

var MyAccountPageView = Backbone.View.extend({
	template:'<div>'+
				'<div class="accountContainer" id="accountContainer"></div>'+
				'<div id="footer-content" class="footer-container"></div>'+
			'</div>',    
	initialize: function () {
		removeCguHeader();
		removeCguBody();
		document.getElementById("scrollerDiv").className = 'body_panel_white';
	},
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactAccountPage(), document.getElementById('accountContainer'));
			loadFooter();
			scroller.hasHorizontalScroll=true;
			var divHeight6=document.getElementById("accountContainer").offsetHeight;
			scroller.maxScrollY = (divHeight6-135) *-1;
			scroller.scrollTo(0,0);
			return this;
    }
});

var ReactAccountPage = React.createClass({displayName: 'ReactAccountPage',
    render: function() {
       return (
					React.DOM.section({className:"my-account-container"},
						React.DOM.h1({className:"my-account-header"},
							React.DOM.div({className:"container"},
								React.DOM.div({className:"account-user-btn left"}),
								React.DOM.div({className:"settings-header"},'My account')
							)
						),
						React.DOM.h5({className:"my-account-title"},'Welcome Restaurant LG'),
						React.DOM.p({className:"my-account-details"},
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' )
					)

				
        );
    }
});

var divHeight7;
var MyAppPageView = Backbone.View.extend({   
template:'<div>'+
				'<div class="myAppContainer" id="myAppContainer"></div>'+
				'<div id="footer-content-myapps" class="footer-container"></div>'+
			'</div>',
	initialize: function () {
		removeCguHeader();
		removeCguBody();
		document.getElementById("scrollerDiv").className = 'body_panel';		
    },
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactMyApps(), document.getElementById('myAppContainer'));
			React.renderComponent(new ReactPageFooter(), document.getElementById('footer-content-myapps'));
			//scroller.maxScrollY = (totalMyAppsLength*100+250) *-1;
			//scroller.scrollTo(0,0);
			loadMyAppsFromMemory = true;
			return this;
    }
});
var totalMyAppsLength = 0;
var downloadApps = null;
var installedApps = null;
var ReactMyApps = React.createClass({displayName: 'ReactMyApps',
    render: function() {
	var downloadBtnClass = "download-all-btn";
	var downloadTxt = "";
	var appCountStyle = {visibility:"visible"};
	var updateAppCountStyle = {visibility:"visible"};
	
	var updateBtnClass = "update-all-btn";
	var updateTxt = "";
	var updateAppCountStyle = {visibility:"visible"};
	
	
   downloadApps = getApplicationsByStatus("NOTINSTALLED");
   var deletedApps = getApplicationsByStatus("DELETED");
   downloadApps = downloadApps.concat(deletedApps);
   if(localStorage["downloadAppCount"] === "undefined")
		localStorage["downloadAppCount"] = downloadApps.length;
	
   installedApps =  getApplicationsByStatus("INSTALLED");
   if(localStorage["updateAppCount"] === "undefined")
		localStorage["updateAppCount"] = installedApps.length;
   var notsubscibedApps =  getApplicationsByStatus("NOTSUBSCRIBED");
   var myAppLen = installedApps.length+downloadApps.length;
	totalMyAppsLength = downloadApps.length + deletedApps.length + installedApps.length + notsubscibedApps.length;
	
		if(localStorage.downloadAll == "true"  || checkIfAllAppsDownloaded())
		{
			downloadBtnClass = "download-all-text";
			//downloadTxt = DOWNLOAD_IN_PROGRESS;
			appCountStyle = {visibility:"hidden"};
		}
		if(localStorage.updateAll == "true"  || checkIfAllAppsUpdated())
		{
			updateBtnClass = "download-all-text";
			//updateTxt = UPGRADE_IN_PROGRESS;
			updateAppCountStyle = {visibility:"hidden"};
		}
		return (
			React.DOM.section({id:"app_section"},
			React.DOM.div(null,
			React.DOM.div({className:"myApps-title"}, React.DOM.div({className:"MyApp-head-icon"}), 'My Apps'),
			React.DOM.div({className:"w-download-bar"},               
				React.DOM.div({className:"app-bar-title"}, 'Downloads'),
				 React.DOM.div({id:"downloadAllBtn", onClick:this.downloadAll, className:downloadBtnClass}, downloadTxt, 
				 React.DOM.div({id:"downloadAppCount", className:"app-count-rightpanal app-count-override", style:appCountStyle}, localStorage["downloadAppCount"]))),
			React.DOM.div({id:"WaitingToDownload", className:"MyApp-list-container"},
					ReactDownloadApps({apps:downloadApps})),
					React.DOM.div({id:"DownloadAvailalbeBar", className:"w-download-bar"},
				React.DOM.div({className:"app-bar-title"}, 'Update Available'),
				 React.DOM.div({id:"updateAllBtn", className:updateBtnClass, onClick:this.updateAll}, updateTxt, 
				 React.DOM.div({id:"updateAppCount", className:"app-count-rightpanal app-count-override", style:updateAppCountStyle}, localStorage["updateAppCount"]))),
			React.DOM.div({id:"UpdateAvailable", className:"MyApp-list-container"}, ReactInstalledApps({apps:installedApps})),
			
			React.DOM.div({id:"DownloadAvailalbeBar", className:"w-download-bar"},
				React.DOM.div({className:"app-bar-title"}, 'Shopping : ' +notsubscibedApps.length+ ' Apps')),
			React.DOM.div({id:"UpdateAvailable", className:"MyApp-list-container"}, ReactNotSubscribedApps({apps:notsubscibedApps}))))				
		);
        return (
            React.DOM.div(null, rows)
        );
    },
	downloadAll:function(){
		if(!localStorage.downloadAll)
		{
			alert("Apps will be downloaded");
			localStorage.downloadAll = true;
			setButtonStatus("downloadAllBtn", DOWNLOAD_IN_PROGRESS);
			
			for(var i = 0; i < downloadApps.length; i++)
			{
				var divi = document.getElementById("download-btn_" + downloadApps[i].waid);
				if(divi)
				{
					divi.innerHTML = DOWNLOAD_IN_PROGRESS;
					divi.className = "download-app-text";
				}
			}
		}
	},
	updateAll:function(){
		if(!localStorage.updateAll)
		{
			alert("Apps will be upgraded");
			localStorage.updateAll = true;
			setButtonStatus("updateAllBtn", UPGRADE_IN_PROGRESS);
			
			for(var i = 0; i < installedApps.length; i++)
			{
				var divi = document.getElementById("update-btn_" + installedApps[i].waid);
				if(divi)
				{
					divi.innerHTML = UPGRADE_IN_PROGRESS;
					divi.className = "download-app-text";
				}
			}
		}
	}
	
});

var ReactDownloadApps = React.createClass({displayName: 'ReactDownloadApps',
    render: function() {
		var downloadApps = this.props.apps;       
		var downloadBtnClass = "app_download-icon";
		var downloadTxt = "";
		if(localStorage.downloadAll == "true")
		{
			downloadBtnClass = "download-app-text";
			downloadTxt = DOWNLOAD_IN_PROGRESS;
		}
        var rows = _.map(downloadApps, function(app) {
		if(localStorage.downloadAll === "undefined" || localStorage.downloadAll === undefined)
			localStorage.downloadAll = "";
		if(localStorage.downloadAll != "true" && localStorage.downloadAll == "") //condition to check if updateAll is not true
		{
			var appDetailObj = getAppDetailsInfo(app.waid);//alert(appDetailObj);
			downloadBtnClass = "app_download-icon";
			downloadTxt = "";
			if(appDetailObj && appDetailObj.download == true)
			{
				downloadBtnClass = "download-app-text";
				downloadTxt = DOWNLOAD_IN_PROGRESS;
			}
		}
		return (
                React.DOM.div({className:"myapp_list_container container-bottom-border"},
				React.DOM.div({className:"app_details-icon"},
					React.DOM.img({src:'img/app/ic_' +app.icon +'.jpg', width:"60", height:"60", alt:""})),
				React.DOM.div({className:"app_details-Appname"}, React.DOM.p({className:"app-name"},
							React.DOM.b(null, app.name)),
						React.DOM.p({className:"app-name app-name-category"}, app.category),
				React.DOM.div({className:"app-rating app-rating-stars-4"})),
				React.DOM.div({className:"app-detail-divider"}),
				React.DOM.div({id:"installApp" + app.waid, className:"app_details-dl-container show"},
				React.DOM.div({className:downloadBtnClass, id:"download-btn_" +app.waid, name:app.waid, onClick:installApp}, downloadTxt)),
				React.DOM.div({id:"deleteApp" + app.waid, className:"app_details-dl-container hide", onClick:this.deleteApp},
							React.DOM.i({className:"fa fa-trash-o delete-btn"})))
            );
        });
        return (
            React.DOM.div(null, rows)
        );
    },
	
	deleteApp:function() {
	}
});

var ReactInstalledApps = React.createClass({displayName: 'ReactInstalledApps',
    render: function() {
		var installedApps = this.props.apps;      
		var downloadBtnClass = "app_download-icon";
		var updateTxt = "";
		var AppNewsChecked = false;
		if(localStorage.updateAll == "true")
		{
			downloadBtnClass = "download-app-text";
			updateTxt = UPGRADE_IN_PROGRESS;
		}
	
        var rows = _.map(installedApps, function(app) {
		if(localStorage.updateAll === "undefined" || localStorage.updateAll === undefined)
			localStorage.updateAll = "";
		if(localStorage.updateAll != "true" && localStorage.updateAll == "") //condition to check if updateAll is not true
		{
			var appDetailObj = getAppDetailsInfo(app.waid);
			downloadBtnClass = "app_download-icon";
			updateTxt = "";
			if(appDetailObj && appDetailObj.update == true)
			{
				downloadBtnClass = "download-app-text";
				updateTxt = UPGRADE_IN_PROGRESS;
			}
		}
		return (
               React.DOM.div(null,             	
			React.DOM.div({className:"myapp_list_container"},
					React.DOM.div({className:"app_details-icon"},
						React.DOM.img({src:"img/app/ic_" + app.icon +".jpg", width:"60", height:"60", alt:""})),
					React.DOM.div({className:"app_details-Appname"}, React.DOM.p({className:"app-name"},
								React.DOM.b(null, app.name)),
							React.DOM.p({className:"app-name app-name-category"}, app.category),
							React.DOM.div({className:"news-btn", onClick:toggleNews}, 'News', 
							React.DOM.i({id:"newsIcon" +app.waid, className:"fa fa-chevron-down fa-1"}))),
							
					React.DOM.div({className:"app-detail-divider"}),
					React.DOM.div({className:"app_details-dl-container"},
					React.DOM.div({className:downloadBtnClass, id:"update-btn_" +app.waid, name:app.waid, onClick:updateApp}, updateTxt))),
					
			React.DOM.div({id:"newsContainer" + app.waid, className:"MyApp-News-container container-bottom-border"},
			React.DOM.p(null, React.DOM.strong(null, 'Version 6.2.1  -  20 Mo'), React.DOM.br(null), '03 / 09 / 2014' +
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.'),
			React.DOM.ul(null,
				React.DOM.li(null, 'Proin gravida dolor sit amet lacus accumsan'),
				React.DOM.li(null, 'amet lacus accumsan '))))
            );
			
			function  toggleNews(){
	var appPage = new MyAppPageView();
	appPage.setElement(document.getElementById('curtain-myapps')).render();
	
	if(this.AppNewsChecked){
		scroller.maxScrollY = (divHeight7-135) *-1;
		document.getElementById("newsContainer"+ app.waid).style.display="none";
		document.getElementById('newsIcon' +app.waid).className = "fa fa-chevron-down fa-1";
		this.AppNewsChecked = false;
	}else{
		scroller.maxScrollY = (divHeight7-27) *-1;
		document.getElementById("newsContainer"+ app.waid).style.display="block";
		document.getElementById('newsIcon' +app.waid).className = "fa fa-chevron-up fa-1";
		this.AppNewsChecked = true;
		}
};	
			
        });
        return (
            React.DOM.div(null, rows)
        );
    }
	
});




var ReactNotSubscribedApps = React.createClass({displayName: 'ReactNotSubscribedApps',
    render: function() {
		var installedApps = this.props.apps;       
        var rows = _.map(installedApps, function(app) {
		var visibility = "invisible";
		var ratingBtnObj = null;
		var ratingCount = parseInt(localStorage.getItem("RATING_" + app.waid));
		var ratingClassName = "";
		if(ratingCount > 0)
		{
			visibility = "visible";
			ratingClassName = "my-rating app-rating-stars-" + ratingCount.toString();
		}
		else
		{
			ratingBtnObj = React.DOM.button({id:"img/app/ic_" +app.icon+ ".jpg", name:app.waid, className:"rate-it-btn",onClick:openRatingPopup}, 'Rate it!');
		}
		return (
            	React.DOM.div({className:"myapp_list_container container-bottom-border"},
				React.DOM.div({className:"app_details-icon"},
					React.DOM.img({src:"img/app/ic_" +app.icon+ ".jpg", width:"60", height:"60", alt:"" })),
				React.DOM.div({className:"app_details-Appname"}, React.DOM.p({className:"app-name"},
							 React.DOM.b(null, app.name)),
							React.DOM.p({className:"app-name app-name-category"}, app.category),
					   React.DOM.div({className:"app-rating app-rating-gray-stars-3"}),
						ratingBtnObj,
						React.DOM.div({id:"ratingCont" + app.waid, className:visibility},
						React.DOM.span({className:"rating-name-red"}, "My Rating"),
						React.DOM.div({id:"ratingDiv" + app.waid, className:ratingClassName}))
						),
				React.DOM.div({className:"app-detail-divider"}),
				React.DOM.div({className:"app_details-dl-container"},				
				React.DOM.input({type:"button", className:"app_View-icon", id:app.waid, onClick:viewAppDetailsPage}))
				)
            );
        });
        return (
            React.DOM.div(null, rows)
        );
    }
});

var ReactDialog = React.createClass({displayName: 'ReactDialog',
    render: function() {
	var appId = this.props.waid;	
        return (
            React.DOM.div({id:"successPopup", className:"install-dialog-content"},
				React.DOM.section({className:"popup-section popup-body"},
					React.DOM.span({className:"popup-closeBtn", onClick:closeDialog},
						React.DOM.a(null, React.DOM.i({className:"fa fa-times fa-2x"}))),
					React.DOM.section({className:"popup-content"},
						React.DOM.h3({className:"popup-title-header"}, React.DOM.input({onChange:toggleCheckBox, name:"cguCheck",id:"cguCheck", type:"checkbox", className:"cguCheckbox"},
						React.DOM.span(null,"   CGU Accepted")), React.DOM.div({name:appId, id:"resultMsg", className:"cguLinkText", onClick:openCGU}, 'Read and Accept CGU >')),
						React.DOM.button({id:"cguPopupButton", className:"popup-btn", onClick:this.toggleModalup, name:appId}, 'OK'))))
        );
    },
	toggleModalup:function(){
		var cguAccepted = "CGU_ACCEPTED_"+event.target.name;
		localStorage.setItem(cguAccepted,true);
		document.getElementById("buy-app-btn").innerText = "Install in progress";
		getApplicationByWaid(String(event.target.name)).subscriptionStatus="SUBSCRIBED";
		React.renderComponent(new ReactSuccessDialog({waid:event.target.name}), document.getElementById('dialogHolder'));
		
	}
});

var ReactSuccessDialog = React.createClass({displayName: 'ReactSuccessDialog',
    render: function() {
	var appId = this.props.waid;	
        return (
            React.DOM.div({id:"successPopup", className:"install-dialog-content"},
				React.DOM.section({className:"popup-section popup-body"},
					React.DOM.span({className:"popup-closeBtn", onClick:closeDialog},
						React.DOM.a(null, React.DOM.i({className:"fa fa-times fa-2x"}))),
					React.DOM.section({className:"popup-content"},
						React.DOM.h3({className:"popup-title-header"}, React.DOM.div({name:appId, id:"resultMsg", className:"cguLinkText"}, 'Application purchased successfully')),
						React.DOM.button({id:"cguPopupButton", className:"popup-btn", onClick:this.toggleModalup, name:appId}, 'OK'))))
        );
    },
	toggleModalup:function(){
		scroller.hasVerticalScroll=true;
		closeDialog();
	}
});

 var rates = [{id:"1", isRated:false}, {id:"2", isRated:false}, 
				{id:"3", isRated:false},{id:"4", isRated:false}, {id:"5", isRated:false}];	
var ReactRatingDialog = React.createClass({displayName: 'ReactRatingDialog',
    render: function() {
	var img = this.props.item;
	var appId = this.props.appId;
        return (
            React.DOM.section({className:"rateSection"},
				React.DOM.span({className:"closeBtn", onClick:this.toggleModalup},
					React.DOM.a(null, React.DOM.i({className:"fa fa-times fa-2x"}))),
				React.DOM.section({className:"rate-content-section"},
					React.DOM.h3({className:'rate-title-header'}, 'Rate it!'),
					React.DOM.section({className:"container"},
						React.DOM.div({className:"left rate-img"},
							React.DOM.div({className:"rate-img-content"},
								React.DOM.img({src:img, alt:"Ingenico", className:"logo"}))),
						React.DOM.div({className:"rate-title right"},
							React.DOM.p({className:"lisubheading rate-heading"}, "Taxi Reservation"),
							React.DOM.br(null),
							React.DOM.span({className:"lisubheading"}, 'Category'))),
					React.DOM.section({className:"container"},
					React.DOM.div({className:"left rate-entry"},
						 React.DOM.ul({id:"star"},
							 ReactRatingStars({item:rates, appId:appId})))),
					React.DOM.section({className:"container rate-footer"},
						React.DOM.div(null,
						React.DOM.span({id:"displayMsg"}, "Touch the star to rate")),
						React.DOM.div({className:"left"},
							React.DOM.button({className:"loginBtn cgu-btn-ok", onClick:this.toggleModalup}, 'CANCEL')),
						React.DOM.div({className:"right"},
							React.DOM.button({className:"loginBtn login-disable-btn", disabled:"disabled", id:"setRating_" +appId, name:img, onClick:this.OkModal}, 'OK')))))
        );
    },
	toggleModalup:function(){
		//document.getElementById("buy-app-btn").style.display = "none";
		closeRating();
	}
});

var ReactRatingStars = React.createClass({displayName: 'ReactRatingStars',
    render: function() {
		var rates = this.props.item;       
		var appId = this.props.appId;
		 var rows = _.map(rates, function(rate) {
		return (
			React.DOM.li({className:"rate-stars"}, 
            	React.DOM.a({id:rate.id, name:appId, onClick:setRating},
				React.DOM.i({id:rate.id + " yes", className:"fa fa-star-o rate-entry-yes"})))
            );
        });
        return (
            React.DOM.div(null, rows)
        );
    }
});

var PolicyPageView = Backbone.View.extend({
	template:'<div>'+
				'<div class="accountContainer" id="genericContainer"></div>'+
				'<div id="footer-content" class="footer-container"></div>'+
			'</div>',    
	initialize: function () {
		removeCguHeader();
		removeCguBody();
		document.getElementById("scrollerDiv").className = 'body_panel_white';
	},
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactPolicyPage(), document.getElementById('genericContainer'));
			loadFooter();
			document.getElementById("curtain").querySelector('ul').style.display="none";
			scroller.maxScrollY = 0;
			scroller.scrollTo(0,0);
			return this;
    }
});

var ReactPolicyPage = React.createClass({displayName: 'ReactPolicyPage',
    render: function() {
       return (
					React.DOM.section({className:"my-account-container"},
						React.DOM.h1({className:"my-account-header"},
							React.DOM.div({className:"container"},
								React.DOM.div({className:"account-user-btn left"}),
								React.DOM.div({className:"settings-header"},'Privacy Policy')
							)
						),
						React.DOM.h5({className:"my-account-title"},'Welcome Restaurant LG'),
						React.DOM.p({className:"my-account-details"},
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' )
					)

				
        );
    }
});


var HelpPageView = Backbone.View.extend({
	template:'<div>'+
				'<div class="accountContainer" id="genericContainer"></div>'+
				'<div id="footer-content" class="footer-container"></div>'+
			'</div>',    
	initialize: function () {
		removeCguHeader();
		removeCguBody();
		document.getElementById("scrollerDiv").className = 'body_panel_white';
	},
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactHelpPage(), document.getElementById('genericContainer'));
			loadFooter();
			scroller.maxScrollY = 0;
			scroller.scrollTo(0,0);
			return this;
    }
});

var ReactHelpPage = React.createClass({displayName: 'ReactHelpPage',
    render: function() {
       return (
				React.DOM.section({className:"my-account-container"},
					React.DOM.h1({className:"my-account-header"},
						React.DOM.div({className:"container"},
							React.DOM.div({className:"account-user-btn left"}),
							React.DOM.div({className:"settings-header"},'Help')
						)
					),
					React.DOM.h5({className:"my-account-title"},'Welcome Restaurant LG'),
					React.DOM.p({className:"my-account-details"},
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' )
				)
        );
    }
});

var ReactHelpDialog = React.createClass({displayName: 'ReactHelpDialog',
    render: function() {
        return (
	            React.DOM.div({id:"successPopup", className:"cat_placeholder_loading_txt"},
					React.DOM.section({className:"popup-section popup-body"},
						React.DOM.span({className:"popup-closeBtn", onClick:showHomePage},
							React.DOM.a(null, React.DOM.i({className:"fa fa-times fa-2x"}))),
						React.DOM.section({className:"popup-content"},
							React.DOM.h3({className:"popup-title-header"}, React.DOM.div({id:"resultMsg"}, 'Tutorial Web Application launched')),
							React.DOM.button({className:"popup-btn", onClick:showHomePage}, 'OK'))))
        );
    }
});


var TermsPageView = Backbone.View.extend({
	template:'<div>'+
				'<div class="accountContainer" id="genericContainer"></div>'+
				'<div id="footer-content" class="footer-container"></div>'+
			'</div>',    
	initialize: function () {
		removeCguHeader();
		removeCguBody();
		document.getElementById("scrollerDiv").className = 'body_panel_white';
	},
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactTermsPage(), document.getElementById('genericContainer'));
			loadFooter();
			document.getElementById("curtain").querySelector('ul').style.display="none";
			scroller.maxScrollY = 0;
			scroller.scrollTo(0,0);
			return this;
    }
});

var ReactTermsPage = React.createClass({displayName: 'ReactTermsPage',
    render: function() {
       return (
				React.DOM.section({className:"my-account-container"},
					React.DOM.h1({className:"my-account-header"},
						React.DOM.div({className:"container"},
							React.DOM.div(null),
							React.DOM.div({className:"settings-header"},'Terms & Conditions')
						)
					),
					React.DOM.h5({className:"my-account-title"},'Welcome Restaurant LG'),
					React.DOM.p({className:"my-account-details"},
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' )
				)
        );
    }
});
var FirstLaunchView = Backbone.View.extend({   
el: 'body',
template:'<div>'+
				'<div class="page-panel1" id="firstLaunch"></div>'+
			'</div>'
			,
	render: function() {
			this.$el.html(this.template);
			//React.renderComponent(new ReactFirstLaunchItem(), document.getElementById('firstLaunch'));
			//document.getElementById('username').focus();
			//disableFirstLaunch();openHomePage();
			
	document.write('<div class="page-panel1" id="firstLaunch"><section class="main" id="htmlpanel"><section class="content"><h3 class="title-header">Setup your password to AMS</h3><div class="first-launch-content"><span>enter your Merchant Login:</span><input type="text" id="username" class="inputbx password-field" maxlength="30"></div><div class="first-launch-content"><span>enter your Merchant Password:</span><input type="password" id="password" maxlength="20" class="inputbx password-field"></div><div class="first-launch-content"><span>confirm your Merchant Password:</span><input type="password" id="repeatPassword" maxlength="20" class="inputbx password-field"></div><div class="first-launch-content"><span id="alertMessage" class="confirmMessage2"></span></div><div id="loginBtnBox" class="loginBtnBox0"><button class="loginBtn0 login-disable-btn" disabled id="signUpButton"><span>LOG IN</span><i class="fa fa-arrow-circle-o-right loginIcon"></i></button></div></div></section></section></div>');
    document.getElementById('username').addEventListener ("input", validateFirstLaunchForm, false);
	document.getElementById('password').addEventListener ("input", validateFirstLaunchForm, false);
	document.getElementById('repeatPassword').addEventListener ("input", validateFirstLaunchForm, false);
	document.getElementById('signUpButton').removeAttribute("disabled");  // debug
	document.getElementById('signUpButton').addEventListener ("click", openLoadingPage); // debug
			return this;
        }
});

var validUser = false;
var validPass = false;
var goodColor = "#ffffff";
var badColor = "#ff6666";
/*var ReactFirstLaunchItem = React.createClass({displayName: 'ReactFirstLaunchItem',
    render: function() {
		return (
			React.DOM.section({className:"main", id:"htmlpanel"},
				React.DOM.section({className:"content"},
				  React.DOM.h3({className:'title-header'}, 'Setup your password to AMS'),
				   //React.DOM.br(null),
				   React.DOM.div(null,
					React.DOM.div({className:"first-launch-content"},
					  React.DOM.span(null, 'enter your Merchant Login:'),
					  React.DOM.input({type:"text", id:"username", className:"inputbx password-field", maxLength:"30", onKeyUp:this.validateFirstLaunchForm})), 
					  //React.DOM.span({id:"usrMsg", className:"confirmMessage"}),
					  React.DOM.div({className:"first-launch-content"},
					  React.DOM.span(null, 'enter your Merchant Password:'),
					  React.DOM.input({type:"password", id:"password", maxLength:"20", onKeyUp:this.validateFirstLaunchForm, className:"inputbx password-field"})),
					  //React.DOM.span({id:"pwdRuleMessage", className:"confirmMessage"}),
					  React.DOM.div({className:"first-launch-content"},
					  React.DOM.span(null, 'confirm your Merchant Password:'),
					  React.DOM.input({type:"password", id:"repeatPassword", maxLength:"20", className:"inputbx password-field", onKeyUp:this.validateFirstLaunchForm})),
					//React.DOM.span({id:"confirmMessage", className:"confirmMessage"}),
					React.DOM.span({id:"alertMessage", className:"confirmMessage2"}),
					  React.DOM.div({id:"loginBtnBox", className:"loginBtnBox0"},
						 React.DOM.button({className:"loginBtn0 login-disable-btn", disabled:"disabled", id:"signUpButton"},
							'LOG IN',
							React.DOM.i({className:"fa fa-arrow-circle-o-right loginIcon"}))))))
            );
    },
*/
	 function validateFirstLaunchForm(event)
	{
		var goodBorderColor = "#ddd";
	    var badBorderColor = "#ff6666";
		var usrName = document.getElementById('username');
		//var message = document.getElementById('usrMsg');
		confirmMessage = document.getElementById('alertMessage');
	    pwdRuleMessage = document.getElementById('alertMessage');
		alertMessage = document.getElementById('alertMessage');
		var re = /^\w+$/;
		if(localStorage.getItem(loginChange)==null){localStorage.setItem(loginChange, false);}
		if(event.target.id=="username"){
	    if(!re.test(usrName.value)) {
		  usrName.style.borderColor = badBorderColor;
		  alertMessage.style.color = badColor;
		  alertMessage.innerText = "Username must contain only letters, numbers and underscores!";
	      //usrName.focus();
	      validUser = false;
	    }
		else
		{
			alertMessage.innerText = ""
			usrName.style.borderColor = goodBorderColor;
			validUser = true;
		}}else{
	    if(localStorage.getItem(loginChange) == "false"){alertMessage.innerText = "";}
		validPass = validatePassword(document.getElementById('password'), document.getElementById('repeatPassword'));}
		handleButtonEnable((validUser && validPass), document.getElementById("signUpButton"), openLoadingPage);
	}//,
	 function openLoadingPage()
	{
		var loadingPageView = new LoadingPageView();
		loadingPageView.render();
		disableFirstLaunch();
	}
//});

var LoadingPageView = Backbone.View.extend({   
el: 'body',
template:'<div>'+
				'<div class="page-panel1" id="loadingPage"></div>'+
			'</div>'
			,
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactLoadPageItem(), document.getElementById('loadingPage'));
			return this;
        }
});

var ReactLoadPageItem = React.createClass({displayName: 'ReactLoadPageItem',
    render: function() {
		tham.catalog(this.loadHomePage);
		return (
			React.DOM.section({className:"main", id:"htmlpanel"},
				React.DOM.div({className:"content"},
				   React.DOM.div({className:"loading-page"},
					  React.DOM.h3({className:'title-header loading-page-txt'}, 'Loading Appstore data...'),
					  React.DOM.br(null), 
					  React.DOM.h3({className:'title-header loading-page-txt'}, 'Loading Apps Store...'),
					  React.DOM.img({src:"img/ajax-loader.gif"}),
					  React.DOM.br(null),
					  React.DOM.h3({className:'title-header loading-page-txt'}, 'Loading ss...'),
					  React.DOM.br(null),
					  React.DOM.h3({className:'title-header loading-page-txt'}, 'Loading My Messages...'),
					   React.DOM.br(null),
					  React.DOM.h3({className:'title-header loading-page-txt'}, 'My Account completed...')
					 )))
            );
    },
	loadHomePage: function(status,data)
	{
		catalogDispo(status,data);
		homePageView = new HomePageView();
		homePageView.render();
	}
});

var LoginPageView = Backbone.View.extend({   
el: 'body',
template:'<div>'+
				'<div class="page-panel1" id="loginPage"></div>'+
			'</div>',
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactLoginPageItem(), document.getElementById('loginPage'));
			document.getElementById('loginPassword').focus();
			return this;
        }
});
var ReactLoginPageItem = React.createClass({displayName: 'ReactLoginPageItem',
    render: function() {
		return (
				React.DOM.section({className:"main", id:"htmlpanel"},

				React.DOM.span({className:"closeBtn", onClick:closeApplication},
				   React.DOM.i({className:"fa fa-times fa-2x login-close-btn", onClick:closeApplication})),

				React.DOM.section({className:"content"},
				   React.DOM.span(null, React.DOM.img({src:getImageData("img/logo.jpg"), alt:"Ingenico", className:"logo"})),
				   React.DOM.h3({className:'title-header'}, 'Welcome'),
				   React.DOM.span(null, 'Connect to the appstore,'),
				   React.DOM.div(null,
					  React.DOM.span(null, 'enter your password:'),
					  React.DOM.input({type:"password", className:"inputbx", id:"loginPassword", onKeyUp:this.validateLogin}),
					  React.DOM.br(),
					  React.DOM.span(null,
						 React.DOM.a({className:"forgotPassword", onClick:this.openForgotPassword},
							React.DOM.i({className:"fa fa-chevron-circle-right login-forgot-icon"}),
							'I forgot my password')),
					  React.DOM.div({className:"loginHomePageBtnBox"},
						 React.DOM.button({id:"loginBtn", className:"loginBtn login-disable-btn", disabled:"disabled"},
							'LOG IN',
							React.DOM.i({className:"fa fa-arrow-circle-o-right loginIcon"}))))))
            );
    },
	validateLogin:function(event)
	{
		var loginPassword = document.getElementById('loginPassword');
		handleButtonEnable(loginPassword.value, document.getElementById("loginBtn"), this.loginSubmit);
	},
	loginSubmit: function()
	{
		var loginPassword = document.getElementById('loginPassword');
		if(loginPassword.value == localStorage.appStorePassword || localStorage.appStorePassword == null)
		{
			openLoadingPage();//openHomePage();
		}else{
			alert("Password entered is incorrect");
			loginPassword.value = "";
			loginPassword.focus();
			return;
		}
	},
	openForgotPassword: function()
	{
		if(localStorage.appStorePassPhrase == "" || localStorage.appStorePassPhrase === undefined)
			return;
		var forgotPasswordPage = new ForgotPasswordPageView();
		forgotPasswordPage.render();
	}
});

var ForgotPasswordPageView = Backbone.View.extend({   
el: 'body',
template:'<div>'+
				'<div class="page-panel1" id="forgotPasswordPage"></div>'+
			'</div>'
			,
	render: function() {
			this.$el.html(this.template);
			React.renderComponent(new ReactForgotPasswordPageItem(), document.getElementById('forgotPasswordPage'));
			setCibulCalendar('passPhraseAnswer', {range:false});
			document.getElementById('passPhraseAnswer').addEventListener("change", this.validateDone);
			return this;
        },
	validateDone:function(event)
	{
		var passPhraseAnswer = document.getElementById('passPhraseAnswer');
		handleButtonEnable(passPhraseAnswer.value, document.getElementById("doneBtn"), forgotPasswordDone);
	}
});

var ReactForgotPasswordPageItem = React.createClass({displayName: 'ReactForgotPasswordPageItem',
    render: function() {
		return (
			React.DOM.section({className:"main", id:"htmlpanel"},
				React.DOM.section({className:"forgot-password-content"},
				   React.DOM.h3({className:'title-header'}, 'Welcome'),
				   React.DOM.h3({className:'title-header'}, 'Restaurant LG'),
				   React.DOM.span({className:"forgot-password-reactivate"}, 'Password Reactivation'),
				   React.DOM.div(null,
					  React.DOM.span({className:"forgot-password-passPhrase"}, localStorage.appStorePassPhrase + " ?"),
					  React.DOM.div({className:"forgot-password-txt"},"enter passphrase answer"),
					React.DOM.input({type:"text", className:"forgot-password-ans", id: "passPhraseAnswer"}),
					  React.DOM.div({className:"loginBtnBox"},
						 React.DOM.button({id:"doneBtn", className:"loginBtn login-disable-btn", disabled:"disabled"},
							'Done',
							React.DOM.i({className:"fa fa-arrow-circle-o-right loginIcon"})))
					)))
            );
    }
});

new Router(); 
Backbone.history.start();