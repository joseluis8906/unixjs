//################################################################################################
//Class Gwt::Gui::Static_Text
Gwt.Gui.StaticText = function (Text)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Text = Text || "Default Text";

    //init
    this.SetHtml ("p");
    this.SetClassName ("Gwt_Gui_Static_Text");
    this.SetText (this.Text);
    this.SetExpand (true);
    this.SetFontSize (11);
    this.SetHeight (24);
    //this.SetPaddingTop (2);
    this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
    //this.SetTextShadow (0, 0, 1, new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.DarkSlateGray));
    this.SetCursor (Gwt.Gui.Contrib.Cursor.Default);
    this.SetSelectable (Gwt.Gui.Contrib.UserSelect.None);
    this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
}

Gwt.Gui.StaticText.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.StaticText.prototype.constructor = Gwt.Gui.StaticText;

Gwt.Gui.StaticText.prototype._StaticText = function ()
{
	this._Frame ();
}

Gwt.Gui.StaticText.prototype.SetText = function (Text)
{
	this.Text = Text;
	this.Html.textContent = this.Text;
}

Gwt.Gui.StaticText.prototype.TextAlign = function (Value)
{
	if (Value === Gwt.Gui.Contrib.TextAlign.Left || Value === Gwt.Gui.Contrib.TextAlign.Center || Value === Gwt.Gui.Contrib.TextAlign.Right || Value === Gwt.Gui.Contrib.TextAlign.Justify)
	{
		this.Html.style.textAlign = Value;
	}
	else
	{
		throw TypeError("Invalid Text Alignment Value");
	}
}

Gwt.Gui.StaticText.prototype.SetTextAlignment = function (Value)
{
	if (Value === Gwt.Gui.Contrib.TextAlign.Left || Value === Gwt.Gui.Contrib.TextAlign.Center || Value === Gwt.Gui.Contrib.TextAlign.Right || Value === Gwt.Gui.Contrib.TextAlign.Justify)
	{
		this.Html.style.textAlign = Value;
	}
	else
	{
		throw TypeError("Invalid Text Alignment Value");
	}
}

Gwt.Gui.StaticText.prototype.GetText = function ()
{
	return this.Text;
}

Gwt.Gui.StaticText.prototype.GetLength = function()
{
    return this.Text.length;
}

Gwt.Gui.StaticText.prototype.Reset = function ()
{
	this.SetText ("Default Text");
}

Gwt.Gui.StaticText.prototype.SetFontSize = function (FontSize)
{
    this.FontSize = FontSize;
    this.Html.style.fontSize = this.FontSize+"pt";
    //this.SetHeight (this.FontSize/1.5 + 24);
}
//Ends Gwt::Gui::Static_Text
//##################################################################################################
