//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Date = function (placeholder)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.year = null;
    this.month = null;
    this.day = null;
    this.container = new Gwt.Gui.HBox (0);
    
    
    //init
    this.SetClassName ("Gwt_Gui_Date");
    this.SetSize (190, 24);

    this.container.SetSize (160,24);
    this.Add (this.container);
    
    var y = new Date().getFullYear();
    var range = (y-150);
    var years_items = [];
    for (var i=y; i>=range; i--)
    {
        years_items.push ({"Text": i, "Value": i});
    }
    this.year = new Gwt.Gui.SelectBox ("Año", years_items);
    this.year.SetWidth (64);
        
    var months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    var months_items = [];
    for (var i=1; i<=12; i++)
    {
        months_items.push ({"Text": months[i-1], "Value": i});
    }
    this.month = new Gwt.Gui.SelectBox ("Mes", months_items);
    this.month.SetWidth (48);
    
    var days_items = [];
    for (var i=1; i<=31; i++)
    {
        if (i<10)
        {
            days_items.push ({"Text": "0".concat(i), "Value": i});
        }
        else
        {
            days_items.push ({"Text": String(i), "Value": i});
        }
    }
    
    this.day = new Gwt.Gui.SelectBox ("Día", days_items);
    this.day.SetWidth (48);
    
    this.container.Add (this.year);
    this.container.Add (this.month);
    this.container.Add (this.day);
}

Gwt.Gui.Date.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Date.prototype.constructor = Gwt.Gui.Date;

Gwt.Gui.Date.prototype._Date = function (placeholder)
{
    this.year._SelectBox ();
    this.month._SelectBox ();
    this.day._SelectBox ();
    
    this.year = null;
    this.mont = null;
    this.day = null;
    
    this._Frame ();
}

Gwt.Gui.Date.prototype.GetText = function ()
{
    return "%Y-%M-%D".replace ("%Y", this.year.GetText ()).replace ("%M", this.month.GetText ()).replace ("%D", this.day.GetText ());
}

Gwt.Gui.Date.prototype.SetDate = function (year, month, day)
{
    if (typeof(year) === "string")
    {
        try{
            var string_date = year.split ("-");
            this.year.SetText (Number(string_date[0]));
            this.month.SetText (Number(string_date[1]));
            this.day.SetText (Number(string_date[2]));
            
        }
        catch (e)
        {
            console.log ("No se puede convertir la fecha de string a date");   
        }
    }
    else if (typeof(year)==="number", typeof(month)==="number", typeof(day)==="number")
    {
        
        this.year.SetText (year);
        this.month.SetText (month);
        this.day.SetText (day);
        
    }
}

Gwt.Gui.Date.prototype.Reset = function ()
{
    this.year.Reset ();	    
    this.month.Reset ();
    this.day.Reset ();
}

Gwt.Gui.Date.prototype.Now = function ()
{
	var d = new Date ();
	this.SetDate (d.getFullYear(), d.getMonth()+1, d.getDate());
}

Gwt.Gui.Date.prototype.GetString = function ()
{
	return this.year.GetText ()+"-"+this.month.GetText ()+"-"+this.day.GetText ();
}
//Ends Gwt::Gui::Image
//##################################################################################################


