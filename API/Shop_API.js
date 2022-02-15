import { Alert } from "react-native";
import Api_Client from "./Api_Client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const onLoginAPI = async (user_name, user_password) => {
    var response = null

    try {
        await Api_Client.post('/login', {
            user_name: user_name,
            user_password: user_password
        })
            .then((json_response) => {
                response = json_response.data

                console.log(json_response.data)


            })
            .catch((e) => {
                console.log(e)

            })
    } catch (error) {
        console.log(error)
    }
    return response;

}

const onLocation_FetchingAPI= async (region)=>{
    var response = null
    try {
        await Api_Client.post('/lf',{
            "region":region
        })
        .then((json_response)=>{
            response=json_response.data
        })
        .catch((e)=>{
            console.log(e)

        })
    } catch (error) {
        
    }

    return response
}

const onFetch_After_Location_SearchAPI=async(region,country,district,subdistrict, product_name)=>{
    var url=null
    var response=null
    if (product_name !==null) {
        url="/fetching_pro_by_name_specific_region"
    }else{
        url="/fetch_pro_after_location_search"
    }

    try {
        await Api_Client.post(url,{
            region : region,
            country : country,
            district: district,
            subdistrict : subdistrict,
            product_name : product_name

        })
        .then((json_response)=>{
            response=json_response.data
        })
    } catch (error) {
        
    }

    return response
}

 const single_shop_data = async (user_name) => {
    const url = "/data_fetching"
    var response = null

    try {
        await Api_Client.post(url, {
            user_name: user_name
        })
            .then((json_response) => {
                response = json_response.data;

            })
    } catch (error) {

    }

    return response;
}

const onShopName_FetchingAPI= async (shop_name)=>{
    var response = null
    try {
        var country=await AsyncStorage.getItem("country")
        var district=await AsyncStorage.getItem("district")
        var subdistrict= await AsyncStorage.getItem("subdistrict")
        var region=await AsyncStorage.getItem("region")
        
        await Api_Client.post('/shop_name_fetching',{
            shop_name:shop_name,
            country:country,
            district:district,
            subdistrict:subdistrict,
            region:region
        })
        .then((json_response)=>{
            response=json_response.data
        })
        .catch((e)=>{
            console.log(e)

        })
    } catch (error) {
        
    }

    return response
}


export default  {onLoginAPI,onLocation_FetchingAPI,onFetch_After_Location_SearchAPI,single_shop_data,onShopName_FetchingAPI};