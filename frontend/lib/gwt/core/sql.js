/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Gwt.Core.SqlStatement = function (Statements, Callback)
{
    if(Statements instanceof Array === false)
    {
        console.log ("El parametro debe ser un array");
        return false;
    }
    
    var Stms = [];
    for (var i=0; i<Statements.length; i++)
    {
        Stms.push(Statements[i].GetStm());
    }
    
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/backend/statement/", true);
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.overrideMimeType("application/json");
    this.Callback = Callback;
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
    this.XHR.send ("Params="+JSON.stringify({"Statement": Stms}));
};

Gwt.Core.SqlStatement.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        this.Callback (JSON.parse(this.XHR.response));
    }
};



Gwt.Core.SqlQuery = function (Query, Callback)
{
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/backend/query/", true);
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.XHR.overrideMimeType("application/json");
    this.Callback = Callback;
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
    this.XHR.send ("Params="+JSON.stringify({"Query": Query.replace(/=/g, encodeURIComponent("="))}));
};

Gwt.Core.SqlQuery.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        this.Callback (JSON.parse(this.XHR.response));
    }
};


Gwt.Core.PrepareStatement = function (Stm)
{
    this.Stm = Stm.replace(/=/g, encodeURIComponent("="));
};

Gwt.Core.PrepareStatement.prototype.SetString = function (Value)
{
    if (Value==="")
    {
        this.Stm = this.Stm.replace ("?", "NULL");
    }
    else
    {
        this.Stm = this.Stm.replace ("?", "'{0}'".replace("{0}", Value));
    }
};

Gwt.Core.PrepareStatement.prototype.SetNumber = function (Value)
{
    if (Value==="")
    {
        this.Stm = this.Stm.replace ("?", "NULL");
    }
    else
    {
        this.Stm = this.Stm.replace ("?", "{0}".replace("{0}", Value));
    }
};

Gwt.Core.PrepareStatement.prototype.GetStm = function ()
{
    return this.Stm;
};