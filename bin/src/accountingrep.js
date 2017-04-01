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
    this.Records = this.SortData(Res);
    this.Report = Gwt.Core.Contrib.LoadDocument ("/documents/daily.html?records=%0".replace("%0", this.Records.length));
    this.Report.addEventListener ("load", this.ReportLoad.bind (this));
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
        doc.getElementById ("Partial"+i).textContent = (this.Records[i].Partial === "$0") ? "" : this.Records[i].Partial;
        doc.getElementById ("Debit"+i).textContent = (this.Records[i].Debit  === "$0") ? "" : this.Records[i].Debit;
        doc.getElementById ("Credit"+i).textContent = (this.Records[i].Credit === "$0") ? "" : this.Records[i].Credit;
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
    var Debits = [];
    var Credits = [];

    var Sorted = [];
/*
    if (Res.Notes.length > 0)
    {
        var DoC;
        for (var i = 0; i < Res.Notes.length; i++)
        {
            if (Number(Res.Notes[i].Debit) !== 0)
            {
                if (Debits.length > 0)
                {
                    for (var j = 0; j < Debits.length; j++)
                    {
                        if (Res.Notes[i].Code === Debits[j].Code)
                        {
                            Debits[j].Debit += Res.Notes[i].Debit;
                            break;
                        }
                    
                        if (j == Debits.length-1 )
                        {
                            Debits.push (Res.Notes[i]);
                            break;
                        }
                    }
                }
                else
                {
                    Debits.push (Res.Notes[i]);
                }
                DoC = "Debit";
            }
            else if (Number(Res.Notes[i].Credit) !== 0)
            {
                if (Credits.length > 0)
                {
                    for (var j = 0; j < Credits.length; j++)
                    {
                        if (Res.Notes[i].Code === Credits[j].Code)
                        {
                            Credits[j].Credit += Res.Notes[i].Credit;
                            break;
                        }
                        if (j == Debits.length-1 )
                        {
                            Credits.push (Res.Notes[i]);
                            break;
                        }
                    }
                }
                else 
                {
                    Credits.push (Res.Notes[i]);
                }
                DoC = "Credit";
            }
            else
            {
                if (DoC==="Debit")
                {
                    for (var j = 0; j < Debits.length; j++)
                    {
                        if (Res.Notes[i].Code === Debits[j].Code)
                        {
                            Debits[j].Partial += Res.Notes[i].Partial;
                            break;
                        }
                    
                        if (j == Debits.length-1 )
                        {
                            Debits.push (Res.Notes[i]);
                            break;
                        }
                    }
                }
                else if (DoC==="Credit")
                {
                    for (var j = 0; j < Credits.length; j++)
                    {
                        if (Res.Notes[i].Code === Credits[j].Code)
                        {
                            Credits[j].Partial += Res.Notes[i].Partial;
                            break;
                        }
                        if (j == Debits.length-1 )
                        {
                            Credits.push (Res.Notes[i]);
                            break;
                        }
                    }
                }
            }
        }
    }

    Sorted = Debits.concat (Credits);
*/

    Debits = [];
    Credits = [];

    if (Res.DisbVous.length > 0)
    {
        var DoC;
        for (var i = 0; i < Res.DisbVous.length; i++)
        {
            if (Number(Res.DisbVous[i].Debit) !== 0)
            {
                if (Debits.length > 0)
                {
                    for (var j = 0; j < Debits.length; j++)
                    {
                        if (Res.DisbVous[i].Code === Debits[j].Code)
                        {
                            Debits[j].Debit += Res.DisbVous[i].Debit;
                            break;
                        }
                    
                        if (j == Debits.length-1 )
                        {
                            Debits.push (Res.DisbVous[i]);
                            break;
                        }
                    }
                }
                else
                {
                    Debits.push (Res.DisbVous[i]);
                }
                DoC = "Debit";
            }
            else if (Number(Res.DisbVous[i].Credit) !== 0)
            {
                if (Credits.length > 0)
                {
                    for (var j = 0; j < Credits.length; j++)
                    {
                        if (Res.DisbVous[i].Code === Credits[j].Code)
                        {
                            Credits[j].Credit += Res.DisbVous[i].Credit;
                            break;
                        }
                        if (j == Debits.length-1 )
                        {
                            Credits.push (Res.DisbVous[i]);
                            break;
                        }
                    }
                }
                else 
                {
                    Credits.push (Res.DisbVous[i]);
                }
                DoC = "Credit";
            }
            else
            {
                if (DoC==="Debit")
                {
                    for (var j = 0; j < Debits.length; j++)
                    {
                        if (Res.DisbVous[i].Code === Debits[j].Code)
                        {
                            Debits[j].Partial += Res.DisbVous[i].Partial;
                            break;
                        }
                    
                        if (j == Debits.length-1 )
                        {
                            Debits.push (Res.DisbVous[i]);
                            break;
                        }
                    }
                }
                else if (DoC==="Credit")
                {
                    for (var j = 0; j < Credits.length; j++)
                    {
                        if (Res.DisbVous[i].Code === Credits[j].Code)
                        {
                            Credits[j].Partial += Res.DisbVous[i].Partial;
                            break;
                        }
                        if (j == Debits.length-1 )
                        {
                            Credits.push (Res.DisbVous[i]);
                            break;
                        }
                    }
                }
            }
        }
    }

    Sorted = Sorted.concat(Debits.concat(Credits));

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