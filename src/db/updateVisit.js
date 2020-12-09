import db from "../firebase/firebase"

const updateVisit = (updates, visitId, dispatch) => {
  return db
    .collection("visits")
    .doc(visitId)
    .update(updates)
    .then(() => {
      console.log("Document successfully updated")
      dispatch({
        type: "EDIT_VISIT",
        visit: { ...updates, visitId },
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export default updateVisit
