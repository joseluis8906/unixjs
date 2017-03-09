//##################################################################################################
//Class Gwt::Graphics::Svg::Polyline
Gwt.Graphic.Svg.Polyline = function ()
{
    Gwt.Graphic.Svg.Graphic.call (this);

    //instace props
    this.Points = null;
 
    //init
    this.SetHtml ("polyline");
}

Gwt.Graphic.Svg.Polyline.prototype = new Gwt.Graphic.Svg.Graphic ();
Gwt.Graphic.Svg.Polyline.prototype.constructor = Gwt.Graphic.Svg.Polyline;

Gwt.Graphic.Svg.Polyline.prototype.SetPoints = function (Points)
{
    this.Points = Points;
    this.Html.setAttribute ("points", this.Points);
}

Gwt.Graphic.Svg.Polyline.prototype.GetPoints = function ()
{
    return this.Points;
}
//##########################################################################################################
//Gwt::Graphic::Svg::Polyline

