//##################################################################################################
//Class Gwt::Gui::MenuItem
Gwt.Gui.MenuItem = function (Image, Text, Callback)
{
    Gwt.Gui.Frame.call (this);
    
    this.Layout = null;
    this.Image = null;
    this.Text = null;
    this.Callback = null;
    
    this.InitMenuItem (Image, Text, Callback);
}

Gwt.Gui.MenuItem.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.MenuItem.prototype.constructor = Gwt.Gui.MenuItem;

Gwt.Gui.MenuItem.prototype.FinalizeMenuItem = function ()
{
    this.Image.FinalizeImage ();
    this.Image = null;
    
    this.Text.FinalizeStaticText ();
    this.Text = null;
    
    this.Layout.FinalizeHBox ();
    this.Layout = null;
    
    this.Callback = null;
    
    this.FinalizeFrame();
}

Gwt.Gui.MenuItem.prototype.InitMenuItem = function (Image, Text, Callback)
{
    this.SetSize (128, 25);
    
    this.Layout = new Gwt.Gui.HBox (5);
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());
    this.Layout.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    this.Add (this.Layout);
    
    this.Image = new Gwt.Gui.Image (Image);
    this.Image.SetSize (18, 18);
    this.Image.SetMarginLeft (5);
    this.Layout.Add (this.Image);
    
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Text.SetExpand (false);
    this.Text.SetSize (this.GetWidth() - 34, 20);
    this.Layout.Add (this.Text);
    
    this.Callback = Callback;
    
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Callback);
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseHover.bind(this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind(this));
}

Gwt.Gui.MenuItem.prototype.MouseHover = function ()
{    
    var Color0 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    Color0.SetAlpha (0.2);
    this.SetBackgroundColor(Color0);
}

Gwt.Gui.MenuItem.prototype.MouseOut = function ()
{
    var Color0 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent);
    this.SetBackgroundColor(Color0);
}
//Ends Gwt::Gui::MenuItem
//##################################################################################################

