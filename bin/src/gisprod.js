gisprod = (function ()
{
var instance;

//gisprod constructor
function gisprod()
{
    Gwt.Gui.Window.call (this, "Producción");

    this.SetSize (640, 420);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/gisprod/");

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.printer.svg", "Imprimir", this.Print.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.layout = new Gwt.Gui.VBox ();
    this.SetLayout (this.layout);

    this.slider = new Gwt.Gui.Slider (2);
    this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ());
    this.slider.Setup ();

    //slot 1
    this.title1 = new Gwt.Gui.StaticText ("Datos Generales");
    this.title1.SetWidth (this.slider.GetWidth());
    this.title1.TextAlign (Gwt.Gui.Contrib.TextAlign.Center);
    this.Producto = new Gwt.Gui.Entry ("Producto");
    this.Lote = new Gwt.Gui.Entry ("Lote");
    this.FechaFabricacion = new Gwt.Gui.Date ("Fabricación");
    this.FechaFabricacion.Now ();
    this.FechaFabricacion.SetWidth (256);
    this.FechaVencimiento = new Gwt.Gui.Date ("Vencimiento");
    this.FechaVencimiento.Now ();
    this.FechaVencimiento.SetWidth (270);
    this.HoraInicial = new Gwt.Gui.Time ("Hora Inicial");
    this.HoraInicial.Now ();
    this.HoraInicial.SetWidth (256);

    //slot 2
    this.title2 = new Gwt.Gui.StaticText ("Datos Específicos");
    this.title2.SetWidth (this.slider.GetWidth());
    this.title2.TextAlign (Gwt.Gui.Contrib.TextAlign.Center);

    this.layout.Add (this.slider);

    this.slider.AddSlotWidget (0, this.title1);
    this.slider.AddSlotWidget (0, this.Producto);
    this.slider.AddSlotWidget (0, this.Lote);
    this.slider.AddSlotWidget (0, this.FechaFabricacion);
    this.slider.AddSlotWidget (0, this.FechaVencimiento);
    this.slider.AddSlotWidget (0, this.HoraInicial);
    this.slider.AddSlotWidget (1, this.title2);
}

gisprod.prototype = new Gwt.Gui.Window ();
gisprod.prototype.constructor = gisprod;

//gisprod destructor
gisprod.prototype._App = function ()
{
    this.title1._StaticText ();
    this.Producto._Entry ();
    this.Lote._Entry ();
    this.FechaFabricacion._Date ();
    this.FechaVencimiento._Date ();
    this.HoraInicial._Time ();
    this.title2._StaticText ();

    this.slider._Slider ();
    this.layout._VBox ();

    //this.Report === null ? 0 : this.Report.close ();
    this.title1 = null;
    this.Producto = null;
    this.Lote = null;
    this.FechaFabricacion = null;
    this.FechaVencimiento = null;
    this.HoraInicial = null;
    this.title2 = null;

    //this.date = null;
    this.slider = null;
    this.layout = null;
    this.Report = null;
};

//create data
gisprod.prototype.CreateData = function ()
{
    var Data = {
        Number: this.number.GetText (),
        Place: this.place.GetText (),
        Date: this.date.GetText ()
    };

    return Data;
};

//insert
gisprod.prototype.Insert = function ()
{
    var Data = this.CreateData ();
    Data.Method = "Insert";
    this.Rpc.Send (Data, this.InsertResponse.bind(this));
};

//insert response
gisprod.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Print ();
    }
};

//update
gisprod.prototype.Update = function (Event)
{
    var Data = this.CreateData ();
    Data.Method = "Update";
    this.Rpc.Send (Data, this.UpdateResponse.bind(this));
};


//update response
gisprod.prototype.UpdateResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Print();
    }
};

//delete
gisprod.prototype.Delete = function ()
{
    this.Rpc.Send ({Method: "Delete", Number: this.number.GetText ()}, this.DeleteResponse.bind(this));
};

//delete response
gisprod.prototype.DeleteResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

//print
gisprod.prototype.Print = function (Res)
{
    this.Report = Gwt.Core.Contrib.LoadDocument ("/documents/gisprod.html");
    this.Report.addEventListener ("load", this.ReportLoad.bind (this));
};

//Reset
gisprod.prototype.Reset = function ()
{
    this.number.SetText ("");
    this.place.SetText ("");
    this.date.Now ();
};

//CheckNumber
gisprod.prototype.CheckNumber = function (Event)
{
    if(Event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        if (this.number.GetText () === "")
        {
            this.Rpc.Send ({Method: "NextNumber"}, this.NextNumber.bind(this));
        }
        else
        {
            this.Rpc.Send ({Method: "AutoFill", Number: this.number.GetText ()}, this.AutoFill.bind(this));
        }
    }
};

//autofill
gisprod.prototype.AutoFill = function (Res)
{
    if (Res.length > 0)
    {
        this.number.SetText (Res[0].Number);
        this.place.SetText (Res[0].Place);
        this.date.SetDate (Res[0].Date);
    }
    else
    {
        this.Reset ();
    }
};

//next number
gisprod.prototype.NextNumber = function (Res)
{
    if (Res.length > 0)
    {
        this.number.SetText(Number(Res[0].Number)+1);
    }
    else
    {
        this.number.SetText(Number(1));
    }
};

//report load
gisprod.prototype.ReportLoad = function ()
{
    var doc = this.Report.document;//this.Report.contentWindow.document;
    doc.getElementById ("Number").textContent = Gwt.Core.Contrib.ZFill(this.number.GetText(), 4);
    doc.getElementById ("Place").textContent = this.place.GetText()+", "+this.date.GetText ();
    doc.getElementById ("Holder").textContent = this.holder.GetText ();

    doc = undefined;
    this.Report = null;
    this.Reset ();
};

return new function ()
{
    this.open = function()
    {
        if(instance === undefined)
        {
            instance = new gisprod();
            instance.Open ();
        }
        else
        {
            console.log ("%app yet opened".replace("%app", instance.__proto__.constructor.name));
        }
    }

    this.close = function ()
    {
        if(instance !== undefined)
        {
            instance.Close();
            instance = undefined;
        }
    }
}
})();
