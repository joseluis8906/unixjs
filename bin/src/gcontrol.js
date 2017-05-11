gcontrol = ( function ()
{
var instance;

function gcontrol ()
{
    Gwt.Gui.Window.call (this);

    this.Rpc = new Gwt.Core.Rpc ("/gcontrol/");
    this.Layout = new Gwt.Gui.VBox(5);
    this.Row1 = new Gwt.Gui.HBox(8);
    this.Row2 = new Gwt.Gui.HBox(8);
    this.Row3 = new Gwt.Gui.HBox(8);
    this.Row4 = new Gwt.Gui.HBox(8);
    this.Row5 = new Gwt.Gui.HBox(8);
    this.Icons = [];

    this.DisableTitleBar ();
    this.SetSize (544, 544);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);

    this.Layout.SetSize (this.GetAvailableWidth(), this.GetAvailableHeight());
    this.SetLayout (this.Layout);

    this.Row1.SetAlignment (Gwt.Gui.ALIGN_TOP);
    this.Row2.SetAlignment (Gwt.Gui.ALIGN_TOP);
    this.Row3.SetAlignment (Gwt.Gui.ALIGN_TOP);
    this.Row4.SetAlignment (Gwt.Gui.ALIGN_TOP);
    this.Row5.SetAlignment (Gwt.Gui.ALIGN_TOP);
    this.Layout.Add (this.Row1);
    this.Layout.Add (this.Row2);
    this.Layout.Add (this.Row3);
    this.Layout.Add (this.Row4);
    this.Layout.Add (this.Row5);

    this.Rpc.Send({Method: "Select"}, this.SelectResponse.bind(this));
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



gcontrol.prototype.SelectResponse = function (Res)
{
    for (var i = 0; i < Res.length; i++)
    {
        this.Icons.push (new Gwt.Gui.IconDesktop (Gwt.Core.Contrib.Images+Res[i].Image, Res[i].Label, Res[i].Name));
        if (i<5)
        {
          this.Row1.Add (this.Icons[i]);
        }
        else if (i >= 5 && i < 10)
        {
          this.Row2.Add (this.Icons[i]);
        }
        else if (i >= 10 && i < 15)
        {
          this.Row3.Add (this.Icons[i]);
        }
        else if (i >= 15 && i < 20)
        {
          this.Row4.Add (this.Icons[i]);
        }
        else if (i >= 20 && i < 25)
        {
          this.Row5.Add (this.Icons[i]);
        }
        this.LoadApp (Res[i].Name);
        Gwt.Core.Apps.push (eval ("window."+Res[i].Name));
    }
    console.log(Gwt.Core.Apps);
}


gcontrol.prototype.LoadApp = function (App)
{
    var TagScript = document.createElement('script');
    TagScript.type = 'text/javascript';
    TagScript.async = true;
    TagScript.src = "/bin/"+App+".min.js"+"?"+Math.trunc(Math.random()*1000);
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


gcontrol.prototype.CloseApps = function ()
{
    console.log(Gwt.Core.Apps);
    for (var i = 0; i < Gwt.Core.Apps.length; i++)
    {
        if(Gwt.Core.Apps[i] !== undefined && Gwt.Core.Apps[i] !== null)
        {
            Gwt.Core.Apps[i].close ();
        }
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
                instance.CloseApps ();
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
            }
	};
};
})();
