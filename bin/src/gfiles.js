gfiles = ( function ()
{
var instance;

function gfiles () 
{
    Gwt.Gui.Window.call (this, "Files");
    this.SetSize (640, 480);
    this.SetPosition (Gwt.Gui.WIN_POS_CENTER);
    this.DisableMenu ();
    
    this.places = new Gwt.Gui.Frame ();
    this.places.SetSize (144, this.GetHeight()-32);
    this.places.SetBackgroundColor(new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    
    this.places_layout = new Gwt.Gui.VBox (3);
    this.places_layout.SetSize(this.places.GetWidth(), this.places.GetHeight());
    this.places.Add (this.places_layout);
    
    this.documents = new Gwt.Gui.MenuItem(Gwt.Core.Contrib.Images + "appbar.page.bold.svg", "Documentos", function () {console.log("documentos");});
    this.documents.SetWidth(this.places_layout.GetWidth());
    this.places_layout.Add (this.documents);
    
    this.music = new Gwt.Gui.MenuItem(Gwt.Core.Contrib.Images + "appbar.music.svg", "Música", function () {console.log("música");});
    this.music.SetWidth(this.places_layout.GetWidth());
    this.places_layout.Add (this.music);
    
    this.pictures = new Gwt.Gui.MenuItem(Gwt.Core.Contrib.Images + "appbar.image.portrait.svg", "Imágenes", function () {console.log("imágenes");});
    this.pictures.SetWidth(this.places_layout.GetWidth());
    this.places_layout.Add (this.pictures);
    
    this.videos = new Gwt.Gui.MenuItem(Gwt.Core.Contrib.Images + "appbar.film.svg", "Vídeos", function () {console.log("vídeos");});
    this.videos.SetWidth(this.places_layout.GetWidth());
    this.places_layout.Add (this.videos);
    
    this.Add (this.places);
}

gfiles.prototype = new Gwt.Gui.Window ();
gfiles.prototype.constructor = gfiles;

return new function ()
{
    this.open = function ()
    {
        if (instance === undefined)
        {
            instance = new gfiles ();
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
