import db from "../firebase/firebase"

const addField = (fieldName, valueType, dispatch, options, fieldsOrder) => {
  console.log(options, "to no add field")
  let newField = { label: fieldName.toUpperCase(), valueType }

  if (options.checklistItems) {
    newField.checklistItems = options.checklistItems.map((item) =>
      item.toUpperCase()
    )
  }

  db.collection("visitFormFields")
    .add(newField)
    .then((docRef) => {
      console.log("successfully added new field!")

      dispatch({
        type: "ADD_FIELD",
        field: newField,
      })

      let fieldOrderIndexes = Object.entries(fieldsOrder).map(
        ([key, value]) => value
      )

      let highestFieldIdx = Math.max(...fieldOrderIndexes)

      db.collection("visitFormFieldsOrder")
        .doc("orderObj")
        .set({ ...fieldsOrder, [docRef.id]: highestFieldIdx + 1 })
        .then(() => {
          console.log("successfully updated fieldsOrder with new field!")
        })
    })
}

export default addField
