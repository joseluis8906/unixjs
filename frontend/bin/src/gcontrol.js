gcontrol = ( function ()
{
var instance;

function gcontrol () 
{
    Gwt.Gui.Window.call (this);

    this.Layout = new Gwt.Gui.VBox(5);
    this.Row1 = new Gwt.Gui.HBox(8);
    this.Icons = [];
        
    this.DisableTitleBar ();
    this.SetSize (544, 544);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    
    this.Layout.SetSize (this.GetAvailableWidth(), this.GetAvailableHeight());
    this.SetLayout (this.Layout);
    
    this.Row1.SetAlignment (Gwt.Gui.ALIGN_TOP);
    this.Layout.Add (this.Row1);
    
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
    this.Row1._HBox ();
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
        this.Row1.Add (this.Icons[i]);
        this.LoadApp (Data[i].Name);
    }
}



gcontrol.prototype.LoadApp = function (App) 
{
    var TagScript = document.createElement('script');
    TagScript.type = 'text/javascript';
    TagScript.async = true;
    TagScript.src = "/frontend/bin/"+App+".min.js";
    var Head = document.head;
    
    var Insert = true;
    
    for (var i = 0; i < Head.childNodes.length; i++)
    {
        if (Head.childNodes[i].src === TagScript.src)
        {
            Insert = false;
        }
    }
    
    if (Insert === true)
    {
        Head.appendChild(TagScript);
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
                Gwt.Core.Contrib.SetActiveApp (window.gcontrol);
            }
            else
            {
                console.log ("%app opened yet".replace ("%app", instance.__proto__.constructor.name));
            }
                
	};
		
	this.close = function ()
	{
            if (instance !== undefined)
            {
                instance.Close();
                instance = undefined;
                Gwt.Core.Contrib.RemoveActiveApp ();
            }   
	};
};
})();

