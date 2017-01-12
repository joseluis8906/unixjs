//##################################################################################################
//Class Gwt::Gui::KnobThreeLevels
Gwt.Gui.KnobThreeLevels = function ()
{
    Gwt.Gui.Frame.call (this);

    this.Resource = new XMLHttpRequest ();
    this.Knob = null;
    
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
        this.SetHtml (this.Resource.responseXML.documentElement);
        this.Knob = new Gwt.Gui.Frame ();
        this.Knob.SetHtml (this.GetElement ("Knob"));
    }
}

Gwt.Gui.KnobThreeLevels.prototype.ChangeState = function ()
{
    console.log ("click");
}

Gwt.Gui.KnobThreeLevels.prototype.GetElement = function (Id)
{
    console.log (this.GetHtml ());
    return this.GetHtml ().getElementById (Id);
}

Gwt.Gui.KnobThreeLevels.prototype.SetRotation = function (Angle)
{
    var Center = {'X': this.GetHtml ().firstChild.getAttribute ("width")/2, 'Y': this.GetHtml ().firstChild.getAttribute ("height")/2};
    this.Knob.setAttribute ("transform", "rotate(%angle, %x, %y)".replace("%angle", Angle).replace ("%x", Center.X).replace ("%y", Center.Y));
}
//#####################################################################################################
//Class Gwt::Gui::KnobThreeLevels End
