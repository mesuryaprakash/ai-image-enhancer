import axios from "axios";

const apiKey = import.meta.env.VITE_PICWISH_KEY;
const baseURL = "https://techhk.aoscdn.com"

export const enhancedImageApi = async (file) => {
    try{
        const taskId = await uploadImg(file);
        console.log("Image Uploaded, taskId: ", taskId);

        const enhancedImgData = await pollForEnhancedImage(taskId);
        console.log("Image generated. Image Data: ",enhancedImgData);

        return enhancedImgData;
    } catch(err){
        console.log("Error enhancing image: ", err.message)
    }

    return "Hello";
};

const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file);

    const { data } =  await axios.post(`${baseURL}/api/tasks/visual/scale`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": apiKey,
        },
    })

    if(!data?.data?.task_id){
        throw new Error("Failed to upload Image. Task ID not found.")
    }
    
    return data.data.task_id;
};

const pollForEnhancedImage = async (taskId, retries = 0) => {
    const res = await enhancedFetchedImg(taskId);

    if(res.state === 4){
        console.log("Processing..")

        if(retries >= 20){
            throw new Error("Max retries reached. Please try again later.")
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return pollForEnhancedImage(taskId, retries + 1);
    }
    console.log("polled result", res);

    return res;
}

const enhancedFetchedImg = async (taskId) => {

    const { data } =  await axios.get(`${baseURL}/api/tasks/visual/scale/${taskId}` ,{
        headers: {
            "X-API-KEY": apiKey,
        },
    }) 

    if(!data?.data){
        throw new Error("Enhanced image not found.")
    } 

    return data.data;
}

