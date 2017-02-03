gcontrol = ( function ()
{
var instance;

function gcontrol () 
{
    Gwt.Gui.Window.call (this);

    this.Layout = new Gwt.Gui.VBox(5);
    this.Icons = [];
        
    
    this.DisableTitleBar ();
    this.SetSize (512, 512);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    
    this.Layout.SetSize (this.GetAvailableWidth(), this.GetAvailableHeight());
    this.SetLayout (this.Layout);
    
    new Gwt.Core.Request ("/backend/approles/", this.LoadAppRoles.bind(this), null, Gwt.Core.REQUEST_METHOD_GET);
}

gcontrol.prototype = new Gwt.Gui.Window ();
gcontrol.prototype.constructor = gcontrol;

gcontrol.prototype._App = function ()
{
    for (var i = 0; i < this.Icons.length; i++)
    {
        this.Icons[i]._IconDesktop ();
    }
    this.Layout._VBox ();
    
    this.Layout = null;
    this.Icons  = null;
}



gcontrol.prototype.LoadAppRoles = function (Res)
{
    var Data = Res.Data;
    for (var i = 0; i < Data.length; i++)
    {
        this.Icons.push (new Gwt.Gui.IconDesktop (Gwt.Core.Contrib.Images+Data[i].Image, Data[i].Label, Data[i].Name));
        this.Layout.Add (this.Icons[i]);
    }
}



return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new gcontrol ();
                        instance.Open ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
                
	}
		
	this.close = function ()
	{
            
		if (instance !== undefined)
		{
			instance.Close ();
			instance = undefined;
		} 
                
	}
}
})();

