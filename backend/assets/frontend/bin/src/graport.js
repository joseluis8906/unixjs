graport = ( function ()
{
var instance;

function graport (raport) 
{
    var types = ["cedeg"];
    var proced = false;
    
    for (var i = 0; i < types.length; i++)
    {
        if (raport===types[i])
        {
            proced = true;
            break;
        }
    }
    
    if (proced)
    {
       this.cedeg ();
    }
}

graport.prototype.cedeg = function()
{
    var doc = new PDFDocument();
    var stream = doc.pipe(new Blob());
    
    doc.fontSize(25).text('Here is some vector graphics...', 100, 80);
    doc.end().stream.on("finish", function(){
        var blob = stream.toBlob("application/pdf");
        window.open(blob);
    })
}

return new function ()
{
    this.open = function (raport)
    {
        if (instance === undefined)
        {
            instance = new graport (raport);
            instance = undefined;
        }
        else
        {
            console.log ("%app open".replace ("%app", instance.__proto__.constructor.name));
        }
    }
}
})();

