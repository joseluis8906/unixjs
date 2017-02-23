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
	this.SetBackgroundImage (Gwt.Core.Contrib.Images+"wallpaper1.jpeg");
	this.SetBackgroundAttachment (Gwt.Gui.Contrib.BackgroundAttachment.Fixed);
	this.SetBackgroundClip (Gwt.Gui.Contrib.BackgroundClip.ContentBox);
	this.SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat, Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
	this.SetBackgroundSize (Gwt.Gui.Contrib.BackgroundSize.Cover);
	this.SetBorder (0);
        
        this.AddEvent (Gwt.Gui.Event.Form.ContextMenu, function (e){e.preventDefault();});
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
login = (function ()
{
var instance;

function login () 
{
    Gwt.Gui.Window.call (this);

    //instace props
    this.Layout = new Gwt.Gui.HBox(48);
    this.imageLogin = new Gwt.Gui.Image(Gwt.Core.Contrib.Images+"connecting_world.svg");
    this.title_label = new Gwt.Gui.StaticText ("Login");    
    this.username_entry = new Gwt.Gui.Entry ("Nombre De Usuario");
    this.password_entry = new Gwt.Gui.Entry ("Contraseña");
    this.send_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "Entrar");
    this.controls_container = new Gwt.Gui.Frame ();
    this.boxcontainer = new Gwt.Gui.VBox(12);
    
    //init
    this.SetSize (640, 480);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (24);
    this.DisableTitleBar ();
    
    this.SetLayout (this.Layout);
    this.Layout.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    
    this.imageLogin.SetSize (320, 240);
    this.Layout.Add (this.imageLogin);
    
    this.controls_container.SetSize (140, 160);
    this.Layout.Add (this.controls_container);
    
    this.boxcontainer.SetSize (this.controls_container.GetWidth (), this.controls_container.GetHeight ());
    this.controls_container.Add(this.boxcontainer);
    
    this.boxcontainer.Add (this.title_label);
    
    this.username_entry.SetFocus ();
    this.boxcontainer.Add (this.username_entry);
    
    this.password_entry.ChangeToPassword ();
    this.password_entry.SetMaxLength (4);
    this.boxcontainer.Add (this.password_entry);
	
    this.send_button.SetWidth (80);
    this.send_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.send.bind (this));
    this.boxcontainer.Add (this.send_button);
}

login.prototype = new Gwt.Gui.Window ();
login.prototype.constructor = login;

login.prototype._App = function ()
{
    this.imageLogin._Image ();
    this.title_label._StaticText ();
    this.username_entry._Entry ();
    this.password_entry._Entry ();
    this.send_button._Button ();
    this.boxcontainer._VBox ();
    this.controls_container._Frame ();
    
    this.imageLogin = null;
    this.title_label = null;
    this.username_entry = null;
    this.password_entry = null;
    this.send_button = null;
    this.controls_container = null;
}

login.prototype.send = function ()
{
    if (this.username_entry.GetText () !== "" && this.password_entry.GetText () !== "")
    {        
	var params = [
            new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", {"UserName": this.username_entry.GetText(), "Password": this.password_entry.GetText()})
        ];
    
        new Gwt.Core.Request ("/backend/auth/login/", this.response.bind (this), params);
    }
    else
    {
	console.log ("Datos vacíos");
    }
}

login.prototype.response = function (Res)
{
    if (Res.Result === 1)
    {
        window.login.close ();
        window.start_session ();
    }
    else
    {
	console.log ("Error");
    }
}
	
return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
	{
            instance = new login ();
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
block = (function ()
{ 
var instance;

function block ()
{
    Gwt.Gui.Window.call (this, "Sessión Terminada");

    //instance props
    this.clock = new Gwt.Gui.Clock ();
    this.date = null;
    this.unlock_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"document-decrypt.svg", "Entrar");
    this.layout = new Gwt.Gui.VBox();
    
    this.SetSize (250,330);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.DisableMenu ();
    
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.layout);
	
    var date = new Date ();

    var days = [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    this.date = new Gwt.Gui.StaticText ("%d, %m %n, %y".replace ("%d", days[date.getDay ()]).replace ("%m", months[date.getMonth ()]).replace ("%n", date.getDate ()).replace ("%y", date.getFullYear ()));
    this.date.SetWidth (180);
    this.date.TextAlign ("center");

    this.unlock_button.SetWidth (78);
    
    this.layout.Add(this.clock);
    this.layout.Add(this.date);
    this.layout.Add(this.unlock_button);
    	
    this.unlock_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.unlock.bind(this));
}

block.prototype = new Gwt.Gui.Window ();
block.prototype.constructor = block;

block.prototype._App = function ()
{
    this.clock._Clock ();
    this.date._StaticText ();
    this.unlock_button._Button ();
    this.layout._VBox ();
    
    this.clock = null;
    this.date = null;
    this.unlock_button = null;
    this.layout = null;
}

block.prototype.unlock = function ()
{
    unlock_session ();
}
	
return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new block ();
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
    this.Task = new Gwt.Gui.Frame();
    this.TxtName = new Gwt.Gui.StaticText ("Usuario: ");
    this.BtnLogout = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+"appbar.power.svg");
    
    this.DisableTitleBar ();
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH-2, 24);
    this.SetBorderRadius (0);
    this.SetBorderLeft (0);
    this.SetBorderTop (0);
    this.SetBorderRight (0);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER, Gwt.Gui.WIN_POS_TOP);
    this.SetBorderSpacing (0);
    this.DisableMenu ();
    
    this.SetLayout (this.Layout);
    this.Layout.SetAlignment (Gwt.Gui.ALIGN_CENTER);
    
    this.Task.SetSize (this.GetWidth () - 28, 20);
    this.Layout.Add (this.Task);
    
    this.TxtName.SetFontSize (10);
    this.TxtName.SetHeight (20);
    this.Task.Add (this.TxtName);
    
    this.BtnLogout.SetSize (20, 20);
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

