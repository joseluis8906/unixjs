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
    
    this.BtnFinish.Finalize;
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
    
    this.BtnFinish = new Gwt.Gui.Button(Gwt.Core.Contrib.Images + "appbar.cabinet.out.svg", "Subir");
    this.BtnFinish.SetWidth (72);
    this.BtnFinish.SetMarginLeft (12);
    this.BtnFinish.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Upload.bind(this));
}

Gwt.Gui.Croppie.prototype.SetImage = function (Image)
{
    this.Image = Image;
}

Gwt.Gui.Croppie.prototype.Show = function ()
{
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
    
    this.Add (this.BtnFinish);
}

Gwt.Gui.Croppie.prototype.Upload = function ()
{
    this.Vanilla.result('blob').then(function(blob) {
        console.log (blob);
    });
    
    this.SetDisplay (Gwt.Gui.Contrib.Display.None);
}
//Ends Gwt::Gui::Croppie
//##################################################################################################
