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
    Gwt.Gui.Window.call (this, "Sessión Bloqueada");

    //instance props
    this.clock = new Gwt.Gui.Clock ();
    this.date = null;
    this.unlock_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"document-decrypt.svg", "Desbloquear");
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

    this.unlock_button.SetWidth (120);
    
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

gusers = ( function ()
{
var instance;

function gusers () 
{
    Gwt.Gui.Window.call (this, "Usuarios");
	
    this.SetSize (320, 548);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
   
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.magnify.svg", "Buscar", this.Buscar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Actualizar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gusers.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);
    
    this.Avatar = new Gwt.Gui.Avatar ("Avatar", "jpg",480, 480);
    this.Avatar.SetSizeEditor (this.GetAvailableWidth(), this.GetAvailableHeight());
    this.Title = new Gwt.Gui.StaticText ("Datos:");
    this.UserName = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.user.tie.svg", "Usuario");
    this.Password = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.lock.svg", "Contraseña");
    this.Password.ChangeToPassword ();
    this.Password.SetMaxLength(4);
    this.DocType = new Gwt.Gui.IconSelectBox (Gwt.Core.Contrib.Images+"appbar.notification.star.svg", "Tipo de Documento", [{"Text": "Tarjeta de Identidad", "Value": "T.I"}, {"Text": "Cédula de Ciudadanía", "Value": "C.C"}, {"Text": "Registro Civil", "Value": "R.C"}, {"Text": "Cédula Extranjera", "Value": "C.E"}, {"Text": "Pasaporte", "Value": "PS"}, {"Text": "Libreta Militar", "Value": "L.M"}]);
    this.DocNum = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.notification.svg", "Número de Documento");
    this.Country = new Gwt.Gui.IconSelectBox (Gwt.Core.Contrib.Images+"appbar.globe.svg", "País", Gwt.Core.Contrib.COUNTRIES_ISO);
    this.Name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.user.svg", "Nombre");
    this.LastName = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.user.add.svg", "Apellidos");
    this.Phone = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.phone.svg", "Teléfono");
    this.Email = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.at.svg", "Correo Electrónico");
    this.Address = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.home.location.round.svg", "Dirección de Residencia");
        
    this.Layout.Add (this.Avatar);
    this.Layout.Add (this.Title);
    this.Layout.Add (this.UserName);
    this.Layout.Add (this.Password);
    this.Layout.Add (this.DocType);
    this.Layout.Add (this.DocNum);
    this.Layout.Add (this.Country);
    this.Layout.Add (this.Name);
    this.Layout.Add (this.LastName);
    this.Layout.Add (this.Phone);
    this.Layout.Add (this.Email);
    this.Layout.Add (this.Address);
    
    this.UserName.SetTabIndex(1);
    this.Password.SetTabIndex(2);
    this.DocType.SetTabIndex(3);
    this.DocNum.SetTabIndex(4);
    this.Country.SetTabIndex(5);
    this.Name.SetTabIndex(6);
    this.LastName.SetTabIndex(7);
    this.Phone.SetTabIndex(8);
    this.Email.SetTabIndex(9);
    this.Address.SetTabIndex(10);
    
    this.Add (this.Avatar.GetEditor ());
}

gusers.prototype = new Gwt.Gui.Window ();
gusers.prototype.constructor = gusers;

gusers.prototype._App = function ()
{
    this.Avatar._Avatar ();
    this.Title._StaticText ();
    this.UserName._IconEntry ();
    this.Password._IconEntry ();
    this.DocType._IconSelectBox ();
    this.DocNum._IconEntry ();
    this.Country._IconSelectBox ();
    this.Name._IconEntry ();
    this.LastName._IconEntry ();
    this.Phone._IconEntry ();
    this.Email._IconEntry ();
    this.Address._IconEntry ();
    this.Layout._VBox ();
    
    this.Avatar = null;
    this.Title = null;
    this.UserName = null;
    this.Password = null;
    this.DocType = null;
    this.DocNum = null;
    this.Country = null;
    this.Name = null;
    this.LastName = null;
    this.Phone = null;
    this.Email = null;
    this.Address = null;
    this.Layout = null;
}

gusers.prototype.Buscar = function ()
{
    console.log ("Buscar");
}

gusers.prototype.Guardar = function ()
{
    var Data = [
        {"UserName": this.UserName.GetText(), "Password": this.Password.GetText(),  "DocumentType": this.DocType.GetText(), "DocumentNum": this.DocNum.GetText(), "Country" : this.Country.GetText(), "Avatar": this.Avatar.GetText (), "Name": this.Name.GetText(), "LastName": this.LastName.GetText(), "Phone": this.Phone.GetText(), "Email": this.Email.GetText (), "Address": this.Address.GetText ()}
    ];
    
    var Params = [
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_FILE, "Avatar", this.Avatar.GetData ()),
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", Data)
    ];
    
    new Gwt.Core.Request ("/backend/gusers/save/", function(response){console.log(response)}, Params);
}

gusers.prototype.Actualizar = function ()
{
    console.log ("Actualizar");
}

gusers.prototype.Eliminar = function ()
{
    console.log ("Eliminar");
}

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gusers ();
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

ggroups = ( function ()
{
var instance;

function ggroups () 
{
    Gwt.Gui.Window.call (this, "Grupos");
	
    this.SetSize (256, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.ggroups.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);
    
    this.Name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.group.svg", "Nombre");
    this.Name.SetTabIndex(1);
    
    this.Layout.Add (this.Name);
}

ggroups.prototype = new Gwt.Gui.Window ();
ggroups.prototype.constructor = ggroups;

ggroups.prototype._App = function ()
{
}

ggroups.prototype.Buscar = function ()
{
}

ggroups.prototype.Guardar = function ()
{
    var Params = [
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", [{"Name": this.Name.GetText ()}])
    ];
    new Gwt.Core.Request ("/backend/ggroups/save/", function(response){console.log(response)}, Params);
}

ggroups.prototype.Actualizar = function ()
{
}

ggroups.prototype.Eliminar = function ()
{
}

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new ggroups ();
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

gusersgroups = ( function ()
{
var instance;

function gusersgroups () 
{
    Gwt.Gui.Window.call (this, "Usuarios y Grupos");
	
    this.SetSize (256, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gusersgroups.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);
    
    this.UserName = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.user.svg", "Nombre De Usuario");
    this.UserName.SetTabIndex(1);
    
    this.GroupName = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.group.svg", "Nombre De Grupo");
    this.GroupName.SetTabIndex(2);
    
    this.Layout.Add (this.UserName);
    this.Layout.Add (this.GroupName);
}

gusersgroups.prototype = new Gwt.Gui.Window ();
gusersgroups.prototype.constructor = gusersgroups;

gusersgroups.prototype._App = function ()
{
}

gusersgroups.prototype.Buscar = function ()
{
}

gusersgroups.prototype.Guardar = function ()
{
    var Params = [
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", [{"User": this.UserName.GetText (), "Group": this.GroupName.GetText ()}])
    ];
    new Gwt.Core.Request ("/backend/gusersgroups/save/", function(response){console.log(response)}, Params);
}

gusersgroups.prototype.Actualizar = function ()
{
}

gusersgroups.prototype.Eliminar = function ()
{
}

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gusersgroups ();
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

gapprole = ( function ()
{
var instance;

function gapprole () 
{
    Gwt.Gui.Window.call (this, "App Y Grupo");
	
    this.SetSize (256, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gapprole.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);
    
    this.Image = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.image.svg", "Nombre De Imagen");
    this.Image.SetTabIndex(1);
    
    this.Label = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.closedcaption.svg", "Etiqueta");
    this.Label.SetTabIndex(2);
    
    this.Name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.console.svg", "Nombre Del App");
    this.Name.SetTabIndex(2);
    
    this.Group = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.group.svg", "Grupo");
    this.Group.SetTabIndex(2);
    
    this.Layout.Add (this.Image);
    this.Layout.Add (this.Label);
    this.Layout.Add (this.Name);
    this.Layout.Add (this.Group);
}

gapprole.prototype = new Gwt.Gui.Window ();
gapprole.prototype.constructor = gapprole;

gapprole.prototype._App = function ()
{
}

gapprole.prototype.Buscar = function ()
{
}

gapprole.prototype.Guardar = function ()
{
    var Params = [
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, "Params", [{"Image": this.Image.GetText (), "Label": this.Label.GetText (), "Name": this.Name.GetText (), "Group": this.Group.GetText ()}])
    ];
    new Gwt.Core.Request ("/backend/gapprole/save/", function(response){console.log(response)}, Params);
}

gapprole.prototype.Actualizar = function ()
{
}

gapprole.prototype.Eliminar = function ()
{
}

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gapprole ();
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
