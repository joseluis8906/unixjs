//########################################################################################
//Class Gwt::Gui::Avatar
Gwt.Gui.Avatar = function (Name, Format, Width, Height)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.File = new Gwt.Gui.File (this.SetImage.bind(this));
    this.Image = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.camera.switch.invert.svg");
    this.Name = Name;
    this.FileName_ = null;
    this.FileWidth = Width ||  240;
    this.FileHeight = Height || 240;
    this.Type = Format === "jpg" ? "jpeg" : Format === "png" ? Format : "png" ;
    this.Editor =  new Gwt.Gui.Croppie (this.Type, this.FileWidth, this.FileHeight);
    
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
    
    this.Name = null;
    this.Image = null;
    this.File = null;
    this.Editor = null;
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
    var Ext = ["jpg", "jpeg", "bmp", "gif", "pcx", "png", "tga", "tiff", "wmp"];
    for (var i = 0; i < Ext.length; i++)
    {
        if (FileName.endsWith (Ext[i]))
        {
            this.FileName = FileName.replace (Ext[i], this.Type);
            break;
        }
    }

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
    return {FileName: this.FileName, Type: this.Type, Data: this.Image.GetSrc().replace(/^[^,]+,/, '')};
}

Gwt.Gui.Avatar.prototype.GetText = function ()
{
    return this.Name;
}

//Ends Gwt::Gui::Avatar
//##################################################################################################
