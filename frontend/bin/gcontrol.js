gcontrol = ( function ()
{
var instance;

function gcontrol () 
{
    Gwt.Gui.Window.call (this);
	
    this.SetSize (512, 512);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DisableTitleBar ();
    
    this.layout = new Gwt.Gui.VBox(5);
    this.layout.SetSize (this.GetWidth(), this.GetHeight());
    this.Add (this.layout);
    this.SetBorderSpacing (12);
    
    this.icons = [
        new Gwt.Gui.IconDesktop (Gwt.Core.Contrib.Images + "preferences-desktop-user.png", "Usuarios", function(){window.gcontrol.close(); window.gusers.open();})
    ];
    
    for (var i = 0; i < this.icons.length; i++)
    {
        this.layout.Add (this.icons[i]);
    }
}

gcontrol.prototype = new Gwt.Gui.Window ();
gcontrol.prototype.constructor = gcontrol;

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

