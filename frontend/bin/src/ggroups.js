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
    
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.ggroups.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
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
}

ggroups.prototype.Buscar = function ()
{
}

ggroups.prototype.Guardar = function ()
{
    var Params = [
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", [{"Name": this.Name.GetText ()}])
    ];
    new Gwt.Core.Request ("/backend/ggroups/save/", function(response){console.log(response)}, Params);
}

ggroups.prototype.Actualizar = function ()
{
}

ggroups.prototype.Eliminar = function ()
{
}

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
