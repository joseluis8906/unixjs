presctrl = ( function ()
{
var instance;

function price_widget (producto)
{
    Gwt.Gui.VBox.call (this, 0);
    this.SetSize (256, 240);
    
    this.productolbl = new Gwt.Gui.StaticText ("Producto:");
    this.producto = new Gwt.Gui.StaticText (producto.name);
    this.producto.SetFontSize(24);
    this.producto.SetHeight (48);
    
    this.precioLbl = new Gwt.Gui.StaticText ("Precio:");
    this.precio = new Gwt.Gui.StaticText ("$"+producto.price+" / Kgr");
    //this.precio.SetColor (new Gwt.Gui.Contrib.Color(Gwt.Gui.Contrib.Colors.Green));
    this.precio.SetFontSize(16);
    this.precio.SetHeight (36);
    
    this.row = new Gwt.Gui.HBox();
    this.row_col1 = new Gwt.Gui.VBox(0);
    
    this.Add (this.productolbl);
    this.Add (this.producto);
    
    this.Add (this.row);
    this.row.Add (this.row_col1);
    
    this.row_col1.Add (this.precioLbl);
    this.row_col1.Add (this.precio);
}

price_widget.prototype = new Gwt.Gui.VBox ();
price_widget.prototype.constructor = price_widget;
       
    
function presctrl () 
{
    Gwt.Gui.Window.call (this, "Informe De Precios");
	
    this.SetSize (512, 480);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);

    this.layout = new Gwt.Gui.VBox ();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.Add (this.layout);
    this.SetBorderSpacing (12);
    
    this.slider = new Gwt.Gui.Slider (5);
    this.slider.SetSize (this.layout.GetWidth (), this.layout.GetHeight ());
    this.slider.Setup ();
    
    this.layout.Add (this.slider);
    
    var precios = [
        {"name": "Tomate", "price": 2600}, 
        {"name": "Cebolla Blanca", "price": 2000},
        {"name": "Cebolla Roja", "price": 2300},
        {"name": "Cebolla Larga", "price": 2100},
        {"name": "Platano", "price": 1300},
        {"name": "Yuca", "price": 1200},
        {"name": "Papa Común", "price": 1100},
        {"name": "Papa Pastusa", "price": 1200},
        {"name": "Papa Criolla", "price": 2700},
        {"name": "Zanahoria", "price": 1800},
        {"name": "Arracacha", "price": 3900},
        {"name": "Ahuyama", "price": 1550},
        {"name": "Tte De Arbol", "price": 3100},
        {"name": "Piña", "price": 2400},
        {"name": "Naranja", "price": 2050},
        {"name": "Limón Criollo", "price": 1950},
        {"name": "Lulo", "price": 3750},
        {"name": "Banano", "price": 1950},
        {"name": "Mora", "price": 2600},
        {"name": "Maracuyá", "price": 3400}
    ];
    
    //primer viewer
    this.row1 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(0, this.row1);
    this.prod0 = new price_widget(precios[0]);
    this.prod1 = new price_widget(precios[1]);
    this.row1.Add(this.prod0);
    this.row1.Add(this.prod1);
    
    this.row2 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(0, this.row2);
    this.prod2 = new price_widget(precios[2]);
    this.prod3 = new price_widget(precios[3]);
    this.row2.Add(this.prod2);
    this.row2.Add(this.prod3);
    
    
    //segundo viewer
    this.row3 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(1, this.row3);
    this.prod4 = new price_widget(precios[4]);
    this.prod5 = new price_widget(precios[5]);
    this.row3.Add(this.prod4);
    this.row3.Add(this.prod5);
    
    this.row4 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(1, this.row4);
    this.prod6 = new price_widget(precios[6]);
    this.prod7 = new price_widget(precios[7]);
    this.row4.Add(this.prod6);
    this.row4.Add(this.prod7);
    
    //tercer viewer
    this.row5 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(2, this.row5);
    this.prod8 = new price_widget(precios[8]);
    this.prod9 = new price_widget(precios[9]);
    this.row5.Add(this.prod8);
    this.row5.Add(this.prod9);
    
    this.row6 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(2, this.row6);
    this.prod10 = new price_widget(precios[10]);
    this.prod11 = new price_widget(precios[11]);
    this.row6.Add(this.prod10);
    this.row6.Add(this.prod11);
    
    
    //cuarto viewer
    this.row7 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(3, this.row7);
    this.prod12 = new price_widget(precios[12]);
    this.prod13= new price_widget(precios[13]);
    this.row7.Add(this.prod12);
    this.row7.Add(this.prod13);
    
    this.row8 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(3, this.row8);
    this.prod14 = new price_widget(precios[14]);
    this.prod15= new price_widget(precios[15]);
    this.row8.Add(this.prod14);
    this.row8.Add(this.prod15);
    
    
    //quinto viewer
    this.row9 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(4, this.row9);
    this.prod16 = new price_widget(precios[16]);
    this.prod17= new price_widget(precios[17]);
    this.row9.Add(this.prod16);
    this.row9.Add(this.prod17);
    
    this.row10 = new Gwt.Gui.HBox(5);
    this.slider.AddSlotWidget(4, this.row10);
    this.prod18 = new price_widget(precios[18]);
    this.prod19 = new price_widget(precios[19]);
    this.row10.Add(this.prod18);
    this.row10.Add(this.prod19);
}

presctrl.prototype = new Gwt.Gui.Window ();
presctrl.prototype.constructor = presctrl;

return new function ()
{
	this.open = function ()
	{
		if (instance === undefined)
		{
			instance = new presctrl ();
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
