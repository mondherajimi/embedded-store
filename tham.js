function cTham( )
{
    this._init = 0;
}

cTham.prototype.request = function( data, clbck, url, ctx )
{
    if( this._init == 0 )
    {
        this.initialize( );
    }

    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            try {
                clbck( xmlhttp.status, JSON.parse( xmlhttp.responseText ), ctx );
            } catch (ex) {
                //console.error("error", ex.message);
				clbck( xmlhttp.status, xmlhttp.responseText, ctx );
            }
        }
    }
    xmlhttp.open("POST",url,true);
    xmlhttp.send(data);
}

cTham.prototype.initialize = function( )
{
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
        }
    }
    xmlhttp.open("GET","http://terminal.ingenico.com/service/local.communication.tham",true);
    xmlhttp.send( );

    this._init = 1;
}
		
cTham.prototype.catalog = function( callback, ctx )
{
	 if( ctx === undefined ) ctx = { };
	setTimeout( function(that){ that.c( 200, DataPcBouchon ); }, 200, { c:callback} );
    //this.request( JSON.stringify( {} ) , callback, "http://terminal.ingenico.com/service/local.communication.tham?request=catalogRequest&response=catalogResponse" );
}

cTham.prototype.appInfos = function( waid, callback, ctx)
{
	if( waid == "1" )
    setTimeout( function(that){ that.c( 200, AppInfos1 ); }, 200, { c:callback} );
    else if( waid == "2" )
    setTimeout( function(that){ that.c( 200, AppInfos2 ); }, 200, { c:callback} );
    else if( waid == "3" )
    setTimeout( function(that){ that.c( 200, AppInfos3 ); }, 200, { c:callback} );
	else if( waid == "4" )
    setTimeout( function(that){ that.c( 200, AppInfos4 ); }, 200, { c:callback} );
	else if( waid == "5" )
    setTimeout( function(that){ that.c( 200, AppInfos5 ); }, 200, { c:callback} );
	else if( waid == "6" )
    setTimeout( function(that){ that.c( 200, AppInfos6 ); }, 200, { c:callback} );
	else if( waid == "7" )
    setTimeout( function(that){ that.c( 200, AppInfos7 ); }, 200, { c:callback} );
	else if( waid == "8" )
    setTimeout( function(that){ that.c( 200, AppInfos8 ); }, 200, { c:callback} );
	else if( waid == "9" )
    setTimeout( function(that){ that.c( 200, AppInfos9 ); }, 200, { c:callback} );
	else if( waid == "10" )
    setTimeout( function(that){ that.c( 200, AppInfos10 ); }, 200, { c:callback} );
    else console.log("NOT FOUND!");
    //this.request( JSON.stringify( { waid:waid } ) , callback, "http://terminal.ingenico.com/service/local.communication.tham?request=appInfosRequest&response=appInfosResponse" );
}

cTham.prototype.resources = function( id, callback, ctx )
{
	if( id == "17" )
		setTimeout( function(that){ that.c( 200, dataIc1, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "13" )
		setTimeout( function(that){ that.c( 200, dataIc2, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "35" ) 
		setTimeout( function(that){ that.c( 200, dataIc3, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "53" ) 
		setTimeout( function(that){ that.c( 200, dataIc4, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "47" ) 
		setTimeout( function(that){ that.c( 200, dataIc5, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "23" ) 
		setTimeout( function(that){ that.c( 200, dataIc6, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "29" ) 
		setTimeout( function(that){ that.c( 200, dataIc7, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "1" ) 
		setTimeout( function(that){ that.c( 200, dataIc8, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "99" ) 
		setTimeout( function(that){ that.c( 200, dataIc9, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "41" ) 
		setTimeout( function(that){ that.c( 200, dataIc10, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else
		setTimeout( function(that){ that.c( 200, dataErr, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	 
    //this.request( JSON.stringify( { id:id } ) , callback, "http://terminal.ingenico.com/service/local.communication.tham?request=resourcesRequest&response=resourcesResponse" );
	/*if( ctx === undefined ) ctx = {};
    ctx._tham_callback = callback;
    this.request( JSON.stringify( { id:id } ) , callbackResources, "http://10.23.5.166:3980/resmm/resources/" + id, ctx );*/
}
function callbackResources( s, d , c )
{
    var nd = { meta : { code : 0, message : "" } , response : { payload : d } };
    c._tham_callback( s, nd );
}

cTham.prototype.resourcesDetails = function( id, callback, ctx )
{
	if (id == "20")
		setTimeout( function(that){ that.c( 200, dataSc1, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "21")
		setTimeout( function(that){ that.c( 200, dataSc2, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "50")
		setTimeout( function(that){ that.c( 200, dataSc3, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "51")
		setTimeout( function(that){ that.c( 200, dataSc4, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "52") 
		setTimeout( function(that){ that.c( 200, dataSc5, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "16")
		setTimeout( function(that){ that.c( 200, dataSc6, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "38")
		setTimeout( function(that){ that.c( 200, dataSc7, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "39")
		setTimeout( function(that){ that.c( 200, dataSc8, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "40")
		setTimeout( function(that){ that.c( 200, dataSc9, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "56")
		setTimeout( function(that){ that.c( 200, dataSc10, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "57")
		setTimeout( function(that){ that.c( 200, dataSc11, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "58")
		setTimeout( function(that){ that.c( 200, dataSc12, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "45")
		setTimeout( function(that){ that.c( 200, dataSc13, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "63")
		setTimeout( function(that){ that.c( 200, dataSc14, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "64")
		setTimeout( function(that){ that.c( 200, dataSc15, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "32")
		setTimeout( function(that){ that.c( 200, dataSc16, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "33")
		setTimeout( function(that){ that.c( 200, dataSc17, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "34")
		setTimeout( function(that){ that.c( 200, dataSc18, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "5")
		setTimeout( function(that){ that.c( 200, dataSc19, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "6")
		setTimeout( function(that){ that.c( 200, dataSc20, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "7")
		setTimeout( function(that){ that.c( 200, dataSc21, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "107")
		setTimeout( function(that){ that.c( 200, dataSc22, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "108")
		setTimeout( function(that){ that.c( 200, dataSc23, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "96")
		setTimeout( function(that){ that.c( 200, dataSc24, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "97")
		setTimeout( function(that){ that.c( 200, dataSc25, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else if (id == "98")
		setTimeout( function(that){ that.c( 200, dataSc26, that.ctx ); }, 200, { c:callback, ctx:ctx} );
	else // IMAGE NOT FOUND
		setTimeout( function(that){ that.c( 200, dataErr, that.ctx ); }, 200, { c:callback, ctx:ctx} );
    //this.request( JSON.stringify( { id:id } ) , callback, "http://terminal.ingenico.com/service/local.communication.tham?request=resourcesRequest&response=resourcesResponse" );
}

var tham = new cTham( );
