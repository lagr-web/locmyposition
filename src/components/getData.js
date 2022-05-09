import supabase from "./supabase-client";
import Compressor from 'compressorjs';


export const fetchLocation = async (db) => {

    const { data: mloc } = await supabase
      .from(db)
      .select('*')
      .order('location', true);
 
      return mloc;
  };


export const uploadFile = async(path, to_storage) => {

 document.querySelector("#saved").style.display="block";

    const response = await fetch(path);
    const blob = await response.blob();

    const time = new Date().getTime();
    const fileName = `${"myimage"}-${time}.jpg`;

    new Compressor(blob, {
        quality: 0.1, // 0.6 can also be used, but its not recommended to go below.
        convertTypes: ['image/jpeg', 'image/png'],
        convertSize: 10000,
        success: (compressedResult) => {
    
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          //console.log(compressedResult);
    
          myUpload(to_storage, fileName, compressedResult);

        },
      });

      return fileName;


}

export const myUpload = async (ts,fn,bl) => {

    const { data, error } = await supabase.storage
    .from(ts)
    .upload(`${fn}`, bl, {
      cacheControl: "3600",
      upsert: false,
    });
  
  
  
  
  if (error){
  alert(error?.message);
  }else{
  
    document.querySelector("#saved").style.display="none";
    document.querySelector("#myFormContainer").style.display="grid";
  
  }
  
  };