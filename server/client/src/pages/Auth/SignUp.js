import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { withRouter } from "react-router-dom";

import { Spacing, Container } from "components/Layout";
import { H1, Error } from "components/Text";
import { InputText } from "components/Form";
import Head from "components/Head";

import * as Routes from "routes";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";

import StyledCard from "components/StyledCard";
import PrinterIcon from "../../img/PrinterIcon.svg";

import MobileStyledCard from "components/MobileCard/MobileStyledCard";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Formik } from "formik";
import { auth, createUserDoc } from "../../Firebase/Firebase";

import { connect } from "react-redux";
import { createUser } from "../../actions/index";

const useStyles = makeStyles({
	root: {
		background: "#30ADEB",
		border: 0,
		borderRadius: "5px",
		boxShadow: "0 3px 5px 2px rgba(8, 93, 132, .3)",
		color: "white",
		height: 48,
		width: "100%",
		padding: "0 30px"
	}
});

const Root = styled(Container)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 60px;
	overflow: hidden;

	@media (min-width: ${(p) => p.theme.screen.md}) {
		justify-content: space-between;
		margin-top: 120px;
	}
`;

const StyledText = styled.p`
	display: inline;
	font-size: 1.1rem;
	font-weight: ${({ theme }) => theme.regular};
	color: ${({ theme }) => theme.fontColorText};
	line-height: 1.7rem;
	${({ errorMessage }) =>
		errorMessage &&
		css`
			color: red;
			font-size: 0.9rem;
			min-width: 200px;
			text-align: center;
		`};

	${({ comment }) =>
		comment &&
		css`
			padding-right: 3rem;
		`};
`;

const Welcome = styled.div`
	padding: 5.5rem;
	height: 40rem;
	border-radius: 6.64407px 0px 0px 6.64407px;
	flex-direction: column;
	background-color: rgba(55, 55, 55, 0.6);
	width: 100%;

	@media (max-width: 1050px) {
		height: 100%;
		border-radius: 6.64407px 6.64407px 0% 0%;
	}
`;

const IntroCard = styled.div`
	 ;
`;

const Heading = styled(H1)`
	margin-bottom: ${(p) => p.theme.spacing.sm};
`;

const CalltoAction = styled(H1)`
	font-weight: 500;
	line-height: 28px;
	font-family: aktiv-grotesk, sans-serif;
	/* identical to box height */

	color: #ffffff;
`;

const Form = styled.div`
	border-radius: 0% 6.64407px 6.64407px 0%;

	padding: 3rem;
	height: 100%;
	background: rgba(0, 0, 0, 0.29);
	width: 100%;

	@media (min-width: ${(p) => p.theme.screen.sm}) {
		width: 500px;
	}
	@media (max-width: 1050px) {
		border-radius: 0% 0% 6.64407px 6.64407px;
	}
`;

/**
 * Sign Up page
 */

const SignUp = (props) => {
	const [newAccount, setNewAccount] = useState(false);
	const [isLoaderVisible, setLoaderVisibility] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoaderVisibility(false);
		}, 1200);
		return () => clearTimeout(timer);
	});

	const handleSignIn = (email, password) => {
		auth.signInWithEmailAndPassword(email, password)
			/* eslint-disable */
			.catch(() =>
				alert(`Your email or password is incorrect, please check your data`)
			);
	};

	const handleNewAccount = (email, password, displayName, fullName) => {
		const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/dvation-5bea9.appspot.com/o/images%2Fdefault-pic.png?alt=media&token=67de752a-47b7-4ea2-8062-1d77ed6c1d47';
		const userData = {
			email: email,
			username: displayName,
			password: password,
			fullName: fullName, 
			avatar: defaultAvatar
		};
		props.createUser(userData);
	};

	const classes = useStyles();

	const screenLarge = useMediaQuery("(min-width: 1050px)");
	const screenSmall = useMediaQuery("(max-width: 1050px)");

	const GetHeroScreenSize = () => {
		if (screenLarge) {
			return "row";
		} else if (screenSmall) {
			return "column";
		}
	};

	const GetCardType = () => {
		if (screenLarge) {
			return (
				<StyledCard
					image={PrinterIcon}
					//title={"Lorem Ipsum"}
					//subtitle={"lorem ipsum iore"}
					mediaBg={"transparent"}
				></StyledCard>
			);
		} else if (screenSmall) {
			return (
				<MobileStyledCard
					image={PrinterIcon}
					mediaBg={"transparent"}
				></MobileStyledCard>
			);
		}
	};
	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
				displayName: "",
				fullName: ""
			}}
			validate={({ email, password, displayName }) => {
				const errors = {};
				if (!email) {
					errors.email = "Email is required";
				} else if (!password) {
					errors.password = "Password is required";
				} else if (!displayName) {
					errors.password = "USernName is required";
				} else if (!fullName) {
					errors.password = "Full name is required";
				} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
					errors.email = "Invalid email address";
				} else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(password)) {
					errors.password =
						"Password should contain min. 6 characters and one number";
				}
				return errors;
			}}
			onSubmit={({ email, password, displayName, fullName }) => {
				handleNewAccount(email, password, displayName, fullName);
			}}
		>
			{({
				values: { email, password, displayName, fullName },
				errors,
				handleChange,
				handleBlur,
				handleSubmit
			}) => (
				<Root maxWidth="lg">
					<Head />
					<Box
						justifyContent="center"
						alignContent="center"
						display="flex"
						flexDirection={GetHeroScreenSize()}
						p={1}
						m={1}
					>
						<IntroCard>
							<Box>
								<Welcome>{GetCardType()}</Welcome>
							</Box>
						</IntroCard>

						<Box>
							<Form>
								<Spacing bottom="md">
									<CalltoAction>Create Account</CalltoAction>
								</Spacing>

								<form onSubmit={handleSubmit}>
									<Box
										justifyContent="center"
										alignContent="center"
										display="flex"
										flexDirection="column"
									>
										<Box>
											<p>Full name</p>
											<InputText
												id="fullName"
												placeholder="fullName"
												type="text"
												onChange={handleChange}
												onBlur={handleBlur}
												name="fullName"
												value={fullName}
												aria-label="fullName"
												aria-required="true"
												autoComplete="new-password"
											/>
										</Box>
										<Box>
											<Spacing top="xs" bottom="xs">
												<p>Email</p>
												<InputText
													id="email"
													placeholder="email"
													type="email"
													onChange={handleChange}
													onBlur={handleBlur}
													name="email"
													value={email}
													aria-label="email"
													aria-required="true"
													autoComplete="new-password"
												/>
												{errors.email && (
													<StyledText errorMessage>
														{errors.email}
													</StyledText>
												)}
											</Spacing>
										</Box>
										<Box>
											<p>Display Name</p>

											<InputText
												id="displayName"
												type="text"
												onChange={handleChange}
												onBlur={handleBlur}
												name="displayName"
												value={displayName}
												aria-label="displayName"
												aria-required="true"
												autoComplete="new-password"
												placeholder="username"
											/>
											{errors.displayName && (
												<StyledText errorMessage>
													{errors.displayName}
												</StyledText>
											)}
										</Box>
										<Box>
											<Spacing top="xs" bottom="xs">
												<p>Password</p>

												<InputText
													id="password"
													placeholder="password"
													type="password"
													onChange={handleChange}
													onBlur={handleBlur}
													name="password"
													value={password}
													aria-label="password"
													aria-required="true"
													autoComplete="new-password"
												/>
												{errors.password && (
													<StyledText errorMessage>
														{errors.password}
													</StyledText>
												)}
											</Spacing>
										</Box>
									</Box>

									<Spacing top="sm" />

									<Button type="submit" className={classes.root}>
										Sign Up
									</Button>
								</form>
							</Form>
						</Box>
					</Box>
				</Root>
			)}
		</Formik>
	);
};

function mapStatetoProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStatetoProps, { createUser })(SignUp);
