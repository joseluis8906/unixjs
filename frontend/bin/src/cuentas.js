cuentas = (function ()
{
var instance;


function cuentas()
{
    Gwt.Gui.Window.call (this, "Cuentas");
    this.SetSize (512, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.cuentas.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
    //this.title_label.SetWidth ();
    this.code = new Gwt.Gui.Entry ("Código");
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

cuentas.prototype.Guardar = function ()
{
    var Data = [
        {
            "Code": this.code.GetText (),
            "Name": this.name.GetText ()
        }
    ];
    
    new Gwt.Core.Request("/backend/cuentas/save/", this.ResponseSave.bind(this), [new Gwt.Core.Parameter (Gwt.Core.PARAM_TYPE_JSON, "Params", Data)]);
    
    this.Reset ();
};

cuentas.prototype.Eliminar = function ()
{
    
};

cuentas.prototype.Reset = function (Res)
{
    if (Res.Result === 1)
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
            Gwt.Core.Contrib.SetActiveApp (window.cuentas);
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
            Gwt.Core.Contrib.RemoveActiveApp ();
        }
    };
};
})();
