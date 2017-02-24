/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Gwt.Core.SqlStatement = function (DbUrl, Stm, Callback)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", DbUrl, true);
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.overrideMimeType("application/json");
    this.Callback = Callback;
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
    this.XHR.send ("Params="+Stm);
};

Gwt.Core.SqlStatement.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        this.Callback (JSON.parse(this.XHR.response));
    }
};