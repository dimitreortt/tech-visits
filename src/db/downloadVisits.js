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
        let data = visitSnap.data()
        data.visitId = visitSnap.id

        Object.entries(data).forEach(([key, value]) => {
          try {
            data[key] = value.toDate()
          } catch (error) {}
        })

        visits.push(data)
      })

      console.log("Raw visits have been successfully downloaded")
      dispatch({ type: "SET_VISITS", visits })
    })
    .catch((e) => console.log(e))
}

export default downloadVisits
