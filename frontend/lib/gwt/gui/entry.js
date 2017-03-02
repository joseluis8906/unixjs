//##############################################################################################
//Class Gwt::Gui::Entry
Gwt.Gui.Entry  = function (Placeholder)
{
	Gwt.Gui.Frame.call (this);
        this.Format = "Text";
        
        //init
	this.SetHtml ("input");
	this.Html.setAttribute ("type", "text");
	this.SetClassName ("Gwt_Gui_Entry");
	this.SetExpand (true);
        this.SetHeight (24);
        this.SetValign (Gwt.Gui.Contrib.Valign.Sub);
	this.SetPadding (0);
	this.SetBorderRadius(5);
	this.SetPlaceholder (Placeholder || "Entry text");
	this.SetFontSize (11);
};

Gwt.Gui.Entry.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.Entry.prototype.constructor = Gwt.Gui.Entry;

Gwt.Gui.Entry.prototype._Entry = function ()
{
    this._Frame ();
};

Gwt.Gui.Entry.prototype.SetPlaceholder = function (Text)
{
    this.Html.placeholder = Text;
};

Gwt.Gui.Entry.prototype.ChangeToPassword = function ()
{
    this.Html.type = "password";
};

Gwt.Gui.Entry.prototype.ChangeToText = function ()
{
    this.Html.type = "text";
};

Gwt.Gui.Entry.prototype.ChangeToMonetary = function ()
{
    this.SetMaxLength(12);
    this.AddEvent (Gwt.Gui.Event.Keyboard.KeyUp, this.MonetaryFormat.bind (this));
    this.Format = "Monetary";
};

Gwt.Gui.Entry.prototype.GetText = function ()
{
    if (this.Format === "Text")
    {
        return this.Html.value;
    }
    else if (this.Format === "Monetary")
    {
        return Gwt.Core.Contrib.MonetaryToText (this.GetText ());
    }
};

Gwt.Gui.Entry.prototype.SetText = function (Text)
{
    this.Html.value = Text;
    
    if(this.Format === "Monetary")
    {
        this.Html.value = Gwt.Core.Contrib.TextToMonetary (this.GetText());
    }
};

Gwt.Gui.Entry.prototype.SetMaxLength = function (MaxLength)
{	
    this.Html.maxLength = MaxLength;
};

Gwt.Gui.Entry.prototype.Reset = function ()
{
    this.SetText ("");
};

Gwt.Gui.Entry.prototype.MonetaryFormat = function ()
{
    var R = Gwt.Core.Contrib.TextToMonetary(this.GetText());
    this.Html.value = R;
    this.SetCaretPosition (R.length);
};

Gwt.Gui.Entry.prototype.SetCaretPosition = function (Position)
{
    if (this.GetHtml().setSelectionRange)
    {
        this.GetHtml().focus();
        this.GetHtml().setSelectionRange(Position, Position);
    }
    else if (this.GetHtml().createTextRange)
    {
        var range = this.GetHtml().createTextRange();
        range.collapse(true);
        range.moveEnd('character', Position);
        range.moveStart('character', Position);
        range.select();
    }
};

//Ends Gwt::Gui::Entry
//##################################################################################################
