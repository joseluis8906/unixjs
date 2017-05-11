accountingcompany = (function ()
{
var instance;


function accountingcompany()
{
    Gwt.Gui.Window.call (this, "Información de la Empresa");
    this.SetSize (512, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/accountingcompany/");

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    //this.title_label.SetWidth ();
    this.nit = new Gwt.Gui.Entry ("Nit");
    this.code.AddEvent (Gwt.Gui.Event.Keyboard.KeyUp, this.Select.bind(this));
    this.name = new Gwt.Gui.Entry ("Nombre");
    this.phone = new Gwt.Gui.Entry ("Teléfono");
    this.movil = new Gwt.Gui.Entry ("Celular");
    this.address = new Gwt.Gui.Entry ("Dirección");
    this.layout = new Gwt.Gui.VBox ();

    this.SetLayout (this.layout);

    this.layout.Add (this.nit);
    this.layout.Add (this.name);
    this.layout.Add (this.phone);
    this.layout.Add (this.movil);
    this.layout.Add (this.address);
}

accountingcompany.prototype = new Gwt.Gui.Window ();
accountingcompany.prototype.constructor = accountingcompany;

accountingcompany.prototype._App = function ()
{
    this.nit._Entry ();
    this.name._Entry ();
    this.phone._Entry ();
    this.movil._Entry ();
    this.address._Entry ();
    this.layout._VBox ();

    this.nit = null;
    this.name = null;
    this.phone = null;
    this.movil = null;
    this.address = null;
    this.layout = null;
}

accountingcompany.prototype.Select = function (Event)
{
    if(Event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        this.Rpc.Send ({Method: "Select", Nit: this.nit.GetText ()}, this.SelectResponse.bind(this));
    }
};

accountingcompany.prototype.SelectResponse = function (Res)
{
    if (Res.length > 0)
    {
        this.name.SetText (Res[0].Name);
        this.phone.SetText (Res[0].Phone);
        this.movil.SetText (Res[0].Movil);
        this.address.SetText (Res[0].Address);
    }
    else
    {
        this.Reset();
    }
};

accountingcompany.prototype.Insert = function (Event)
{
    this.Rpc.Send (
    {
      Method: "Insert",
      Nit: this.nit.GetText (),
      Name: this.name.GetText(),
      Phone: this.phone.GetText (),
      Movil: this.movil.GetText (),
      Address: this.address.GetText ()
    },

    this.InsertResponse.bind(this));
};

accountingcompany.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

accountingcompany.prototype.Update = function (Event)
{
    this.Rpc.Send (
    {
      Method: "Update",
      Nit: this.nit.GetText (),
      Name: this.name.GetText(),
      Phone: this.phone.GetText (),
      Movil: this.movil.GetText (),
      Address: this.address.GetText ()
    },

    this.UpdateResponse.bind(this));
};

accountingcompany.prototype.UpdateResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

accountingcompany.prototype.Reset = function ()
{
    this.nit.SetText ("");
    this.name.SetText ("");
    this.phone.SetText ("");
    this.movil.SetText ("");
    this.address.SetText ("");
};

return new function ()
{
    this.open = function()
    {
        if(instance === undefined)
        {
            instance = new accountingcompany();
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
