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

# File structure

/data/pitayabd
- F: databases.json
- D: database_name
  - D: collection_name
    - F: index.json
    - F: documents_1.bson
    - F: documents_2.bson
    - F: ...

# Start up
- load databases.json
- for each database, load index.json
- first get :
  - find in index where is the document
  - load the right bson file
- next get : 
  - find in index where is the document
  - if the bson is already load, get the return
  - if not, load the right bson file
- add doc :
  - insert the doc in the latest bson file if size < max
  - insert the doc in a new bson file if the latest size == max
- internal : 
  - if an old bson file is empty => remove it (to be started using a setimeout when there is a delete doc)
  - save the bson file using a settimeout (each period the bson file is saved)
  - to not let all bson files in memory : add a "lastaccessdate" to each collection ? bson file ? if lastaccessdate is old, remove the bson file or collection from the memory

# Web API

GET /_dbs
[{name:databasename, count:1234, options:{storage:in_memory}]

PUT /dbname
{status:"OK",message:'error...'}

DELETE /dbname
{status, message}

GET /dbname/_collections
[{name:collectionname, count:123}]

PUT /dbname/collectionname
{status, message}

DELETE /dbname/collectionname
{status, message}

GET /dbname/collectionname/key
{...}

GET /dbname/collectionname/_range/beginkey/endkey

PUT /dbname/collectionname/key {...}
{status, message}

POST /dbname/collectionname/key {...}
{status, message}

DELETE /dbname/collectionname/key
{status, message}






