import db from "../firebase/firebase"

const removeVisit = (visitId, dispatch) => {
  db.collection("visits")
    .doc(visitId)
    .delete()
    .then(() => {
      console.log("Visit was successfully deleted")
      dispatch({ type: "REMOVE_VISIT", visitId })
    })
    .catch((error) => console.log(error))
}

export default removeVisit
