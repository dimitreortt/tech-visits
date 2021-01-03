import db from "../firebase/firebase"

export const addPlague = (plaguesField, newPlagueName, dispatch) => {
  newPlagueName = newPlagueName.toUpperCase()
  let newPlaguesList = plaguesField.checklistItems.concat([newPlagueName])
  const updates = { checklistItems: newPlaguesList }
  db.collection("visitFormFields")
    .doc(plaguesField.fieldId)
    .update(updates)
    .then(() => {
      console.log("Checklist Items correctly updated!")
      const action = {
        type: "EDIT_FIELD",
        fieldId: plaguesField.fieldId,
        updates,
      }
      dispatch(action)
    })
    .catch((e) => console.log(e))
}
