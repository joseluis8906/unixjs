//##################################################################################################
//Class Gwt::Graphics::Svg::Rect
Gwt.Graphic.Svg.Rect = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);
    
    //instance props
    this.X = null;
    this.Y = null;
    this.Rx = null;
    this.Ry = null;
    
    //init
    this.SetHtml ("rect");
    this.SetX (0);
    this.SetY (0);
    this.SetSize (100, 100);
}

Gwt.Graphic.Svg.Rect.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Rect.prototype.constructor = Gwt.Graphic.Svg.Rect;

Gwt.Graphic.Svg.Rect.prototype._Rect = function ()
{
    this.X = null;
    this.Y = null;
    this.Rx = null;
    this.Ry = null;
    
    this._Graphic ();
}

Gwt.Graphic.Svg.Rect.prototype.SetX = function (X)
{
    this.X = X;
    this.Html.setAttribute ("x", this.X+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetX = function ()
{
    return this.X;
}

Gwt.Graphic.Svg.Rect.prototype.SetY = function (Y)
{
    this.Y = Y;
    this.Html.setAttribute ("Y", this.Y+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetY = function ()
{
    return this.Y;
}

Gwt.Graphic.Svg.Rect.prototype.SetRx = function (Rx)
{
    this.Rx = Rx;
    this.Html.setAttribute ("rx", this.Rx+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetRx = function ()
{
    return this.Rx;
}

Gwt.Graphic.Svg.Rect.prototype.SetRy = function (Ry)
{
    this.Ry = Ry;
    this.Html.setAttribute ("ry", this.Ry+"px");
}

Gwt.Graphic.Svg.Rect.prototype.GetRy = function ()
{
    return this.Ry;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Rect

