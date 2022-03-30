import classes from './Cooperate.module.scss';
import company1 from '../../../img/cop/company-1.webp';
import company2 from '../../../img/cop/company-2.webp';
import company3 from '../../../img/cop/company-3.webp';
import company4 from '../../../img/cop/company-4.webp';
import company5 from '../../../img/cop/company-5.webp';

const Cooperate = () => {
	return (
		<section className={classes['section-cooperate']}>
			<div className={classes['cooperate__box']}>
				<h3 className="heading__tertiary">support by</h3>
				<div className={classes['cooperate__slider']}>
					<div className={classes['cooperate__slider--track']}>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company1} alt="company 1" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company2} alt="company 2" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company3} alt="company 3" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company4} alt="company 4" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company5} alt="company 5" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company1} alt="company 1" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company2} alt="company 2" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company3} alt="company 3" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company4} alt="company 4" />
						</div>
						<div className={classes['cooperate__slider--slide']}>
							<img src={company5} alt="company 5" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cooperate;
