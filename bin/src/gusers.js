gusers = ( function ()
{
var instance;

function gusers ()
{
    Gwt.Gui.Window.call (this, "Usuarios");

    this.SetSize (320, 548);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.SetBorderSpacing (12);
    this.Rpc = new Gwt.Core.Rpc ("/gusers/");

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.cabinet.in.svg", "Guardar", this.Insert.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.refresh.svg", "Actualizar", this.Update.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.delete.svg", "Eliminar", this.Delete.bind(this));
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gusers.close(); window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.Layout = new Gwt.Gui.VBox ();
    this.Layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.Layout);

    this.Avatar = new Gwt.Gui.Avatar ("Avatar", "jpg", 480, 480, this.Upload.bind(this));
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

    this.UserName.AddEvent (Gwt.Gui.Event.Keyboard.KeyUp, this.Select.bind(this));
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
};

gusers.prototype.Upload = function (Event)
{
    var MediaRpc = new Gwt.Core.Rpc("/media/");
    MediaRpc.Send({Method: "Insert", UserName: "root", FileName: this.Avatar.GetFileName(), Type: this.Avatar.GetType()}, this.PreUploadResponse.bind (this));
};

gusers.prototype.PreUploadResponse = function (Res)
{
    if (Res.Result === 1)
    {
        this.Avatar.SetName (Res.Name);
        new Gwt.Core.Upload (this.Avatar, this.UploadResponse.bind(this));
    }
};

gusers.prototype.UploadResponse = function (Res)
{
    if (Res.Result !== 1)
    {
        var MediaRpc = new Gwt.Core.Rpc("/media/");
        MediaRpc.Send({Method: "Delete", Name: this.Avatar.GetName(), Type: this.Avatar.GetType()});
    }
};

gusers.prototype.Select = function (Event)
{
    if(Event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
    {
        this.Rpc.Send ({Method: "Select", UserName: this.UserName.GetText ()}, this.SelectResponse.bind(this));
    }
};

gusers.prototype.SelectResponse = function (Res)
{
    if (Res.length > 0)
    {
        this.DocType.SetText (Res[0].DocumentType);
        this.DocNum.SetText (Res[0].DocumentNum);
        this.Country.SetText (Res[0].Country);
        this.Name.SetText (Res[0].Name);
        this.LastName.SetText (Res[0].LastName);
        this.Phone.SetText (Res[0].Phone);
        this.Email.SetText (Res[0].Email);
        this.Address.SetText (Res[0].Address);
        this.Avatar.SetName (Res[0].AvatarName);
        this.Avatar.SetType (Res[0].AvatarType);
        this.Avatar.SetImage ("/images/"+Res[0].AvatarName+"."+Res[0].AvatarType);
    }
    else
    {
        this.Reset();
    }
};

gusers.prototype.Insert = function ()
{
    var Data = {
        Method: "Insert",
        UserName: this.UserName.GetText(),
        Password: this.Password.GetText(),
        DocumentType: this.DocType.GetText(),
        DocumentNum: this.DocNum.GetText(),
        Country : this.Country.GetText(),
        Name: this.Name.GetText(),
        LastName: this.LastName.GetText(),
        Phone: this.Phone.GetText(),
        Email: this.Email.GetText (),
        Address: this.Address.GetText (),
        AvatarName: this.Avatar.GetName (),
        AvatarType: this.Avatar.GetType ()
    };

    this.Rpc.Send (Data, this.InsertResponse.bind(this));
};

gusers.prototype.InsertResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
    else
    {
        console.log("Error: inserting new user");
        var MediaRpc = new Gwt.Core.Rpc("/media/");
        MediaRpc.Send({Method: "Delete", Name: this.Avatar.GetName(), Type: this.Avatar.GetType()});
    }
};

gusers.prototype.Update = function ()
{
    var MediaRpc = new Gwt.Core.Rpc("/media/");
    MediaRpc.Send({Method: "Update", UserName: this.UserName.GetText(), Name: this.Avatar.GetName(), Type: this.Avatar.GetType()}, this.UpdateData.bind(this));
};

gusers.prototype.UpdateData = function (Res)
{
    if (Res.affected_rows === 1)
    {
        var Data = {
            Method: "Update",
            UserName: this.UserName.GetText(),
            Password: this.Password.GetText(),
            DocumentType: this.DocType.GetText(),
            DocumentNum: this.DocNum.GetText(),
            Country : this.Country.GetText(),
            Name: this.Name.GetText(),
            LastName: this.LastName.GetText(),
            Phone: this.Phone.GetText(),
            Email: this.Email.GetText (),
            Address: this.Address.GetText (),
            AvatarName: this.Avatar.GetName (),
            AvatarType: this.Avatar.GetType ()
        };

        this.Rpc.Send (Data, this.UpdateResponse.bind(this));
    }
};

gusers.prototype.UpdateResponse = function (Res)
{
    if (Res.affected_rows === 1)
    {
        this.Reset ();
    }
    else
    {
        console.log("Error: updating user");
    }
};

gusers.prototype.Delete = function ()
{
    this.Rpc.Send ({Method: "Delete", UserName: this.UserName.GetText()}, this.DeleteMedia.bind(this));
};

gusers.prototype.DeleteMedia = function (Res)
{
    if (Res.affected_rows === 1)
    {
        var MediaRpc = new Gwt.Core.Rpc("/media/");
        MediaRpc.Send({Method: "Delete", Name: this.Avatar.GetName(), Type: this.Avatar.GetType()}, this.DeleteResponse.bind(this));
    }
    else
    {
        console.log("Error: deleting user");
    }
};

gusers.prototype.DeleteResponse = function (Res)
{
    this.Reset ();
};

gusers.prototype.Reset = function ()
{
    this.Avatar.Reset ();
    this.UserName.SetText ("");
    this.Password.SetText ("");
    this.DocType.SetText ("");
    this.DocNum.SetText ("");
    this.Country.SetText ("");
    this.Name.SetText ("");
    this.LastName.SetText ("");
    this.Phone.SetText ("");
    this.Email.SetText ("");
    this.Address.SetText ("");
};

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
    };

    this.close = function ()
    {
        if (instance !== undefined)
        {
            instance.Close ();
            instance = undefined;
        }
    };
};
})();
