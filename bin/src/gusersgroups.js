/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

gusersgroups = ( function ()
{
var instance;

function gusersgroups ()
{
    Gwt.Gui.Window.call (this, "Usuarios y Grupos");

    this.SetSize (256, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/gusersgroups/");

    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);

    this.UserName = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.user.svg", "Nombre De Usuario");
    this.UserName.SetTabIndex(1);

    this.GroupName = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.group.svg", "Nombre De Grupo");
    this.GroupName.SetTabIndex(2);

    this.Layout.Add (this.UserName);
    this.Layout.Add (this.GroupName);
}

gusersgroups.prototype = new Gwt.Gui.Window ();
gusersgroups.prototype.constructor = gusersgroups;

gusersgroups.prototype._App = function ()
{
    this.UserName._IconEntry();
    this.GroupName._IconEntry();
    this.Layout._VBox();

    this.UserName = null;
    this.GroupName = null;
    this.Layout = null;
};

gusersgroups.prototype.Insert = function ()
{
    this.Rpc.Send ({Method: "Insert", UserName: this.UserName.GetText (), GroupName: this.GroupName.GetText ()}, this.InsertResponse.bind (this));
};

gusersgroups.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
    else
    {
        console.log (Res);
    }
};

gusersgroups.prototype.Delete = function ()
{
    this.Rpc.Send ({Method: "Delete", UserName: this.UserName.GetText (), GroupName: this.GroupName.GetText ()}, this.DeleteResponse.bind (this));
};

gusersgroups.prototype.DeleteResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

gusersgroups.prototype.Reset = function ()
{
    this.UserName.SetText ("");
    this.GroupName.SetText ("");
};

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gusersgroups ();
            instance.Open ();
        }
        else
        {
            console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
        }
    }

    this.close = function ()
    {
        if (instance !== undefined)
        {
            instance.Close ();
            instance = undefined;
        }
    }
}
})();
