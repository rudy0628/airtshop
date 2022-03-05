import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import SignIn from '../components/signIn/SignIn';

const SignInPage = () => {
	return (
		<Fragment>
			<Helmet>
				<title>airtshop - Sign In</title>
				<meta
					name="description"
					content="This page provide the user to create、find、login account, airtshop also provide google and facebook sign in."
				/>
			</Helmet>
			<SignIn />
		</Fragment>
	);
};

export default SignInPage;
