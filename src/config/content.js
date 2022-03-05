import signInPage from '../img/steps/sign-in-page.PNG';
import ticketsPage from '../img/steps/tickets-page.PNG';
import myTicketPage from '../img/steps/my-ticket-page.PNG';
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

export const airportCode = [
	{
		value: 'ATL',
		label: 'ATL',
	},
	{
		value: 'PEK',
		label: 'PEK',
	},
	{
		value: 'LAX',
		label: 'LAX',
	},
	{
		value: 'DXB',
		label: 'DXB',
	},
	{
		value: 'HND',
		label: 'HND',
	},
	{
		value: 'ORD',
		label: 'ORD',
	},
	{
		value: 'LHR',
		label: 'LHR',
	},
	{
		value: 'PVG',
		label: 'PVG',
	},
	{
		value: 'CDG',
		label: 'CDG',
	},
	{
		value: 'DFW',
		label: 'DFW',
	},
	{
		value: 'CAN',
		label: 'CAN',
	},
	{
		value: 'AMS',
		label: 'AMS',
	},
	{
		value: 'HKG',
		label: 'HKG',
	},
	{
		value: 'ICN',
		label: 'ICN',
	},
	{
		value: 'FRA',
		label: 'FRA',
	},
	{
		value: 'DEN',
		label: 'DEN',
	},
	{
		value: 'DEL',
		label: 'DEL',
	},
	{
		value: 'SIN',
		label: 'SIN',
	},
	{
		value: 'BKK',
		label: 'BKK',
	},
	{
		value: 'JFK',
		label: 'JFK',
	},
	{
		value: 'KUL',
		label: 'KUL',
	},
	{
		value: 'MAD',
		label: 'MAD',
	},
	{
		value: 'SFO',
		label: 'SFO',
	},
	{
		value: 'CTU',
		label: 'CTU',
	},
	{
		value: 'CGK',
		label: 'CGK',
	},
	{
		value: 'SZX',
		label: 'SZX',
	},
	{
		value: 'IST',
		label: 'IST',
	},
	{
		value: 'SEA',
		label: 'SEA',
	},
	{
		value: 'LAS',
		label: 'LAS',
	},
	{
		value: 'MCO',
		label: 'MCO',
	},
	{
		value: 'YYZ',
		label: 'YYZ',
	},
	{
		value: 'MEX',
		label: 'MEX',
	},
	{
		value: 'CLT',
		label: 'CLT',
	},
	{
		value: 'BCN',
		label: 'BCN',
	},
	{
		value: 'SVO',
		label: 'SVO',
	},
	{
		value: 'TPE',
		label: 'TPE',
	},
	{
		value: 'KMG',
		label: 'KMG',
	},
	{
		value: 'MUC',
		label: 'MUC',
	},
	{
		value: 'MNL',
		label: 'MNL',
	},
	{
		value: 'XIY',
		label: 'XIY',
	},
	{
		value: 'LGW',
		label: 'LGW',
	},
	{
		value: 'BCN',
		label: 'BCN',
	},
	{
		value: 'EWR',
		label: 'EWR',
	},
	{
		value: 'PHX',
		label: 'PHX',
	},
	{
		value: 'MIA',
		label: 'MIA',
	},
	{
		value: 'SHA',
		label: 'SHA',
	},
	{
		value: 'IAH',
		label: 'IAH',
	},
	{
		value: 'CKG',
		label: 'CKG',
	},
	{
		value: 'SYD',
		label: 'SYD',
	},
	{
		value: 'NRT',
		label: 'NRT',
	},
];

export const classOptions = [
	{
		value: 'Economy',
		label: 'Economy',
	},
	{
		value: 'Business',
		label: 'Business',
	},
	{
		value: 'First',
		label: 'First',
	},
];

export const productionTicketsContent = () => {
	const seats = [];
	for (let i = 1; i <= 10; i++) {
		for (let j = 0; j < 5; j++) {
			let charStartCode = 65;
			seats.push(`${i}${String.fromCharCode(charStartCode + j)}`);
		}
	}

	return [
		{
			airline: 'ssairline',
			flight: 'WA005',
			from: 'EWR',
			to: 'NRT',
			date: new Intl.DateTimeFormat('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date()),
			boardingTime: '15:10',
			gate: 'G',
			seats: seats,
		},
		{
			airline: 'ssairline',
			flight: 'WA006',
			from: 'TPE',
			to: 'PHX',
			date: new Intl.DateTimeFormat('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date()),
			boardingTime: '16:10',
			gate: 'A',
			seats: seats,
		},
		{
			airline: 'ssairline',
			flight: 'WA007',
			from: 'MIA',
			to: 'IAH',
			date: new Intl.DateTimeFormat('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date()),
			boardingTime: '17:10',
			gate: 'B',
			seats: seats,
		},
		{
			airline: 'ssairline',
			flight: 'WA008',
			from: 'LAS',
			to: 'MCO',
			date: new Intl.DateTimeFormat('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date()),
			boardingTime: '18:10',
			gate: 'C',
			seats: seats,
		},
		{
			airline: 'ssairline',
			flight: 'WA009',
			from: 'JFK',
			to: 'KUL',
			date: new Intl.DateTimeFormat('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date()),
			boardingTime: '19:10',
			gate: 'D',
			seats: seats,
		},
	];
};

export const toastStyle = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};
