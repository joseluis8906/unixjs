cedeg = (function ()
{
var instance;

//record widget constructor
function record_widget (Width, Heigth)
{
    Gwt.Gui.HBox.call (this, 0);
    this.SetSize (Width, Heigth);
    this.SetClassName ("record_widget");
    this.Rpc = new Gwt.Core.Rpc ("/cedeg/");
    
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

//record widget destructor
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

//reset    
record_widget.prototype.Reset = function ()
{
    this.code.Reset ();
    this.name.SetText ("Nombre");
    this.partial.Reset ();
    this.debit.Reset ();
    this.credit.Reset ();
};

//check code
record_widget.prototype.check_code = function (event)
{
    if(event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        this.Rpc.Send ({Method: "CheckCode", Code: this.code.GetText()}, this.autocomplete.bind(this));
    }
};

//autocomplete
record_widget.prototype.autocomplete = function (Res)
{
    if (Res.length > 0)
    {
        this.name.SetText (Res[0].Name);
    }
    else
    {
        this.name.SetText ("Nombre");
    }
};


//cedeg constructor
function cedeg()
{
    Gwt.Gui.Window.call (this, "Comprobante De Egreso");
          
    this.SetSize (840, 460);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/cedeg/");
    
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.printer.svg", "Imprimir", this.Print.bind(this));
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

//cedeg destructor
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

//create data
cedeg.prototype.CreateData = function ()
{
    var Data = {
        Number: this.number.GetText (),
        Place: this.place.GetText (),
        Date: this.date.GetText (),
        Holder: this.holder.GetText (),
        Concept: this.concept.GetText (),
        Bank: this.bank.GetText (),
        Check: this.check.GetText (),
        CheckingAccount: this.checking_account.GetText (),
        Amount: this.amount.GetText ()
    };
    
    Data.Records = [];

    for (var i=0; i < this.records.length; i++)
    {
        if (this.records[i].code.GetText() !== "")
        {
            Data.Records.push({
                Partial: (this.records[i].partial.GetText () === "") ? 0 : this.records[i].partial.GetText (),
                Debit: (this.records[i].debit.GetText ()  === "") ? 0 : this.records[i].debit.GetText (),
                Credit: (this.records[i].credit.GetText()  === "") ? 0 : this.records[i].credit.GetText(),
                Number: this.number.GetText (),
                Code: this.records[i].code.GetText ()
            });
        }
    }

    return Data;
};

//insert
cedeg.prototype.Insert = function ()
{
    var Data = this.CreateData ();
    Data.Method = "Insert";    
    this.Rpc.Send (Data, this.InsertResponse.bind(this));
};

//insert response
cedeg.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Print ();
    }
};

//update
cedeg.prototype.Update = function (Event)
{
    var Data = this.CreateData ();
    Data.Method = "Update";        
    this.Rpc.Send (Data, this.UpdateResponse.bind(this));
};


//update response
cedeg.prototype.UpdateResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Print();
    }
};

//delete
cedeg.prototype.Delete = function ()
{
    this.Rpc.Send ({Method: "Delete", Number: this.number.GetText ()}, this.DeleteResponse.bind(this));
};

//delete response
cedeg.prototype.DeleteResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

//print
cedeg.prototype.Print = function (Res)
{
    this.Report = Gwt.Core.Contrib.LoadDocument ("/documents/cedeg.html");
    this.Report.addEventListener ("load", this.ReportLoad.bind (this));
};

//Reset
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

//CheckNumber
cedeg.prototype.CheckNumber = function (Event)
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
cedeg.prototype.AutoFill = function (Res)
{
    if (Res.length > 0)
    {
        this.number.SetText (Res[0].Number);
        this.place.SetText (Res[0].Place);
        this.date.SetDate (Res[0].Date);
        this.holder.SetText (Res[0].Holder);
        this.amount.SetText (Res[0].Amount);
        this.bank.SetText (Res[0].Bank);
        this.check.SetText (Res[0].Check);
        this.checking_account.SetText (Res[0].CheckingAccount);
        this.concept.SetText (Res[0].Concept);
    
        for (var i = 0; i < Res.length; i++)
        {
            this.records[i].code.SetText (Res[i].Code);
            this.records[i].name.SetText (Res[i].Name);
            this.records[i].partial.SetText ((Res[i].Partial === 0 ? "" : Res[i].Partial));
            this.records[i].debit.SetText ((Res[i].Debit === 0 ? "" : Res[i].Debit));
            this.records[i].credit.SetText ((Res[i].Credit === 0 ? "" : Res[i].Credit));
        }
        for (i; i < this.records.length; i++)
        {
            this.records[i].Reset();
        }
    }
    else
    {
        this.Reset ();
    }
};

//next number
cedeg.prototype.NextNumber = function (Res)
{
    if (Res.length > 0)
    {
        this.number.SetText(Number(Res[0].Number)+1);
    }
};

//report load
cedeg.prototype.ReportLoad = function ()
{
    var doc = this.Report.contentWindow.document;
    doc.getElementById ("Number").textContent = Gwt.Core.Contrib.ZFill(this.number.GetText(), 4);
    doc.getElementById ("Place").textContent = this.place.GetText()+", "+this.date.GetText ();
    doc.getElementById ("Holder").textContent = this.holder.GetText ();
    doc.getElementById ("AmountHuman").textContent = Gwt.Core.Contrib.NumberToHumanReadable (this.amount.GetText())+"PESOS MTE";
    doc.getElementById ("Bank").textContent = this.bank.GetText ();
    doc.getElementById ("Check").textContent = this.check.GetText ();
    doc.getElementById ("CheckingAccount").textContent = this.checking_account.GetText ();
    doc.getElementById ("Concept").textContent = this.concept.GetText ();
    doc.getElementById ("Amount").textContent = Gwt.Core.Contrib.TextToMonetary (this.amount.GetText ());
    
    var Records = [];
    for (var i=0; i < this.records.length; i++)
    {
        if (this.records[i].code.GetText() !== "")
        {
            Records.push({
                "Code": this.records[i].code.GetText (),
                "Name": this.records[i].name.GetText (),
                "Partial": Gwt.Core.Contrib.TextToMonetary (this.records[i].partial.GetText ()),
                "Debit": Gwt.Core.Contrib.TextToMonetary (this.records[i].debit.GetText ()),
                "Credit": Gwt.Core.Contrib.TextToMonetary (this.records[i].credit.GetText())
            });
        }
    }
    
    for (var i=0; i < Records.length; i++)
    {
        doc.getElementById ("Code"+i).textContent = Records[i].Code;
        doc.getElementById ("Name"+i).textContent = Records[i].Name;
        doc.getElementById ("Partial"+i).textContent = (Records[i].Partial === "$0") ? "" : Records[i].Partial;
        doc.getElementById ("Debit"+i).textContent = (Records[i].Debit  === "$0") ? "" : Records[i].Debit;
        doc.getElementById ("Credit"+i).textContent = (Records[i].Credit === "$0") ? "" : Records[i].Credit;
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
