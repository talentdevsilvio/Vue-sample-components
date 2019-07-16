/**
 * Web Font Loader takes care of Vue Design System’s font loading.
 * For full documentation, see: https://github.com/typekit/webfontloader
 */
import WebFont from "webfontloader"

var head = document.getElementsByTagName("head")[0]
var link = document.createElement("link")
link.rel = "stylesheet"
link.type = "text/css"
link.href = "/fonts/Gilroy.css"
link.media = "all"
head.appendChild(link)

WebFont.load({
  custom: {
    families: ["Gilroy"],
  },
})
