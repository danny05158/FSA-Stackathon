const router = require('express').Router()
var request = require('superagent')

var TOKEN = process.env.TOKEN

function parceJson(json) {
  let importantObjs = []
  let results1 = Object.keys(json)

  let key = []
  for (let i = 0; i < results1.length; i++) {
    if (results1[i].includes('SocialTag')) {
      key.push(results1[i])
    }

  }
  for (let i = 0; i < key.length; i++) {
    if (json[key[i]]) {
      importantObjs.push(json[key[i]])
    }
  }

 let final = []
 for(let i=0; i<importantObjs.length; i++){
  final.push({
    name: importantObjs[i].name,
    importance: Number(importantObjs[i].importance)
  })

}
  return final /// returns the obj with social tags
}

router.post('/', async function(req, res) {
  try {
    await request
      .post(
        'https://api.thomsonreuters.com/permid/calais?access-token=' + TOKEN
      )
      .send(req.body)
      .set('Content-Type', 'text/html')
      .set('OutputFormat', 'application/json')
      .set('omitOutputtingOriginalText', true)
      .set('X-AG-Access-Token', TOKEN)
      .set('x-calais-selectiveTags', 'socialtags')
      .then(response => {
        console.log("Response", response)
        let result = parceJson(response.body)
        res.send(result)
      })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
