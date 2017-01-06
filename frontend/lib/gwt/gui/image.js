//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Image = function (Image)
{
	Gwt.Gui.Frame.call (this);
	
	this.InitImage (Image);
}

Gwt.Gui.Image.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Image.prototype.constructor = Gwt.Gui.Image;

Gwt.Gui.Image.prototype.FinalizeImage = function ()
{
	this.FinalizeFrame ();
}

Gwt.Gui.Image.prototype.InitImage = function (Image)
{
    this.SetHtml ("img");
    this.SetClassName ("Gwt_Gui_Image");
	
    this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
    this.SetImage (Image || Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"default_image.svg");
    this.SetSelectable ("none");
    this.SetValign(Gwt.Gui.Contrib.Valign.Top);
}

Gwt.Gui.Image.prototype.SetImage = function (Image)
{
    this.GetHtml ().src = Image;
}

Gwt.Gui.Image.prototype.SetRounded = function ()
{
    this.SetBorderRadius (this.GetWidth () / 2);
}
//Ends Gwt::Gui::Image
//##################################################################################################
