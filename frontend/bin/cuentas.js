cuentas = (function ()
{
var instance;


function cuentas()
{
    Gwt.Gui.Window.call (this, "Cuentas");
    this.SetSize (200, 170);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    
    //this.title_label.SetWidth ();
    this.code = new Gwt.Gui.Entry ("Código");
    this.name = new Gwt.Gui.Entry ("Nombre");
    this.save_button = new Gwt.Gui.ButtonSvUpDl ();
    
    this.layout = new Gwt.Gui.VBox ();
	
    this.Add (this.layout);
    this.SetBorderSpacing (12);
    
    this.layout.Add (this.code);
    this.layout.Add (this.name);
    this.layout.Add (this.save_button);
    
    this.save_button.AddEvent (Gwt.Gui.Event.Mouse.Click, this.action.bind (this));
    this.code.attach_event (Gwt.Gui.Event.Keyboard.KeyUp, this.check_id.bind (this));
	
    this.update = false;
    this.id_update_delete = null;
}

cuentas.prototype = new Gwt.Gui.Window ();
cuentas.prototype.constructor = cuentas;

cuentas.prototype.action = function (event)
{
    var row;
    if (!this.update)
    {
        if(this.code.GetText () !== "" && this.name.GetText () !== "")
        {
            var nueva_cuenta = [{"code": this.code.GetText (), "name": this.name.GetText ()}];
            new Gwt.Core.Request("/backend/acounting/acount/new/", function(data){console.log (data);}, nueva_cuenta);
            this.code.SetText ("");
            this.name.SetText ("");
        }
    }
    else
    {
        if (!event.ctrlKey)
        {
            row = new row_cuenta (this.id_update_delete, this.code.GetText (), this.name.GetText ());
            this.table.update (row);
            this.code.SetText ("");
            this.name.SetText ("");
            this.id_update_delete = null;
            this.save_button.set_update (false);
            this.update = false;
        }
        else
        {
            row = new row_cuenta (this.id_update_delete, this.code.GetText (), this.name.GetText ());
            this.table.delete (row);
            this.id_update_delete = null;
            this.code.SetText ("");
            this.name.SetText ("");
            this.save_button.set_update (false);
            this.update = false;
        }
    }
}

cuentas.prototype.check_id = function (event)
{
    //console.log (event);
    if (event.keyCode != Gwt.Gui.Event.Keyboard.KeyCodes.Ctrl)
    {
        var row = new row_cuenta (this.id_update_delete, this.code.GetText (), this.name.GetText ());
        this.table.select (row, this.check_id_response.bind(this));
    }
}

cuentas.prototype.check_id_response = function (rows)
{
    if (rows instanceof Array)
    {
        if (rows.length === 0)
        {
            this.name.SetText ("");
            this.save_button.set_update (false);
            this.update = false;
        }
	
        else
        {
            for (var i=0; i<rows.length; i++)
            {
                if (rows[i].code === this.code.GetText())
                {
                    this.name.SetText (rows[i].name);
                    this.id_update_delete = rows[i].id;
                    this.save_button.set_update (true);
                    this.update = true;
                    break;
                }
            }
        }
    }
}

return new function ()
{
    this.open = function()
    {
        if(instance === undefined)
        {
            instance = new cuentas();
            instance.Open ();
        }
        else
        {
            console.log ("%app yet opened".replace("%app", instance.__proto__.constructor.name));
        }
    }
	
    this.close = function ()
    {
        if(instance !== undefined)
        {
            instance.Close();
            instance = undefined;
        }
    }
}
})();
