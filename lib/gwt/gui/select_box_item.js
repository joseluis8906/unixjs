//#########################################################################################################################################
//# class Gwt::Gui::SelectBoxItem
Gwt.Gui.SelectBoxItem = function (Text, Value)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Value = Value;
    
    //init
    this.SetClassName ("Gwt_Gui_SelectBoxItem");
    this.SetHeight (24);
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBorderColor (background_color);
    this.SetBorder (0);
    this.SetBackgroundColor (background_color);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorderRadius (0);
	
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOver, this.MouseOver.bind (this));
    this.AddEvent (Gwt.Gui.Event.Mouse.MouseOut, this.MouseOut.bind (this));
	
    this.Add (this.Text);
}

Gwt.Gui.SelectBoxItem.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.SelectBoxItem.prototype.constructor = Gwt.Gui.SelectBoxItem;

Gwt.Gui.SelectBoxItem.prototype._SelectBoxItem = function ()
{
    this.Text = null;
    this.Value = null;
	
    this._Frame ();
}

Gwt.Gui.SelectBoxItem.prototype.GetValue = function ()
{
    return this.Value;
}

Gwt.Gui.SelectBoxItem.prototype.GetText = function ()
{
    return this.Text.GetText();
}

Gwt.Gui.SelectBoxItem.prototype.MouseOver = function (event)
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0.25);
    this.SetBackgroundColor (background_color);
    console.log(this.GetHtml().style.backgroundColor);
}

Gwt.Gui.SelectBoxItem.prototype.MouseOut = function (event)
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBackgroundColor (background_color);
}

Gwt.Gui.SelectBoxItem.prototype.Reset = function ()
{
    var background_color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    background_color.SetAlpha (0);
    this.SetBackgroundColor (background_color);
}
//Ends Gwt::Gui::SelectBoxItem
//###################################################################################################################################
