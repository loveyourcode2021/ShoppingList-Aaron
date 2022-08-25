# Intro
Firestore is a NoSQL, document oriented

SQL terms => firebase
    - tables => collections
    - rows (records) => documents


subcollections and nested objects are possible


## collections & documents
they are created implicitly => if it doesnt exist it creates it

## documents
- when you have an object within an object
- alovelace
{
    name :
        first : "Ada"
        last : "Lovelace"
    born : 1815
}

that is called a map

with some exceptions, you can basically treat these as JSON data

- if you don't supply an ID, it auto generates a unique random ID

## Collections

- schemaless
  - documents in the same collection can have random fields or store different types of data
- don't have to create them or delete them
  - they just appear if you make a document matching that collection name/id
  - they just disappear if you delete all the documents inside

## References

import { doc } from "firebase/firestore";

const alovelaceDocumentRef = doc(db, 'users', 'alovelace');

this reference is an object that points to this location in the database, whether it exists or not
you can just set values, and it will create itself if necessary

references for collections are also possible

import { collection } from "firebase/firestore";

const usersCollectionRef = collection(db, 'users');

slash separated path syntax is also acceptable

const alovelaceDocumentRef = doc(db, 'users/alovelace');