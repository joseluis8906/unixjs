cedeg = (function ()
{
var instance;

function record_widget ()
{
    Gwt.Gui.HBox.call (this, 0);
    
    this.SetClassName ("record_widget");
    
    this.code = new Gwt.Gui.Entry ("Código");
    this.name = new Gwt.Gui.StaticText ("Nombre");
    this.partial = new Gwt.Gui.Entry ("Parcial");
    this.partial.ChangeToMonetary();
    this.debit = new Gwt.Gui.Entry ("Debe");
    this.debit.ChangeToMonetary();
    this.credit = new Gwt.Gui.Entry ("Haber");
    this.credit.ChangeToMonetary();
    
    this.col1 = new Gwt.Gui.VBox (0);
    this.col2 = new Gwt.Gui.VBox (0);
    this.col3 = new Gwt.Gui.VBox (0);
    this.col4 = new Gwt.Gui.VBox (0);
    this.col5 = new Gwt.Gui.VBox (0);
        
    this.Add (this.col1);
    this.Add (this.col2);
    this.Add (this.col3);
    this.Add (this.col4);
    this.Add (this.col5);
        
    this.col1.Add (this.code);
    this.col2.Add (this.name);
    this.col3.Add (this.partial);
    this.col4.Add (this.debit);
    this.col5.Add (this.credit);
    
    this.code.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.check_code.bind(this));
}

record_widget.prototype = new Gwt.Gui.HBox ();
record_widget.prototype.constructor = record_widget;

record_widget.prototype._record_widget = function ()
{
    this.code._Entry();
    this.name._StaticText();
    this.partial._Entry();
    this.debit._Entry();
    this.credit._Entry();
    this.col1._VBox();
    this.col2._VBox();
    this.col3._VBox();
    this.col4._VBox();
    this.col5._VBox();
    
    this.code = null;    
    this.name = null;    
    this.partial = null;
    this.debit = null;
    this.credit = null;
    this.col1 = null;
    this.col2 = null;
    this.col3 = null;
    this.col4 = null;
    this.col5 = null;
}
    
record_widget.prototype.Reset = function ()
{
    this.code.Reset ();
    this.name.SetText ("Nombre");
    this.partial.Reset ();
    this.debit.Reset ();
    this.credit.Reset ();
}



record_widget.prototype.check_code = function (event)
{
    if(event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        new Gwt.Core.Request("/backend/cuentas/select/", this.autocomplete.bind(this), [new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", {"Code": this.code.GetText ()})]);
    }
}



record_widget.prototype.autocomplete = function (Res)
{
    if (Res.Data.length === 1)
    {
        this.name.SetText (Res.Data[0].Name);
    }
    else
    {
        this.name.SetText ("Nombre");
    }
}



function cedeg()
{
    Gwt.Gui.Window.call (this, "Comprobante De Egreso");
          
    this.SetSize (450, 460);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.cedeg.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
         
    this.layout = new Gwt.Gui.VBox ();
    this.SetLayout (this.layout);
     
    this.slider = new Gwt.Gui.Slider (3);
    this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ());
    this.slider.Setup ();
        
    this.number = new Gwt.Gui.Entry ("Número");
    this.place = new Gwt.Gui.Entry ("Lugar");
    this.date = new Gwt.Gui.Date ("Creación");
    this.date.Now ();
    this.holder = new Gwt.Gui.Entry ("A Favor De");
    this.amount = new Gwt.Gui.Entry ("Valor");
    this.amount.ChangeToMonetary();
    this.bank = new Gwt.Gui.Entry ("Banco");
    this.check = new Gwt.Gui.Entry ("Cheque");
    this.checking_account = new Gwt.Gui.Entry ("Cuenta");
    this.concept = new Gwt.Gui.Text ("Concepto");
    this.records = [];
    this.update = false;
        
    this.layout.Add (this.slider);
        
    for (var i = 0; i < 20; i++)
    {
        this.records[i] = new record_widget (this.slider.GetWidth (), 24);
    }
         
    this.slider.AddSlotWidget (0, this.number);
    this.slider.AddSlotWidget (0, this.place);
    this.slider.AddSlotWidget (0, this.date);
    this.slider.AddSlotWidget (0, this.holder);
    this.slider.AddSlotWidget (0, this.amount);
    this.slider.AddSlotWidget (0, this.bank);
    this.slider.AddSlotWidget (0, this.check);
    this.slider.AddSlotWidget (0, this.checking_account);
    this.slider.AddSlotWidget (0, this.concept);
        
    for (var i=0; i<this.records.length; i++)
    {
        if (i<=9)
        {
            this.slider.AddSlotWidget (1, this.records[i]);
        }
        else
        {
            this.slider.AddSlotWidget (2, this.records[i]);
        }
    }
    
}

cedeg.prototype = new Gwt.Gui.Window ();
cedeg.prototype.constructor = cedeg;
    
cedeg.prototype._App = function ()
{
    this.number._Entry ();
    this.place._Entry ();
    this.date._Date ();
    this.holder._Entry ();
    this.amount._Entry ();
    this.bank._Entry ();
    this.check._Entry ();
    this.checking_account._Entry ();
    this.concept._Text ();
    this.slider._Slider ();
    
    this.number = null;
    this.place = null;
    this.date = null;
    this.holder = null;
    this.amount = null;
    this.bank = null;
    this.check = null;
    this.checking_account = null;
    this.concept = null;
    this.slider = null;
        
    for(var i = 0; i < this.records.length; i++)
    {
        this.records[i]._record_widget();
        this.records[i] = null;
    }
    this.records = null;
    
    this.layout._VBox ();
    this.layout = null;
}

cedeg.prototype.Guardar = function ()
{
    var Records = [];
    for (var i=0; i < this.records.length; i++)
    {
        if (this.records[i].code.GetText() !== "")
        {
            Records.push({
                "Code": this.records[i].code.GetText (),
                "Name": this.records[i].name.GetText (),
                "Partial": this.records[i].partial.GetText (),
                "Debit": this.records[i].debit.GetText (),
                "Credit": this.records[i].credit.GetText()
            });
        }
    }
    
    var Data = [
        {
            "Number": this.number.GetText (),
            "Place": this.place.GetText (),
            "Date": this.date.GetDate (),
            "Holder": this.holder.GetText (),
            "Amount": this.amount.GetText (),
            "Bank": this.bank.GetText (),
            "Check": this.check.GetText (),
            "CheckingAccount": this.checking_account.GetText (),
            "Concept": this.concept.GetText (),
            "Records": Records
        }
    ];
    
    new Gwt.Core.Request("/backend/cedeg/save/", function(response){console.log(response);}, [new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", Data)]);
    
    window.open("/share/documents/cedeg.html?number=%0".replace("%0", this.number.GetText()));
    
    this.Reset ();
}

cedeg.prototype.Eliminar = function ()
{
    
}

cedeg.prototype.Reset = function ()
{
    this.number.SetText ("");
    this.place.SetText ("");
    this.date.Now ();
    this.holder.SetText ("");
    this.amount.SetText ("");
    this.bank.SetText ("");
    this.check.SetText ("");
    this.checking_account.SetText ("");
    this.concept.SetText ("");
    
    for(var i = 0; i < this.records.length; i++)
    {
        this.records[i].Reset ();
    }
}

return new function ()
{
    this.open = function()
    {
        if(instance === undefined)
        {
            instance = new cedeg ();
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
