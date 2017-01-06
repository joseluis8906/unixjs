//########################################################################################
//Class Gwt::Gui::IconDesktop
Gwt.Gui.IconDesktop = function (Image, Text, Callback)
{
	Gwt.Gui.Frame.call (this);
        
        this.Layout = null;
        this.Image = null;
        this.Text = null;
        this.Callback = null;
	
	this.InitIconDesktop (Image, Text, Callback);
}

Gwt.Gui.IconDesktop.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.IconDesktop.prototype.constructor = Gwt.Gui.IconDesktop;

Gwt.Gui.IconDesktop.prototype.FinalizeIconDesktop = function ()
{
    this.FinalizeFrame ();
}

Gwt.Gui.IconDesktop.prototype.InitIconDesktop = function (Image, Text, Callback)
{
    this.SetSize (80, 80);
    this.SetBorderRadius (3);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    
    this.Layout = new Gwt.Gui.VBox (0);
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.Add (this.Layout);
    
    this.Image = new Gwt.Gui.Image (Image);
    this.Image.SetSize (56, 56);
    this.Image.SetMarginTop (3);
    this.Layout.Add (this.Image);
    
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Text.SetSize (this.Layout.GetWidth(), 16);
    this.Text.SetFontSize (10);
    this.Text.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.Layout.Add (this.Text);
    
    this.Callback = Callback;
    
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Callback);
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseHover.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
}

Gwt.Gui.IconDesktop.prototype.MouseHover = function ()
{
    var Color0 = new Gwt.Gui.Contrib.Color (25,25,25,0.25);
    this.SetBackgroundColor(Color0);
}

Gwt.Gui.IconDesktop.prototype.MouseOut = function ()
{
    var Color0 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent);
    this.SetBackgroundColor(Color0);
}
//Ends Gwt::Gui::IconDesktop
//##################################################################################################
