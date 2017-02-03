/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
gpanel = ( function ()
{
var instance;

function gpanel () 
{
    Gwt.Gui.Window.call (this);

    this.Layout = new Gwt.Gui.HBox(5);
    this.BtnLogout = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.power.svg");
    
    this.DisableTitleBar ();
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH-2, 32);
    this.SetBorderRadius (0);
    this.SetBorderLeft (0);
    this.SetBorderTop (0);
    this.SetBorderRight (0);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER, Gwt.Gui.WIN_POS_TOP);
    this.SetBorderSpacing (0);
    this.DisableMenu ();
    
    this.SetLayout (this.Layout);
    this.Layout.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    
    this.BtnLogout.SetSize (24,24);    
    this.BtnLogout.AddEvent(Gwt.Gui.Event.Mouse.Click, function (){window.terminate_session()});
    
    this.Layout.Add(this.BtnLogout);
    
}

gpanel.prototype = new Gwt.Gui.Window ();
gpanel.prototype.constructor = gpanel;

gpanel.prototype._App = function ()
{
    this.BtnLogout._Image ();
    this.Layout._HBox ();
    
    this.BtnLogout = null;
    this.Layout = null;
}

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gpanel ();
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
