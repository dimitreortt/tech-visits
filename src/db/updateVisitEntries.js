import db from "../firebase/firebase"

const updateVisitEntries = (newEntries, visitId, dispatch) => {
  let visit = {}
  newEntries.forEach(([key, value]) => {
    visit[key] = value
  })

  return db
    .collection("visits")
    .doc(visitId)
    .set(visit)
    .then(() => {
      console.log("Document entries successfully updated")
      dispatch({
        type: "EDIT_VISIT_ENTRIES",
        visit: { ...visit, visitId },
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

export default updateVisitEntries
