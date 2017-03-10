//###################################################################################################
//Gwt::Core::Request
Gwt.Core.UploadFile = function (File, Callback)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/fileupload/", true);
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.Callback = Callback;
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    
    var Boundary = "---------------------------" + Date.now().toString(16);
    this.XHR.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + Boundary);
	
    var Multipart = [];
    var ContentDisposition = "";
    
    Multipart.push ("\r\n--"+Boundary+"\r\n");
    ContentDisposition = "Content-Disposition: form-data; name=\""+File.GetName ()+"\"; filename=\""+ File.GetFileName() + "\"\r\nContent-Type: " + File.GetType() + "\r\n\r\n";
    Multipart.push (ContentDisposition);
    Multipart.push (atob (File.GetData ()));
    
    Multipart.push ("\r\n--"+Boundary+"--");
    
    var RawData = Multipart.join ("");
    console.log(RawData);
    this.XHR.setRequestHeader("Content-Length", RawData.length);
    var NBytes = RawData.length, Uint8Data = new Uint8Array(NBytes);
    for (var i = 0; i < NBytes; i++)
    {
        Uint8Data[i] = RawData.charCodeAt(i) & 0xff;
    }
    this.XHR.send (Uint8Data);
};



Gwt.Core.UploadFile.prototype._UploadFile = function ()
{
    this.XHR = null;
    this.Callback = null;
};



Gwt.Core.UploadFile.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        this.Func(JSON.parse(this.XHR.response));
    }
};
//End of Gwt::Core::Request
//##########################################################
