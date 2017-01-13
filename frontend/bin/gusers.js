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
	
    this.avatar = new Gwt.Gui.Avatar ("Avatar");
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
    
    this.doc_num.SetTabIndex(1);
    this.name.SetTabIndex(2);
    this.last_name.SetTabIndex(3);
    
    this.Add (this.avatar.GetEditor ());
}

gusers.prototype = new Gwt.Gui.Window ();
gusers.prototype.constructor = gusers;

gusers.prototype._app = function ()
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
    var params = [
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_FILE, this.avatar.GetData ()),
        new Gwt.Core.Parameter(Gwt.Core.PARAM_TYPE_JSON, {"Name": "Data", "Data": [{"DocumentType": this.doc_type.GetText(), "DocumentNum": this.doc_num.GetText(), "Name": this.name.GetText(), "LastName": this.last_name.GetText(), "Phone": this.phone.GetText(), "Email": this.email.GetText (), "Address": this.address.GetText ()}]})
    ];
    
    new Gwt.Core.Request ("/backend/gusers/save/", function(response){console.log(response)}, params);
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

