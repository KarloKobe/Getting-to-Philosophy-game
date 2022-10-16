const resi = (r) => {
  var output = document.getElementById("output")
  const uporabljene = []

  //function for a random article which gets the title for the main function fetchasync
  const ranasync = async () => {
    var randomArticle = "https://en.wikipedia.org/api/rest_v1/page/random/title"
    const responseR = await fetch(randomArticle)
    const json = await responseR.text()
    const parser = new DOMParser()
    var doc = parser.parseFromString(json, "text/html")
    const body = doc.body
    const obj = JSON.parse(json)
    var title = obj.items[0].title
    narediStart(title)
    fetchasync(title)
  }

  /*
  This function receives the name of the wikipedia article and gets the html from wikipedia
  for that article. After that it finds the path to the Philosophy article if its possible
  */
  const fetchasync = async (a) => {
    var oklepaj = false

    var custom =
      `https://en.wikipedia.org/api/rest_v1/page/html/` + a + `?redirect=true`
    const response = await fetch(custom)
    const json = await response.text()
    const parser = new DOMParser()
    var doc = parser.parseFromString(json, "text/html")
    const body = doc.body
    for (let i = 0; i < 1; i++) {
      const section = body.children[i]
      for (let j = 0; j < section.childElementCount; j++) {
        const node = section.children[j]
        if (node.nodeName === "P") {
          for (let k = 0; k < node.childNodes.length; k++) {
            const node2 = node.childNodes[k]
            console.log(node2.textContent)
            if (node2.textContent.includes("(")) {
              oklepaj = true
            }
            if (node2.textContent.includes(")")) {
              oklepaj = false
            }

            console.log(oklepaj)

            if (node2.nodeName === "B") {
              for (let h = 0; h < node2.childElementCount; h++) {
                const node3 = node2.children[h]
                if (node3.nodeName === "A") {
                  const para = document.createElement("p")
                  para.innerText = node3.getAttribute("title")
                  para.style.textAlign = "center"
                  if (!oklepaj) {
                    document.body.appendChild(para)
                  }
                  if (node3.getAttribute("title") === "Philosophy") {
                    const para = document.createElement("p")
                    para.innerText = "We have reached the Philosophy article!"
                    para.style.textAlign = "center"
                    document.body.appendChild(para)
                    return
                  }

                  if (uporabljene.includes(node2.getAttribute("title"))) {
                    const para = document.createElement("p")
                    para.innerText =
                      "A loop has accured. We have not reached the Philosophy article!"
                    para.style.textAlign = "center"
                    document.body.appendChild(para)
                    return
                  }
                  if (!oklepaj) {
                    uporabljene.push(node3.getAttribute("title"))
                    return fetchasync(node3.getAttribute("title"))
                  }
                }
              }
            } else if (node2.nodeName === "A") {
              const para = document.createElement("p")
              para.innerText = node2.getAttribute("title")
              para.style.textAlign = "center"
              if (!oklepaj) {
                document.body.appendChild(para)
              }
              if (node2.getAttribute("title") === "Philosophy") {
                const para = document.createElement("p")
                para.innerText = "We have reached the Philosophy article!"
                para.style.textAlign = "center"
                document.body.appendChild(para)
                return
              }

              if (uporabljene.includes(node2.getAttribute("title"))) {
                const para = document.createElement("p")
                para.innerText =
                  "A loop has accured. We have not reached the Philosophy arcticle!"
                para.style.textAlign = "center"
                document.body.appendChild(para)
                return
              }
              if (!oklepaj) {
                uporabljene.push(node2.getAttribute("title"))
                return fetchasync(node2.getAttribute("title"))
              }
            }
          }
        }
      }
    }
  }
  function narediStart(vhod) {
    vhod = vhod.replace("_", " ")
    document.getElementById("start").innerHTML =
      "Path of Articles from " + vhod + ":"
  }
  var vhod = document.getElementById("inp").value
  vhod = vhod.replace(" ", "_")
  document.getElementById("start").innerHTML =
    "Path of Articles from " + vhod + ":"

  if (!r) {
    fetchasync(vhod)
  } else {
    ranasync()
    r = false
  }
}

function pozeni() {
  resi(false)
}
function pozeniRandom() {
  resi(true)
}

function disableGumbe() {
  document.getElementById("customGumb").disabled = true
  document.getElementById("randomGumb").disabled = true
}
