module.exports = class Session {
  constructor(req, res) {
    console.log(req.body);
    switch (req.body.Method) {
      case "Start":
        this.start(req, res);
        break;

      case "Renew":
        this.renew(req, res);
        break;

      case "Terminate":
        this.renew(req, res);
        break;

      default:
        console.log("no valid session method");
    }
  }

  start(req, res) {
    return res.json({Result: 1});
  }

  renew(req, res) {
    return res.json({Result: 1});
  }

  terminate(req, res) {
    return res.json({Result: 1});
  }
}
