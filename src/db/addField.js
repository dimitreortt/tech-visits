import db from "../firebase/firebase"

const addField = (fieldName, valueType, dispatch, options) => {
  console.log(options, "to no add field")
  let newField = { label: fieldName.toUpperCase(), valueType }

  if (options.checklistItems) {
    newField.checklistItems = options.checklistItems.map((item) =>
      item.toUpperCase()
    )
  }

  db.collection("visitFormFields")
    .add(newField)
    .then(() => {
      console.log("successfully added new field!")

      dispatch({
        type: "ADD_FIELD",
        field: newField,
      })
    })
}

export default addField
