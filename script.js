const resi = (r) => {
  var output = document.getElementById("output")
  const uporabljene = []

  //function for random article which gets the title for the main function fetchasync
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
        //console.log(section.childNodes);
        if (node.nodeName === "P") {
          //console.log("sem v p");
          for (let k = 0; k < node.childNodes.length; k++) {
            //childNodes.length
            //const node2 = node.children[k]
            //console.log(node.childNodes);
            const node2 = node.childNodes[k] //node2 je tist text k ga iscem
            // console.log(node2)
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
                  //console.log(node3.getAttribute("title"));
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
                    //console.log("Napaka")
                    const para = document.createElement("p")
                    para.innerText =
                      "A loop has accured. We have not reached the Philosophy article!"
                    para.style.textAlign = "center"
                    document.body.appendChild(para)
                    return
                  }
                  //console.log(uporabljene)
                  if (!oklepaj) {
                    uporabljene.push(node3.getAttribute("title"))
                    return fetchasync(node3.getAttribute("title"))
                  }
                }
              }
            } else if (node2.nodeName === "A") {
              //console.log(node2.getAttribute("title"));
              const para = document.createElement("p")
              para.innerText = node2.getAttribute("title")
              para.style.textAlign = "center"
              if (!oklepaj) {
                document.body.appendChild(para)
              }
              if (node2.getAttribute("title") === "Philosophy") {
                //output.innerHTML = "We reached the Philosophy arcticle!";
                const para = document.createElement("p")
                para.innerText = "We have reached the Philosophy article!"
                para.style.textAlign = "center"
                document.body.appendChild(para)
                return
              }

              if (uporabljene.includes(node2.getAttribute("title"))) {
                //console.log("Napaka")
                //output.innerHTML = "ERROR!";
                const para = document.createElement("p")
                para.innerText =
                  "A loop has accured. We have not reached the Philosophy arcticle!"
                para.style.textAlign = "center"
                document.body.appendChild(para)
                return
              }
              //console.log(uporabljene)
              if (!oklepaj) {
                uporabljene.push(node2.getAttribute("title"))
                return fetchasync(node2.getAttribute("title"))
              }
            }
          }
        }
      }
      /*
      const nolinks = document.createElement("p");
      nolinks.innerText = "We have reached an article with no links";
      nolinks.style.textAlign = "center";
      document.body.appendChild(nolinks);
      */
    }
  }
  function narediStart(vhod) {
    vhod = vhod.replace("_", " ")
    document.getElementById("start").innerHTML =
      "Path of Articles from " + vhod + ":"
  }
  var vhod = document.getElementById("inp").value
  vhod = vhod.replace(" ", "_")
  //console.log(vhod);
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
