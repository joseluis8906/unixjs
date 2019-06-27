test = ( function() {
  var instance;

  function test() {
    Gwt.Gui.Window.call (this, "Test");
    this.SetSize (480, 256);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);

    this.EnableMenu ();
    this.AddMenuItem (
      Gwt.Core.Contrib.Images + "appbar.power.svg",
      "Salir",
      () => { window.test.close(); window.gcontrol.open(); }, 
      Gwt.Gui.MENU_QUIT_APP
    );

    this.layout = new Gwt.Gui.VBox ();
    this.layout.SetAlignment(Gwt.Gui.ALIGN_CENTER);
    this.SetLayout (this.layout);
    this.SetBorderSpacing (12);

    this.inputText = new Gwt.Gui.IconEntry (Gwt.Core.Contrib.Images + "appbar.notification.star.svg", "Nombre");
    this.selectBox = new Gwt.Gui.IconSelectBox(
      Gwt.Core.Contrib.Images+"appbar.notification.star.svg",
      "Seleccione Una Opción", 
      [
        {"Text": "Opción 1", "Value": "1"},
        {"Text": "Opción 2", "Value": "2"}
      ]
    );

    this.layout.Add (this.inputText);
    this.layout.Add (this.selectBox);
  }
  
  test.prototype = new Gwt.Gui.Window ();
  test.prototype.constructor = test;
  
  return new function() {
    this.open = function() {
      if (instance === undefined) {
        instance = new test ();
        instance.Open ();
      } else {
        console.log (
          "%app opened yet".replace("%app", instance.__proto__.constructor.name)
        );
      }
    }
    
    this.close = function() {
      if (instance !== undefined) {
        instance.Close ();
        instance = undefined;
      } 
    }
  }
})();
