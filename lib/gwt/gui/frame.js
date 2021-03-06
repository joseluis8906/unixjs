//##################################################################################################
//Class Gwt::Gui::Frame
Gwt.Gui.Frame = function ()
{
    //instance props
    this.BackgroundAttachment = null;
    this.BackgroundClip = null;
    this.BackgroundColor = null;
    this.BackgroundImage = null;
    this.BackgroundOrigin = null;
    this.BackgroundPositionX = null;
    this.BackgroundPositionY = null;
    this.BackgroundRepeatX = null;
    this.BackgroundRepeatY = null;
    this.BackgroundSizeHeight = null;
    this.BackgroundSizeWidth = null;
    this.Border = null;
    this.BorderLeft = null;
    this.BorderTop = null;
    this.BorderRight = null;
    this.BorderBottom = null;
    this.BorderRadius = null;
    this.BorderStyle = null;
    this.BoxShadowH = null;
    this.BoxShadowV = null;
    this.BoxShadowBlur = null;
    this.BoxShadowSize = null;
    this.BoxShadowColor = null;
    this.Color = null;
    this.Cursor = null;
    this.Display = null;
    this.Expand = null;
    this.FontFamily = null;
    this.FontSize = null;
    this.FontWeight = null;
    this.Height = null;
    this.Html = null;
    this.Margin = null;
    this.MarginBottom = null;
    this.MarginLeft = null;
    this.MarginRight = null;
    this.MarginTop = null;
    this.MaxHeight = null;
    this.MaxWidth = null;
    this.MinHeight = null;
    this.MinWidth = null;
    this.Overflow = null;
    this.Opacity = null;
    this.OutLine = null;
    this.Padding = null;
    this.PaddingBottom = null;
    this.PaddingLeft = null;
    this.PaddingRight = null;
    this.PaddingTop = null;
    this.PositionLeft = null;
    this.PositionTop = null;
    this.PositionType = null;
    this.TabIndex = null;
    this.TextShadowBlur = null;
    this.TextShadowColor = null;
    this.TextShadowOffsx = null;
    this.TextShadowOffsy = null;
    this.UserSelect = null;
    this.Valign = null;
    this.Visibility = null;
    this.Width = null;
    this.ZIndex = null;
    this.ClassName = null;
    this.Parent = null;
    this.Childs = null;

    //init
    this.SetHtml ("div");
    this.SetClassName ("Gwt_Gui_Frame");
    this.SetExpand(false);
    this.SetBorder (0);
    this.SetBorderStyle (Gwt.Gui.Contrib.BorderStyle.Solid);
    this.SetPosition (0, 0);
    this.SetMargin (0);
    this.Childs = [];
}

Gwt.Gui.Frame.prototype._Frame = function ()
{
    if (this.GetHtml().parentNode !== null && this.GetHtml().parentNode !== undefined)
    {
        try
        {
            this.GetHtml().parentNode.removeChild (this.GetHtml ());
        }
        catch (e)
        {
            console.log("agui");
            console.log(e.message);
        }
    }
    
    this.BackgroundAttachment = null;
    this.BackgroundClip = null;
    this.BackgroundColor = null;
    this.BackgroundImage = null;
    this.BackgroundOrigin = null;
    this.BackgroundPositionX = null;
    this.BackgroundPositionY = null;
    this.BackgroundRepeatX = null;
    this.BackgroundRepeatY = null;
    this.BackgroundSizeHeight = null;
    this.BackgroundSizeWidth = null;
    this.Border = null;
    this.BorderRadius = null;
    this.BorderStyle = null;
    this.Color = null;
    this.Cursor = null;
    this.Display = null;
    this.Expand = null;
    this.FontFamily = null;
    this.FontSize = null;
    this.FontWeight = null;
    this.Height = null;
    this.Html = null;
    this.Margin = null;
    this.MarginBottom = null;
    this.MarginLeft = null;
    this.MarginRight = null;
    this.MarginTop = null;
    this.MaxHeight = null;
    this.MaxWidth = null;
    this.Overflow = null;
    this.Opacity = null;
    this.OutLine = null;
    this.Padding = null;
    this.PaddingBottom = null;
    this.PaddingLeft = null;
    this.PaddingRight = null;
    this.PaddingTop = null;
    this.PositionLeft = null;
    this.PositionTop = null;
    this.PositionType = null;
    this.TabIndex = null;
    this.TextShadowBlur = null;
    this.TextShadowColor = null;
    this.TextShadowOffsx = null;
    this.TextShadowOffsy = null;
    this.UserSelect = null;
    this.Valign = null;
    this.Visibility = null;
    this.Width = null;
    this.ZIndex = null;
    this.ClassName = null;
    this.Parent = null;
    this.Childs = null;
}

Gwt.Gui.Frame.prototype.Add = function (Element)
{
    this.Childs.push(Element);
    this.GetHtml ().appendChild (Element.Html);
}

Gwt.Gui.Frame.prototype.Remove = function (Element)
{
    var elements = this.GetChilds();
    for (var i = 0; i < elements.length; i++)
    {
        var tmp = elements[i];
        if (tmp === Element)
        {
            this.GetHtml().removeChild (Element.GetHtml ());
            elements.splice (i,1);
        }
    }
}

Gwt.Gui.Frame.prototype.GetChilds = function ()
{
	return this.Childs;
}

Gwt.Gui.Frame.prototype.AddEvent = function (Event, Callback)
{
    this.Html.addEventListener (Event, Callback, true);
}

Gwt.Gui.Frame.prototype.RemoveEvent = function (Event, Callback)
{
    this.Html.removeEventListener (Event, Callback, true);
}
Gwt.Gui.Frame.prototype.SetHtml = function (Element)
{
    if (typeof (Element) === "string")
    {
        this.Html = document.createElement (Element);
    }
    else 
    {
        this.Html = Element;
    }
    this.InitStyle ();
}
Gwt.Gui.Frame.prototype.SetTabIndex = function (TabIndex)
{
    this.TabIndex = TabIndex;
    this.Html.tabIndex = this.TabIndex;
}

Gwt.Gui.Frame.prototype.SetSize = function (Width, Height)
{
    this.SetWidth(Width);
    this.SetHeight(Height);
}

Gwt.Gui.Frame.prototype.SetWidth = function (Width)
{
    this.Width = Width;
    this.SetMaxWidth (this.Width);
    this.SetMinWidth (this.Width);
    this.Html.style.width = this.Width+"px";
}

Gwt.Gui.Frame.prototype.SetHeight = function (Height)
{
    this.Height = Height;
    this.SetMaxHeight (this.Height);
    this.SetMinHeight (this.Height);
    this.Html.style.height = this.Height+"px";
}

Gwt.Gui.Frame.prototype.GetWidth = function ()
{
    return this.Width;
}

Gwt.Gui.Frame.prototype.GetHeight = function ()
{
    return this.Height;
}

Gwt.Gui.Frame.prototype.GetHtml = function ()
{
    return this.Html;
}

Gwt.Gui.Frame.prototype.SetPosition = function (Left, Top)
{
    var width_add = Gwt.Gui.SCREEN_DEVICE_WIDTH * 0.05;
    var height_add = Gwt.Gui.SCREEN_DEVICE_HEIGHT * 0.05;
	
    this.PositionTop = Top;
    this.PositionLeft = Left;
	
    if (this.PositionLeft === Gwt.Gui.WIN_POS_CENTER && this.PositionTop === undefined)
    {
        var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())/2);
        var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())/2);
    }
    else if (this.PositionLeft !== undefined && this.PositionTop !== undefined)
    {
        switch (this.PositionLeft)
        {
            case Gwt.Gui.WIN_POS_LEFT:
                var left_ = 0;
                break;
            
            case Gwt.Gui.WIN_POS_CENTER:
                var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())/2);
                break;
			
            case Gwt.Gui.WIN_POS_RIGHT:
                var left_ = ((Gwt.Gui.SCREEN_DEVICE_WIDTH - this.GetWidth ())-2);
                break;
				
            default:
                var left_ = this.PositionLeft;
        }
		
        switch (this.PositionTop)
        {
            case Gwt.Gui.WIN_POS_TOP:
                var top_ = 0;
                break;
				
            case Gwt.Gui.WIN_POS_CENTER:
                var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())/2);
                break;
				
            case Gwt.Gui.WIN_POS_BOTTOM:
                var top_ = ((Gwt.Gui.SCREEN_DEVICE_HEIGHT - this.GetHeight ())-2);
                break;
				
            default:
                var top_ = this.PositionTop;
        }
    }
    else
    {
        top_ = 0;
        left_ = 0;
    }
	
    this.PositionTop = top_ ;
    this.PositionLeft = left_;
	
    this.Html.style.top = this.PositionTop;
    this.Html.style.left = this.PositionLeft;
}

Gwt.Gui.Frame.prototype.GetPositionLeft = function ()
{
    return this.PositionLeft;
}

Gwt.Gui.Frame.prototype.GetPositionTop = function ()
{
    return this.PositionTop;
}

Gwt.Gui.Frame.prototype.SetFocus = function ()
{
    this.Html.focus ();
}

Gwt.Gui.Frame.prototype.SetBackgroundAttachment = function (Attachment)
{
    this.BackgroundAttachment = Attachment;
    this.Html.style.backgroundAttachment = this.BackgroundAttachment;
}

Gwt.Gui.Frame.prototype.SetBackgroundClip = function (Clip)
{
    this.BackgroundClip = Clip;
    this.Html.style.backgroundClip = this.BackgroundClip;
}

Gwt.Gui.Frame.prototype.SetBackgroundColor = function (Color)
{
    this.BackgroundColor = Color;
    this.Html.style.backgroundColor = this.BackgroundColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetBackgroundImage = function (Image)
{
    this.BackgroundImage = Image;
    if (Image === null)
    {
        this.Html.style.backgroundImage = null;    
    }
    else
    {
        this.Html.style.backgroundImage = "url("+this.BackgroundImage+")";
    }
}

Gwt.Gui.Frame.prototype.SetBackgroundOrigin = function (Origin)
{
    this.BackgroundOrigin = Origin;
    this.Html.style.backgroundOrigin = this.BackgroundOrigin;
}

Gwt.Gui.Frame.prototype.SetBackgroundPosition = function (X, Y)
{
    this.BackgroundPositionX = X;
    this.BackgroundPositionY = Y;
    this.Html.style.backgroundPosition = ""+this.BackgroundPositionX+" "+this.BackgroundPositionY+"";
}

Gwt.Gui.Frame.prototype.SetBackgroundRepeat = function (X, Y)
{
    this.BackgroundRepeatX = X;
    this.BackgroundRepeatY = Y;
    this.Html.style.backgroundRepeatX = this.BackgroundRepeatX;
    this.Html.style.backgroundRepeatY = this.BackgroundRepeatY;
}

Gwt.Gui.Frame.prototype.SetBackgroundSize = function (Width, Height)
{
    this.BackgroundSizeWidth = Width;
    this.BackgroundSizeHeight = Height;
    if (typeof this.BackgroundSizeWidth === "string")
    {
        this.Html.style.backgroundSize = this.BackgroundSizeWidth;
    }
    else
    {
        this.Html.style.backgroundSize = this.BackgroundSizeWidth+"px "+this.BackgroundSizeHeight+"px";
    }
}

Gwt.Gui.Frame.prototype.SetBorder = function (Border)
{
    this.Border = Border;
    this.SetBorderLeft (this.Border);
    this.SetBorderTop (this.Border);
    this.SetBorderRight (this.Border);
    this.SetBorderBottom (this.Border);
}

Gwt.Gui.Frame.prototype.SetBorderLeft = function (BorderLeft)
{
    this.BorderLeft = BorderLeft;
    this.Html.style.borderLeftWidth = this.BorderLeft+"px";
}

Gwt.Gui.Frame.prototype.SetBorderTop = function (BorderTop)
{
    this.BorderTop = BorderTop;
    this.Html.style.borderTopWidth = this.BorderTop+"px";
}

Gwt.Gui.Frame.prototype.SetBorderRight = function (BorderRight)
{
    this.BorderRight = BorderRight;
    this.Html.style.borderRightWidth = this.BorderRight+"px";
}

Gwt.Gui.Frame.prototype.SetBorderBottom = function (BorderBottom)
{
    this.BorderBottom = BorderBottom;
    this.Html.style.borderBottomWidth = this.BorderBottom+"px";
}

Gwt.Gui.Frame.prototype.GetBorder = function ()
{
    return this.Border;
}

Gwt.Gui.Frame.prototype.GetBorderLeft = function ()
{
    return this.BorderLeft;
}

Gwt.Gui.Frame.prototype.GetBorderTop = function ()
{
    return this.BorderTop;
}

Gwt.Gui.Frame.prototype.GetBorderRight = function ()
{
    return this.BorderRight;
}

Gwt.Gui.Frame.prototype.GetBorderBottom = function ()
{
    return this.BorderBottom;
}

Gwt.Gui.Frame.prototype.SetBorderStyle = function (Style)
{
    this.BorderStyle = Style;
    this.Html.style.borderStyle = this.BorderStyle;
}

Gwt.Gui.Frame.prototype.SetBorderRadius = function (Radius)
{
    this.BorderRadius = Radius;
    this.Html.style.borderRadius= this.BorderRadius+"px";
}

Gwt.Gui.Frame.prototype.SetBorderColor = function (Color)
{	
    this.Html.style.borderColor = Color.ToString ();
}

Gwt.Gui.Frame.prototype.SetBoxShadow = function (H, V, Blur, Size, Color)
{
    this.BoxShadowH = H;
    this.BoxShadowV = V;
    this.BoxShadowBlur = Blur;
    this.BoxShadowSize = Size;
    this.BoxShadowColor = Color;
    this.Html.style.boxShadow = this.BoxShadowH+"px "+this.BoxShadowV+"px "+this.BoxShadowBlur+"px "+this.BoxShadowSize+"px "+this.BoxShadowColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetClassName = function (ClassName)
{
    this.ClassName = ClassName;
    this.Html.className = this.ClassName;
}

Gwt.Gui.Frame.prototype.GetClassName = function ()
{
    return this.ClassName;
}

Gwt.Gui.Frame.prototype.SetParent = function (Parent)
{
    this.Parent = Parent;
}

Gwt.Gui.Frame.prototype.GetParent = function ()
{
    return this.Parent;
}

Gwt.Gui.Frame.prototype.SetColor = function (Color)
{
    this.Color = Color
    this.Html.style.color = this.Color.ToString ();
}

Gwt.Gui.Frame.prototype.SetCursor = function (Cursor)
{
    this.Cursor = Cursor;
    this.Html.style.cursor = this.Cursor;
}

Gwt.Gui.Frame.prototype.SetDisplay = function (Display)
{
    var TypeDisplays = Object.keys(Gwt.Gui.Contrib.Display);
    for (var i = 0; i < TypeDisplays.length; i++)
    {
        if (Display === Gwt.Gui.Contrib.Display[TypeDisplays[i]])
        {
            this.Display = Display;
            this.Html.style.display = this.Display;
            return;
        }
    }
    
    throw TypeError("Invalid Display Value");
}

Gwt.Gui.Frame.prototype.GetDisplay = function ()
{
    return this.Display;
}

Gwt.Gui.Frame.prototype.SetFontFamily = function (FontFamily)
{
    this.FontFamily = FontFamily;
    this.Html.style.fontFamily = this.FontFamily;
}

Gwt.Gui.Frame.prototype.SetFontSize = function (FontSize)
{
    this.FontSize = FontSize;
    this.Html.style.fontSize = this.FontSize+"pt";
}

Gwt.Gui.Frame.prototype.GetFontSize = function ()
{
    return this.FontSize;
}

Gwt.Gui.Frame.prototype.SetFontWeight = function (FontWeight)
{
    this.FontWeight = FontWeight;
    this.Html.style.fontWeight = this.FontWeight;
}

Gwt.Gui.Frame.prototype.InitStyle = function ()
{
    this.SetMaxHeight (Gwt.Gui.SCREEN_DEVICE_HEIGHT);
    this.SetMaxWidth (Gwt.Gui.SCREEN_DEVICE_WIDTH);
    this.SetMinHeight (0);
    this.SetMinWidth (0);
    this.SetPositionType (Gwt.Gui.Contrib.PositionType.Relative);
    this.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    this.SetOverflow (Gwt.Gui.Contrib.Overflow.Hidden);
    this.SetPadding (0);
    this.SetBackgroundColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Transparent));
    this.SetBorder (0);
    this.SetColor (new Gwt.Gui.Contrib.Color (Gwt.Gui.Contrib.Colors.Azure));
}

Gwt.Gui.Frame.prototype.SetMaxHeight = function (MaxHeght)
{
    this.MaxHeight = MaxHeght;
    this.Html.style.maxHeight = this.MaxHeight+"px";
}

Gwt.Gui.Frame.prototype.SetMaxWidth = function (MaxWidth)
{
    this.MaxWidth = MaxWidth;
    this.Html.style.maxWidth = this.MaxWidth+"px";
}

Gwt.Gui.Frame.prototype.SetMinHeight = function (MinHeight)
{
    this.MinHeight = MinHeight;
    this.Html.style.minHeight = this.MinHeight+"px";
}

Gwt.Gui.Frame.prototype.SetMinWidth = function (MinWidth)
{
    this.MinWidth = MinWidth;
    this.Html.style.minWidth = this.MinWidth+"px";
}

Gwt.Gui.Frame.prototype.SetMargin = function (Margin)
{
    this.Margin = Margin;
    this.Html.style.margin = this.Margin+"px";
}

Gwt.Gui.Frame.prototype.GetMargin = function (Margin)
{
    return this.Margin;
}

Gwt.Gui.Frame.prototype.SetMarginTop = function (MarginTop)
{
    this.MarginTop = MarginTop;
    this.Html.style.marginTop = this.MarginTop+"px";
}

Gwt.Gui.Frame.prototype.GetMarginTop = function (Margin)
{
    return this.MarginTop;
}

Gwt.Gui.Frame.prototype.SetMarginBottom = function (MarginBottom)
{
    this.MarginBottom = MarginBottom;
    this.Html.style.marginBottom = this.MarginBottom+"px";
}

Gwt.Gui.Frame.prototype.GetMarginBottom = function (Margin)
{
    return this.MarginBottom;
}

Gwt.Gui.Frame.prototype.SetMarginLeft = function (MarginLeft)
{
    this.MarginLeft = MarginLeft;
    this.Html.style.marginLeft = this.MarginLeft+"px";
}

Gwt.Gui.Frame.prototype.GetMarginLeft = function (Margin)
{
    return this.MarginLeft;
}

Gwt.Gui.Frame.prototype.SetMarginRight = function (MarginRigth)
{
    this.MarginRight = MarginRigth;
    this.Html.style.marginRight = this.MarginRight+"px";
}

Gwt.Gui.Frame.prototype.GetMarginRight = function (Margin)
{
    return this.MarginRight;
}

Gwt.Gui.Frame.prototype.SetPadding = function (Padding)
{
    this.Padding = Padding;
    this.Html.style.padding = this.Padding+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingTop = function (PaddingTop)
{
    this.PaddingTop = PaddingTop;
    this.Html.style.paddingTop = this.PaddingTop+"px";
}

Gwt.Gui.Frame.prototype.GetPaddingTop = function ()
{
    return this.PaddingTop;
}

Gwt.Gui.Frame.prototype.SetPaddingBottom = function (PaddingBottom)
{
    this.PaddingBottom = PaddingBottom;
    this.Html.style.paddingBottom = this.PaddingBottom+"px";
}

Gwt.Gui.Frame.prototype.GetPaddingBottom = function ()
{
    return this.PaddingBottom;
}

Gwt.Gui.Frame.prototype.SetPaddingLeft = function (PaddingLeft)
{
    this.PaddingLeft = PaddingLeft;
    this.Html.style.paddingLeft = this.PaddingLeft+"px";
}

Gwt.Gui.Frame.prototype.SetPaddingRight = function (PaddingRight)
{
    this.PaddingRight = PaddingRight;
    this.Html.style.paddingRight = this.PaddingRight+"px";
}

Gwt.Gui.Frame.prototype.SetPositionType = function (PositionType)
{
    this.PositionType = PositionType;
    this.Html.style.position = this.PositionType;
}

Gwt.Gui.Frame.prototype.SetOverflow = function (Overflow)
{
    this.Overflow = Overflow;
    this.Html.style.overflow = this.Overflow;
}

Gwt.Gui.Frame.prototype.SetOpacity = function (Opacity)
{
    this.Opacity = Opacity;
    this.Html.style.opacity = this.Opacity;
}

Gwt.Gui.Frame.prototype.SetTextShadow = function (Offsx, Offsy, Blur, Color)
{
    this.TextShadowOffsx = Offsx;
    this.TextShadowOffsy = Offsy;
    this.TextShadowBlur = Blur;
    this.TextShadowColor = Color;
    this.Html.style.textShadow = this.TextShadowOffsx+"px "+this.TextShadowOffsy+"px "+this.TextShadowBlur+"px "+this.TextShadowColor.ToString ();
}

Gwt.Gui.Frame.prototype.SetZIndex = function (ZIndex)
{
    this.ZIndex = ZIndex;
    this.Html.style.zIndex = this.ZIndex;
}


Gwt.Gui.Frame.prototype.SetSelectable = function (UserSelect)
{
    this.UserSelect = UserSelect;
    this.Html.style.userSelect = this.UserSelect;
}

Gwt.Gui.Frame.prototype.SetValign = function (Valign)
{
    this.Valign = Valign;
    this.Html.style.verticalAlign = this.Valign;
}

Gwt.Gui.Frame.prototype.SetVisibility = function (Value)
{
    this.Visibility = Value;
    this.Html.style.visibility = this.Visibility;
}

Gwt.Gui.Frame.prototype.SetExpand = function (Expand)
{
    this.Expand = Expand;
}

Gwt.Gui.Frame.prototype.GetExpand = function ()
{
    return this.Expand;
}

Gwt.Gui.Frame.prototype.SetOutLine = function (OutLine)
{
    this.OutLine = OutLine;
    this.Html.style.outline = this.OutLine;
}

Gwt.Gui.Frame.prototype.GetOutLine = function ()
{
    return this.OutLine;
}

Gwt.Gui.Frame.prototype.SetHExpand = function (value)
{
    if (typeof(value) !== "boolean")
    {
        throw TypeError("Invalid Boolean Value");
    }
    else
    {
        this.HExpand = value;
    }
}

Gwt.Gui.Frame.prototype.SetScrollable = function() {
    var Theme = { Dark: "os-theme-dark", Light: "os-theme-light" }
    OverlayScrollbars(this.GetHtml(), { className: Theme.Dark });
}
//Ends Gwt::Gui::Frame Class
