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

      // encontrar o id da data da visita
      let visitDateFieldId = fieldsContents.find(
        (field) => field.label === "DATA DA VISITA"
      ).fieldId
      dispatch({ type: "SET_VISIT_DATE_ID", visitDateFieldId })
    })
    .catch((e) => {
      console.log(e)
    })
}

export default downloadFieldsContents
