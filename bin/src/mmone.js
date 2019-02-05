mmone = ( function ()
{
var instance;

function widget_custom (img, title, concept)
{
    Gwt.Gui.Frame.call (this);
    this.SetSize (320, 160);
    
    this.layout = new Gwt.Gui.HBox (12);
    this.layout.SetSize(this.GetWidth (), this.GetHeight ());
    this.Add (this.layout);
    
    this.img = new Gwt.Gui.Image (Gwt.Core.Contrib.Images+img);
    this.img.SetWidth (128);
    this.img.SetMarginRight (12);
    this.layout.Add (this.img);
    
    this.colText = new Gwt.Gui.VBox(0);
    this.layout.Add (this.colText);
    
    this.title = new Gwt.Gui.StaticText (title);
    this.title.SetFontSize (14);
    this.title.SetHeight (this.title.GetLength()*2);
    this.colText.Add (this.title);
    
    this.concept = new Gwt.Gui.StaticText (concept);
    this.concept.SetHeight (this.colText.GetHeight()*0.8);
    this.concept.SetTextAlignment(Gwt.Gui.Contrib.TextAlign.Justify);
    this.colText.Add (this.concept);
    
}
widget_custom.prototype = new Gwt.Gui.Frame ();
widget_custom.prototype.constructor = widget_custom;

widget_custom.prototype.update_value = function (value)
{
    var txt = this.concept.GetText ();
    this.concept.SetText (txt.replace("%s0", value));
}

function inputs (client, time, type_time)
{
    Gwt.Gui.Frame.call (this);
    this.SetSize (320, 160);
    
    this.layout = new Gwt.Gui.HBox (5);
    this.layout.SetSize (this.GetWidth(), this.GetHeight());
    this.Add (this.layout);
    
    this.client = client;
    this.client.SetSize (164, 24);
    this.layout.Add (this.client);
    
    this.time = time;
    this.time.SetSize (78, 24);
    this.layout.Add (this.time);
    
    this.type_time = type_time;
    this.type_time.SetSize (68, 24);
    this.layout.Add (this.type_time);
}
inputs.prototype = new Gwt.Gui.Frame ();
inputs.prototype.constructor = inputs;


function mmone () 
{
    Gwt.Gui.Window.call (this, "Colas Con Un Servidor");
	
    this.SetSize (715, 540);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);

    this.layout = new Gwt.Gui.VBox ();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetBorderSpacing (12);
    this.SetLayout (this.layout);
    
    
    this.slider = new Gwt.Gui.Slider (4);
    this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ());
    this.slider.Setup ();
    this.layout.Add (this.slider);
    
    this.titulo = new Gwt.Gui.StaticText ("Ingrese todos los valores requeridos");
    this.titulo.SetFontSize (18);
    this.titulo.SetMarginBottom (24);
    this.titulo.SetTextAlignment(Gwt.Gui.Contrib.TextAlign.Center);
    
    this.slider.AddSlotWidget(0, this.titulo);
    
    
    //slot 0
    this.slot0_row1 = new Gwt.Gui.HBox(48);
    this.slider.AddSlotWidget(0, this.slot0_row1);
    
    var concept1 = "Número de entidades\n\
                    promedio que ingresan al\n\
                    al sistema en un lapso\n\
                    de tiempo.";
    this.tasaDeLlegada = new widget_custom ("cola.svg", "Tasa de llegada λ", concept1);
    this.slot0_row1.Add (this.tasaDeLlegada);
    
    var concept2 = "Número de entidades\n\
                    promedio que pueden ser\n\
                    atendidas por el servidor\n\
                    en un lapso de tiempo.";
    this.tasaDeAtencion = new widget_custom ("servidor.svg", "Tasa de servicio μ", concept2);
    this.slot0_row1.Add (this.tasaDeAtencion);
    
    this.slot0_row2 = new Gwt.Gui.HBox(48);
    this.slider.AddSlotWidget(0, this.slot0_row2);
    
    this.inputs1 = new inputs(new Gwt.Gui.IconEntry (Gwt.Core.Contrib.Images+"appbar.group.svg", "Número de clientes"), new Gwt.Gui.IconEntry (Gwt.Core.Contrib.Images+"appbar.timer.svg", "Tiempo"), new Gwt.Gui.SelectBox ("En", [{"Text": "Minutos", "Value": "mins"}, {"Text": "Horas", "Value": "hrs"}]));
    this.slot0_row2.Add (this.inputs1);
    
    this.inputs2 = new inputs(new Gwt.Gui.IconEntry (Gwt.Core.Contrib.Images+"appbar.group.svg", "Número de clientes"), new Gwt.Gui.IconEntry (Gwt.Core.Contrib.Images+"appbar.timer.svg", "Tiempo"), new Gwt.Gui.SelectBox ("En", [{"Text": "Minutos", "Value": "mins"}, {"Text": "Horas", "Value": "hrs"}]));
    this.slot0_row2.Add (this.inputs2);
        
    this.frameAux = new Gwt.Gui.Frame ();
    this.frameAux.SetHeight (26);
    this.frameAux.SetExpand(true);
    this.layoutFrame = new Gwt.Gui.HBox(12);
    this.frameAux.Add (this.layoutFrame);
    this.slider.AddSlotWidget (0, this.frameAux);
    this.layoutFrame.SetSize(this.frameAux.GetWidth(), this.frameAux.GetHeight());
    
    this.calcBtn = new Gwt.Gui.Button (Gwt.Core.Contrib.Images+"appbar.notification.svg", "Calcular");
    this.calcBtn.SetWidth (90);
    this.calcBtn.AddEvent (Gwt.Gui.Event.Mouse.Click, this.calc.bind(this));
    this.layoutFrame.Add (this.calcBtn);
    
    this.n_entry = new Gwt.Gui.Entry("Ingrese n");
    this.n_entry.SetValign(Gwt.Gui.Contrib.Valign.Top);
    this.n_entry.SetWidth(72);
    this.layoutFrame.Add (this.n_entry);
    
    this.t_entry = new Gwt.Gui.Entry("Ingrese t");
    this.t_entry.SetValign(Gwt.Gui.Contrib.Valign.Top);
    this.t_entry.SetWidth(72);
    this.layoutFrame.Add (this.t_entry);
    
    this.cant_horas = new Gwt.Gui.Entry("Cantidad Horas");
    this.cant_horas.SetValign(Gwt.Gui.Contrib.Valign.Top);
    this.cant_horas.SetWidth(116);
    this.layoutFrame.Add (this.cant_horas);
    
    this.val_hora = new Gwt.Gui.Entry("Precio Hora");
    this.val_hora.SetValign(Gwt.Gui.Contrib.Valign.Top);
    this.val_hora.SetWidth(86);
    this.layoutFrame.Add (this.val_hora);
    
    //Slot1
    this.slot1_row1 = new Gwt.Gui.HBox(48);
    this.slider.AddSlotWidget (1, this.slot1_row1);
    
    var concept_ro = "Razón entre la taza de llegada\
                      y la taza promedio de servicio.\
                      % tiempo ocupado del sistema. %s0";
    this.widget_ro = new widget_custom ("ro.svg", "Factor de utilización", concept_ro);
    this.slot1_row1.Add(this.widget_ro);
    
    var concept_p0 = "Fracción de tiempo en que el sistema está desocupado. %s0";
    this.widget_p0 = new widget_custom ("p0.svg", "Factor de inutilización", concept_p0);
    this.slot1_row1.Add(this.widget_p0);
    
    this.slot1_row2 = new Gwt.Gui.HBox(48);
    this.slider.AddSlotWidget (1, this.slot1_row2);
    
    var concept_l = "Número estimado de clientes\
                     ya sea esperando en la linea\
                     o siendo atendido. %s0 Cliente(s)";
    this.widget_l = new widget_custom ("l.svg", "# de Clientes Esperando en el Sistema", concept_l);
    this.slot1_row2.Add(this.widget_l);
    
    var concept_lq = "Número estimado de clientes\
                     que espera ser atendido. %s0 Cliente(s)";
    this.widget_lq = new widget_custom ("lq.svg", "# de Clientes Esperando en Fila", concept_lq);
    this.slot1_row2.Add(this.widget_lq);
    
    
    
    //Slot 2
    this.slot2_row1 = new Gwt.Gui.HBox(48);
    this.slider.AddSlotWidget (2, this.slot2_row1);
    
    var concept_w = "Tiempo estimado que emplea un cliente esperando en el sistema. %s0mins";
    this.widget_w = new widget_custom ("w.svg", "Tiempo esperando en sistema", concept_w);
    this.slot2_row1.Add(this.widget_w);
    
    var concept_wq = "Tiempo estimado que emplea un cliente esperando en la cola. %s0mins";
    this.widget_wq = new widget_custom ("wq.svg", "Tiempo esperando en cola", concept_wq);
    this.slot2_row1.Add(this.widget_wq);
    
    this.slot2_row2 = new Gwt.Gui.HBox(48);
    this.slider.AddSlotWidget (2, this.slot2_row2);
    
    var concept_pn = "Probabilidad de tener n clientes en el sistema. %s0%";
    this.widget_pn = new widget_custom ("pn.svg", "% de tener N clientes en el sistema", concept_pn);
    this.slot2_row2.Add(this.widget_pn);
    
    var concept_plmajn = "Probabilidad de tener mas de N clientes en el sistema. %s0%";
    this.widget_plmajn = new widget_custom ("plmajn.svg", "% de tener mas de N Clientes en sistema", concept_plmajn);
    this.slot2_row2.Add(this.widget_plmajn);
    
    
    //slot 3
    this.slot3_row1 = new Gwt.Gui.HBox(48);
    this.slider.AddSlotWidget (3, this.slot3_row1);
    
    var concept_pwmajt = "Probabilidad de esperar mas de t tiempo en el sistema. %s0%";
    this.widget_pwmajt = new widget_custom ("pwmajt.svg", "% de espera en el sistema", concept_pwmajt);
    this.slot3_row1.Add(this.widget_pwmajt);
    
    var concept_pwqmajt = "Probabilidad de esperar mas de t tiempo en el fila. %s0%";
    this.widget_pwqmajt = new widget_custom ("pwqmajt.svg", "% de espera en cola", concept_pwqmajt);
    this.slot3_row1.Add(this.widget_pwqmajt);
    
    this.slot3_row2 = new Gwt.Gui.HBox(48);
    this.slider.AddSlotWidget (3, this.slot3_row2);
    
    var concept_cost = "Costo de tiempo perdido. $%s0";
    this.widget_cost = new widget_custom ("appbar.currency.dollar.svg", "Costo de tiempo perdido", concept_cost);
    this.slot3_row2.Add(this.widget_cost);
}

mmone.prototype = new Gwt.Gui.Window ();
mmone.prototype.constructor = mmone;

mmone.prototype.calc = function ()
{
    var lambda = 0;
    var numclient1 = this.inputs1.client.Control.GetText ();
    var time1 = this.inputs1.time.Control.GetText ();
    var type_time1 = this.inputs1.type_time.GetText ();
    
    if(type_time1 === "mins")
    {
        lambda = (numclient1/time1)*60;
    }
    else
    {
        lambda = numclient1/time1;
    }
    
    var miu = 0;
    var numclient2 = this.inputs2.client.Control.GetText ();
    var time2 = this.inputs2.time.Control.GetText ();
    var type_time2 = this.inputs2.type_time.GetText ();
    
    if(type_time2 === "mins")
    {
        miu = (numclient2/time2)*60;
    }
    else
    {
        miu = numclient2/time2;
    }
    
    var ro = lambda/miu;
    this.widget_ro.update_value (Gwt.Core.Math.Round(ro, 2));
    
    var P0 = 1-ro;
    this.widget_p0.update_value (Gwt.Core.Math.Round(P0, 2));
    
    var L = ro/(1-ro);
    this.widget_l.update_value (Gwt.Core.Math.Round(L, 0));
    
    var Lq = (Math.pow(ro, 2)/P0);
    this.widget_lq.update_value (Gwt.Core.Math.Round(Lq, 0));
    
    var W = 1/(miu*P0);
    this.widget_w.update_value (Gwt.Core.Math.Round(W, 2)*60);
    
    var Wq = ro/(miu*(P0));
    this.widget_wq.update_value (Gwt.Core.Math.Round(Wq, 2)*60);
    
    var n = this.n_entry.GetText();
    var Pn = (P0)*Math.pow(ro,n);
    this.widget_pn.update_value (Gwt.Core.Math.Round(Pn*100, 2));
    
    var Plmajn = Math.pow(ro, (L+1));
    this.widget_plmajn.update_value (Gwt.Core.Math.Round(Plmajn*100, 2));
    
    var t = this.t_entry.GetText();
    var Pwmajt = Math.pow(Math.E, ((-miu)*P0*t));
    this.widget_pwmajt.update_value (Gwt.Core.Math.Round(Pwmajt*100, 2));
    
    var Pwqmajt = ro*Math.pow(Math.E, ((-t)/W));
    this.widget_pwqmajt.update_value (Gwt.Core.Math.Round(Pwqmajt*100, 2));
    
    var valorHora = this.val_hora.GetText();
    var cantHoras = this.cant_horas.GetText();
    var cosTimeLost = Gwt.Core.Math.Round((W*valorHora*cantHoras*lambda), 0);
    this.widget_cost.update_value (cosTimeLost);
}

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new mmone ();
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
