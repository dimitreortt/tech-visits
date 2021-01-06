import db from "../firebase/firebase"

export const downloadFieldsOrder = (dispatch) => {
  db.collection("visitFormFieldsOrder")
    .doc("orderObj")
    .get()
    .then((docRef) => {
      let orderObj = docRef.data()
      console.log(orderObj, "orderObj")
      dispatch({ type: "SET_FIELDS_ORDER", orderObj })
    })
}

export default downloadFieldsOrder
