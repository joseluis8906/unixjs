/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
Gwt.Core.Rpc = function (Url)
{
    this.Url = Url;
}

Gwt.Core.Rpc.prototype.Send = function (Args, Callback)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", this.Url, true);
    this.XHR.withCredentials = true;
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.Callback = Callback || function (Data){console.log (Data);};
    this.XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var QueryString = "";

    var Keys = Object.keys(Args);

    for (var i=0; i<Keys.length; i++)
    {
        var Value = Args[Object.keys(Args)[i]];

        QueryString += Keys[i]+"="+JSON.stringify(Value);

        if (i<Keys.length-1)
        {
            QueryString+="&";
        }
    }

    this.XHR.send (QueryString);
};

Gwt.Core.Rpc.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        //console.log (this.XHR.response);
        this.Callback (JSON.parse(this.XHR.response));
    }
};
*/

Gwt.Core.Rpc = function (Url)
{
    this.Url = Url;
}

Gwt.Core.Rpc.prototype.Send = function (Args, Callback)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", this.Url, true);
    this.XHR.withCredentials = true;
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.Callback = Callback || function (Data){console.log (Data);};
    this.XHR.setRequestHeader("Content-Type", "application/json");

    this.XHR.send (JSON.stringify(Args));
};

Gwt.Core.Rpc.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        console.log (this.XHR.response);
        this.Callback (JSON.parse(this.XHR.response));
    }
};
