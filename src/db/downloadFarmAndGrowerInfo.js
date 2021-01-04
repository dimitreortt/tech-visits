import db from "../firebase/firebase"

const downloadFarmAndGrowerInfo = (fieldId, dispatch) => {
    if (!fieldId) {
        console.log("No fieldId provided")
        return
    }

    const docRef = db.collection("propriedades").doc(fieldId);

    docRef.get()
    .then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            const farmInfo = doc.data();
            let growerInfo;
            // console.log("Farm Info has been successfully downloaded")
            const growerDocRef = db.collection("produtores").doc(farmInfo.produtorId);
            growerDocRef.get()
            .then((doc) => {
                console.log("growerInfo Document data:", doc.data());
                growerInfo = doc.data();
                dispatch({ 
                    type: "SET_FARM_INFO", 
                    farmInfo, 
                    growerInfo
                })
            }) 
            .catch((error) => console.log("Error getting document:", error));  
        } else {console.log("No such document!");}
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });

  
}

export default downloadFarmAndGrowerInfo
