desktop = (function ()
{
var instance;
	
function desktop ()
{
	Gwt.Gui.Frame.call (this);
	document.body.appendChild (this.Html);
	this.SetClassName ("Gwt_Gui_Desktop");
	this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH, Gwt.Gui.SCREEN_DEVICE_HEIGHT);
	this.SetMargin (0);
	this.SetPadding (0);
	this.SetBackgroundImage (Gwt.Core.Contrib.Images+"dark1.jpeg");
	this.SetBackgroundAttachment (Gwt.Gui.Contrib.BackgroundAttachment.Fixed);
	this.SetBackgroundClip (Gwt.Gui.Contrib.BackgroundClip.ContentBox);
	this.SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat, Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
	this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
	this.SetBorder (0);
}
	
desktop.prototype = new Gwt.Gui.Frame ();
desktop.prototype.constructor = desktop;
	
desktop.prototype.Show = function (app)
{
	this.Add (app);
}
		
return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new desktop ();
		}
		else
		{
			console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
		}
	}
	
	this.show = function (app)
	{
		instance.Show (app);
	}
}
})();
domotictrl = ( function ()
{
var instance;

function domotictrl () 
{
    Gwt.Gui.Window.call (this, "Control De Domótica");
    
    this.Layout = new Gwt.Gui.HBox(0);
    this.Col1 = new Gwt.Gui.VBox ();
    this.Col2 = new Gwt.Gui.VBox ();
    this.Knob = new  Gwt.Gui.KnobThreeLevels ();
    this.Title = new Gwt.Gui.StaticText ("Control de Ventilador");
    this.Title.SetWidth (160);
    
    this.SetSize (640, 480);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DisableMenu ();
    
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());    
    this.Add (this.Layout);
    
    this.Col1.SetBackgroundImage (Gwt.Core.Contrib.Images + "blurry_background1_50.png");
    this.Col1.SetBackgroundSize (this.Col1.GetWidth (), this.Col1.GetHeight ());
    this.Col1.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    this.Layout.Add (this.Col1);    
    this.Col1.Add (this.Title);
    this.Col1.Add (this.Knob);
    
    this.Col2.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.Layout.Add (this.Col2);
    
}

domotictrl.prototype = new Gwt.Gui.Window ();
domotictrl.prototype.constructor = domotictrl;

domotictrl.prototype._app = function ()
{
    
}

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new domotictrl ();
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
