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
      {Name: "giscuvi", Label: "Giscuvi", Image: "basket.svg"},
      {Name: "gusers", Label: "Usuarios", Image: "user.png"},
      {Name: "mmone", Label: "MMone", Image: "terminal.png"},
      {Name: "gencryptor", Label: "Encryptor", Image: "hexedit.svg"},
      {Name: "domotictrl", Label: "Domotic", Image: "hwinfo.svg"},
    ]);
  }
}
