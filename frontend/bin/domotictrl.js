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
    
    //color rgba(48, 40, 40, 0.9);
    this.Layout.SetSize (this.GetWidth (), this.GetHeight());    
    this.Add (this.Layout);
    
    this.Layout.Add (this.Col1);
    
    this.Col2.SetBackgroundColor (new Gwt.Gui.Contrib.Color (48, 40, 40, 0.9))
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
