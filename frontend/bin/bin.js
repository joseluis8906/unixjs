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
function PanelItem (Width, Height, Text, Image)
{
    Gwt.Gui.Frame.call (this);
    
    this.Layout = new Gwt.Gui.HBox (12);
    this.Text = new Gwt.Gui.StaticText (Text);
    this.Image = new Gwt.Gui.Image (Image);
    
    this.SetSize (Width, Height);
    this.SetBorderColor (new Gwt.Gui.Contrib.Color (20, 20, 25, 0.9));
    this.SetBorderBottom (1);
    
    this.Layout.SetSize (this.GetWidth(), this.GetHeight ());
    this.Layout.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    this.Add (this.Layout);
    
    this.Text.SetExpand (false);
    this.Text.SetWidth (this.GetWidth () - 80, 24);
    this.Text.SetMarginLeft (12);
    
    this.Layout.Add (this.Text);
    
    this.Image.SetSize (32, 32);
    this.Image.SetMarginRight (24);
    this.Layout.Add (this.Image);
}
PanelItem.prototype = new Gwt.Gui.Frame ();
PanelItem.prototype.constructor = PanelItem;

PanelItem.prototype._PanelItem = function ()
{
    this.Text._StaticText();
    this.Image._Image();
    this.Layout._HBox();
    
    this.Text = null;
    this.Image = null;
    this.Layout = null;
    
    this._Frame ();
}

var instance;

function domotictrl () 
{
    Gwt.Gui.Window.call (this, "Control De Domótica");
    
    var WIDTH = 640;
    var HEIGHT = 480;
    
    this.Layout = new Gwt.Gui.HBox(0);
    this.Col1 = new Gwt.Gui.VBox (0);
    this.Col2 = new Gwt.Gui.VBox (0);
    this.Knob = new  Gwt.Gui.KnobThreeLevels ();
    this.Title = new Gwt.Gui.StaticText ("Ventilador");
    this.PanelCtrlHead = new Gwt.Gui.Frame ();
    this.PanelCtrlHeadBox = new Gwt.Gui.VBox (0);
    this.PanelCtrlTilte = new Gwt.Gui.StaticText ("Panel De Control");
    this.VentiladorPanelCtrl = null;
    this.VentanasPanelCtrl = null;
    this.LuzPanelCtrl = null;
    this.PersianasPanelCtrl = null;
        
    this.SetSize (WIDTH, HEIGHT);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DisableMenu ();
    
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());    
    this.Add (this.Layout);
    
    this.Col1.SetBackgroundImage (Gwt.Core.Contrib.Images + "blurry_background2_33.png");
    this.Col1.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
    this.Col1.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    this.Layout.Add (this.Col1);    
    
    this.Title.SetSize (320, 32);
    this.Title.SetExpand (false);
    this.Title.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.Title.SetMarginTop (25);
    this.Title.SetFontSize (20);
    this.Col1.Add (this.Title);
    
    this.Knob.SetMarginTop (48);
    this.Col1.Add (this.Knob);
    
    this.Col2.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.Layout.Add (this.Col2);
    
    this.PanelCtrlHead.SetExpand (true);
    this.PanelCtrlHead.SetHeight (48);
    this.PanelCtrlHead.SetBackgroundColor (new Gwt.Gui.Contrib.Color (40, 40, 45, 0.9));
    this.PanelCtrlHead.SetBorderColor (new Gwt.Gui.Contrib.Color (20, 20, 25, 0.9));
    this.PanelCtrlHead.SetBorder (1);
    this.PanelCtrlHead.SetBorderBottom (2);
    this.Col2.Add (this.PanelCtrlHead);
    
    this.PanelCtrlHeadBox.SetSize (this.PanelCtrlHead.GetWidth (), this.PanelCtrlHead.GetHeight ());
    this.PanelCtrlHead.Add (this.PanelCtrlHeadBox);
    
    this.PanelCtrlTilte.SetExpand (true);
    this.PanelCtrlTilte.SetTextAlignment (Gwt.Gui.Contrib.TextAlign.Center);
    this.PanelCtrlTilte.SetFontSize (16);
    this.PanelCtrlTilte.SetHeight (32);
    this.PanelCtrlTilte.SetMarginTop (10);
    this.PanelCtrlHeadBox.Add (this.PanelCtrlTilte);
    
    this.VentiladorPanelCtrl = new PanelItem (this.Col2.GetWidth(), 48, "Velocidad De Ventilador", Gwt.Core.Contrib.Images + "appbar.fan.box.svg");
    this.Col2.Add (this.VentiladorPanelCtrl);
    
    this.VentanasPanelCtrl = new PanelItem (this.Col2.GetWidth(), 48, "Apertura De Ventanas", Gwt.Core.Contrib.Images + "appbar.window.restore.svg");
    this.Col2.Add (this.VentanasPanelCtrl);
    
    this.LuzPanelCtrl = new PanelItem (this.Col2.GetWidth(), 48, "Atenuación De Luz", Gwt.Core.Contrib.Images + "appbar.lightbulb.coil.svg");
    this.Col2.Add (this.LuzPanelCtrl);
    
    this.PersianasPanelCtrl = new PanelItem (this.Col2.GetWidth(), 48, "Apertura De Persianas", Gwt.Core.Contrib.Images + "appbar.map.folds.svg");
    this.Col2.Add (this.PersianasPanelCtrl);
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
