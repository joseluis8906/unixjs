cafet = (function ()
{

var instance;

//app
function cafet()
{
    Gwt.Gui.Window.call (this, "Cafetería");
    this.SetSize (800, 544);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/cafet/");

    this.EnableMenu ();
    //this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    //this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    //this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.layout = new Gwt.Gui.HBox (0);
    this.SetLayout (this.layout);

    this.Tablero = new Gwt.Gui.Image(Gwt.Core.Contrib.Host + Gwt.Core.Contrib.Share + "/images/tablero.svg");
    this.Tablero.SetSize (this.layout.GetWidth(), this.layout.GetHeight());

    this.layout.Add (this.Tablero);
}

cafet.prototype = new Gwt.Gui.Window ();
cafet.prototype.constructor = cafet;

cafet.prototype._App = function ()
{
    this.layout._HBox ();

    this.layout = null;
}

cafet.prototype.Select = function (Event)
{
    if(Event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        this.Rpc.Send ({Method: "Select", Code: this.code.GetText ()}, this.SelectResponse.bind(this));
    }
};

cafet.prototype.SelectResponse = function (Res)
{
    if (Res.length > 0)
    {
        this.name.SetText (Res[0].Name);
    }
    else
    {
        this.Reset();
    }
};

cafet.prototype.Reset = function ()
{
    this.code.SetText ("");
    this.name.SetText ("");
};

return new function ()
{
    this.open = function()
    {
        if(instance === undefined)
        {
            instance = new cafet();
            instance.Open ();
        }
        else
        {
            console.log ("%app yet opened".replace("%app", instance.__proto__.constructor.name));
        }
    };

    this.close = function ()
    {
        if(instance !== undefined)
        {
            instance.Close();
            instance = undefined;
        }
    };
};
})();
