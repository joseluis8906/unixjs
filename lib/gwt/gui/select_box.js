//###################################################################################################
//# class Gwt::Gui::SelectBox
Gwt.Gui.SelectBox = function (Placeholder, options)
{
    Gwt.Gui.Frame.call (this);
    
    //instance props
    this.Placeholder = Placeholder;
    this.StaticText = new Gwt.Gui.StaticText (this.Placeholder);
    this.Options = [];
    this.Text=null;
    this.Value=null;
    this.SelectDialogBox = null;
    this.ChangedEventCallbacks = [];
    this.OldValue;

    //init
    this.SetClassName ("Gwt_Gui_Select_Box");
    this.SetExpand (true);
    this.AddEvent (Gwt.Gui.Event.Mouse.Click, this.ShowDialog.bind(this));
    this.AddEvent (Gwt.Gui.Event.Keyboard.KeyPress, this.ShowDialog.bind(this));

    this.Add (this.StaticText);
	
    options = [{"Text": this.Placeholder, "Value": ""}].concat(options);
    
    for (var i = 0; i < options.length; i++)
    {
        if (i === 0)
        {
            this.Options [i] = new Gwt.Gui.SelectBoxItem (this.Placeholder, "");
        }
        else
        {
            this.Options [i] = new Gwt.Gui.SelectBoxItem (options[i].Text, options[i].Value);
        }
	    this.Options [i].AddEvent (Gwt.Gui.Event.Mouse.Click, this.SetValueListener.bind(this, Event, options[i].Text, options[i].Value));
    }
    
    this.SetValue("");
}


Gwt.Gui.SelectBox.prototype = new Gwt.Gui.Frame ();
Gwt.Gui.SelectBox.prototype.constructor = Gwt.Gui.SelectBox;

Gwt.Gui.SelectBox.prototype._SelectBox = function ()
{
    this.StaticText._StaticText ();
    
    for (var i=0; i < this.Options.length; i++)
    {
        this.Options[i]._SelectBoxItem ();
        this.Options[i] = null;
    }
    
    if(this.SelectDialogBox !== null && this.SelectDialogBox !== undefined)
    {
        this.SelectDialogBox._SelectBoxDialog ();
    }
   
    this.StaticText = null;
    this.Placeholder = null;
    this.Options = null;
    this.SelectDialogBox = null;
    
    this._Frame ();
}

Gwt.Gui.SelectBox.prototype.ShowDialog = function (event)
{
    //event.stopPropagation ();
    if (event.type === Gwt.Gui.Event.Keyboard.KeyPress || event.type === Gwt.Gui.Event.Mouse.Click)
    {
        if (event.keyCode === Gwt.Gui.Event.Keyboard.KeyCodes.Enter)
	    {
            this.SelectDialogBox = new Gwt.Gui.SelectBoxDialog ();
            for (var i = 0; i < this.Options.length; i++)
            {
                this.Options [i].Reset();
                this.SelectDialogBox.AddItem (this.Options [i]);
            }
            this.SelectDialogBox.Open ();
        }
        else if (event.type === Gwt.Gui.Event.Mouse.Click)
        {
            this.SelectDialogBox = new Gwt.Gui.SelectBoxDialog ();
            for (var i = 0; i < this.Options.length; i++)
            {
                this.Options [i].Reset();
                this.SelectDialogBox.AddItem (this.Options [i]);
            }
            this.SelectDialogBox.Open ();
        }
    }
};

Gwt.Gui.SelectBox.prototype.SetValueListener = function (Event, Text, Value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	    if(this.Options [i].GetValue () === Value)
	    {
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images + "check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);
            
            this.Text = Text;
            this.StaticText.SetText (this.Text);
            this.Value = Value;
	    }
	    else
	    {
            this.Options [i].SetBackgroundImage ("");
	    }
    }
    this.VerifyChanges ();
};

Gwt.Gui.SelectBox.prototype.SetValue = function (value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	    if(this.Options [i].GetValue () === value)
	    {
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);

            this.Text = this.Options[i].GetText();
            this.StaticText.SetText (this.Text);
            this.Value = this.Options[i].GetValue();
	    }
	    else
	    {
            this.Options [i].SetBackgroundImage ("");
	    }
    }
    this.VerifyChanges ();
}

Gwt.Gui.SelectBox.prototype.GetText = function ()
{
    return this.Value;
};

Gwt.Gui.SelectBox.prototype.SetText = function (value)
{
    for (var i = 0; i < this.Options.length; i++)
    {
	    if(this.Options [i].GetValue () === value)
	    {   
            this.Options [i].SetBackgroundImage (Gwt.Core.Contrib.Images+"check_item.svg");
            this.Options [i].SetBackgroundRepeat (Gwt.Gui.Contrib.BackgroundRepeat.NoRepeat);
            this.Options [i].SetBackgroundPosition (Gwt.Gui.Contrib.BackgroundPosition.Right, Gwt.Gui.Contrib.BackgroundPosition.Center);

            this.Text = this.Options[i].GetText();
            this.StaticText.SetText (this.Text);
            this.Value=this.Options[i].GetValue();
	    }
    	else
	    {
            this.Options [i].SetBackgroundImage ("");
	    }
    }
    this.VerifyChanges ();
};

Gwt.Gui.SelectBox.prototype.SetOptionsList = function (Options)
{
    for (var i=0; i < this.Options.length; i++)
    {
        this.Options[i]._SelectBoxItem ();
        this.Options[i] = null;
    }

    this.Options = [];

    Options = [{"Text": this.Placeholder, "Value": ""}].concat(Options);
    
    for (var i = 0; i < Options.length; i++)
    {
        if (i === 0)
        {
            this.Options [i] = new Gwt.Gui.SelectBoxItem (this.Placeholder, "");
        }
        else
        {
            this.Options [i] = new Gwt.Gui.SelectBoxItem (Options[i].Text, Options[i].Value);
        }
	    this.Options [i].AddEvent (Gwt.Gui.Event.Mouse.Click, this.SetValueListener.bind(this, Event, Options[i].Text, Options[i].Value));
    }
};

Gwt.Gui.SelectBox.prototype.ConnectChangedEvent = function (Callback)
{
    this.ChangedEventCallbacks.push (Callback);
};

Gwt.Gui.SelectBox.prototype.DisconnectChangedEvent = function (Callback)
{
    for (var i = 0; i < this.ChangedEventCallbacks; i++)
    {
        if (this.ChangedEventCallbacks[i]===Callback)
        {
            this.ChangedEventCallbacks.splice (i, 1);
        }
    }
};

Gwt.Gui.SelectBox.prototype.VerifyChanges = function ()
{
    if (this.OldValue === undefined)
    {
        this.OldValue = this.Value;
    }
    else if (this.OldValue !== this.Value)
    {
       this.ChangedEventCallbacks.forEach(function (it){it();});
    }
};
//Ends Gwt::Gui::Selectbox
//##################################################################################################


