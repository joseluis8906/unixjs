//###################################################################################################
//Gwt::Core::Request
Gwt.Core.Upload = function (File, Callback)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/upload/", true);
    this.XHR.withCredentials = true;
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.Callback = Callback || function(Res){console.log (Res);};  
    
    var Boundary = "---------------------------" + Date.now().toString(16);
    this.XHR.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + Boundary);
    
    var Multipart = [];
    var ContentDisposition = "";
    var ContentType = "";
    
    Multipart.push ("\r\n--"+Boundary+"\r\n");
    
    ContentDisposition = "Content-Disposition: form-data; name=\""+File.GetName()+"\"; filename=\""+ File.GetFileName()+ "\"\r\n";
    ContentType = "Content-Type: " + File.GetMimeType() + "\r\n\r\n";
    
    Multipart.push (ContentDisposition);
    Multipart.push (ContentType);
    Multipart.push (atob (File.GetData()));
    
    Multipart.push ("\r\n--"+Boundary+"--");
    
    var RawData = Multipart.join ("");
    
    console.log(RawData);

    var NBytes = RawData.length, Uint8Data = new Uint8Array(NBytes);
    for (var i = 0; i < NBytes; i++)
    {
        Uint8Data[i] = RawData.charCodeAt(i) & 0xff;
    }
    this.XHR.send (Uint8Data);
};



Gwt.Core.Upload.prototype._Upload = function ()
{
    this.XHR = null;
    this.Callback = null;
};



Gwt.Core.Upload.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        console.log (this.XHR.response);
        this.Callback (JSON.parse(this.XHR.response));
    }
};
//End of Gwt::Core::Request
//##########################################################
