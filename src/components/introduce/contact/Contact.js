import ContactForm from './ContactForm';

import classes from './Contact.module.scss';

const Contact = () => {
	return (
		<section className={classes['section-contact']}>
			<ContactForm />
		</section>
	);
};

export default Contact;
