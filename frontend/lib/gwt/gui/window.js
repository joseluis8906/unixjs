//Class Gwt::Gui::Window
Gwt.Gui.Window = function (Title)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.TitleBar_ = new Gwt.Gui.HBox (0);
    this.Title_ = new Gwt.Gui.StaticText(Title || "Default Window Title");
    this.Menu_ = new Gwt.Gui.Menu ();
    this.Body_ = new Gwt.Gui.Frame ();
    this.Container_ = new Gwt.Gui.Frame ();
    this.BorderSpacing_ = 0;
    this.HaveTitleBar_ = true;
    this.Layout_;
    
    //init
    this.SetClassName ("Gwt_Gui_Window");
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (25,25,25,0.3));
    this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
    this.SetBoxShadow (0, 0, 10, 2, new Gwt.Gui.Contrib.Color (102,205,102,0.3));
    var Color = new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.White);
    Color.SetAlpha (0.5);
    this.SetBorderColor (Color);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetBorder (1);
    this.SetBorderRadius (5);
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetSize (256, 256);
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    var Left = (Math.random () * Gwt.Gui.SCREEN_DEVICE_WIDTH)-this.GetWidth ();
    var Top = (Math.random () * Gwt.Gui.SCREEN_DEVICE_HEIGHT)-this.GetHeight ();
    if (Left < 0) Left=0;
    if (Top < 0) Top=0;
    this.SetPosition (Left, top);
    
    this.TitleBar_.SetSize (this.GetWidth(), 32);
    this.TitleBar_.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.TitleBar_.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
    this.TitleBar_.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    this.RootAdd (this.TitleBar_);
    
    this.Title_.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.Title_.SetExpand (false);
    this.Title_.SetSize (this.TitleBar_.GetWidth(), 20);
    
    this.TitleBar_.Add (this.Title_);
    this.Menu_.MenuBtn.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.TitleBar_.Add (this.Menu_.MenuBtn);

    this.Body_.SetSize (this.GetWidth(), this.GetHeight () - 32);
    this.RootAdd (this.Body_);
    
    this.Menu_.ContainerMenu.SetZIndex (1000);
    this.Menu_.ContainerMenu.SetWidth (this.GetWidth ());
    this.Body_.Add (this.Menu_.ContainerMenu);
    
    this.Container_.SetSize (this.Body_.GetWidth(), this.Body_.GetHeight ());
    this.Body_.Add (this.Container_);
}

Gwt.Gui.Window.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Window.prototype.constructor = Gwt.Gui.Window;

Gwt.Gui.Window.prototype._Window = function ()
{
    this.Menu_._Menu ();
    this.Title_._StaticText();
    this.TitleBar_._HBox();
    this.Container_._Frame ();
    this.Body_._Frame ();
    this._Frame ();
    
    this.Menu_ = null;
    this.Title_ = null;
    this.TitleBar_ = null;
    this.Container_ = null;
    this.Body_ = null;
    this.BorderSpacing_ = null;
}

Gwt.Gui.Window.prototype.RootAdd = function (Element)
{
    this.GetChilds().push (Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Window.prototype.Add = function (Element)
{
    this.Container_.Add (Element);
}

Gwt.Gui.Window.prototype.SetBorderSpacing = function (Border)
{
    this.BorderSpacing_ = (Border===undefined) ? this.BorderSpacing_ : Border * 2;
    this.Container_.SetWidth (this.Body_.GetWidth () - this.BorderSpacing_);
    this.Container_.SetHeight (this.Body_.GetHeight () - this.BorderSpacing_);
    var left = (this.Body_.GetWidth () - this.Container_.GetWidth ())/2;
    var top = ((this.Body_.GetHeight () - this.Container_.GetHeight ())/2);
    this.Container_.SetPosition (left, top);
}

Gwt.Gui.Window.prototype.Open = function ()
{
    desktop.show (this);
}

Gwt.Gui.Window.prototype.Close = function ()
{
    this._App ();
    this._Window ();
}

Gwt.Gui.Window.prototype._App = function ()
{
    
}

Gwt.Gui.Window.prototype.SetSize = function (Width, Height)
{
    this.SetWidth (Width);
    this.SetHeight (Height);
}

Gwt.Gui.Window.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
    
    this.TitleBar_.SetWidth (this.GetWidth ());
    
    if (this.Menu_ !== null)
    {
       this.Title_.SetWidth (this.TitleBar_.GetWidth() - 29);
    }
    else
    {
        this.Title_.SetWidth (this.TitleBar_.GetWidth());
    }
    this.Body_.SetWidth (this.GetWidth());
    this.SetBorderSpacing (this.BorderSpacing_);
}

Gwt.Gui.Window.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
    
    this.HaveTitleBar_ ? this.Body_.SetHeight (this.GetHeight () - 32) : this.Body_.SetHeight (this.GetHeight ()) ;
    
    this.SetBorderSpacing (this.BorderSpacing_);
}

Gwt.Gui.Window.prototype.GetAvailableWidth = function ()
{
    return this.Container_.GetWidth ();
}

Gwt.Gui.Window.prototype.GetAvailableHeight = function ()
{
    return this.Container_.GetHeight ();
}

Gwt.Gui.Window.prototype.EnableMenu = function ()
{
    this.Menu_.MenuBtn.SetDisplay (Gwt.Gui.Contrib.Display.InlineBlock);
    this.Title_.SetSize ((this.TitleBar_.GetWidth() - 29), 32);
    
    this.Menu_.ContainerMenu.SetWidth (this.GetWidth ());
}

Gwt.Gui.Window.prototype.DisableMenu = function ()
{
    this.Menu_.ContainerMenu.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.Menu_.MenuBtn.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.Title_.SetWidth (this.TitleBar_.GetWidth());
}

Gwt.Gui.Window.prototype.EnableTitleBar = function ()
{
    this.HaveTitleBar = true;
    this.TitleBar_.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    this.SetHeight(this.GetHeight ());
}

Gwt.Gui.Window.prototype.DisableTitleBar = function ()
{
    this.HaveTitleBar_ = false;
    this.TitleBar_.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.SetHeight (this.GetHeight ());
}

Gwt.Gui.Window.prototype.AddMenuItem = function (Image, Text, Callback, Flag)
{
    var tmp = new Gwt.Gui.MenuItem (Image, Text, Callback);
    if (Flag === Gwt.Gui.MENU_QUIT_APP)
    {
        tmp.SetMarginTop (48);
    }
    this.Menu_.AddItem (tmp);
}

Gwt.Gui.Window.prototype.SetLayout = function (Layout)
{
    if (Layout instanceof Gwt.Gui.HBox || Layout instanceof Gwt.Gui.VBox)
    {
        this.Layout_ = Layout;
        this.Layout_.SetSize (this.Container_.GetWidth (), this.Container_.GetHeight());
        this.Container_.Add (Layout);
    }
    else
    {
        console.log ("Error: Window laout is not Box");
    }
}
//Ends Gwt::Gui::Window
//##################################################################################################
