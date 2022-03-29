import signInPage from '../img/steps/sign-in-page.webp';
import ticketsPage from '../img/steps/tickets-page.webp';
import myTicketPage from '../img/steps/my-ticket-page.webp';
import { AiOutlineUser, AiOutlineFieldTime } from 'react-icons/ai';
import { RiRouteFill } from 'react-icons/ri';
import { IoTicketOutline } from 'react-icons/io5';

export const steps = [
	{
		id: 's1',
		number: '01',
		title: 'Login Account',
		description:
			'Click the top right login button to register or login, our web app support google and facebook account connect.',
		image: signInPage,
		flow: 'NORMAL',
	},
	{
		id: 's2',
		number: '02',
		title: 'Select Your Ticket',
		description:
			'Select your ticket in Tickets page, you can choose take off time and destination.',
		image: ticketsPage,
		flow: 'REV',
	},
	{
		id: 's3',
		number: '03',
		title: 'Check you Ticket',
		description:
			'You can see your ticket in My Ticket page, inside this page, our app will show what ticket you order, and you can delete your ticket just in one step.',
		image: myTicketPage,
		flow: 'NORMAL',
	},
];

export const features = [
	{
		id: 'f1',
		icon: AiOutlineUser,
		amount: '100,000+',
		title: 'users',
	},
	{
		id: 'f2',
		icon: RiRouteFill,
		amount: '200+',
		title: 'routes',
	},
	{
		id: 'f3',
		icon: AiOutlineFieldTime,
		amount: '3,000+',
		title: 'current routes',
	},
	{
		id: 'f4',
		icon: IoTicketOutline,
		amount: '5,000+',
		title: 'ticket sell/day',
	},
];

export const toastStyle = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export const passengersOption = [
	{
		value: 'child',
		text: 'Child (0 ~ 12)',
	},
	{
		value: 'adult',
		text: 'Adult (12 up)',
	},
];

export const classOption = [
	{
		value: 'economy',
		text: 'Economy',
	},
	{
		value: 'business',
		text: 'Business',
	},
	{
		value: 'first',
		text: 'First',
	},
];

export const generateSeat = () => {
	const seatRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	const seatCol = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
	const rowRandom = Math.floor(Math.random() * 10);
	const colRandom = Math.floor(Math.random() * 7);
	return `${seatRow[rowRandom]}${seatCol[colRandom]}`;
};
