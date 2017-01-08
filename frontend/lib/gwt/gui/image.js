//########################################################################################
//Class Gwt::Gui::Image
Gwt.Gui.Image = function (Image)
{
    Gwt.Gui.Frame.call (this);
    
    //init
    this.SetHtml ("img");
    this.SetClassName ("Gwt_Gui_Image");
    this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
    this.SetImage (Image || Gwt.Core.Contrib.Images+"default_image.svg");
    this.SetSelectable ("none");
    this.SetValign(Gwt.Gui.Contrib.Valign.Top);
}

Gwt.Gui.Image.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Image.prototype.constructor = Gwt.Gui.Image;

Gwt.Gui.Image.prototype._Image = function ()
{
	this._Frame ();
}

Gwt.Gui.Image.prototype.SetImage = function (Image)
{
    this.GetHtml ().src = Image;
}

Gwt.Gui.Image.prototype.GetSrc = function ()
{
    return this.GetHtml ().src;
}

Gwt.Gui.Image.prototype.SetRounded = function ()
{
    this.SetBorderRadius (this.GetWidth () / 2);
}
//Ends Gwt::Gui::Image
//##################################################################################################
