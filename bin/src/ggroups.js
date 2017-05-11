/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

ggroups = ( function ()
{
var instance;

function ggroups ()
{
    Gwt.Gui.Window.call (this, "Grupos");

    this.SetSize (256, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/ggroups/");

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);

    this.Name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.group.svg", "Nombre");
    this.Name.SetTabIndex(1);

    this.Layout.Add (this.Name);
}

ggroups.prototype = new Gwt.Gui.Window ();
ggroups.prototype.constructor = ggroups;

ggroups.prototype._App = function ()
{
    this.Name._IconEntry ();
    this.Layout._VBox ();

    this.Name = null;
    this.Layout = null;
};

ggroups.prototype.Insert = function ()
{
    this.Rpc.Send ({Method: "Insert", Name: this.Name.GetText ()}, this.InsertResponse.bind (this));
};

ggroups.prototype.InsertResponse = function (Res)
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

ggroups.prototype.Delete = function ()
{
    this.Rpc.Send ({Method: "Delete", Name: this.Name.GetText ()}, this.DeleteResponse.bind (this));
};

ggroups.prototype.DeleteResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

ggroups.prototype.Reset = function ()
{
    this.Name.SetText ("");
};


return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new ggroups ();
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
