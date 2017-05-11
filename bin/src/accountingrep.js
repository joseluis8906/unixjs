accountingrep = (function ()
{

var instance;

//constructor
function accountingrep ()
{
    Gwt.Gui.Window.call (this, "Reporte");

    this.SetSize (640, 320);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/accountingrep/");
    this.Records;

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.printer.svg", "Imprimir", this.Print.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.layout = new Gwt.Gui.VBox ();
    this.SetLayout (this.layout);

    this.ReportType = new Gwt.Gui.IconSelectBox (Gwt.Core.Contrib.Images+"appbar.notification.star.svg", "Tipo de Reporte", [{"Text": "Comprobante de Diario", "Value": "Daily"},]);
    this.layout.Add (this.ReportType);

    this.labelDateBegin = new Gwt.Gui.StaticText ("Desde");
    this.labelDateBegin.SetExpand (true);
    this.layout.Add (this.labelDateBegin);

    this.dateBegin = new Gwt.Gui.Date ("Inicio");
    this.dateBegin.Now ();
    this.layout.Add (this.dateBegin);

    this.labelDateEnd = new Gwt.Gui.StaticText ("Hasta");
    this.labelDateBegin.SetExpand (true);
    this.layout.Add (this.labelDateEnd);

    this.dateEnd = new Gwt.Gui.Date ("Final");
    this.dateEnd.Now ();
    this.layout.Add (this.dateEnd);

    this.Report = null;

}

accountingrep.prototype = new Gwt.Gui.Window ();
accountingrep.prototype.constructor = accountingrep;

//destructor
accountingrep.prototype._App = function ()
{
    this.labelDateBegin._StaticText ();
    this.dateBegin._Date ();
    this.labelDateEnd._StaticText ();
    this.dateEnd._Date ();

    this.Report === null ? null : this.Report.close();
    this.layout._VBox();

    this.labelDateBegin = null;
    this.dateBegin = null;
    this.labelDateEnd = null;
    this.dateEnd = null;

    this.layout = null;
    this.Report = null;
};

accountingrep.prototype.CreateData = function ()
{
    var Data = {
        Method: this.ReportType.GetText (),
        DateBegin: this.dateBegin.GetText (),
        DateEnd: this.dateEnd.GetText ()
    };

    return Data;
};

//print
accountingrep.prototype.Print = function ()
{
    var Data = this.CreateData ();
    this.Rpc.Send (Data, this.PrintResponse.bind(this));
};

//print response
accountingrep.prototype.PrintResponse = function (Res)
{
    var DisbVous = (Res.DisbVous instanceof Array) ? Res.DisbVous : [];
    var Accounts = (Res.Accounts instanceof Array) ? Res.Accounts : [];

    //var Notes = (Res.Notes instanceof Array) ? Res.Notes : [];
    //var Registros = DisbVous.concat(Notes);
    //this.Records = this.SortData (Registros);
    //this.Report = Gwt.Core.Contrib.LoadDocument ("/documents/daily.html?records=%0".replace("%0", this.Records.length));
    //this.Report.addEventListener ("load", this.ReportLoad.bind (this));
};

//report load
accountingrep.prototype.ReportLoad = function ()
{
    var doc = this.Report.contentWindow.document;
    //doc.getElementById ("Number").textContent = Gwt.Core.Contrib.ZFill(this.number.GetText(), 4);
    //doc.getElementById ("Date").textContent = this.date.GetText ();

    var TotalDebit = 0;
    var TotalCredit = 0;

    for (var i=0; i < this.Records.length; i++)
    {
        doc.getElementById ("Code"+i).textContent = this.Records[i].Code;
        doc.getElementById ("Name"+i).textContent = this.Records[i].Name;
        doc.getElementById ("Partial"+i).textContent = (this.Records[i].Partial === 0) ? "" : this.Records[i].Partial;
        doc.getElementById ("Debit"+i).textContent = (this.Records[i].Debit  === 0) ? "" : this.Records[i].Debit;
        doc.getElementById ("Credit"+i).textContent = (this.Records[i].Credit === 0) ? "" : this.Records[i].Credit;
        TotalDebit += Number (this.Records[i].Debit);
        TotalCredit += Number (this.Records[i].Credit);
    }

    doc.getElementById ("EqSumDebit").textContent = Gwt.Core.Contrib.TextToMonetary(TotalDebit.toString());
    doc.getElementById ("EqSumCredit").textContent = Gwt.Core.Contrib.TextToMonetary(TotalCredit.toString());

    doc = undefined;
    this.Report = null;
    this.Reset ();
};

//reset
accountingrep.prototype.Reset = function ()
{
    this.ReportType.SetText ("");
    this.dateBegin.Now ();
    this.dateEnd.Now ();
};

//sort data
accountingrep.prototype.SortData = function (Res)
{
    var Debits1 = [];
    var Credits1 = [];

    var Sorted = [];

    var DoC;

    for (var i = 0; i < Res.length; i++)
    {
        if (Number(Res[i].Debit) !== 0)
        {
            Debits1.push (Res[i]);
            DoC = "Debit";
        }
        else if (Number(Res[i].Credit) !== 0)
        {
            Credits1.push (Res[i]);
            DoC = "Credit";
        }
        else
        {
            if(DoC == "Debit")
            {
                Debits1.push (Res[i]);
            }
            else
            {
                Credits1.push (Res[i])
            }
        }
    }

    var Debits2 = [];
    var Credits2 = [];

    var Agregate = false;
    for (var i = 0; i < Debits1.length; i++)
    {
        Agregate = true;
        for (var j = 0; j < Debits2.length; j++)
        {
            if (Debits1[i].Code === Debits2[j].Code)
            {
                Debits2[j].Partial += Debits1[i].Partial;
                Debits2[j].Debit += Debits1[i].Debit;
                Agregate = false;
            }
        }
        if (Agregate == true)
        {
            Debits2.push (Debits1[i]);
        }
    }

    for (var i = 0; i < Credits1.length; i++)
    {
        Agregate = true;
        for (var j = 0; j < Credits2.length; j++)
        {
            if (Credits1[i].Code === Credits2[j].Code)
            {
                Credits2[j].Partial += Credits1[i].Partial;
                Credits2[j].Credit += Credits1[i].Credit;
                Agregate = false;
            }
        }
        if (Agregate == true)
        {
            Credits2.push (Credits1[i]);
        }
    }

    Debits2.sortbykey ("Code");
    Credits2.sortbykey ("Code");

    return Sorted.concat(Debits2.concat(Credits2));
};

return new function ()
{
    this.open = function()
    {
        if(instance === undefined)
        {
            instance = new accountingrep();
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
