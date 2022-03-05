import classes from './Hero.module.scss';
import ScrollAnimation from 'react-animate-on-scroll';
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
				<div className={classes['hero__box--inner']}>
					<ScrollAnimation
						animateIn="bounceInRight"
						animateOut="bounceOutLeft"
						animateOnce
					>
						<h1 className="heading__primary">Want To Go Abroad?</h1>
					</ScrollAnimation>
					<ScrollAnimation
						animateIn="bounceInLeft"
						animateOut="bounceOutRight"
						animateOnce
					>
						<p className={classes['hero__text']}>
							We provide multiple airline and contains 200+ route in world, just
							search the time you want, we have more than 3000+ airline at the
							moment, enjoy your airplane experience!
						</p>
					</ScrollAnimation>
					<ScrollAnimation
						animateIn="fadeIn"
						animateOut="fadeOut"
						delay={750}
						animateOnce
					>
						<div className={classes['hero__img-box']}>
							<img src={user1} alt="user headshot 1" />
							<img src={user2} alt="user headshot 2" />
							<img src={user3} alt="user headshot 3" />
							<img src={user4} alt="user headshot 4" />
							<img src={user5} alt="user headshot 5" />
							<img src={user6} alt="user headshot 6" />
						</div>
					</ScrollAnimation>
					<ScrollAnimation
						animateIn="fadeIn"
						animateOut="fadeOut"
						delay={1000}
						animateOnce
					>
						<span className={classes['hero__subtext']}>100,000+ users</span>
					</ScrollAnimation>
				</div>
			</div>
		</section>
	);
};

export default Hero;
