//##############################################################################################
//Class Gwt::Gui::IconSelectBox
Gwt.Gui.IconSelectBox = function (Icon, Placeholder, Options)
{
    Gwt.Gui.IconControl.call (this, Icon, new Gwt.Gui.SelectBox(Placeholder, Options));
    
    this.InitIconSelectBox ();
}

Gwt.Gui.IconSelectBox.prototype = new Gwt.Gui.IconControl ();
Gwt.Gui.IconSelectBox.prototype.constructor = Gwt.Gui.IconSelectBox;

Gwt.Gui.IconSelectBox.prototype.FinalizeIconSelectBox = function ()
{
    this.FinalizeIconSelectBox ();
}

Gwt.Gui.IconSelectBox.prototype.InitIconSelectBox = function ()
{
    this.SetClassName ("Gwt_Gui_Icon_Select_Box");
}

Gwt.Gui.IconSelectBox.prototype.GetValue = function ()
{
    return this.Control.GetValue();
}

Gwt.Gui.IconSelectBox.prototype.SetText = function (Text)
{
    this.Control.SetText (Text);
}
//Ends Gwt::Gui::IconSelectBox
//##################################################################################################
