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
        let data = {}
        let entries = Object.entries(visitSnap.data())
        entries.forEach(([key, value]) => {
          try {
            // convert TIMESTAMP to Datey
            value = value.toDate()
          } catch (error) {}

          data[key] = value
        })
        data.visitId = visitSnap.id
        visits.push(data)
      })

      dispatch({ type: "SET_VISITS", visits })
      console.log(visits)
    })
    .then(() => {
      console.log("Notes have been successfully downloaded!")
    })
    .catch((e) => console.log(e))
}

export default downloadVisits
