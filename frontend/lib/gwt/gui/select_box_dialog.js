//# class Gwt::Gui::SelectDialogBox
//###################################################################################################
Gwt.Gui.SelectBoxDialog = function ()
{
    Gwt.Gui.Dialog.call (this);
    
    //instance props
    this.LayoutDialog = new Gwt.Gui.VBox (0);
    this.Container = new Gwt.Gui.VBox (3);
    this.items = null;

    //init
    this.SetClassName ("Gwt_Gui_Select_dialog_box");
    
    this.LayoutDialog.SetSize (this.DialogBox.GetWidth ()*0.95, this.DialogBox.GetHeight ()*0.95);
    var top = (this.DialogBox.GetHeight()-this.LayoutDialog.GetHeight())/2;
    var left = (this.DialogBox.GetWidth()-this.LayoutDialog.GetWidth())/2;
    this.LayoutDialog.SetPosition (top, left);
      
    this.Container.AddEvent (Gwt.Gui.Event.Mouse.Wheel, this.EventScroll.bind(this));
    this.Container.SetSize (this.LayoutDialog.GetWidth (), 0);
    
    this.DialogBox.Add (this.LayoutDialog);
    this.LayoutDialog.Add (this.Container);
}

Gwt.Gui.SelectBoxDialog.prototype = new Gwt.Gui.Dialog ();
Gwt.Gui.SelectBoxDialog.prototype.constructor = Gwt.Gui.SelectBoxDialog;

Gwt.Gui.SelectBoxDialog.prototype._SelectBoxDialog = function ()
{
    this.LayoutDialog._VBox();
    this.LayoutDialog = null;
    
    this.Container._VBox();
    this.Container = null;
    
    this.items = null;
    
    this._Dialog ();
}

Gwt.Gui.SelectBoxDialog.prototype.AddItem = function (item)
{
	item.SetWidth (this.Container.GetWidth ());
        this.Container.SetHeight (this.Container.GetHeight () + item.GetHeight () + this.Container.GetMarginElements());
        this.Container.Add (item);
        this.items++;
}

Gwt.Gui.SelectBoxDialog.prototype.EventScroll = function (event)
{
    var deltaY = event.deltaY;
	
    var posTop = this.Container.GetPositionTop();
    var posLeft = this.Container.GetPositionLeft();
    
    var isScroll = this.Container.GetHeight () > this.LayoutDialog.GetHeight ();
    var itemsPlus = this.items-9;
    
    var maxScroll = 0;
    
    if (itemsPlus > 0)
    {
        maxScroll = -27*itemsPlus;
    }
	
    if (deltaY < 0 && isScroll && posTop < 0)
    {
        posTop += 27;
    }
    else if (deltaY > 0 && isScroll && posTop > maxScroll)
    {
	posTop -= 27;
    }
    else
    {
        posTop = posTop;
    }
	
    this.Container.SetPosition (posLeft, posTop);
}
//Ends Gwt::Gui::SelectBoxDialog
//##################################################################################################
