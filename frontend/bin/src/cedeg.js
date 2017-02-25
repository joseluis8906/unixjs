cedeg = (function ()
{
var instance;

function record_widget (Width, Heigth)
{
    Gwt.Gui.HBox.call (this, 0);
    this.SetSize (Width, Heigth);
    this.SetClassName ("record_widget");
    
    this.code = new Gwt.Gui.Entry ("Código");
    this.code.SetExpand (false);
    this.code.SetWidth (120);
    this.name = new Gwt.Gui.StaticText ("Nombre");
    this.name.SetExpand (false);
    this.name.SetWidth (this.GetWidth() - 480);
    this.name.SetValign (Gwt.Gui.Contrib.Valign.Middle);
    this.partial = new Gwt.Gui.Entry ("Parcial");
    this.partial.SetExpand (false);
    this.partial.SetWidth (120);
    this.partial.ChangeToMonetary();
    this.debit = new Gwt.Gui.Entry ("Debe");
    this.debit.SetExpand (false);
    this.debit.SetWidth (120);
    this.debit.ChangeToMonetary();
    this.credit = new Gwt.Gui.Entry ("Haber");
    this.credit.SetExpand (false);
    this.credit.SetWidth (120);
    this.credit.ChangeToMonetary();
        
    this.Add (this.code);
    this.Add (this.name);
    this.Add (this.partial);
    this.Add (this.debit);
    this.Add (this.credit);
    
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
        
    this.code = null;    
    this.name = null;    
    this.partial = null;
    this.debit = null;
    this.credit = null;
};
    
record_widget.prototype.Reset = function ()
{
    this.code.Reset ();
    this.name.SetText ("Nombre");
    this.partial.Reset ();
    this.debit.Reset ();
    this.credit.Reset ();
};



record_widget.prototype.check_code = function (event)
{
    if(event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        var Query = "SELECT \"Name\" FROM \"AccountingAccount\" WHERE \"Code\"='{0}'".replace("{0}", this.code.GetText());
        new Gwt.Core.SqlQuery (Query, this.autocomplete.bind(this));
    }
};



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
};



function cedeg()
{
    Gwt.Gui.Window.call (this, "Comprobante De Egreso");
          
    this.SetSize (840, 460);
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
    this.Report = null;
        
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
    
    this.number.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.CheckNumber.bind(this));
    
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
    this.Report === null ? 0 : this.Report.close ();
    
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
    this.Report = null;
};

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
            "Date": this.date.GetText (),
            "Holder": this.holder.GetText (),
            "Amount": this.amount.GetText (),
            "Bank": this.bank.GetText (),
            "Check": this.check.GetText (),
            "CheckingAccount": this.checking_account.GetText (),
            "Concept": this.concept.GetText (),
            "Records": Records
        }
    ];
    
    new Gwt.Core.Request("/backend/cedeg/save/", this.SaveResponse.bind (this), [new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", Data)]);
};

cedeg.prototype.Eliminar = function ()
{
    
};

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
};

cedeg.prototype.CheckNumber = function (Event)
{
    if(Event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        if (this.number.GetText () === "")
        {
            var Query = "SELECT \"Number\" FROM \"AccountingDisbVou\" ORDER BY \"Number\" DESC LIMIT 1";
            new Gwt.Core.SqlQuery(Query, this.NextNumber.bind(this));
        }
        else
        {
            var Query = "SELECT \"Number\", \"Place\", \"Date\", \"Holder\", \"Concept\", \"Bank\", \"Check\", \"CheckingAccount\", \"Amount\", \"Code\", \"Name\", \"Partial\", \"Debit\", \"Credit\" FROM public.\"AccountingDisbVouAll\"";
            new Gwt.Core.SqlQuery(Query, this.AutoFill.bind(this));
        }
    }
};

cedeg.prototype.AutoFill = function (Res)
{
    if (Res.Data.length > 0)
    {
        this.number.SetText (Res.Data[0].Number);
        this.place.SetText (Res.Data[0].Place);
        this.date.Now ();
        this.holder.SetText (Res.Data[0].Holder);
        this.amount.SetText (Res.Data[0].Amount);
        this.bank.SetText (Res.Data[0].Bank);
        this.check.SetText (Res.Data[0].Check);
        this.checking_account.SetText (Res.Data[0].CheckingAccount);
        this.concept.SetText (Res.Data[0].Concept);
    
        for (var i = 0; i < Res.Data.length; i++)
        {
            this.records[i].code.SetText (Res.Data[0].Code);
            this.records[i].name.SetText (Res.Data[0].Name);
            this.records[i].partial.SetText (Res.Data[0].Partial);
            this.records[i].debit.Reset.SetText (Res.Data[0].Debit);
            this.records[i].credit.Reset.SetText (Res.Data[0].Credit);
        }
        for (i; i < this.records.length; i++)
        {
            this.records[i].Reset();
        }
    }
};


cedeg.prototype.NextNumber = function (Res)
{
    this.number.SetText(Number(Res.Data[0].Number)+1);
};


cedeg.prototype.SaveResponse = function (Res)
{
    if (Res.Result === 1)
    {
        this.Report = Gwt.Core.Contrib.LoadDocument ("/share/documents/cedeg.html");
        this.Report.addEventListener ("load", this.ReportLoad.bind (this));
    }
};


cedeg.prototype.ReportLoad = function ()
{
    var doc = this.Report.contentWindow.document;
    doc.getElementById ("Number").textContent = this.number.GetText();
    doc.getElementById ("Place").textContent = this.place.GetText()+", "+this.date.GetText ();
    doc.getElementById ("Holder").textContent = this.holder.GetText ();
    doc.getElementById ("AmountHuman").textContent = Gwt.Core.Contrib.NumberToHumanReadable (this.amount.GetText())+"PESOS MTE";
    doc.getElementById ("Bank").textContent = this.bank.GetText ();
    doc.getElementById ("Check").textContent = this.check.GetText ();
    doc.getElementById ("CheckingAccount").textContent = this.checking_account.GetText ();
    doc.getElementById ("Concept").textContent = this.concept.GetText ();
    doc.getElementById ("Amount").textContent = this.amount.GetText ();
    
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
    
    for (var i=0; i < Records.length; i++)
    {
        doc.getElementById ("Code"+i).textContent = Records[i].Code;
        doc.getElementById ("Name"+i).textContent = Records[i].Name;
        doc.getElementById ("Partial"+i).textContent = Records[i].Partial;
        doc.getElementById ("Debit"+i).textContent = Records[i].Debit;
        doc.getElementById ("Credit"+i).textContent = Records[i].Credit;
    }
    
    for (i; i < this.records.length; i++)
    {
        doc.getElementById ("Code"+i).textContent = "";
        doc.getElementById ("Name"+i).textContent = "";
        doc.getElementById ("Partial"+i).textContent = "";
        doc.getElementById ("Debit"+i).textContent = "";
        doc.getElementById ("Credit"+i).textContent = "";
    }
    
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
            instance = new cedeg();
            instance.Open ();
            Gwt.Core.Contrib.SetActiveApp (window.cedeg);
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
            Gwt.Core.Contrib.RemoveActiveApp ();
        }
    }
}
})();
