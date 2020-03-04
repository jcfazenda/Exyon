const PROXY_CONFIG = [      {
  context: [
      "/api",
      "/ohmioapi"
  ],

  target: "https://localhost:5001",        
  changeOrigin: true,
  logLevel: "debug"

}    ]

module.exports = PROXY_CONFIG;