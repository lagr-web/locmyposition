
import { IonGrid, IonRow, IonCol , IonInput, IonLabel, IonButton, IonIcon, IonTextarea,IonAlert} from "@ionic/react";
import {close} from "ionicons/icons";
import { useState } from "react";
import supabase from "./supabase-client";

const FormData = ({position, img}) => {


    const [location, setLocation]=useState('');
    const [comment, setComment]=useState('');
    const [showAlert, setShowAlert] = useState(false);
     
    const addLocation = async (e) =>{

     e.preventDefault();

     let {data, error} = await supabase
     .from('mapmyplace')
     .insert({
        location: location,
        comment: comment,
        latitude: position[0],
        longitude:position[1],
        image: img
     })

     if (error){
        alert(error?.message);
        }else{

          const hideForm = setTimeout(() => {

            console.log("done settimeout");
            document.querySelector("#myFormContainer").style.display="none";
            document.querySelector("#cameraimage").style.display="none";

            console.log("din position er gemt");
            setShowAlert(true);

          }, 500);

        }
     

    }


    
    const closeLocation = () =>{

        document.querySelector("#myFormContainer").style.display="none";
        document.querySelector("#cameraimage").style.display="none";
      }


  return (

<>
  <div id= "myFormContainer">
  
    <IonGrid >
    <form> 

        <IonRow>
            <IonCol>
                <IonIcon icon={close} size="large" style={{float:"right"}} onClick={closeLocation} />
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
                <IonLabel>Location</IonLabel>
                <IonInput
                id="location"
                type="text" onIonChange={(event) => {
                    setLocation(event.target.value)
                  }}
                />
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
               <IonLabel>Comment</IonLabel>
               <IonTextarea onIonChange={(event) => {
                setComment(event.target.value)
              }}
               />
            </IonCol>
        </IonRow>

        <IonRow text-right>
            <IonCol>
                <IonButton onClick={addLocation}>Submit</IonButton>
            </IonCol>
        </IonRow>

        </form>
    </IonGrid>

  </div>

<IonAlert
isOpen={showAlert}
onDidDismiss={() => setShowAlert(false)}
cssClass='my-custom-class'
header={location}
 message={'Din position er gemt.'}
buttons={['OK']}
  />

</>

)

};

export default FormData;
