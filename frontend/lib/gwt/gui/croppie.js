//########################################################################################
//Class Gwt::Gui::Croppie
Gwt.Gui.Croppie = function (Image)
{
    Gwt.Gui.Frame.call (this);
    this.Vanilla = null;
    this.BtnFinish = null;
    this.Image = null;
    this.InitCroppie (Image);
}

Gwt.Gui.Croppie.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Croppie.prototype.constructor = Gwt.Gui.Croppie;

Gwt.Gui.Croppie.prototype.FinalizeCroppie = function ()
{
    this.Vanilla = null;
    this.Image = null;
    
    this.BtnFinish.FinalizeButton();
    this.BtnFinish = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.Croppie.prototype.InitCroppie = function (Image)
{
    this.SetSize (512, 512);
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.SetPosition (0, 0);
    
    this.Image = Image;
    
    this.Vanilla = new Croppie (
        
        this.GetHtml(), 
        
        {
            viewport: { width: this.GetWidth()/2, height: this.GetWidth()/2},
            boundary: { width: this.GetWidth(), height: (this.GetHeight() - 86)},
            showZoomer: true,
            enableOrientation: false
        }
    );
    
    this.Vanilla.bind({
        url: this.Image,
        //orientation: 4
    });
    
    this.BtnFinish = new Gwt.Gui.Button(Gwt.Core.Contrib.Images + "appbar.cabinet.out.svg", "Subir");
    this.BtnFinish.SetWidth (72);
    this.BtnFinish.SetMarginLeft (12);
    this.BtnFinish.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Upload.bind(this));
    
    this.Add (this.BtnFinish);
}

Gwt.Gui.Croppie.prototype.SetImage = function (Image)
{
    this.Image = Image;
}

Gwt.Gui.File.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
    
    this.Vanilla.boundary.width = this.GetWidth ();
    this.Vanilla.boundary.height = this.GetHeight ();
    
    this.Vanilla.viewport.width = this.GetWidth()/2;
    this.Vanilla.viewport.height = this.GetWidth()/2;
}

Gwt.Gui.File.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.GetHtml ().style.width = this.Width+"px";
    
    this.Vanilla.boundary.width = this.GetWidth ();
    this.Vanilla.viewport.width = this.GetWidth()/2;
}

Gwt.Gui.File.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.GetHtml ().style.height = this.Height+"px";
    
    this.Vanilla.boundary.height = this.GetHeight ();
    this.Vanilla.viewport.height = this.GetWidth()/2;
}

Gwt.Gui.Croppie.prototype.Upload = function ()
{
    this.Vanilla.result('blob').then(function(blob) {
        console.log (blob);
    });
    
    this.Disable();
}

Gwt.Gui.Croppie.prototype.Enable = function ()
{
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
}

Gwt.Gui.Croppie.prototype.Disable = function ()
{
    this.SetDisplay (Gwt.Gui.Contrib.Display.None);
}
//Ends Gwt::Gui::Croppie
//##################################################################################################
