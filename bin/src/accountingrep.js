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
    
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.printer.svg", "Imprimir", this.Print.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.accountingrep.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
         
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
    
    //this.Report = Gwt.Core.Contrib.LoadDocument ("/documents/daily.html?records=%0".replace("%0", Records));
    //this.Report.addEventListener ("load", this.ReportLoad.bind (this));
};

//report load
accountingrep.prototype.ReportLoad = function ()
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


//reset
accountingrep.prototype.Reset = function ()
{
    this.ReportType.SetText ("");
    this.dateBegin.SetText ("");
    this.dateEnd.Now ();
};

//sort data
accountingrep.prototype.SortData = function (Res)
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
            instance = new accountingrep();
            instance.Open ();
            Gwt.Core.Contrib.SetActiveApp (window.accountingrep);
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