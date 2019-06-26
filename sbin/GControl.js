module.exports = class GControl {
  constructor(req, res) {
    switch (req.body.Method) {
      case "Select":
        this.select(req, res);
        break;

      default:
        console.log("no valid session method");
    }
  }

  select(req, res) {
    return res.json([
      {Name: "giscuvi", Type: "GUI", Label: "Giscuvi", Image: "basket.svg"},
      {Name: "gusers", Type: "GUI", Label: "Usuarios", Image: "user.png"},
      //{Name: "mmone", Type: "GUI", Label: "MMone", Image: "terminal.png"},
      {Name: "gencryptor", Type: "GUI", Label: "Encryptor", Image: "hexedit.svg"},
      {Name: "domotictrl", Type: "GUI", Label: "Domotic", Image: "hwinfo.svg"},
      {Name: "test", Type: "CLI"}
    ]);
  }
}
