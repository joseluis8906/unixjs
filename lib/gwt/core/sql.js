/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Gwt.Core.SqlQuery = function (Statements, Callback)
{
    var Stms = "";
    if(Statements instanceof Gwt.Core.PrepareStatement)
    {
        Stms = Statements.GetText();
    }
    else if (Statements instanceof Array)
    {
        for (var i=0; i<Statements.length; i++)
        {
            Stms= Stms + Statements[i].GetText();
        }
    }
    else
    {
        console.log ("Error sql statement incorrect");
    }
    
    this.XHR = new XMLHttpRequest ();
    this.XHR.open ("POST", "/query/", true);
    this.XHR.onreadystatechange = this.Ready.bind(this);
    this.Callback = Callback;
    var SessionId = Gwt.Core.Contrib.GetSessionId ();
    if (SessionId !== null)
    {
        this.XHR.setRequestHeader("SessionId",  SessionId);
    }
    this.XHR.setRequestHeader("Content-Type", "application\/x-www-form-urlencoded");
    this.XHR.send ("Query="+Stms);
};

Gwt.Core.SqlQuery.prototype.Ready = function ()
{
    if (this.XHR.readyState === 4 && this.XHR.status === 200)
    {
        console.log (this.XHR.response);
        this.Callback (JSON.parse(this.XHR.response));
    }
};



Gwt.Core.PrepareStatement = function (Stm)
{
    //this.Stm = Stm.replace(/=/g, encodeURIComponent("="));
    this.Stm = Stm;
};

Gwt.Core.PrepareStatement.prototype.SetString = function (Value)
{
    if (Value==="")
    {
        this.Stm = this.Stm.replace ("?", " ");
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
        this.Stm = this.Stm.replace ("?", "0");
    }
    else
    {
        this.Stm = this.Stm.replace ("?", "{0}".replace("{0}", Value));
    }
};

Gwt.Core.PrepareStatement.prototype.GetText = function ()
{
    return this.Stm;
};