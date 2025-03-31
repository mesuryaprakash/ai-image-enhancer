import { useState } from "react"
import ImagePreview from "./ImagePreview"
import ImageUpload from "./ImageUpload"
import { enhancedImageApi } from "../utils/enhanceImageApi";

function Home() {

    const [uploadedImg, setUploadImage] = useState(null);
    const [enhancedImg, setEnhancedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadImageHandler = async (file) => {
        setUploadImage(URL.createObjectURL(file));
        setLoading(true);

        try {
            const enhancedUrl = await enhancedImageApi(file);
            setEnhancedImage(enhancedUrl)
            setLoading(false);
            // code which may produce error
        } catch(error) {
            console.log(error);
            alert("Error while enhancing the image. Please try again later.");
        }
    }



  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full">
        <ImageUpload uploadImageHandler={uploadImageHandler}/>
        <ImagePreview loading={loading} uploaded={uploadedImg} enhanced={enhancedImg?.image} />
    
    </div>
  )
}
export default Home
