//##################################################################################################
//Class Gwt::Gui::KnobThreeLevels
Gwt.Gui.KnobThreeLevels = function ()
{
    Gwt.Gui.Frame.call (this);

    this.Resource = new XMLHttpRequest ();
    this.Graphic = new Gwt.Gui.Frame ();
    this.Knob = new Gwt.Gui.Frame ();;
    
    this.SetClassName ("Gwt_Gui_Knob_Three_Levels");
    this.SetSize (200, 200);
    
    this.Resource.open ("GET", Gwt.Core.Contrib.Images+"knob.three.levels.svg", true);
    this.Resource.overrideMimeType ("image/svg+xml");
    this.Resource.onreadystatechange = this.Loaded.bind(this);
    this.Resource.send ("");
    
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.ChangeState.bind(this));
}

Gwt.Gui.KnobThreeLevels.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.KnobThreeLevels.prototype.constructor = Gwt.Gui.KnobThreeLevels;

Gwt.Gui.KnobThreeLevels.prototype._KnobThreeLevels = function ()
{
    this.Resource = null;
    this.Knob = null;
    
    this._Frame ();
}

Gwt.Gui.KnobThreeLevels.prototype.Loaded = function ()
{
    if (this.Resource.readyState == 4 && this.Resource.status == 200)
    {
        this.Graphic.SetHtml (this.Resource.responseXML.documentElement);        
        this.Knob.SetHtml (this.GetElement ("Knob"));

        this.Graphic.SetSize (200, 200);
        this.Add (this.Graphic);
    }
}

Gwt.Gui.KnobThreeLevels.prototype.ChangeState = function ()
{
    this.SetRotation(-45);
}

Gwt.Gui.KnobThreeLevels.prototype.GetElement = function (Id)
{
    return this.Graphic.GetHtml ().getElementById (Id);
}

Gwt.Gui.KnobThreeLevels.prototype.SetRotation = function (Angle)
{
    var Center = {'X': this.Graphic.GetHtml().getAttribute("Width")/2, 'Y': this.Graphic.GetHtml().getAttribute("height")/2};
    var str = "rotate(%angle, %x, %y)".replace("%angle", Angle).replace ("%x", Center.X).replace ("%y", Center.Y);
    console.log (str);
    this.Knob.GetHtml().setAttribute ("transform", str);
}
//#####################################################################################################
//Class Gwt::Gui::KnobThreeLevels End
