/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Gwt.Core.Session = function (UserName, Password)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/session/", true);
    this.XHR.withCredentials = true;
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.XHR.send ("Method="+JSON.stringify("Start")+"&UserName="+JSON.stringify(UserName)+"&Password="+JSON.stringify(Password));
    console.log ("iniciated");
};

Gwt.Core.Session.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        if (JSON.parse(this.XHR.response).Result === 1)
        {
            console.log (this.XHR.response);
            login.close ();
            gpanel.open ();
            gcontrol.open ();

            RenewSession = setInterval (Gwt.Core.RenewSession, 50000);
            TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 2);

            window.addEventListener ("mousemove", function (){if (TerminateSession !== undefined) {clearTimeout (TerminateSession); TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 2); }});
            window.addEventListener ("keypress", function (){if (TerminateSession !== undefined) {clearTimeout (TerminateSession); TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 2); }});
        }
        else
        {
            console.log ("Error: Username or password incorrect");
        }
    }

};


Gwt.Core.RenewSession = function()
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/session/", true);
    this.XHR.withCredentials = true;
    //this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.XHR.send ("Method="+JSON.stringify("Renew"));
    console.log ("renewed");
};


Gwt.Core.TerminateSession = function()
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/session/", true);
    this.XHR.withCredentials = true;
    //this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.XHR.send ("Method="+JSON.stringify("Terminate"));

    gcontrol.close ();
    gpanel.close ();
    block.open ();

    clearInterval (RenewSession);
    RenewSession = undefined;

    clearTimeout(TerminateSession);
    TerminateSession = undefined;

    var Scripts = document.getElementsByTagName("script");
    var Host = window.location.origin;
    for (var i = 0; i < Scripts.length; i++)
    {
        for (var j = 0; j < window.Gwt.Core.Apps.length; j++)
        {
            if (Scripts[i].src.startsWith(Host+"/bin/"+window.Gwt.Core.Apps[j].Name+".min.js"))
            {
                console.log ("si");
                Scripts[i].remove ();
            }
        }
    }
    window.Gwt.Core.Apps = [];

    console.log ("terminated");
};


Gwt.Core.UnlockSession = function ()
{
    block.close ();
    login.open ();
};
