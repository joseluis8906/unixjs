//########################################################################################
//Class Gwt::Gui::Time
Gwt.Gui.Time = function (Placeholder)
{
    Gwt.Gui.Frame.call (this);

    this.Placeholder = new Gwt.Gui.StaticText (Placeholder);
    this.Placeholder.SetMarginRight (12);

    this.TimeAlarm = null;
    var Hrs = [
      {"Text": "01", "Value": 1}, {"Text": "02", "Value": 2}, {"Text": "03", "Value": 3},
      {"Text": "04", "Value": 4}, {"Text": "05", "Value": 5}, {"Text": "06", "Value": 6},
      {"Text": "07", "Value": 7}, {"Text": "08", "Value": 8}, {"Text": "09", "Value": 9},
      {"Text": "10", "Value": 10}, {"Text": "11", "Value": 11}, {"Text": "12", "Value": 12}
    ];
    this.Hours = new Gwt.Gui.IconSelectBox (Gwt.Core.Contrib.Images+"appbar.clock.svg", "Hr", Hrs);
    this.Hours.SetWidth (50);

    this.Separator = new Gwt.Gui.StaticText (":");
    this.Separator.SetWidth (8);

    var Mins = [];
    for (var i = 0; i < 60; i++)
    {
        var Text = "";
        var Value = 0;
        if (i<10)
        {
            Text = "0"+String(i);
            Value = i;
        }
        else
        {
          Text = String(i);
          Value = i;
        }
        Mins.push({"Text": Text, "Value": Value});
    }

    this.Minutes = new Gwt.Gui.SelectBox ("Min", Mins);
    this.Minutes.SetWidth (30);

    this.AmPm = new Gwt.Gui.SelectBox ("AM/PM", [{"Text": "A.M", "Value": "am"}, {"Text": "P.M", "Value": "pm"}]);
    this.AmPm.SetWidth (60);

    this.Container = new Gwt.Gui.HBox (3);
    this.SetSize (180, 24);

    this.Container.SetHeight (this.GetHeight ());
    this.Add (this.Container);

    this.Container.Add (this.Placeholder);
    this.Container.Add (this.Hours);
    this.Container.Add (this.Separator);
    this.Container.Add (this.Minutes);
    this.Container.Add (this.AmPm);
}

Gwt.Gui.Time.prototype = new Gwt.Gui.Frame();
Gwt.Gui.Time.prototype.constructor = Gwt.Gui.Time;

Gwt.Gui.Time.prototype._Time = function ()
{
    this.Placeholder._StaticText ();
    this.Hours._IconSelectBox ();
    this.Minutes._SelectBox ();
    this.AmPm._SelectBox ();

    this.Placeholder = null;
    this.Hours = null;
    this.Minutes = null;
    this.AmPm = null;

    this._Frame ();
};

Gwt.Gui.Time.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";

    this.Container.SetWidth (Width);
};

Gwt.Gui.Time.prototype.SetTime = function (Hour, Minutes, Meridian)
{
    this.Hours.SetText (Number(Hour));
    this.Minutes.SetText (Number(Minutes));
    this.AmPm.SetText (String(Meridian).toLowerCase());
};

Gwt.Gui.Time.prototype.GetText = function ()
{
    var Hour = this.Hours.GetText ();
    var Minutes = this.Mins.GetText ();
    var AmPm = this.AmPm.GetText();

    if (Hour==="" || Minutes==="" || AmPm==="")
    {
      return false;
    }

    if(AmPm === "pm")
    {
        Hour = Hour+12;
    }

    return "{0}:{1}:00".replace("{0}", Hour).replace("{1}", Minutes);
};

Gwt.Gui.Time.prototype.Reset = function ()
{
    this.Hours.Reset ();
    this.Minutes.Reset ();
    this.AmPm.Reset ();
};

Gwt.Gui.Time.prototype.Now = function ()
{
	  var t = new Date ();
    var Hour = t.getHours ();
    var Minutes = t.getMinutes ();
    var AmPm = "";

    if (Hour > 12)
    {
        Hour = Hour-12;
        AmPm = "pm";
    }

	  this.SetTime (Hour, Minutes, AmPm);
};
//Ends Gwt::Gui::Time
//##################################################################################################
