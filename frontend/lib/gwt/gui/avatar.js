//########################################################################################
//Class Gwt::Gui::Avatar
Gwt.Gui.Avatar = function (Image)
{
    Gwt.Gui.Frame.call (this);
    
    this.Image = null;
    this.File = null;
    
    this.InitAvatar (Image);
}

Gwt.Gui.Avatar.prototype = new Gwt.Gui.Image ();
Gwt.Gui.Avatar.prototype.constructor = Gwt.Gui.Avatar;

Gwt.Gui.Avatar.prototype.FinalizeAvatar = function ()
{  
    this.Image.FinalizeImage ();
    this.File.FinalizeFle ();
    
    this.Image = null;
    this.File = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.Avatar.prototype.InitAvatar = function (Image)
{
    this.SetClassName ("Gwt_Gui_Avatar");
    this.SetSize (96, 96);
    this.SetRounded ();
    
    this.Image.SetImage (Image || Gwt.Core.Contrib.Images+"appbar.camera.switch.svg");
    this.Image.SetSize (96, 96);
    this.Add (this.Image);
    
    this.File = new Gwt.Gui.File();
    this.File.SetSize (96, 96);
    this.File.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.File.SetPosition (0, 0);
    this.File.SetOpacity (0);
    
    this.Add (this.File);
}
//Ends Gwt::Gui::Avatar
//##################################################################################################
