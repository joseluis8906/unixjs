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
    else
    {
        return this.Html.value.replace("$", "").split(".").join("");
    }
};

Gwt.Gui.Entry.prototype.SetText = function (Text)
{
    this.Html.value = Text;
    
    if(this.Format === "Monetary")
    {
        this.Html.value = this.GetMonetaryFormat();
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

Gwt.Gui.Entry.prototype.GetMonetaryFormat = function ()
{
    var Prefix = "$";
    var OriginalStr = this.GetText();
    var Result = "";
    
    if(OriginalStr.length === 0)
    {
        Result="";
    }
    else if(OriginalStr.length > 0 && OriginalStr.length <= 3)
    {
        Result = Prefix+OriginalStr;
    }
    
    else if(OriginalStr.length === 4)
    {
        Result = Prefix+OriginalStr[0]+"."+OriginalStr.substr(1,OriginalStr.length-1);
    }
    
    else if(OriginalStr.length === 5)
    {
        Result = Prefix+OriginalStr.substr(0,2)+"."+OriginalStr.substr(2,OriginalStr.length-1);
    }
    else if(OriginalStr.length === 6)
    {
        Result = Prefix+OriginalStr.substr(0,3)+"."+OriginalStr.substr(3,OriginalStr.length-1);
    }
    else if(OriginalStr.length === 7)
    {
        Result = Prefix+OriginalStr[0]+"."+OriginalStr.substr(1,3)+"."+OriginalStr.substr(4,OriginalStr.length-1);
    }
    else if(OriginalStr.length === 8)
    {
        Result = Prefix+OriginalStr.substr(0,2)+"."+OriginalStr.substr(2,3)+"."+OriginalStr.substr(5,OriginalStr.length-1);
    }
    else if(OriginalStr.length === 9)
    {
        Result = Prefix+OriginalStr.substr(0,3)+"."+OriginalStr.substr(3,3)+"."+OriginalStr.substr(6,OriginalStr.length-1);
    }
    
    return Result;
};

Gwt.Gui.Entry.prototype.MonetaryFormat = function ()
{
    this.Html.value = this.GetMonetaryFormat();
    this.SetCaretPosition (this.GetText ().length);
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
