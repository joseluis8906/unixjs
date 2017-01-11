//###################################################################################################
//Gwt::Core::Request
Gwt.Core.Request = function (Url, Func, Params)
{
    this.XHR = new XMLHttpRequest ();			
    this.Url = Url;
    this.Func = Func;
    this.Params = Params;
    
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.open ("POST", this.Url, true);
    this.Send ();
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
    
    //var ContentDispositionDocumentType = "Content-Disposition: form-data; name=\"user_info\"; filename=\"document_type.txt\"\r\nContent-Type: \"txt\"\r\n\r\n";

    //this.Multipart.push ("\r\n--"+this.Boundary+"\r\n");
    //var ContentDispositionFile = "Content-Disposition: form-data; name=\"userfile\"; filename=\""+ this.Data.userfile.Name + "\"\r\nContent-Type: " + this.Data.userfile.Type + "\r\n\r\n";
    //this.Multipart.push (ContentDispositionFile);
    
    //this.Multipart.push (atob (this.Data.userfile.Data));
    
}

Gwt.Core.Request.prototype.SendApplicationXWWWFormUrlEncoded = function ()
{
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
	
    var RawData = "data="+JSON.stringify(this.Data);
	
    //this.XHR.send (RawData);
}

Gwt.Core.Request.prototype.Ready = function ()
{
    if (this.XHR.readyState == 4 && this.XHR.status == 200)
    {
        this.Func(JSON.parse(this.XHR.response));
    }
}
//End of Gwt::Core::Request
//##########################################################
