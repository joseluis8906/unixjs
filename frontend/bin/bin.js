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
	
	//new Gwt.Core.Request ("/backend/open_pool/", function () {}, {});
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
	
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH - 50, Gwt.Gui.SCREEN_DEVICE_HEIGHT - 50);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DisableTitleBar ();
	
    this.imageLogin = new Gwt.Gui.Image(Gwt.Core.Contrib.Images+"connecting_world.svg");
    this.imageLogin.SetSize (500, 350);
    this.imageLogin.SetPosition (170, 180);
    this.imageLogin.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
	
    this.title_label = new Gwt.Gui.StaticText ("Login");
    this.id_type_select = new Gwt.Gui.SelectBox ("Tipo de Documento", [{"text": "Tarjeta de Identidad", "value": "T.I"}, {"text": "Cédula de Ciudadanía", "value": "C.C"}, {"text": "Registro Civil", "value": "R.C"}, {"text": "Cédula Extranjera", "value": "C.E"}, {"text": "Pasaporte", "value": "PS"}, {"text": "Libreta Militar", "value": "L.M"}, {"text": "Registro de Defunción", "value": "R.D"}, {"text": "Carnét de Salud", "value": "C.S"}, {"text": "Registro Mercantil", "value": "R.M"}]);
    this.username_entry = new Gwt.Gui.Entry ("Número de Documento");
    this.username_entry.SetFocus ();
    this.password_entry = new Gwt.Gui.Entry ("Contraseña");
    this.password_entry.ChangeToPassword ();
    this.password_entry.SetMaxLength (4);
	
    this.send_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "Entrar");
    this.send_button.SetWidth (80);
    this.send_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.send.bind (this));
	
    this.controls_container = new Gwt.Gui.VBox ();
    this.controls_container.SetSize (180, 170);
	
    this.controls_container.SetPosition ((this.GetWidth()*70)/100, ((this.GetHeight()*50)/100)-(this.controls_container.GetHeight()/2));
	
    this.Add (this.imageLogin);
    this.Add (this.controls_container);
	
    this.controls_container.Add (this.title_label);
    this.controls_container.Add (this.id_type_select);
    this.controls_container.Add (this.username_entry);
    this.controls_container.Add (this.password_entry);
    this.controls_container.Add (this.send_button);
}

login.prototype = new Gwt.Gui.Window ();
login.prototype.constructor = login;

login.prototype.send = function ()
{
    if (this.username_entry.GetText () !== "" && this.password_entry.GetText () !== "")
    {
	var password = new jsSHA(this.password_entry.GetText (), "TEXT").getHash ("SHA-256", "HEX");
	new Gwt.Core.Request ("/backend/auth/", {'username': this.username_entry.GetText (), 'password': password}, this.response.bind(this));
    }
    else
    {
	console.log ("Datos vacíos");
    }
}

login.prototype.response = function (data)
{
    if (data.status === "success")
    {
        if (Boolean (Number (data.response)))
	{
            start_up_env (this.username_entry.GetText ());
	}
    }
    else
    {
	console.log (data);
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

    this.SetSize (250,330);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
	
    var date = new Date ();

    var days = [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb'];
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    this.clock = new Gwt.Gui.Clock ();
            
    this.date = new Gwt.Gui.StaticText ("%d, %m %n, %y".replace ("%d", days[date.getDay ()]).replace ("%m", months[date.getMonth ()]).replace ("%n", date.getDate ()).replace ("%y", date.getFullYear ()));
    this.date.SetWidth (180);
    this.date.TextAlign ("center");
	
    this.unlock_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"document-decrypt.svg", "Desbloquear");
    this.unlock_button.SetWidth (120);
	
    this.layout = new Gwt.Gui.VBox();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
	
    this.Add(this.layout);
    this.SetBorderSpacing (12);
    this.layout.Add(this.clock);
    this.layout.Add(this.date);
    this.layout.Add(this.unlock_button);
		
    this.unlock_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.unlock.bind(this));
}

block.prototype = new Gwt.Gui.Window ();
block.prototype.constructor = block;	

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

gusers = ( function ()
{
var instance;

function gusers () 
{
    Gwt.Gui.Window.call (this, "Usuarios");
	
    this.SetSize (320, 440);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
   
    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.magnify.svg", "Buscar", this.Buscar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Guardar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Actualizar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Eliminar.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gusers.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);
    
    this.layout = new Gwt.Gui.VBox ();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.Add (this.layout);
    this.SetBorderSpacing (12);
	
    this.avatar = new Gwt.Gui.Avatar ();
    this.avatar.SetSizeEditor (this.GetWidth(), this.GetHeight()-32);
    this.title = new Gwt.Gui.StaticText ("Datos:");
    this.doc_type = new Gwt.Gui.IconSelectBox (Gwt.Core.Contrib.Images+"appbar.notification.star.svg", "Tipo de Documento", [{"text": "Tarjeta de Identidad", "value": "T.I"}, {"text": "Cédula de Ciudadanía", "value": "C.C"}, {"text": "Registro Civil", "value": "R.C"}, {"text": "Cédula Extranjera", "value": "C.E"}, {"text": "Pasaporte", "value": "PS"}, {"text": "Libreta Militar", "value": "L.M"}]);
    this.doc_num = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.notification.svg", "Número de Documento");
    this.name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.user.tie.svg", "Nombre");
    this.last_name = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.user.add.svg", "Apellidos");
    this.phone = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.phone.svg", "Teléfono");
    this.email = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.email.minimal.svg", "Correo Electrónico");
    this.address = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Images+"appbar.home.location.round.svg", "Dirección de Residencia");
        
    this.layout.Add (this.avatar);
    this.layout.Add (this.title);
    this.layout.Add (this.doc_type);
    this.layout.Add (this.doc_num);
    this.layout.Add (this.name);
    this.layout.Add (this.last_name);
    this.layout.Add (this.phone);
    this.layout.Add (this.email);
    this.layout.Add (this.address);
    
    this.Add (this.avatar.GetEditor ());
}

gusers.prototype = new Gwt.Gui.Window ();
gusers.prototype.constructor = gusers;

gusers.prototype.FinalizeApp = function ()
{
    this.layout.FinalizeVBox ();
    this.layout = null;
    
    this.avatar.FinalizeAvatar ();
    this.avatar = null;
    
    this.croppie.FinalizeAvatar ();
    this.croppie = null;
    
    this.title.FinalizeStaticText ();
    this.title = null;
    
    this.doc_type.FinalizeIconSelectBox ();
    this.doc_type = null;
    
    this.doc_num.FinalizeIconEntry ();
    this.doc_num = null;
    
    this.name.FinalizeIconEntry ();
    this.name = null;
    
    this.last_name.FinalizeIconEntry ();
    this.last_name = null;
    
    this.phone.FinalizeIconEntry ();
    this.phone = null;
    
    this.email.FinalizeIconEntry ();
    this.email = null;
    
    this.address.FinalizeIconEntry ();
    this.address = null;
}

gusers.prototype.Buscar = function ()
{
    console.log ("Buscar");
}

gusers.prototype.Guardar = function ()
{
    console.log (atob(this.avatar.GetData ().replace(/\s/g, '')));
    //var data = {"user_info": {"document": "1098671330", "document_type": "c.c"}, "userfile": this.avatar.GetData ()};
    //new Gwt.Core.Request ("/backend/upload_file/", function(response){console.log(response)}, data);
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

gfiles = ( function ()
{
var instance;

function gfiles () 
{
    Gwt.Gui.Window.call (this, "Files");
    this.SetSize (640, 480);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DisableMenu ();
    
    this.places = new Gwt.Gui.Frame ();
    this.places.SetSize (144, this.GetHeight()-32);
    this.places.SetBackgroundColor(new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    
    this.places_layout = new Gwt.Gui.VBox (3);
    this.places_layout.SetSize(this.places.GetWidth(), this.places.GetHeight());
    this.places.Add (this.places_layout);
    
    this.documents = new Gwt.Gui.MenuItem(Gwt.Core.Contrib.Images + "appbar.page.bold.svg", "Documentos", function () {console.log("documentos");});
    this.documents.SetWidth(this.places_layout.GetWidth());
    this.places_layout.Add (this.documents);
    
    this.music = new Gwt.Gui.MenuItem(Gwt.Core.Contrib.Images + "appbar.music.svg", "Música", function () {console.log("música");});
    this.music.SetWidth(this.places_layout.GetWidth());
    this.places_layout.Add (this.music);
    
    this.pictures = new Gwt.Gui.MenuItem(Gwt.Core.Contrib.Images + "appbar.image.portrait.svg", "Imágenes", function () {console.log("imágenes");});
    this.pictures.SetWidth(this.places_layout.GetWidth());
    this.places_layout.Add (this.pictures);
    
    this.videos = new Gwt.Gui.MenuItem(Gwt.Core.Contrib.Images + "appbar.film.svg", "Vídeos", function () {console.log("vídeos");});
    this.videos.SetWidth(this.places_layout.GetWidth());
    this.places_layout.Add (this.videos);
    
    this.Add (this.places);
}

gfiles.prototype = new Gwt.Gui.Window ();
gfiles.prototype.constructor = gfiles;

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gfiles ();
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
