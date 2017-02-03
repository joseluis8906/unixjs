//###################################################################################################
//Gwt::Core::Param
Gwt.Core.Parameter = function (Type, Name, Data)
{
    this.Type = Type === Gwt.Core.PARAM_TYPE_JSON ? Type : Gwt.Core.PARAM_TYPE_FILE;
    this.Name = Name;
    this.Data = Data;
}

Gwt.Core.Parameter.prototype._Parameter = function ()
{
    this.Type = null;
    this.Name = null;
    this.Data = null;
}

Gwt.Core.Parameter.prototype.GetType = function ()
{
    return this.Type;
}

Gwt.Core.Parameter.prototype.GetName = function ()
{
    return this.Name;
}

Gwt.Core.Parameter.prototype.GetData = function ()
{
    return this.Data;
}
