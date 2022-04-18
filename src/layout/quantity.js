import { useState } from "react";
import { useDispatch } from "react-redux";
import { Addtocard } from "../api/product/card";
import { FetchCardData, GetAuthDetail } from "./utils";

export default function Quantity(prop){
	const dispatch = useDispatch();
    const [value, setvalue] = useState(prop.value);
    const userAthantication = GetAuthDetail();
    async function increment(id) {
        setvalue(value < 10? value+1 : 10)
        setvalue(value+1)
        const cardData = {
            "product": id,
            "quantity": value+1,
          }
          console.log(cardData);
        const cardApi = await Addtocard(cardData,userAthantication);
      }
      
    async function decrement(id) {
        setvalue(value > 1? value-1 : 1)
        const cardData = {
            "product": id,
            "quantity": value-1,
        }
        const cardApi = await Addtocard(cardData,userAthantication);
        if(cardApi.statusCode===201||cardApi.statusCode===200){
            FetchCardData(dispatch)
        }
    }
    return(
        <div className="quantity-input">
            {value>1?<button className="quantity-input__modifier quantity-input__modifier--left" onClick={()=> decrement(prop.id)}>
                &mdash;
            </button>:<button className="quantity-input__modifier quantity-input__modifier--left" disabled>
                &mdash;
            </button>}
            <input className="quantity-input__screen" type="text" value={value} readonly/>
            {value<10?<button className="quantity-input__modifier quantity-input__modifier--right" onClick={()=> increment(prop.id)}>
                &#xff0b;
            </button> : <button className="quantity-input__modifier quantity-input__modifier--right" disabled>
                &#xff0b;
            </button> }
        </div> 
    );
}