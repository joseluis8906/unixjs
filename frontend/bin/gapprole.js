/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

gapprole = ( function ()
{
var instance;

function gapprole () 
{
    Gwt.Gui.Window.call (this, "App Y Grupo");
	
    this.SetSize (256, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gapprole.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);
    
    this.Image = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.image.svg", "Nombre De Imagen");
    this.Image.SetTabIndex(1);
    
    this.Label = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.closedcaption.svg", "Etiqueta");
    this.Label.SetTabIndex(2);
    
    this.Name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.console.svg", "Nombre Del App");
    this.Name.SetTabIndex(2);
    
    this.Group = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.group.svg", "Grupo");
    this.Group.SetTabIndex(2);
    
    this.Layout.Add (this.Image);
    this.Layout.Add (this.Label);
    this.Layout.Add (this.Name);
    this.Layout.Add (this.Group);
}

gapprole.prototype = new Gwt.Gui.Window ();
gapprole.prototype.constructor = gapprole;

gapprole.prototype._App = function ()
{
}

gapprole.prototype.Buscar = function ()
{
}

gapprole.prototype.Guardar = function ()
{
    var Params = [
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", [{"Image": this.Image.GetText (), "Label": this.Label.GetText (), "Name": this.Name.GetText (), "Group": this.Group.GetText ()}])
    ];
    new Gwt.Core.Request ("/backend/gapprole/save/", function(response){console.log(response)}, Params);
}

gapprole.prototype.Actualizar = function ()
{
}

gapprole.prototype.Eliminar = function ()
{
}

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gapprole ();
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
