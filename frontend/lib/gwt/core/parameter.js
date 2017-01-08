//###################################################################################################
//Gwt::Core::Param
Gwt.Core.Parameter = function (Type, Data)
{
    this.Type = Type === Gwt.Core.PARAM_TYPE_TEXT? Type : Gwt.Core.PARAM_TYPE_FILE;
    this.Data = Data;
}

Gwt.Core.Parameter.prototype._Parameter = function ()
{
    this.Type = null;
    this.Data = null;
}

Gwt.Core.Parameter.prototype.GetType = function ()
{
    return this.Type;
}

Gwt.Core.Parameter.prototype.GetData = function ()
{
    return this.Data;
}