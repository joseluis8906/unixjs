giscuvi = (function ()
{
var instance;

//giscuvi constructor
function giscuvi()
{
    Gwt.Gui.Window.call (this, "Hoja De Vida De Envase");

    this.SetSize (640, 420);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/giscuvi/");

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.printer.svg", "Imprimir", this.Print.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.layout = new Gwt.Gui.VBox ();
    this.SetLayout (this.layout);

    this.slider = new Gwt.Gui.Slider (3);
    this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ());
    this.slider.Setup ();

    //slot 1
    this.title1 = new Gwt.Gui.StaticText ("Datos Básicos");
    this.title1.SetWidth (this.slider.GetWidth());
    this.title1.TextAlign (Gwt.Gui.Contrib.TextAlign.Center);
    this.Numero = new Gwt.Gui.Entry ("Número");
    this.NumeroInterno = new Gwt.Gui.Entry ("Número Interno");
    this.Propietario = new Gwt.Gui.Entry ("Propietario");
    this.Material = new Gwt.Gui.Entry ("Lugar");
    this.Capacidad = new Gwt.Gui.Entry ("Capacidad");
    this.ClaseProducto = new Gwt.Gui.Entry ("Clase De Producto");
    this.NormaTecnica = new Gwt.Gui.Entry ("Norma Técnica");

    //slot 2
    this.title2 = new Gwt.Gui.StaticText ("Datos Básicos");
    this.title2.SetWidth (this.slider.GetWidth());
    this.title2.TextAlign (Gwt.Gui.Contrib.TextAlign.Center);
    this.Presion = new Gwt.Gui.Entry ("Presión");
    this.AlturaConValvula = new Gwt.Gui.Entry ("Altura Con Valvula");
    this.PesoConValvula = new Gwt.Gui.Entry ("Peso Con Válvula");
    this.Valvula = new Gwt.Gui.Entry ("Válvula");
    this.TipoValvula = new Gwt.Gui.Entry ("Tipo De Válvula");
    this.AcabadoColor = new Gwt.Gui.Entry ("Acabado Color");

    //slot 3
    this.title3 = new Gwt.Gui.StaticText ("Generalidades Del Envase");
    this.title3.SetWidth (this.slider.GetWidth());
    this.title3.TextAlign (Gwt.Gui.Contrib.TextAlign.Center);
    this.Proveedor = new Gwt.Gui.Entry ("Proveedor");
    this.FechaCompra = new Gwt.Gui.Date ("Compra");
    this.FechaCompra.Now ();
    this.FechaCompra.SetWidth (256);
    this.Garantia = new Gwt.Gui.Entry ("Garantia");
    this.FechaFabricacion = new Gwt.Gui.Date ("Fabricación");
    this.FechaFabricacion.Now ();
    this.FechaFabricacion.SetWidth (256);
    this.PruebaHidrostatica = new Gwt.Gui.SelectBox ("Prueba Hidrostática",[{"Text": "Si", "Value": true}, {"Text": "No", "Value": false}]);
    this.Alquilado = new Gwt.Gui.SelectBox ("Alquilado",[{"Text": "Si", "Value": true}, {"Text": "No", "Value": false}]);
    this.FechaAlquiler = new Gwt.Gui.Date ("Alquiler");
    this.FechaAlquiler.Now ();
    this.FechaAlquiler.SetWidth (256);
    this.Observaciones = new Gwt.Gui.Text ("Observaciones");

    this.layout.Add (this.slider);

    this.slider.AddSlotWidget (0, this.title1);
    this.slider.AddSlotWidget (0, this.Numero);
    this.slider.AddSlotWidget (0, this.NumeroInterno);
    this.slider.AddSlotWidget (0, this.Propietario);
    this.slider.AddSlotWidget (0, this.Material);
    this.slider.AddSlotWidget (0, this.Capacidad);
    this.slider.AddSlotWidget (0, this.ClaseProducto);
    this.slider.AddSlotWidget (0, this.NormaTecnica);
    this.slider.AddSlotWidget (1, this.title2);
    this.slider.AddSlotWidget (1, this.Presion);
    this.slider.AddSlotWidget (1, this.AlturaConValvula);
    this.slider.AddSlotWidget (1, this.PesoConValvula);
    this.slider.AddSlotWidget (1, this.Valvula);
    this.slider.AddSlotWidget (1, this.TipoValvula);
    this.slider.AddSlotWidget (1, this.AcabadoColor);
    this.slider.AddSlotWidget (2, this.title3);
    this.slider.AddSlotWidget (2, this.Proveedor);
    this.slider.AddSlotWidget (2, this.FechaCompra);
    this.slider.AddSlotWidget (2, this.Garantia);
    this.slider.AddSlotWidget (2, this.FechaFabricacion);
    this.slider.AddSlotWidget (2, this.PruebaHidrostatica);
    this.slider.AddSlotWidget (2, this.Alquilado);
    this.slider.AddSlotWidget (2, this.FechaAlquiler);
    this.slider.AddSlotWidget (2, this.Observaciones);

    this.Numero.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.CheckNumber.bind(this));
}

giscuvi.prototype = new Gwt.Gui.Window ();
giscuvi.prototype.constructor = giscuvi;

//giscuvi destructor
giscuvi.prototype._App = function ()
{
    this.title1._StaticText ();
    this.Numero._Entry ();
    this.NumeroInterno._Entry ();
    this.Propietario._Entry ();
    this.Material._Entry ();
    this.Capacidad._Entry ();
    this.ClaseProducto._Entry ();
    this.NormaTecnica._Entry ();
    this.title2._StaticText ();
    this.Presion._Entry ();
    this.AlturaConValvula._Entry ();
    this.Valvula._Entry ();
    this.TipoValvula._Entry ();
    this.AcabadoColor._Entry ();
    this.title3._StaticText ();
    this.Proveedor._Entry ();
    this.FechaCompra._Date ();
    this.Garantia._Entry ();
    this.FechaFabricacion._Date ();
    this.PruebaHidrostatica._SelectBox();
    this.Alquilado._SelectBox ();
    this.FechaAlquiler._Date ();
    this.Observaciones._Text ();

    this.slider._Slider ();
    this.layout._VBox ();

    //this.Report === null ? 0 : this.Report.close ();
    this.title1 = null;
    this.Numero = null;
    this.NumeroInterno = null;
    this.Propietario = null;
    this.Material = null;
    this.Capacidad = null;
    this.ClaseProducto = null;
    this.NormaTecnica = null;
    this.title2 = null;
    this.Presion = null;
    this.AlturaConValvula = null;
    this.Valvula = null;
    this.TipoValvula = null;
    this.AcabadoColor = null;
    this.title3 = null;
    this.Proveedor = null;
    this.FechaCompra = null;
    this.Garantia = null;
    this.FechaFabricacion = null;
    this.PruebaHidrostatica = null;
    this.Alquilado = null;
    this.FechaAlquiler = null;
    this.Observaciones = null;

    //this.date = null;
    this.slider = null;
    this.layout = null;
    this.Report = null;
};

//create data
giscuvi.prototype.CreateData = function ()
{
    var Data = {
        Number: this.number.GetText (),
        Place: this.place.GetText (),
        Date: this.date.GetText ()
    };

    return Data;
};

//insert
giscuvi.prototype.Insert = function ()
{
    var Data = this.CreateData ();
    Data.Method = "Insert";
    this.Rpc.Send (Data, this.InsertResponse.bind(this));
};

//insert response
giscuvi.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Print ();
    }
};

//update
giscuvi.prototype.Update = function (Event)
{
    var Data = this.CreateData ();
    Data.Method = "Update";
    this.Rpc.Send (Data, this.UpdateResponse.bind(this));
};


//update response
giscuvi.prototype.UpdateResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Print();
    }
};

//delete
giscuvi.prototype.Delete = function ()
{
    this.Rpc.Send ({Method: "Delete", Number: this.number.GetText ()}, this.DeleteResponse.bind(this));
};

//delete response
giscuvi.prototype.DeleteResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

//print
giscuvi.prototype.Print = function (Res)
{
    this.Report = Gwt.Core.Contrib.LoadDocument ("/documents/giscuvi.html");
    this.Report.addEventListener ("load", this.ReportLoad.bind (this));
};

//Reset
giscuvi.prototype.Reset = function ()
{
    this.number.SetText ("");
    this.place.SetText ("");
    this.date.Now ();
};

//CheckNumber
giscuvi.prototype.CheckNumber = function (Event)
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
giscuvi.prototype.AutoFill = function (Res)
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
giscuvi.prototype.NextNumber = function (Res)
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
giscuvi.prototype.ReportLoad = function ()
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
            instance = new giscuvi();
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
