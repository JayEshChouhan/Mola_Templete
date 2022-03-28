// import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCoffee , faRupeeSign} from '@fortawesome/fontawesome-free-solid'

// fontawesome.library.add(faCheckSquare, faCoffee);

const url = process.env.REACT_APP_PUBLIC_URL

export default function Img(props){
    return(
        <>
            <img src={url + props.src} alt={props.alt} className={props.className}/>
            {/* <FontAwesomeIcon icon="check-square" pull="right" />
            <FontAwesomeIcon icon={faCoffee} />
            <FontAwesomeIcon icon="rupee-sign" /> */}
        </>
    );
}