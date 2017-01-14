//##############################################################################################
//Class Gwt::Gui::IconSelectBox
Gwt.Gui.IconSelectBox = function (Icon, Placeholder, Options)
{
    Gwt.Gui.IconControl.call (this, Icon, new Gwt.Gui.SelectBox(Placeholder, Options));
    
    //init
    this.SetClassName ("Gwt_Gui_Icon_Select_Box");
}

Gwt.Gui.IconSelectBox.prototype = new Gwt.Gui.IconControl ();
Gwt.Gui.IconSelectBox.prototype.constructor = Gwt.Gui.IconSelectBox;

Gwt.Gui.IconSelectBox.prototype._IconSelectBox = function ()
{
    this._IconSelectBox ();
}

Gwt.Gui.IconSelectBox.prototype.GetText = function ()
{
    return this.Control.GetText ();
}

Gwt.Gui.IconSelectBox.prototype.SetText = function (Text)
{
    this.Control.SetText (Text);
}
//Ends Gwt::Gui::IconSelectBox
//##################################################################################################
