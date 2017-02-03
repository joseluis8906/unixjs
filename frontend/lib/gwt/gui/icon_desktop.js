//########################################################################################
//Class Gwt::Gui::IconDesktop
Gwt.Gui.IconDesktop = function (Image, Text, App)
{
    Gwt.Gui.Frame.call (this);
        
    this.Layout = new Gwt.Gui.VBox (0);
    this.Image = new Gwt.Gui.Image (Image);
    this.Text = new Gwt.Gui.StaticText (Text);
    this.App = App;
	
    this.SetSize (80, 80);
    this.SetBorderRadius (3);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.Add (this.Layout);

    this.Image.SetSize (56, 56);
    this.Image.SetMarginTop (3);
    this.Layout.Add (this.Image);
    
    this.Text.SetSize (this.Layout.GetWidth(), 16);
    this.Text.SetFontSize (10);
    this.Text.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.Layout.Add (this.Text);

    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.LaunchApp.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseHover.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
}

Gwt.Gui.IconDesktop.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.IconDesktop.prototype.constructor = Gwt.Gui.IconDesktop;

Gwt.Gui.IconDesktop.prototype._IconDesktop = function ()
{
    this._Frame ();
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

Gwt.Gui.IconDesktop.prototype.LaunchApp = function ()
{
    window.gcontrol.close ();
    window.eval(this.App).open();
}
//Ends Gwt::Gui::IconDesktop
//##################################################################################################
