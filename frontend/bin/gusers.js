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

