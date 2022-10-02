const midtransClient = require("midtrans-client");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-KwbMC2l_R8bDHB8ywGDpx_aG",
  clientKey: "SB-Mid-client-FNQJSAVphK029Fk0",
});

module.exports = snap;
