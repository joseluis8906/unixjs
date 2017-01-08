//##################################################################################################
//Class Gwt::Gui::Menu
Gwt.Gui.Menu = function ()
{   
    //instance props
    this.MenuBtn = new Gwt.Gui.Image (Gwt.Core.Contrib.Images + "appbar.list.svg");
    this.ContainerMenu = new Gwt.Gui.VBox (0);
    this.Items = [];
    
    //init
    this.MenuBtn.SetSize (24, 24);
    this.MenuBtn.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Toggle.bind (this));
    
    this.ContainerMenu.SetSize (128, 128);
    this.ContainerMenu.SetBorderRadius (2);
    this.ContainerMenu.SetBackgroundColor (new Gwt.Gui.Contrib.Color (50, 50, 50, 0.9));
    this.ContainerMenu.SetPositionType (Gwt.Gui.Contrib.PositionType.Absolute);
    this.ContainerMenu.SetDisplay (Gwt.Gui.Contrib.Display.None);
    this.ContainerMenu.AddEvent (Gwt.Gui.Event.Mouse.Click, this.Toggle.bind (this));
}

Gwt.Gui.Menu.prototype._Menu = function ()
{
    for (var i = 0; i < this.Items.length; i++)
    {
        this.Items[i]._MenuItem();
        this.Items[i] = null;
    }
    
    this.Items = null;
    
    this.MenuBtn._Image ();
    this.MenuBtn = null;
    
    this.ContainerMenu._VBox ();
    this.ContainerMenu = null;
}

Gwt.Gui.Menu.prototype.Toggle = function ()
{
    if (this.ContainerMenu.GetDisplay () === Gwt.Gui.Contrib.Display.None)
    {
        this.ContainerMenu.SetDisplay (Gwt.Gui.Contrib.Display.Block);
    }
    else
    {
        this.ContainerMenu.SetDisplay (Gwt.Gui.Contrib.Display.None);
    }
}

Gwt.Gui.Menu.prototype.AddItem = function (Item)
{
    this.Items.push (Item);
    this.ContainerMenu.SetHeight ((this.Items.length * 25) + 50);
    this.Items[this.Items.length - 1].SetWidth (this.ContainerMenu.GetWidth ());
    this.ContainerMenu.Add (this.Items[this.Items.length - 1]);
}
//Ends Gwt::Gui::Menu
//##################################################################################################

