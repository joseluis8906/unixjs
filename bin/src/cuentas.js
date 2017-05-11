cuentas = (function ()
{
var instance;


function cuentas()
{
    Gwt.Gui.Window.call (this, "Cuentas");
    this.SetSize (512, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/cuentas/");

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    //this.title_label.SetWidth ();
    this.code = new Gwt.Gui.Entry ("Código");
    this.code.AddEvent (Gwt.Gui.Event.Keyboard.KeyUp, this.Select.bind(this));
    this.name = new Gwt.Gui.Entry ("Nombre");
    this.layout = new Gwt.Gui.VBox ();

    this.SetLayout (this.layout);

    this.layout.Add (this.code);
    this.layout.Add (this.name);

}

cuentas.prototype = new Gwt.Gui.Window ();
cuentas.prototype.constructor = cuentas;

cuentas.prototype._App = function ()
{
    this.code._Entry ();
    this.name._Entry ();
    this.layout._VBox ();

    this.code = null;
    this.name = null;
    this.layout = null;
}

cuentas.prototype.Select = function (Event)
{
    if(Event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        this.Rpc.Send ({Method: "Select", Code: this.code.GetText ()}, this.SelectResponse.bind(this));
    }
};

cuentas.prototype.SelectResponse = function (Res)
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

cuentas.prototype.Insert = function (Event)
{
    this.Rpc.Send ({Method: "Insert", Code: this.code.GetText (), Name: this.name.GetText()}, this.InsertResponse.bind(this));
};

cuentas.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

cuentas.prototype.Update = function (Event)
{
    this.Rpc.Send ({Method: "Update", Code: this.code.GetText (), Name: this.name.GetText()}, this.UpdateResponse.bind(this));
};

cuentas.prototype.UpdateResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

cuentas.prototype.Delete = function (Event)
{
    this.Rpc.Send ({Method: "Delete", Code: this.code.GetText ()}, this.DeleteResponse.bind(this));
};

cuentas.prototype.DeleteResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

cuentas.prototype.Reset = function ()
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
            instance = new cuentas();
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
