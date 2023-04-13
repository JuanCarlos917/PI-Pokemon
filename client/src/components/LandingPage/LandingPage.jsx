import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import imageLandingPage from '../../assets/LandingPage.jpg'

export default function LandingPage() {

	return (
		<div>
			<h1 className={styles.titleLandingPage}>PIKAPI</h1>
			<div>
				<Link to='/home'>
					<button className={styles.buttonLandingPage} type='button'>
						HOME
					</button>
				</Link>
			</div>
            <div className={styles.imageLandingPage}>
			<img className={styles.image} src={imageLandingPage} alt='' />
            </div>
		</div>
	);
}
