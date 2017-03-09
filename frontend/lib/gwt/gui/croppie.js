//########################################################################################
//Class Gwt::Gui::Croppie
Gwt.Gui.Croppie = function (Format, Width, Height)
{
    Gwt.Gui.Frame.call (this);
 
    //instance props
    this.Vanilla = new Croppie (this.GetHtml());
    this.BtnFinish = new Gwt.Gui.Button(Gwt.Core.Contrib.Images + "appbar.cabinet.out.svg", "Guardar");
    this.Image = null;
    this.FileFormat = Format || "png";
    this.FileWidth = Width || 240;
    this.FileHeight = Height || 240;
    this.Callback = null;
    
    //init
    this.SetSize (512, 512);
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetPosition (0, 0);
    this.Disable ();
            
    this.Vanilla.options.viewport.width = this.GetWidth()/2;
    this.Vanilla.options.viewport.height = this.GetWidth()/2;
    this.Vanilla.options.boundary.width = this.GetWidth();
    this.Vanilla.options.boundary.height = (this.GetHeight() - 86);
    this.Vanilla.options.showZoomer = true;
    this.Vanilla.options.enableOrientation = false;
    
    this.BtnFinish.SetWidth (90);
    this.BtnFinish.SetMarginLeft (12);
    this.BtnFinish.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Result.bind(this));
    
    this.Add (this.BtnFinish);
}

Gwt.Gui.Croppie.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Croppie.prototype.constructor = Gwt.Gui.Croppie;

Gwt.Gui.Croppie.prototype._Croppie = function ()
{
    this.BtnFinish._Button();
    this.BtnFinish = null;
    
    this.Vanilla = null;
    this.Image = null;
    this.FileFormat = null;
    this.FileWidth = null;
    this.FileHeight = null;
    this.Callback = null
    
    this._Frame ();
}

Gwt.Gui.Croppie.prototype.SetImage = function (Image)
{
    this.Image = Image;
    this.Vanilla.bind({url: this.Image});
}

Gwt.Gui.Croppie.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
    
    this.Vanilla.elements.boundary.style.width = this.GetWidth ();
    this.Vanilla.elements.boundary.style.height = (this.GetHeight() - 86);
    
    this.Vanilla.elements.viewport.style.width = this.GetWidth()/2;
    this.Vanilla.elements.viewport.style.height = this.GetWidth()/2;
}

Gwt.Gui.Croppie.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.GetHtml ().style.width = this.Width+"px";
    
    this.Vanilla.elements.boundary.style.width = this.GetWidth ();
    this.Vanilla.elements.viewport.style.width = this.GetWidth()/2;
}

Gwt.Gui.Croppie.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.GetHtml ().style.height = this.Height+"px";
    
    this.Vanilla.elements.boundary.style.height = (this.GetHeight() - 86);
    this.Vanilla.elements.viewport.style.height = this.GetWidth()/2;
}

Gwt.Gui.Croppie.prototype.Result = function ()
{
    this.Vanilla.result({type: 'base64', size: {width: this.FileWidth, height: this.FileHeight},  format: this.FileFormat, quality: 0.666, circle: false}).then(this.Upload.bind(this));
    this.Disable();
}

Gwt.Gui.Croppie.prototype.Upload = function (blob)
{
    this.Callback (blob);
}

Gwt.Gui.Croppie.prototype.Enable = function ()
{
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
}

Gwt.Gui.Croppie.prototype.Disable = function ()
{
    this.SetDisplay (Gwt.Gui.Contrib.Display.None);
}

Gwt.Gui.Croppie.prototype.SetCallbackResult = function (Callback)
{
    this.Callback = Callback;
}
//Ends Gwt::Gui::Croppie
//##################################################################################################
