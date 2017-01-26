//##################################################################################################
//Class Gwt::Gui::Button_on_off
Gwt.Gui.ButtonOnOff = function ()
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Canvas = new Gwt.Graphic.Svg.Canvas ();
    this.Circle = new Gwt.Graphic.Svg.Circle ();
    
    //init
    this.SetClassName ("Gwt_Gui_Button_on_off");
    this.SetSize (48,24);
    this.SetBorder(1);
    this.SetOutLine (Gwt.Gui.Contrib.OutLine.None);
    var colorborder = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    colorborder.SetAlpha (0.5);
    this.SetBorderColor(colorborder);
    var colorbackground = new Gwt.Gui.Contrib.Color (25,25,25);
    colorbackground.SetAlpha (0.25);
    this.SetBackgroundColor(colorbackground);
    this.SetBorderStyle(Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorderRadius(24);
	
    this.Canvas.SetSize (24, 24);
    this.Canvas.SetViewBox (0, 0, this.Canvas.GetWidth(), this.Canvas.GetHeight());
    this.Add (this.Canvas);

    this.Circle.SetFill ("Azure");
    this.Circle.SetCx (12);
    this.Circle.SetCy (12);
    this.Canvas.Add (this.Circle);
}

Gwt.Gui.ButtonOnOff.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.ButtonOnOff.prototype.constructor = Gwt.Gui.ButtonOnOff;

Gwt.Gui.ButtonOnOff.prototype._ButtonOnOff = function ()
{
    this.Canvas._Canvas ();
    this.Circle._Circle ();
    
    this.Canvas = null;
    this.Circle = null;
    
    this._Frame ();
}

Gwt.Gui.ButtonOnOff.prototype.SetOn = function ()
{
    this.Canvas.SetPosition (24,0);
    var colorbackground = new Gwt.Gui.Contrib.Color (0,102,255);
    colorbackground.SetAlpha (0.3);
    this.SetBackgroundColor(colorbackground);
}

Gwt.Gui.ButtonOnOff.prototype.SetOff = function ()
{
    this.Canvas.SetPosition (0,0);
    var colorbackground = new Gwt.Gui.Contrib.Color (25,25,25);
    colorbackground.SetAlpha (0.25);
    this.SetBackgroundColor(colorbackground);
}
//Ends Gwt::Gui::ButtonOnOff
//##################################################################################################
