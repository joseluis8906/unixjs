//##############################################################################################
//Class Gwt::Gui::IconControl
Gwt.Gui.IconControl = function (Icon, Control)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Icon = new Gwt.Gui.Image(Icon || Gwt.Core.Contrib.Images+"appbar.notification.star.svg");
    this.Control = Control || new Gwt.Gui.StaticText ("Text Default");

    //init
    this.SetClassName ("Gwt_Gui_Icon_Control");
    this.SetHeight (24);
    this.SetExpand (true);    

    this.Icon.SetSize(22, 22);
    this.Icon.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Icon.SetMarginRight (5);
    this.Icon.SetValign (Gwt.Gui.Contrib.Valign.Top);
    this.Add (this.Icon);

    this.Control.SetWidth (this.GetWidth () - (this.Icon.GetWidth () + this.Icon.GetMarginRight ()));
    this.Control.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Add (this.Control);
}

Gwt.Gui.IconControl.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.IconControl.prototype.constructor = Gwt.Gui.IconControl;

Gwt.Gui.IconControl.prototype._IconControl = function ()
{
    this.Icon._Image ();
    
    this.Icon = null;
    this.Control = null;
    
    this._Frame ();
}

Gwt.Gui.IconControl.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    this.Icon.SetWidth (22);
    this.Control.SetWidth (this.GetWidth () - (this.Icon.GetWidth () + this.Icon.GetMarginRight ()));
}

Gwt.Gui.IconControl.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    this.Icon.SetHeight (22);
    this.Control.SetHeight (24);
}

Gwt.Gui.IconControl.prototype.SetTabIndex = function (TabIndex)
{
    this.Control.SetTabIndex (TabIndex);
}
//Ends Gwt::Gui::IconEntry
//##################################################################################################
