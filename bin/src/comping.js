comping = (function ()
{
var instance;

//record widget constructor
function record_widget (Width, Heigth)
{
    Gwt.Gui.HBox.call (this, 0);
    this.SetSize (Width, Heigth);
    this.SetClassName ("record_widget");
    this.Rpc = new Gwt.Core.Rpc ("/accountingnotes/");
    
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


//constructor
function comping ()
{
    Gwt.Gui.Window.call (this, "Comprobante De Ingreso");

    this.SetSize (840, 460);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/comping/");
    
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.printer.svg", "Imprimir", this.Print.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.comping.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
         
    this.layout = new Gwt.Gui.VBox ();
    this.SetLayout (this.layout);
     
    this.slider = new Gwt.Gui.Slider (5);
    this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ());
    this.slider.Setup ();
    this.layout.Add (this.slider);

    this.number = new Gwt.Gui.Entry ("Número");
    this.date = new Gwt.Gui.Date ("Creación");
    this.date.Now ();
    this.concept = new Gwt.Gui.Text ("Concepto");
    this.Report = null;
    
    this.records = [];
    for (var i = 0; i <= 15; i++)
    {
        this.records[i] = new record_widget (this.slider.GetWidth (), 24);
    }

    this.slider.AddSlotWidget (0, this.number);
    this.slider.AddSlotWidget (0, this.date);
    this.slider.AddSlotWidget (0, this.concept);

    for (var i=0; i<this.records.length; i++)
    {
        if (i<=5)
        {
            this.slider.AddSlotWidget (0, this.records[i]);
        }
        else if (i>=6 && i<=15)
        {
            this.slider.AddSlotWidget (1, this.records[i]);
        }
    }

    this.number.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.CheckNumber.bind(this));
}

comping.prototype = new Gwt.Gui.Window ();
comping.prototype.constructor = comping;

//destructor
comping.prototype._App = function ()
{
    this.number._Entry ();
    this.date._Date ();
    this.concept._Text ();
    for(var i = 0; i < this.records.length; i++)
    {
        this.records[i]._record_widget();
        this.records[i] = null;
    }
    this.slider._Slider ();
    this.Report === null ? null : this.Report.close ();
    this.layout._VBox ();
    
    this.number = null;
    this.date = null;
    this.concept = null;
    this.records = null;
    this.slider = null;    
    this.layout = null;
    this.Report = null;
};

comping.prototype.CreateData = function ()
{
    var Data = {
        Number: this.number.GetText (),
        Date: this.date.GetText (),
        Concept: this.concept.GetText ()
    };
    
    Data.Records = [];

    for (var i=0; i < this.records.length; i++)
    {
        if (this.records[i].code.GetText() !== "")
        {
            Data.Records.push({
                Partial: (this.records[i].partial.GetText () === "") ? 0 : this.records[i].partial.GetText (),
                Debit: (this.records[i].debit.GetText () === "") ? 0 : this.records[i].debit.GetText (),
                Credit: (this.records[i].credit.GetText() === "") ? 0 : this.records[i].credit.GetText(),
                Number: this.number.GetText (),
                Code:this.records[i].code.GetText ()
            });
        }
    }

    return Data;
};

//insert
comping.prototype.Insert = function ()
{
    var Data = this.CreateData ();
    Data.Method = "Insert";
    this.Rpc.Send (Data, this.InsertResponse.bind(this));
};

//insert response
comping.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Print();
    }
};

//update
comping.prototype.Update = function ()
{
    var Data = this.CreateData ();
    Data.Method = "Update";
    console.log (Data);
    this.Rpc.Send (Data, this.UpdateResponse.bind(this));
}

//update response
comping.prototype.UpdateResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Print();
    }
};

//delete
comping.prototype.Delete = function ()
{
    this.Rpc.Send ({Method: "Delete", Number: this.number.GetText ()}, this.DeleteResponse.bind(this));
};

//delete response
comping.prototype.DeleteResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
};

//print
comping.prototype.Print = function (Res)
{
    var Records = 0;
    for (var i=0; i < this.records.length; i++)
    {
        if (this.records[i].code.GetText() !== "")
        {
            Records += 1;
        }
    }
    this.Report = Gwt.Core.Contrib.LoadDocument ("/documents/comping.html?records=%0".replace("%0", Records));
    this.Report.addEventListener ("load", this.ReportLoad.bind (this));
};

//report load
comping.prototype.ReportLoad = function ()
{
    var doc = this.Report.contentWindow.document;
    doc.getElementById ("Number").textContent = Gwt.Core.Contrib.ZFill(this.number.GetText(), 4);
    doc.getElementById ("Date").textContent = this.date.GetText ();
    doc.getElementById ("Concept").textContent = this.concept.GetText ();
    
    var TotalDebit = 0;
    var TotalCredit = 0;

    var Records = [];
    for (var i=0; i < this.records.length; i++)
    {
        if (this.records[i].code.GetText() !== "")
        {
            TotalDebit += Number(this.records[i].debit.GetText ());
            TotalCredit += Number(this.records[i].credit.GetText());
            Records.push({
                "Code": this.records[i].code.GetText (),
                "Name": this.records[i].name.GetText (),
                "Partial": Gwt.Core.Contrib.TextToMonetary (this.records[i].partial.GetText ()),
                "Debit": Gwt.Core.Contrib.TextToMonetary (this.records[i].debit.GetText ()),
                "Credit": Gwt.Core.Contrib.TextToMonetary (this.records[i].credit.GetText())
            });
        }
    }
    
    var SortedRecords = this.SortData (Records);

    for (var i=0; i < SortedRecords.length; i++)
    {
        doc.getElementById ("Code"+i).textContent = SortedRecords[i].Code;
        doc.getElementById ("Name"+i).textContent = SortedRecords[i].Name;
        doc.getElementById ("Partial"+i).textContent = (SortedRecords[i].Partial === "$0") ? "" : SortedRecords[i].Partial;
        doc.getElementById ("Debit"+i).textContent = (SortedRecords[i].Debit  === "$0") ? "" : SortedRecords[i].Debit;
        doc.getElementById ("Credit"+i).textContent = (SortedRecords[i].Credit === "$0") ? "" : SortedRecords[i].Credit;
    }
    
    doc.getElementById ("EqSumDebit").textContent = Gwt.Core.Contrib.TextToMonetary(TotalDebit.toString());
    doc.getElementById ("EqSumCredit").textContent = Gwt.Core.Contrib.TextToMonetary(TotalCredit.toString());
    
    doc = undefined;
    this.Report = null;
    this.Reset ();
};

//check number
comping.prototype.CheckNumber = function (Event)
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

//next number
comping.prototype.NextNumber = function (Res)
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

//autofill
comping.prototype.AutoFill = function (Res)
{
    if (Res.length > 0)
    {
        this.number.SetText (Res[0].Number);
        this.date.SetDate (Res[0].Date);        
        this.concept.SetText (Res[0].Concept);
    
        var Records = this.SortData (Res);

        for (var i = 0; i < Records.length; i++)
        {
            this.records[i].code.SetText (Records[i].Code);
            this.records[i].name.SetText (Records[i].Name);
            this.records[i].partial.SetText ((Records[i].Partial === 0 ? "" : Records[i].Partial));
            this.records[i].debit.SetText ((Records[i].Debit === 0 ? "" : Records[i].Debit));
            this.records[i].credit.SetText ((Records[i].Credit === 0 ? "" : Records[i].Credit));
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

//reset
comping.prototype.Reset = function ()
{
    this.number.SetText ("");
    this.date.Now ();
    this.concept.SetText ("");
    
    for(var i = 0; i < this.records.length; i++)
    {
        this.records[i].Reset ();
    }
};

//sort data
comping.prototype.SortData = function (Res)
{
    var Debits = [];
    var Credits = [];

    var Sorted = [];

    for (var i = 0; i < Res.length; i++)
    {
        if (Number(Res[i].Debit) !== 0)
        {
            Debits.push (Res[i]);
        }
        else if (Number(Res[i].Credit) !== 0)
        {
            Credits.push (Res[i]);
        }
    }

    for (var i = 0; i < Debits.length; i++)
    {
        for (var j = 0; j < Res.length; j++)
        {
            if (Res[j].Code.startsWith(Debits[i].Code))
            {
                Sorted.push (Res[j]);
            }
        }
    }

    for (var i = 0; i < Credits.length; i++)
    {
        for (var j = 0; j < Res.length; j++)
        {
            if (Res[j].Code.startsWith(Credits[i].Code))
            {
                Sorted.push (Res[j]);
            }
        }
    }

    return Sorted;
};

return new function ()
{
    this.open = function()
    {
        if(instance === undefined)
        {
            instance = new comping();
            instance.Open ();
            Gwt.Core.Contrib.SetActiveApp (window.comping);
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