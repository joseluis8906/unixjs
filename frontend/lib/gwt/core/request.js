//###################################################################################################
//Gwt::Core::Request
Gwt.Core.Request = function (Url, Func, Params, Method)
{
    this.XHR = new XMLHttpRequest ();			
    this.Url = Url;
    this.Func = Func;
    this.Params = Params;
    this.Method = Method || Gwt.Core.REQUEST_METHOD_POST;
    
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.overrideMimeType("application/json");
    var Cookie = this.GetCookie();;
    if (this.Method===Gwt.Core.REQUEST_METHOD_POST)
    {
        this.XHR.open ("POST", this.Url, true);
        if (Cookie!==null)
        {
            this.XHR.setRequestHeader("SessionId",  Cookie);
        }
        this.Send ();
    }
    else
    {
        this.XHR.open ("GET", this.Url, true);
        if (Cookie!==null)
        {
            this.XHR.setRequestHeader("SessionId",  Cookie);
        }
        this.XHR.send ();
    }
}

Gwt.Core.Request.prototype._Request = function ()
{
    this.XHR = null;
    this.Url = null;
    this.Func = null;
    this.Params = null;
}

Gwt.Core.Request.prototype.Send = function ()
{
    var option = 0;
    for (var i = 0; i < this.Params.length; i++)
    {
        if (this.Params[i].Type === Gwt.Core.PARAM_TYPE_FILE)
        {
            option = 1;
            break;
        }
    }
    if (option === 0)
    {
        this.SendApplicationXWWWFormUrlEncoded ();
    }
    else
    {
        this.SendMultipartFormData ();
    }
}

Gwt.Core.Request.prototype.SendMultipartFormData =  function ()
{
    var Boundary = "---------------------------" + Date.now().toString(16);
    this.XHR.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + Boundary);
    //this.XHR.setRequestHeader("document_type", this.Data.document_type.toString ());
    //this.XHR.setRequestHeader("document", this.Data.document.toString ());
	
    var Multipart = [];
    var ContentDisposition = "";
    
    for (var i = 0; i < this.Params.length; i++)
    {
        Multipart.push ("\r\n--"+Boundary+"\r\n");
        if (this.Params[i].Type === Gwt.Core.PARAM_TYPE_JSON)
        {        
            ContentDisposition = "Content-Disposition: form-data; name=\""+this.Params[i].GetData ().Name + "\"\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n";
            Multipart.push (ContentDisposition);
            Multipart.push (unescape(encodeURIComponent(JSON.stringify(this.Params[i].GetData ().Data))));
        }
        else
        {
            ContentDisposition = "Content-Disposition: form-data; name=\""+this.Params[i].GetData ().Name+"\"; filename=\""+ this.Params[i].GetData ().FileName + "\"\r\nContent-Type: " + this.Params[i].GetData ().Type + "\r\n\r\n";
            Multipart.push (ContentDisposition);
            Multipart.push (atob (this.Params[i].GetData ().Data));
        }
    }
    
    Multipart.push ("\r\n--"+Boundary+"--");
    
    var RawData = Multipart.join ("");

    this.XHR.setRequestHeader("Content-Length", RawData.length);
	
    var NBytes = RawData.length, Uint8Data = new Uint8Array(NBytes);
    for (var i = 0; i < NBytes; i++)
    {
        Uint8Data[i] = RawData.charCodeAt(i) & 0xff;
    }
    
    this.XHR.send (Uint8Data);
}

Gwt.Core.Request.prototype.SendApplicationXWWWFormUrlEncoded = function ()
{
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
    
    var RawData = "Params="+JSON.stringify (this.Params[0].GetData());
    
    this.XHR.send (RawData);
}

Gwt.Core.Request.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        this.Func(JSON.parse(this.XHR.response));
    }
}

Gwt.Core.Request.prototype.GetCookie = function ()
{
    var Cookies = document.cookie.split(";");
    for (var i = 0; i < Cookies.length; i++)
    {
        var Tmp = Cookies[i].split("=");
        if (Tmp[0]==="SessionId")
        {
            return Tmp[1];
        }
    }
    return null;
}
//End of Gwt::Core::Request
//##########################################################
