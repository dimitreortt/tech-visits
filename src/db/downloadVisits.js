import db from "../firebase/firebase"

const downloadVisits = (fieldId, dispatch) => {
  if (!fieldId) {
    console.log("No fieldId provided")
    return
  }

  db.collection("visits")
    .where("fieldId", "==", fieldId)
    .get()
    .then((snapshot) => {
      let visits = []
      snapshot.forEach((visitSnap) => {
        // convert TIMESTAMP to Date
        let data = visitSnap.data()
        data.date = data.date.toDate()
        data.visitId = visitSnap.id
        visits.push(data)
      })

      dispatch({ type: "SET_VISITS", visits })
      console.log(visits, "asoijdaoisdj")
    })
    .then(() => {
      console.log("Notes have been successfully downloaded!")
    })
    .catch((e) => console.log(e))
}

export default downloadVisits
