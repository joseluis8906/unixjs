//########################################################################################
//Class Gwt::Gui::Avatar
Gwt.Gui.Avatar = function (Name)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.File = new Gwt.Gui.File (this.SetImage.bind(this));
    this.Image = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.camera.switch.svg");
    this.Editor =  new Gwt.Gui.Croppie ();
    this.Name = Name;
    this.FileName = null;
    this.Type = null;
    
    //init
    this.SetClassName ("Gwt_Gui_Avatar");
    this.SetSize (96, 96);
    this.SetRounded ();
    
    this.File.SetSize (96, 96);
    this.File.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.File.SetPosition (0, 0);
    this.File.SetOpacity (0);
    this.File.SetReadType (Gwt.Gui.READ_URL);
    this.File.SetCallbackRead (this.ChangeImage.bind(this));
    this.Add (this.File);

    this.Image.SetSize (96, 96);
    this.Add (this.Image);

    this.Editor.SetCallbackResult (this.SetImage.bind (this));
}

Gwt.Gui.Avatar.prototype = new Gwt.Gui.Image ();
Gwt.Gui.Avatar.prototype.constructor = Gwt.Gui.Avatar;

Gwt.Gui.Avatar.prototype._Avatar = function ()
{  
    this.Image._Image ();
    this.File._File ();
    this.Editor._Croppie ();
    
    this.Image = null;
    this.File = null;
    this.Editor = null;
    this.Name = null;
    this.FileName = null;
    this.Type = null;
    
    this._Frame ();
}

Gwt.Gui.Avatar.prototype.SetImage = function (Image)
{
    this.Image.SetImage (Image);
}

Gwt.Gui.Avatar.prototype.ChangeImage = function (FileName, MimeType, FileSize, Image)
{
    this.FileName = FileName;
    this.Type = "image/jpeg";
    
    this.Editor.SetImage (Image);
    this.Editor.Enable ();
}   
        
Gwt.Gui.Avatar.prototype.SetSizeEditor = function (Width, Height)
{
    this.Editor.SetSize (Width, Height);
}

Gwt.Gui.Avatar.prototype.GetEditor = function ()
{
    return this.Editor;
}

Gwt.Gui.Avatar.prototype.GetData = function ()
{
    return {Name: this.Name, FileName: this.FileName, Type: this.Type, Data: this.Image.GetSrc().replace(/^[^,]+,/, '')};
}

Gwt.Gui.Avatar.prototype.GetText = function ()
{
    return this.Name;
}
//Ends Gwt::Gui::Avatar
//##################################################################################################
