/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Gwt.Core.Session = function (UserName, Password)
{
    this.UserName = UserName;
    /*
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/session/", true);
    this.XHR.withCredentials = true;
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.XHR.send ("Method="+JSON.stringify("Start")+"&UserName="+JSON.stringify(UserName)+"&Password="+JSON.stringify(Password));

    console.log ("session iniciated");
    */
    var Rpc = new Gwt.Core.Rpc ("/session/");
    Rpc.Send ({Method: "Start", UserName: UserName, Password: Password}, this.Ready.bind(this));
};

Gwt.Core.Session.prototype.Ready = function (Res)
{
    if (Res.Result === 1)
    {
        console.log ("Session iniciated");
        sessionStorage.setItem("user", this.UserName);
        login.close ();
        gpanel.open ();
        gcontrol.open ();

        //RenewSession = setInterval (Gwt.Core.RenewSession, 50000);
        TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 5);

        window.addEventListener ("mousemove", function (){if (TerminateSession !== undefined) {clearTimeout (TerminateSession); TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 2); }});
        window.addEventListener ("keypress", function (){if (TerminateSession !== undefined) {clearTimeout (TerminateSession); TerminateSession = setTimeout (Gwt.Core.TerminateSession, 60000 * 2); }});
    }
    else
    {
        console.log ("Error: Username or password incorrect");
    }
};


Gwt.Core.RenewSession = function()
{
    /*
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/session/", true);
    this.XHR.withCredentials = true;
    //this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.XHR.send ("Method="+JSON.stringify("Renew"));
    console.log ("renewed");
    */

    var Rpc = new Gwt.Core.Rpc ("/session/");
    Rpc.Send ({Method: "Renew"}, function(data){console.log("Renew")});

};


Gwt.Core.TerminateSession = function()
{
    this.UserName = "";
    sessionStorage.setItem("user", this.UserName);
    /*
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/session/", true);
    this.XHR.withCredentials = true;
    //this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.XHR.send ("Method="+JSON.stringify("Terminate"));

    gcontrol.close ();
    gpanel.close ();
    block.open ();

    //clearInterval (RenewSession);
    //RenewSession = undefined;

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

    console.log ("session terminated");
    */


    var Rpc = new Gwt.Core.Rpc ("/session/");
    Rpc.Send ({Method: "Terminate"}, function(Res){

      if (Res.Result===1)
      {
          gcontrol.close ();
          gpanel.close ();
          block.open ();

          //clearInterval (RenewSession);
          //RenewSession = undefined;

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

          console.log ("session terminated");
      }
      else
      {
          console.log ("terminated failed");
      }

    });
};


Gwt.Core.UnlockSession = function ()
{
    block.close ();
    login.open ();
};
