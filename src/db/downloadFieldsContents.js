import db from "../firebase/firebase"

export const downloadFieldsContents = (dispatch) => {
  db.collection("visitFormFields")
    .get()
    .then((querySnapshot) => {
      let fieldsContents = []
      querySnapshot.forEach((docRef) => {
        let data = docRef.data()
        data.fieldId = docRef.id
        fieldsContents.push(data)
      })

      console.log("Fields contents correctly downloaded!")
      // console.log(fieldsContents)
      dispatch({ type: "SET_FIELDS", fields: fieldsContents })
    })
    .catch((e) => {
      console.log(e)
    })
}

export default downloadFieldsContents
