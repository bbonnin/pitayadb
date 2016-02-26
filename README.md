Commands:
```
let db = tomato.database('mydb') // Created if not existing
let coll = db.collection('mycollection')


let doc = { name: 'Alice', age: 30 }

let docId = coll.insert(doc)

let cursor = coll.find({ name : 'Alice' })

while (cursor.hasNext()) {
  console.log(cursor.next())
}


coll.delete(docId)

tomato.dropDatabase('mydb')



```
