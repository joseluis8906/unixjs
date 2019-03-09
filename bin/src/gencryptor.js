gencryptor = ( function ()
{
var instance;

function gencryptor () 
{
    Gwt.Gui.Window.call (this, "Máquina Enigma :)");
	
    this.SetSize (480, 450);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);

    this.EnableMenu ();
    this.AddMenuItem (Gwt.Core.Contrib.Images + "appbar.power.svg", "Salir", function(){window.gcontrol.open();}, Gwt.Gui.MENU_QUIT_APP);

    this.layout = new Gwt.Gui.VBox ();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.layout);
    this.SetBorderSpacing (12);

    //this.ent_clav_cifr = new Gwt.Gui.IconEntry(Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.notification.svg", "Clave De Cifrado");
    //this.ent_clav_cifr.SetMaxLength (16);
    this.lbl_source = new Gwt.Gui.StaticText ("Texto Fuente:");
    this.txt_source = new Gwt.Gui.Text ("escriba el texto original |");
    this.sel_enc_dec = new Gwt.Gui.IconSelectBox (Gwt.Core.Contrib.Images+"appbar.notification.star.svg", "Acción", [{"Text": "Cifrar Texto", "Value": "cifrar"}, {"Text": "Descifrar Texto", "Value": "descifrar"}]);
    this.lbl_result = new Gwt.Gui.StaticText ("Texto Resultante:");
    this.txt_result = new Gwt.Gui.Text ("|");
    this.btn_action = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.arrow.right.svg", "Cifrar/Descifrar");
    this.btn_action.SetWidth (145);
    this.btn_action.AddEvent(Gwt.Gui.Event.Mouse.Click, this.action_calback.bind(this));
    
    //this.layout.Add (this.ent_clav_cifr);
    this.layout.Add (this.lbl_source);
    this.layout.Add (this.txt_source);
    this.layout.Add (this.sel_enc_dec);
    this.layout.Add (this.lbl_result);
    this.layout.Add (this.txt_result);
    this.layout.Add (this.btn_action);
}

gencryptor.prototype = new Gwt.Gui.Window ();
gencryptor.prototype.constructor = gencryptor;

gencryptor.prototype.action_calback = function ()
{
    var option = this.sel_enc_dec.GetText ();
    if (option === "cifrar")
    {
        this.encrypt ();
    }
    else if (option === "descifrar")
    {
        this.decrypt ();
    }
}

gencryptor.prototype.encrypt = function ()
{
    //var clave = this.ent_clav_cifr.GetText ();
    
    //if (clave.length < 16)
    //{
        //alert ("La clave debe tener 16 caracteres!");
        //return;
    //}
    
    var source_text = this.txt_source.GetText ();
    
    var alfanum = "Am8EI5JsLñaNdhSc4TpKU2YZb1eP6fCgFijXkOl9RGnoVBqrtuDvwQxHyz0M3Ñ7@#$%&/()?¡ ";
    
    //alert(alfanum.length);
    
    //var j = 0;
    var result = "";
    
    for (var i = 0; i < source_text.length; i++)
    {
        //if(j >= 16)
        //{
            //j = 0;
        //}
        
        //var cl_ch = alfanum.indexOf(clave[j]);
        var sc_ch = alfanum.indexOf (source_text[i]);
        
        sc_ch += 1;
        
        if (sc_ch === alfanum.length)
        {
            sc_ch = 0;
        }
        
        result += alfanum[(sc_ch)];
    } 
    
    this.txt_result.SetText (result);
    
    //var base = alfanum.indexOf(clave[0]);
    //var exponente = alfanum.indexOf (source_text[0]);
    
    //var digest = Math.pow (base, exponente) % 97;

    //console.log ("el nuevo valor es: "+alfanum[digest]);
}

gencryptor.prototype.decrypt = function ()
{
    //var clave = this.ent_clav_cifr.GetText ();
    
    //if (clave.length < 16)
    //{
        //alert ("La clave debe tener 16 caracteres!");
        //return;
    //}
    
    var source_text = this.txt_source.GetText ();
    
    var alfanum = "Am8EI5JsLñaNdhSc4TpKU2YZb1eP6fCgFijXkOl9RGnoVBqrtuDvwQxHyz0M3Ñ7@#$%&/()?¡ ";
    
    //var j = 0;
    var result = "";
    
    for (var i = 0; i < source_text.length; i++)
    {
        //if(j >= 16)
        //{
            //j = 0;
        //}
        
        //var cl_ch = alfanum.indexOf (clave[j]);
        var sc_ch = alfanum.indexOf (source_text[i]);
        
        sc_ch -= 1;
        
        if (sc_ch === -1)
        {
            sc_ch = alfanum.length-1;
        }
        
        result += alfanum[(sc_ch)];
    } 
    
    this.txt_result.SetText (result);
}

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gencryptor ();
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

