//Class Gwt::Gui::Dialog
Gwt.Gui.Dialog = function (Parent)
{
    Gwt.Gui.Frame.call (this);

    //instance props
    this.DialogBox = new Gwt.Gui.Frame ();
    this.IsOpen = false;
    
    //init
    this.SetClassName ("Gwt_Gui_Dialog");
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetParent (Parent);
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Close.bind (this));
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH, Gwt.Gui.SCREEN_DEVICE_HEIGHT);
    this.SetPosition (Gwt.Gui.WIN_POS_TOP, Gwt.Gui.WIN_POS_LEFT);
    var color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Grey);
    color.SetAlpha (0.25);
    this.SetBackgroundColor (color);
    this.SetZIndex (900000);
    
    this.DialogBox.SetSize (256, 256);
    var color2 = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray);
    color2.SetAlpha (0.9);
    this.DialogBox.SetBackgroundColor (color2);
    var colorBorde = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure);
    colorBorde.SetAlpha (0.33);
    this.DialogBox.SetBorderColor (colorBorde);
    this.DialogBox.SetBorder (1);
    this.DialogBox.SetBorderRadius (5);
    this.DialogBox.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DialogBox.SetZIndex (1000000);
    
    this.RootAdd (this.DialogBox);
}

Gwt.Gui.Dialog.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Dialog.prototype.constructor = Gwt.Gui.Dialog;

Gwt.Gui.Dialog.prototype._Dialog = function ()
{
    if(this.DialogBox !== null)
    {
        this.DialogBox._Frame ();
    }
    this.DialogBox = null;
    
    this._Frame ();
}

Gwt.Gui.Dialog.prototype.Open = function ()
{
    desktop.show (this);
}

Gwt.Gui.Dialog.prototype.Close = function ()
{
    this.FinalizeDialog ();
}

Gwt.Gui.Dialog.prototype.RootAdd = function (Element)
{
    this.Childs.push(Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Dialog.prototype.Add = function (Element)
{
    this.DialogBox.Add (Element);
}

//Ends Gwt::Gui::Dialog
//##################################################################################################


