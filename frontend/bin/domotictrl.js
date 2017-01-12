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
    
    this.SetSize (640, 480);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DisableMenu ();
    
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());    
    this.Add (this.Layout);
    
    this.Col1.SetBackgroundImage (Gwt.Core.Contrib.Images + "blurry_background1.jpg");
    this.Layout.Add (this.Col1);
    this.Col1.SetBackgroundSize (this.Col1.GetWidth (); this.Col1.GetHeight ());
    
    this.Col2.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9))
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
