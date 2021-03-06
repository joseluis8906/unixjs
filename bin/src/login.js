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
    this.send_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.StartSession.bind (this));
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

login.prototype.StartSession = function ()
{
    if (this.username_entry.GetText () !== "" && this.password_entry.GetText () !== "")
    {
        new Gwt.Core.Session (this.username_entry.GetText(), this.password_entry.GetText());
    }
    else
    {
	    console.log ("Datos vacíos");
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
