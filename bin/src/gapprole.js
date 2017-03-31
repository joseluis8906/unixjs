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
    this.Rpc = new Gwt.Core.Rpc("/gapprole/");
    
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gapprole.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);
    
    this.Name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.console.svg", "Nombre Del App");
    this.Name.SetTabIndex(1);
    this.Name.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.Select.bind(this));
    
    this.Image = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.image.svg", "Nombre De Imagen");
    this.Image.SetTabIndex(2);
    
    this.Label = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.closedcaption.svg", "Etiqueta");
    this.Label.SetTabIndex(3);
        
    this.Group = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.group.svg", "Grupo");
    this.Group.SetTabIndex(4);
    
    this.Layout.Add (this.Name);
    this.Layout.Add (this.Image);
    this.Layout.Add (this.Label);
    this.Layout.Add (this.Group);
}

gapprole.prototype = new Gwt.Gui.Window ();
gapprole.prototype.constructor = gapprole;

gapprole.prototype._App = function ()
{
    this.Image._IconEntry ();
    this.Label._IconEntry ();
    this.Name._IconEntry ();
    this.Group._IconEntry ();
    this.Layout._VBox ();
    
    this.Image = null;
    this.Label = null;
    this.Name = null;
    this.Group = null;
    this.Layout = null;
};

gapprole.prototype.Select = function (Event)
{
    if(Event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        this.Rpc.Send ({Method: "Select", Name: this.Name.GetText ()}, this.SelectResponse.bind(this));
    }
};

gapprole.prototype.SelectResponse = function (Res)
{
    if (Res.length > 0)
    {
        this.Image.SetText (Res[0].Image);
        this.Label.SetText (Res[0].Label);
        this.Group.SetText (Res[0].Group);
    }
    else
    {
        this.Reset ();
    }
};

gapprole.prototype.Insert = function ()
{
    var Data = {
        Method: "Insert",
        Name: this.Name.GetText (),
        Image: this.Image.GetText (),
        Label: this.Label.GetText (),
        Group: this.Group.GetText ()
    };
    
    this.Rpc.Send (Data, this.InsertResponse.bind(this));
};

gapprole.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
    else if (Res.Error)
    {
        console.log (Res.Error);
    }
};


gapprole.prototype.Update = function ()
{
    var Data = {
        Method: "Update",
        Name: this.Name.GetText (),
        Image: this.Image.GetText (),
        Label: this.Label.GetText (),
        Group: this.Group.GetText ()
    };
    
    this.Rpc.Send (Data, this.UpdateResponse.bind(this));
};


gapprole.prototype.UpdateResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

gapprole.prototype.Delete = function (Res)
{
    this.Rpc.Send ({Method: "Delete", Name: this.Name.GetText()}, this.DeleteResponse.bind(this));
};

gapprole.prototype.DeleteResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

gapprole.prototype.Reset = function ()
{
    this.Image.SetText ("");
    this.Label.SetText ("");
    this.Name.SetText ("");
    this.Group.SetText ("");
};

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gapprole ();
            instance.Open ();
            Gwt.Core.Contrib.SetActiveApp (window.gapprole);
        }
        else
        {
            console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
        }
    };
		
    this.close = function ()
    {
        if (instance !== undefined)
        {
            instance.Close();
            instance = undefined;
            Gwt.Core.Contrib.RemoveActiveApp ();
        } 
    };
};
})();
