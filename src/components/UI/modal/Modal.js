import classes from './Modal.module.scss';
import Card from '../card/Card';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Backdrop = props => {
	return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = props => {
	let icons;
	if (props.title === 'Success') {
		icons = <BsCheck2Circle className={classes['modal__icon--success']} />;
	} else if (props.title === 'Error') {
		icons = <AiOutlineCloseCircle className={classes['modal__icon--error']} />;
	}

	return (
		<Card className={classes.modal}>
			<header className={classes['modal__header']}>
				<h2>{props.title}</h2>
			</header>
			<main className={classes['modal__main']}>
				<p>
					{icons}
					{props.message}
				</p>
			</main>
			<footer className={classes['modal__footer']}>
				<button className="btn btn--form" onClick={props.onClose}>
					OK
				</button>
			</footer>
		</Card>
	);
};

const Modal = props => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				document.querySelector('#backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					title={props.title}
					message={props.message}
					onClose={props.onClose}
				/>,
				document.querySelector('#overlay-root')
			)}
		</Fragment>
	);
};

export default Modal;
