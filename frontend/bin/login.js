login = (function ()
{
var instance;

function login () 
{
    Gwt.Gui.Window.call (this);

    //instace props
    this.imageLogin = new Gwt.Gui.Image(Gwt.Core.Contrib.Images+"connecting_world.svg");
    this.title_label = new Gwt.Gui.StaticText ("Login");    
    this.username_entry = new Gwt.Gui.Entry ("Nombre De Usuario");
    this.password_entry = new Gwt.Gui.Entry ("Contraseña");
    this.send_button = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "Entrar");
    this.controls_container = new Gwt.Gui.VBox ();
    
    //init
    this.SetSize (Gwt.Gui.SCREEN_DEVICE_WIDTH - 50, Gwt.Gui.SCREEN_DEVICE_HEIGHT - 50);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DisableTitleBar ();
	
    this.imageLogin.SetSize (500, 350);
    this.imageLogin.SetPosition (170, 180);
    this.imageLogin.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.Add (this.imageLogin);
    
    this.controls_container.SetSize (180, 170);
    this.controls_container.SetPosition ((this.GetWidth()*70)/100, ((this.GetHeight()*50)/100)-(this.controls_container.GetHeight()/2));
    this.Add (this.controls_container);
    
    this.controls_container.Add (this.title_label);
    
    this.username_entry.SetFocus ();
    this.controls_container.Add (this.username_entry);
    
    this.password_entry.ChangeToPassword ();
    this.password_entry.SetMaxLength (4);
    this.controls_container.Add (this.password_entry);
	
    this.send_button.SetWidth (80);
    this.send_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.send.bind (this));
    this.controls_container.Add (this.send_button);

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
    this.controls_container._VBox ();
    
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
            new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, {"UserName": this.username_entry.GetText(), "Password": this.password_entry.GetText()})
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
