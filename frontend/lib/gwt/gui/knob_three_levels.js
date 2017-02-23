//##################################################################################################
//Class Gwt::Gui::KnobThreeLevels
Gwt.Gui.KnobThreeLevels = function ()
{
    Gwt.Gui.Frame.call (this);

    this.Resource = new XMLHttpRequest ();
    this.Graphic = new Gwt.Gui.Frame ();
    this.Knob = new Gwt.Gui.Frame ();;
    this.Level = 0;
    this.Events = [];
    
    this.SetClassName ("Gwt_Gui_Knob_Three_Levels");
    this.SetSize (200, 200);
    
    this.Resource.open ("GET", Gwt.Core.Contrib.Images + "knob.three.levels.svg", true);
    this.Resource.overrideMimeType ("image/svg+xml");
    this.Resource.onreadystatechange = this.Loaded.bind(this);
    this.Resource.send ("");
}

Gwt.Gui.KnobThreeLevels.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.KnobThreeLevels.prototype.constructor = Gwt.Gui.KnobThreeLevels;

Gwt.Gui.KnobThreeLevels.prototype._KnobThreeLevels = function ()
{
    this.Knob._Frame ();
    this.Graphic._Frame ();
    
    this.Resource = null;
    this.Knob = null;
    this.Level = null;
    this.Events = null;
    
    this._Frame ();
}

Gwt.Gui.KnobThreeLevels.prototype.Loaded = function ()
{
    if (this.Resource.readyState == 4 && this.Resource.status == 200)
    {
        this.Graphic.SetHtml (this.Resource.responseXML.documentElement);        
        this.Knob.SetHtml (this.GetElement ("Knob"));
        for (var i = 0; i < this.Events.length; i++)
        {
            this.Knob.AddEvent (this.Events[i].Event, this.Events[i].Callback);
        }
        this.Graphic.SetSize (200, 200);
        this.Add (this.Graphic);
    }
}

Gwt.Gui.KnobThreeLevels.prototype.SetOff = function ()
{
    this.Level = 0;
    this.SetRotation(0);
}

Gwt.Gui.KnobThreeLevels.prototype.SetOne = function ()
{
    this.Level = 1;
    this.SetRotation(315);
}

Gwt.Gui.KnobThreeLevels.prototype.SetTwo = function ()
{
    this.Level = 2;
    this.SetRotation(270);
}

Gwt.Gui.KnobThreeLevels.prototype.SetThree = function ()
{
    this.Level = 3;
    this.SetRotation(225);
}

Gwt.Gui.KnobThreeLevels.prototype.GetLevel = function ()
{
    return this.Level;
}

Gwt.Gui.KnobThreeLevels.prototype.GetElement = function (Id)
{
    return this.Graphic.GetHtml ().getElementById (Id);
}

Gwt.Gui.KnobThreeLevels.prototype.SetRotation = function (Angle)
{
    var Center = {'X': this.Graphic.GetHtml().getAttribute("width")/2, 'Y': this.Graphic.GetHtml().getAttribute("height")/2};
    var str = "rotate(%angle, %x, %y)".replace("%angle", Angle).replace ("%x", Center.X).replace ("%y", Center.Y);
    this.Knob.GetHtml().setAttribute ("transform", str);
}

Gwt.Gui.KnobThreeLevels.prototype.AddEvent = function (Event, Callback)
{
    this.Events.push({"Event": Event, "Callback": Callback});    
}
//#####################################################################################################
//Class Gwt::Gui::KnobThreeLevels End
