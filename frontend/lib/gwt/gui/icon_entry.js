//##############################################################################################
//Class Gwt::Gui::IconEntry
Gwt.Gui.IconEntry = function (Icon, Placeholder)
{
    Gwt.Gui.IconControl.call (this, Icon, new Gwt.Gui.Entry(Placeholder));
    
    //init
    this.SetClassName ("Gwt_Gui_Icon_Entry");
}

Gwt.Gui.IconEntry.prototype = new Gwt.Gui.IconControl ();
Gwt.Gui.IconEntry.prototype.constructor = Gwt.Gui.IconEntry;

Gwt.Gui.IconEntry.prototype._IconEntry = function ()
{
    this._IconControl ();
}

Gwt.Gui.IconEntry.prototype.SetMaxLength = function (MaxLength)
{	
    this.Control.SetMaxLength (MaxLength);
}

Gwt.Gui.IconEntry.prototype.GetText = function ()
{
    return this.Control.GetText ();
}
//Ends Gwt::Gui::IconEntry
//##################################################################################################
