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
                console.error("error", ex.message);
				//clbck( xmlhttp.status, xmlhttp.responseText, ctx );
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
    this.request( JSON.stringify( {} ) , callback, "http://terminal.ingenico.com/service/local.communication.tham?request=catalogRequest&response=catalogResponse", ctx );
}

cTham.prototype.appInfos = function( waid, callback, ctx )
{
    if( ctx === undefined ) ctx = { };
    this.request( JSON.stringify( { waid:waid } ) , callback, "http://terminal.ingenico.com/service/local.communication.tham?request=appInfosRequest&response=appInfosResponse", ctx );
}

var resFifo = [ ];

cTham.prototype.resourcesDetails = cTham.prototype.resources = function( id, callback, ctx )
{
    if( ctx === undefined ) ctx = { };

    var rs = { id:id, clk:callback, ctx:ctx };

    resFifo.push( rs );

    resFifoRefresh( );

}

var resPross = 0;
function resFifoRefresh( )
{
    if( resPross == 0 && resFifo.length > 0 )
    {
        resPross = 1;
        var rs = resFifo[0];
        resFifo.shift( );

        tham.request( JSON.stringify( { id:rs.id } ) , callbackResFifo, "http://terminal.ingenico.com/service/local.communication.tham?request=resourcesRequest&response=resourcesResponse", rs );
    }
}

function callbackResFifo( s, d, aCtx )
{
    resPross = 0;
    aCtx.clk( s, d, aCtx.ctx );

    resFifoRefresh( );
}


var tham = new cTham( );
