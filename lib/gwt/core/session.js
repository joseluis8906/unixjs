/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Gwt.Core.StartSession = function (UserName, Password)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/session/start/", true);
    this.XHR.onreadystatechange = this.Ready.bind(this);
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.XHR.send ("UserName="+UserName+"&Password="+Password);
};

Gwt.Core.StartSession.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        if (Gwt.Core.Contrib.GetSessionId () !== null)
        {
            console.log (this.XHR.response);
            login.close ();
            gpanel.open ();
            gcontrol.open ();
        
            SessionRenueve = setInterval (Gwt.Core.RenueveSession, 60000);
            SessionTerminate = setTimeout (Gwt.Core.TerminateSession, 60000 * 5);
        
            window.addEventListener ("mousemove", function (){if (SessionTerminate !== undefined) {clearTimeout (SessionTerminate); SessionTerminate = setTimeout (Gwt.Core.TerminateSession, 60000 * 5); }});
            window.addEventListener ("keypress", function (){if (SessionTerminate !== undefined) {clearTimeout (SessionTerminate); SessionTerminate = setTimeout (Gwt.Core.TerminateSession, 60000 * 5); }});
        }
        else
        {
            console.log ("Error: Username or password incorrect");
        }
    }
   
};

Gwt.Core.RenueveSession = function()
{
    if (Gwt.Core.Contrib.GetSessionId () !== null)
    {
        this.XHR = new XMLHttpRequest ();
        this.XHR.open ("GET", "/session/renueve/", true);
        this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //this.XHR.onreadystatechange = this.Ready.bind(this);
        var SessionId = Gwt.Core.Contrib.GetSessionId ();
        if (SessionId !== null)
        {
            this.XHR.setRequestHeader("SessionId",  SessionId);
        }
        this.XHR.send ();
    }
    else
    {
        console.log ("Error: Imposible renueve session");
    }
};

    
Gwt.Core.TerminateSession = function()
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("GET", "/session/terminate/", true);
    //this.XHR.onreadystatechange = this.Ready.bind(this);
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.XHR.send ();
    
    Gwt.Core.Contrib.CloseActiveApp ();
    gpanel.close ();
    block.open ();
    
    clearTimeout(SessionTerminate);
    SessionTerminate = undefined;
    
    clearInterval (SessionRenueve);
    SessionRenueve = undefined;
    
    Gwt.Core.UnlockSession();
};


Gwt.Core.UnlockSession = function ()
{
    block.close ();
    login.open ();
};
