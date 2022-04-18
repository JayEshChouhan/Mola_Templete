// import { Card } from "react-bootstrap";

import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeletetocardGet } from "../../api/product/card";
import Img, { Img2 } from "../../layout/img";
import Quantity from "../../layout/quantity";
import { FetchCardData, GetAuthDetail } from "../../layout/utils";
import Mybreadcrumb from "../breadcrumb";

export default function Card(prop){
    const navigate = useNavigate();
	const dispatch = useDispatch();
    const auth = GetAuthDetail();
    const userAthantication = GetAuthDetail();
    const cardData = useSelector(card => card.CartReducer.cardData);
    const cardDataMain = cardData.data?cardData.data:[];
    useEffect(()=>{
        if(!userAthantication){
            navigate("/login")
        }
    })
    useEffect(async () => {
        await FetchCardData(dispatch);
        // await FetchWishlistData(dispatch);
    }, []);
    return(
        <>
            <div className='page-wrapper'>
                <Mybreadcrumb />
                {cardData.data? <div className="cardMain">
                    <Container>
                        <div className="heading d-flex align-items-center justify-content-between">
                            <h1>Shopping Card</h1>
                            <p>Need Help? Call 00800 287 866 13</p>
                        </div>
                        <Row>
                            <Col lg={8}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Products Details</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            console.log(cardDataMain)
                                        }
                                        {
                                            cardDataMain.map(data=>{
                                                return(
                                                    <tr>
                                                        <td>
                                                            <div className="products">
                                                                <Img2 src={data.product_detail.images.image.image} alt={data.product_detail.product_name}/>
                                                                <div className="products_details">
                                                                    <h5>{data.product_detail.product_name}</h5>
                                                                    <p>Color:- {data.product_detail.color.join(',')}</p>
                                                                    <p>Size:- {data.product_detail.size.join(',')}</p>
                                                                    <p>$ {data.product_detail.price}</p>
                                                                    {data.product_detail.stock_detail.in_stock?<p className="in_stock">In Stock</p>:<p className="Outof_stock">Out of Stock</p>}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Quantity value={data.quantity} id={data.product_id}/>
                                                        </td>
                                                        <td>$ {data.product_detail.totalPrice}</td>
                                                        <td>
                                                            <a 
                                                                href="javascript:;"
                                                                onClick={ async ()=>{
                                                                    const deleteApi = await DeletetocardGet(`api/cart/${data.product.id}`,auth);
                                                                    if(deleteApi.status){
                                                                        FetchCardData(dispatch);
                                                                    }}
                                                                }                                                         
                                                            >
                                                                x
                                                            </a>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                            <Col lg={4}></Col>
                        </Row>
                    </Container>
                </div>:""}
               
            </div>
        </>
    )
}