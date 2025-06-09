export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },


  devServer: {
    host: '0.0.0.0',  // Allow access from the network
    port: 8080,       // Optional, specify a port number
    disableHostCheck: true // For local development
  }
}
