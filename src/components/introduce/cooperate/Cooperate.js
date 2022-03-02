import classes from './Cooperate.module.scss';
import company1 from '../../../img/cop/company-1.png';
import company2 from '../../../img/cop/company-2.png';
import company3 from '../../../img/cop/company-3.png';
import company4 from '../../../img/cop/company-4.png';
import company5 from '../../../img/cop/company-5.png';

const Cooperate = () => {
	return (
		<section className={classes['section-cooperate']}>
			<div className={classes['cooperate__box']}>
				<h3 className="heading__tertiary">support by</h3>
				<div className={classes['cooperate__img-box']}>
					<img src={company1} alt="company 1" />
					<img src={company2} alt="company 2" />
					<img src={company3} alt="company 3" />
					<img src={company4} alt="company 4" />
					<img src={company5} alt="company 5" />
				</div>
			</div>
		</section>
	);
};

export default Cooperate;
