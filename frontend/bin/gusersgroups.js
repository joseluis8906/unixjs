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
    
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gusersgroups.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
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
}

gusersgroups.prototype.Buscar = function ()
{
}

gusersgroups.prototype.Guardar = function ()
{
    var Params = [
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", [{"User": this.UserName.GetText (), "Group": this.GroupName.GetText ()}])
    ];
    new Gwt.Core.Request ("/backend/gusersgroups/save/", function(response){console.log(response)}, Params);
}

gusersgroups.prototype.Actualizar = function ()
{
}

gusersgroups.prototype.Eliminar = function ()
{
}

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
