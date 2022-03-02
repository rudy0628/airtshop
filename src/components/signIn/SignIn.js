import classes from './SignIn.module.scss';
import SignInForm from './SignInForm';

const SignIn = () => {
	return (
		<section className={classes['section-signIn']}>
			<SignInForm />
		</section>
	);
};

export default SignIn;
