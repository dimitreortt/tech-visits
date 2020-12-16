import db from "../firebase/firebase"

export const addDisease = (diseasesField, newDiseaseName, dispatch) => {
  console.log(diseasesField, "in addDisease")
  let newDiseasesList = diseasesField.checklistItems.concat([newDiseaseName])
  const updates = { checklistItems: newDiseasesList }
  db.collection("visitFormFields")
    .doc(diseasesField.fieldId)
    .update(updates)
    .then(() => {
      console.log("Checklist Items correctly updated!")
      const action = {
        type: "EDIT_FIELD",
        fieldId: diseasesField.fieldId,
        updates,
      }
      dispatch(action)
    })
    .catch((e) => console.log(e))
}
