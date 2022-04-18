// import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCoffee , faRupeeSign} from '@fortawesome/fontawesome-free-solid'

// fontawesome.library.add(faCheckSquare, faCoffee);


export default function Img(props){
    const url = process.env.REACT_APP_PUBLIC_URL
    return(
        <>
            <img src={url + props.src} alt={props.alt} className={props.className}/>
            {/* <FontAwesomeIcon icon="check-square" pull="right" />
            <FontAwesomeIcon icon={faCoffee} />
            <FontAwesomeIcon icon="rupee-sign" /> */}
        </>
    );
}
export function Img2(props){
    const url2 = process.env.REACT_APP_baseUrl
    return(
        <>
            <img src={url2 + props.src} alt={props.alt} className={props.className}/>
            {/* <FontAwesomeIcon icon="check-square" pull="right" />
            <FontAwesomeIcon icon={faCoffee} />
            <FontAwesomeIcon icon="rupee-sign" /> */}
        </>
    );
}