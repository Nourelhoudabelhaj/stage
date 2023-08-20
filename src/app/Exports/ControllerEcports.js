

import { collection, addDoc,doc,updateDoc } from "firebase/firestore";
import {db} from "@/app/Conf/conf";
import {useSetAtom} from "jotai";
import {EventExports2} from "@/app/Exports/ModelExports";


const EventController = {

    getEvents: () => {
        return EventModel.getEvents();
    },
}


export const addExports = async (todo) => {
    try {
        const docRef = await addDoc(collection(db, "Exports"),
            todo,
        );
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
export const addImport = async (todo) => {
    try {
        const docRef = await addDoc(collection(db, "Imports"),
            todo,
        );
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const updateExports = async (id, updatedData,type) => {
    try {
        const exportsRef = doc(db, type, id);
        await updateDoc(exportsRef, updatedData);
        console.log("Document updated with ID: ", id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};


export default EventController;
