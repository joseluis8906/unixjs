//##############################################################################################
//Class Gwt::Gui::File
Gwt.Gui.File  = function (Placeholder)
{
    Gwt.Gui.Frame.call (this);
	
    this.Input = null;
    this.Preview = null;
    this.Reader = null;
    this.DataSize = null;
    this.FileName = null;
    this.MimeType = null;
    this.Data = null;
	
    this.InitFile ();
}

Gwt.Gui.File.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.File.prototype.constructor = Gwt.Gui.File;

Gwt.Gui.File.prototype.FinalizeFile = function ()
{
    this.Input.FinalizeFrame ();
    this.Input = null;
    
    this.Preview = null;
    this.Reader = null;
    this.DataSize = null;
    this.FileName = null;
    this.MimeType = null;
    this.Data = null;
    
    this.FinalizeFrame ();
}

Gwt.Gui.File.prototype.InitFile = function ()
{
    this.Input = new Gwt.Gui.Frame();
    this.Input.SetHtml ("input");
    this.Input.Html.setAttribute ("type", "file");
    this.Input.Html.removeAttribute ("multiple");
    this.Input.SetOpacity (0);
    this.Input.SetWidth (24);
    this.Input.SetHeight (24);
	
    this.SetWidth (24);
    this.SetHeight (24);
    this.SetClassName ("Gwt_Gui_File");
    this.SetBackgroundImage (Gwt.Core.Contrib.Frontend+Gwt.Core.Contrib.Images+"appbar.paperclip.rotated.svg");
    this.SetBackgroundSize (24, 24);
    this.Add (this.Input);
	
    this.Input.AddEvent (Gwt.Gui.Event.Form.Change, this.UpdateInfo.bind (this));
}

Gwt.Gui.File.prototype.UpdateInfo = function ()
{
    this.Data = this.Input.Html.files[0];
    this.DataSize = this.Data.size;
    this.FileName = this.Data.name;
    this.MimeType = this.Data.type;
}

Gwt.Gui.File.prototype.GetData = function ()
{
    return this.Data;
}

Gwt.Gui.File.prototype.GetDataSize = function ()
{
    return this.DataSize;
}

Gwt.Gui.File.prototype.GetFileName = function ()
{
    return this.FileName;
}

Gwt.Gui.File.prototype.GetMimeType = function ()
{
    return this.MimeType;
}

Gwt.Gui.File.prototype.Reset = function ()
{
    this.Data = null;
    this.DataSize = null;
    this.FileName = null;
    this.MimeType = null;
}

Gwt.Gui.File.prototype.AddEvent = function (Event, Callback)
{
    this.Input.AddEvent (Event, Callback);
}

Gwt.Gui.File.prototype.PreviewFile = function (Element) 
{
    this.Preview = Element;
    this.Reader  = new FileReader ();

    this.Reader.addEventListener(Gwt.Gui.Event.FileReader.Load, this.Load.bind (this))

    if (this.Input.GetData ()) 
    {
        this.Reader.readAsDataURL(this.Input.GetData());
    }
}

Gwt.Gui.File.prototype.Load = function ()
{
    this.Preview.SetImage (this.Reader.result);
}
//Ends Gwt::Gui::File
//###########################################################################################################
