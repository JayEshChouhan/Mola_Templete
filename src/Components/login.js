import React, { useEffect, useState, Component } from "react";
import {Tabs,Tab,Form,Button} from 'react-bootstrap'
import Checkbox from "react-custom-checkbox";
import * as Icon from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import Footer from "./footer";
import Mybreadcrumb  from "./breadcrumb";
import { LoginApi, LoginUserApi, SinginApi } from "../api/login/login";
import { GetUseData } from "../layout/utils";
var sectionStyle = {
	backgroundImage: "url(images/login-bg.jpg)"
  };
export default function Login(prop){
	const [name,setName]=useState("");
	const [email,setEmail]=useState("");
	const [mobile_number,setNumber]=useState("");
	const [password , setPassword]= useState("");
	const [confirm_password,setConfirmPassword]= useState("");
	const dispatch = useDispatch();
	async function login() {
		let item={
			email: email,
			password: password
		}
		const login = await LoginApi(item);
		if(login.status){
			toast.success("Login Successfully");
			// var auth = login.status;
			// console.log(auth);
			
			const userData = await GetUseData(login.status,dispatch);
			dispatch({type: "ATHANTICATION" ,payload: {no:login.status}});
			window.location.href = "/my_account";
		}else{
			if(!login.data.status){
				if (login.data.email){
					toast.error("Email :"+login.data.email[0]);
				} else if (login.data.password){
					toast.error("Password :"+login.data.password[0]);
				} else{
					toast.error(login.data.detail);
				}
			}
			
		}
	}
	async function singUp() {
		let item={
			name: name,
			email: email,
			mobile_number: mobile_number,
			password: password,
			confirm_password: confirm_password
		}
		await SinginApi(item);
		await LoginApi(item);
		await LoginUserApi();
	}
    return(
        <div className='page-wrapper'>
			<ToastContainer 
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
            <Mybreadcrumb />
            <div className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17" style={sectionStyle}>
                <div className="container">
                    <div className="form-box">
						<div className="form-tab">
						<Tabs defaultActiveKey="signin" id="uncontrolled-tab-example" className=" nav-pills nav-fill">
								<Tab eventKey="signin" title="Sing In" className="nav-link">
									<form onSubmit={(e)=>{e.preventDefault()}} >
											<div class="form-group">
												<label for="singin-email">Username or email address *</label>
												<Form.Control className="form-control" type="email" onChange={(e)=>setEmail(e.target.value)} name="singin-email" id="singin-email" required/>
											</div>

											<div class="form-group">
												<label for="singin-password">Password *</label>
												<Form.Control className="form-control" type="password" onChange={(e)=>setPassword(e.target.value)} name="singin-password" id="singin-email" required/>
											</div>

											<div class="form-footer">
												<Button type="submit" onClick={()=>login()} className="btn btn-outline-primary-2">
													<span>LOG IN</span>
													<i class="icon-long-arrow-right"></i>
												</Button>
												<div className="myChackbox">
													<Checkbox
														icon={<Icon.FiCheck color="#174A41" size={14} />}
														name="my-input"
														checked={false}
														borderColor="#dadada"
														style={{ cursor: "pointer" }}
														labelStyle={{ marginLeft: 5, userSelect: "none" }}
														label="Remember Me"
													/>
												</div>

												<a href="#" class="forgot-link">Forgot Your Password?</a>
											</div>
										</form>
										<div class="form-choice">
											<p class="text-center">or sign in with</p>
											<div class="row">
												<div class="col-sm-6">
													<a href="#" class="btn btn-login btn-g">
														<i class="icon-google"></i>
														Login With Google
													</a>
												</div>
												<div class="col-sm-6">
													<a href="#" class="btn btn-login btn-f">
														<i class="icon-facebook-f"></i>
														Login With Facebook
													</a>
												</div>
											</div>
										</div>
								</Tab>
								<Tab eventKey="register" title="Register" className="nav-link">
								<form  onSubmit={(e)=>{e.preventDefault()}}>
											<div class="form-group">
												<label for="register-name-2">Username *</label>
												<input type="text" class="form-control" id="register-name-2" onChange={(e)=>setName(e.target.value)}  name="register-email" required />
											</div>
											<div class="form-group">
												<label for="register-email-2">Your email address *</label>
												<input type="email" class="form-control" id="register-email-2" onChange={(e)=>setEmail(e.target.value)}  name="register-email" required />
											</div>
											<div class="form-group">
												<label for="register-Number-2">Your Mobile Number *</label>
												<input type="tel" class="form-control" id="register-Number-2" onChange={(e)=>setNumber(e.target.value)}  name="register-email" required />
											</div>
											<div class="form-group">
												<label for="register-password-1">Password *</label>
												<input type="password" class="form-control" id="register-password-1" onChange={(e)=>setPassword(e.target.value)} name="register-password" required />
											</div>
											<div class="form-group">
												<label for="register-password-2">Confirm Password *</label>
												<input type="password" class="form-control" id="register-password-2" onChange={(e)=>setConfirmPassword(e.target.value)} name="register-password" required />
											</div>
											<div class="form-footer">
												<Button type="submit" onClick={singUp} className="btn btn-outline-primary-2">
													<span>SIGN UP</span>
													<i class="icon-long-arrow-right"></i>
												</Button>
												<Checkbox
													icon={<Icon.FiCheck color="#174A41" size={14} />}
													name="my-input"
													checked={false}
													borderColor="#dadada"
													style={{ cursor: "pointer" }}
													labelStyle={{ marginLeft: 5, userSelect: "none" }}
													label="I agree to the"
												/>
											</div>
										</form>
										<div class="form-choice">
											<p class="text-center">or sign in with</p>
											<div class="row">
												<div class="col-sm-6">
													<a href="#" class="btn btn-login btn-g">
														<i class="icon-google"></i>
														Login With Google
													</a>
												</div>
												<div class="col-sm-6">
													<a href="#" class="btn btn-login  btn-f">
														<i class="icon-facebook-f"></i>
														Login With Facebook
													</a>
												</div>
											</div>
										</div>
								</Tab>
							</Tabs>
						</div>
                    </div>
                </div>
            </div>
        </div>
    );
}