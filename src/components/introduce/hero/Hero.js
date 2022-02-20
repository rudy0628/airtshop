import classes from './Hero.module.scss';
import user1 from '../../../img/user/user-1.jpg';
import user2 from '../../../img/user/user-2.jpg';
import user3 from '../../../img/user/user-3.jpg';
import user4 from '../../../img/user/user-4.jpg';
import user5 from '../../../img/user/user-5.jpg';
import user6 from '../../../img/user/user-6.jpg';

const Hero = () => {
	return (
		<section className={classes['section-hero']}>
			<div className={classes['hero']}>
				<h1 className="heading__tertiary">Want To Go Abroad?</h1>
				<p className={classes['hero__text']}>
					We provide multiple airline and contains 200+ route in world, just
					search the time you want, we have more than 3000+ airline at the
					moment, enjoy your airplane experience!
				</p>
				<div className={classes['hero__img-box']}>
					<img src={user1} alt="user headshot 1" />
					<img src={user2} alt="user headshot 2" />
					<img src={user3} alt="user headshot 3" />
					<img src={user4} alt="user headshot 4" />
					<img src={user5} alt="user headshot 5" />
					<img src={user6} alt="user headshot 6" />
				</div>
				<span className={classes['hero__subtext']}>more than 100,000+ use</span>
			</div>
		</section>
	);
};

export default Hero;
