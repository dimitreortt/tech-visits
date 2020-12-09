import db from "../firebase/firebase"

const addVisit = (visit, fieldId, dispatch) => {
  visit.fieldId = fieldId
  return db
    .collection("visits")
    .add(visit)
    .then((docRef) => {
      console.log("Document successfully created")
      visit.visitId = docRef.id
      dispatch({ type: "ADD_VISIT", visit })
    })
    .catch((error) => {
      console.log(error)
    })
}

export default addVisit
