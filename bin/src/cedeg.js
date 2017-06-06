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
    this.name.SetWidth (this.GetWidth() - 360);
    this.name.SetValign (Gwt.Gui.Contrib.Valign.Middle);
    this.debit = new Gwt.Gui.Entry ("Debe");
    this.debit.SetExpand (false);
    this.debit.SetWidth (120);
    this.debit.ChangeToMonetary();
    this.debit.TextAlign (Gwt.Gui.Contrib.TextAlign.Right);
    this.credit = new Gwt.Gui.Entry ("Haber");
    this.credit.SetExpand (false);
    this.credit.SetWidth (120);
    this.credit.ChangeToMonetary();
    this.credit.TextAlign (Gwt.Gui.Contrib.TextAlign.Right);

    this.Add (this.code);
    this.Add (this.name);
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
    this.debit._Entry();
    this.credit._Entry();

    this.code = null;
    this.name = null;
    this.debit = null;
    this.credit = null;
};

//reset
record_widget.prototype.Reset = function ()
{
    this.code.Reset ();
    this.name.SetText ("Nombre");
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


//equal sums widget
function equal_sums_widget (Width, Heigth)
{
    Gwt.Gui.VBox.call (this, 0);
    this.SetSize (Width, Heigth);
    this.SetClassName ("equal_sums_widget");

    this.label1 = new Gwt.Gui.StaticText ("Sumas Iguales");
    this.label1.SetExpand (false);
    this.label1.SetWidth (this.GetWidth() - 240);
    this.label1.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.label1.TextAlign (Gwt.Gui.Contrib.TextAlign.Right);
    this.debit = new Gwt.Gui.Entry ("Debe");
    this.debit.SetExpand (false);
    this.debit.SetWidth (120);
    this.debit.ChangeToMonetary();
    this.debit.TextAlign (Gwt.Gui.Contrib.TextAlign.Right);
    this.debit.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.credit = new Gwt.Gui.Entry ("Haber");
    this.credit.SetExpand (false);
    this.credit.SetWidth (120);
    this.credit.ChangeToMonetary();
    this.credit.TextAlign (Gwt.Gui.Contrib.TextAlign.Right);
    this.credit.SetValign (Gwt.Gui.Contrib.Valign.Top);

    this.Row1 = new Gwt.Gui.HBox (0);
    this.Row1.SetExpand (false);
    this.Row1.SetSize (Width, 24);
    this.Row1.Add (this.label1);
    this.Row1.Add (this.debit);
    this.Row1.Add (this.credit);
    this.Add (this.Row1);

    this.label2 = new Gwt.Gui.StaticText (" ");
    this.label2.SetExpand (false);
    this.label2.SetWidth (this.GetWidth() - 240);
    this.label2.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.label2.TextAlign (Gwt.Gui.Contrib.TextAlign.Right);
    this.dif_debit = new Gwt.Gui.Entry (" ");
    this.dif_debit.SetExpand (false);
    this.dif_debit.SetWidth (120);
    this.dif_debit.ChangeToMonetary();
    this.dif_debit.TextAlign (Gwt.Gui.Contrib.TextAlign.Right);
    this.dif_debit.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.dif_credit = new Gwt.Gui.Entry (" ");
    this.dif_credit.SetExpand (false);
    this.dif_credit.SetWidth (120);
    this.dif_credit.ChangeToMonetary();
    this.dif_credit.TextAlign (Gwt.Gui.Contrib.TextAlign.Right);
    this.dif_credit.SetValign (Gwt.Gui.Contrib.Valign.Top);

    this.Row2 = new Gwt.Gui.HBox (0);
    this.Row2.SetExpand (false);
    this.Row2.SetSize (Width, 24);
    this.Row2.Add (this.label2);
    this.Row2.Add (this.dif_debit);
    this.Row2.Add (this.dif_credit);
    this.Add (this.Row2);
}

equal_sums_widget.prototype = new Gwt.Gui.VBox ();
equal_sums_widget.prototype.constructor = equal_sums_widget;

equal_sums_widget.prototype.set_debit = function (value)
{
    if (value === 0)
    {
        this.debit.SetText ("Debe");
    }
    else
    {
        this.debit.SetText (value);
    }

    this.verify_equality ();
}

equal_sums_widget.prototype.set_credit = function (value)
{
    if (value === 0)
    {
      this.credit.SetText ("Haber");
    }
    else
    {
      this.credit.SetText (value);
    }

    this.verify_equality ();
}

equal_sums_widget.prototype.verify_equality = function ()
{
    var debit = Number(this.debit.GetText ());
    var credit = Number(this.credit.GetText ());

    if (debit < credit)
    {
        this.debit.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Red));
        this.credit.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
        this.label2.SetText ("Faltante");
        this.dif_credit.SetText ("");
        this.dif_debit.SetText (credit-debit);
    }
    else if (debit > credit)
    {
        this.debit.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
        this.credit.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Red));
        this.label2.SetText ("Faltante");
        this.dif_debit.SetText ("");
        this.dif_credit.SetText (debit-credit);
    }
    else
    {
        this.debit.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
        this.credit.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
        this.label2.SetText ("");
        this.dif_debit.SetText ("");
        this.dif_credit.SetText ("");
    }
}

//reset
equal_sums_widget.prototype.Reset = function ()
{
    this.debit.SetText ("Debe");
    this.credit.SetText ("Haber");
    this.dif_debit.SetText ("");
    this.dif_credit.SetText ("");
    this.label2.SetText ("");
}


//cedeg constructor
function cedeg()
{
    Gwt.Gui.Window.call (this, "Comprobante De Egreso");

    this.SetSize (840, 524);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/cedeg/");

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.printer.svg", "Imprimir", this.Print.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.layout = new Gwt.Gui.VBox ();
    this.SetLayout (this.layout);

    this.slider = new Gwt.Gui.Slider (3);
    this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ()-64);
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
    this.Accounts = null;
    this.Accounts = new Gwt.Core.Rpc ("/cuentas/");

    this.layout.Add (this.slider);

    this.equal_sums = new equal_sums_widget (this.layout.GetWidth (), 48);
    this.layout.Add (this.equal_sums);

    for (var i = 0; i < 20; i++)
    {
        this.records[i] = new record_widget (this.slider.GetWidth (), 24);
        this.records[i].debit.AddEvent (Gwt.Gui.Event.Form.Change, this.ChangeDebit.bind(this));
        this.records[i].credit.AddEvent (Gwt.Gui.Event.Form.Change, this.ChangeCredit.bind(this));
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
    this.Accounts.Send ({Method: 'SelectBase'}, this.LoadAccounts.bind(this));

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
    this.Accounts = null;

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

//Load Accounts
cedeg.prototype.LoadAccounts = function (Res)
{
    this.Accounts = Res;
};

cedeg.prototype.ChangeDebit = function ()
{
    var Sum = 0;
    for(var i = 0; i < this.records.length; i++)
    {
        Sum += Number(this.records[i].debit.GetText ());
    }
    this.equal_sums.set_debit (Sum);
}

cedeg.prototype.ChangeCredit = function ()
{
    var Sum = 0;
    for(var i = 0; i < this.records.length; i++)
    {
        Sum += Number(this.records[i].credit.GetText ());
    }
    this.equal_sums.set_credit (Sum);
}

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

    this.equal_sums.Reset ();
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

    this.ChangeDebit ();
    this.ChangeCredit ();
};

//next number
cedeg.prototype.NextNumber = function (Res)
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

//sort data
cedeg.prototype.SortData = function (Records)
{
    var BaseDebits = [];
    var BaseCredits = [];
    var Debits = [];
    var Credits = [];

    for (var i = 0; i < Records.length; i++)
    {
        if (Number(Records[i].Debit) !== 0)
        {
            Debits.push (Records[i]);
        }
        else if (Number(Records[i].Credit) !== 0)
        {
            Credits.push (Records[i]);
        }
    }

    for (var i = 0; i < Debits.length; i++)
    {
        for (var j = 0; j < this.Accounts.length; j++)
        {
            this.Accounts[j].Debit = 0;
            this.Accounts[j].Credit = 0;
            this.Accounts[j].Partial = 0;

            if(Debits[i].Code.startsWith(this.Accounts[j].Code))
            {
                if (BaseDebits.indexOf(this.Accounts[j]) < 0)
                {
                    BaseDebits.push (this.Accounts[j]);
                }
            }
        }
    }

    for (var i = 0; i < Credits.length; i++)
    {
        for (var j = 0; j < this.Accounts.length; j++)
        {
            this.Accounts[j].Debit = 0;
            this.Accounts[j].Credit = 0;
            this.Accounts[j].Partial = 0;

            if(Credits[i].Code.startsWith(this.Accounts[j].Code))
            {
                if (BaseCredits.indexOf(this.Accounts[j]) < 0)
                {
                    BaseCredits.push (this.Accounts[j]);
                }
            }
        }
    }

    for (var i = 0; i < Debits.length; i++)
    {
        for(var j = 0; j < BaseDebits.length; j++)
        {
            if (Debits[i].Code.startsWith(BaseDebits[j].Code))
            {
                BaseDebits[j].Debit = BaseDebits[j].Debit + Number(Debits[i].Debit);
                Debits[i].Partial = Debits[i].Debit;
                Debits[i].Debit = 0;
            }
        }
    }

    for (var i = 0; i < Credits.length; i++)
    {
        for(var j = 0; j < BaseCredits.length; j++)
        {
            if (Credits[i].Code.startsWith(BaseCredits[j].Code))
            {
                BaseCredits[j].Credit = BaseCredits[j].Credit + Credits[i].Credit;
                Credits[i].Partial = Credits[i].Credit;
                Credits[i].Credit = 0;
            }
        }
    }

    Sorted = [];

    Debits = BaseDebits.concat (Debits);
    Debits = Debits.sortByKey ('Code')

    Credits = BaseCredits.concat (Credits);
    Credits = Credits.sortByKey ('Code');

    Sorted = Sorted.concat(Debits).concat(Credits);

    return Sorted;
};

//report load
cedeg.prototype.ReportLoad = function ()
{
    var doc = this.Report.document;//this.Report.contentWindow.document;
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
                "Debit": Number(this.records[i].debit.GetText ()),
                "Credit": Number(this.records[i].credit.GetText())
            });
        }
    }

    var SortedRecords = this.SortData (Records);

    for (var i=0; i < SortedRecords.length; i++)
    {
        doc.getElementById ("Code"+i).textContent = SortedRecords[i].Code;
        doc.getElementById ("Name"+i).textContent = SortedRecords[i].Name;
        doc.getElementById ("Partial"+i).textContent = (SortedRecords[i].Partial === 0) ? "" : Gwt.Core.Contrib.TextToMonetary (String(SortedRecords[i].Partial));
        doc.getElementById ("Debit"+i).textContent = (SortedRecords[i].Debit  === 0) ? "" : Gwt.Core.Contrib.TextToMonetary (String(SortedRecords[i].Debit));
        doc.getElementById ("Credit"+i).textContent = (SortedRecords[i].Credit === 0) ? "" : Gwt.Core.Contrib.TextToMonetary (String(SortedRecords[i].Credit));
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
