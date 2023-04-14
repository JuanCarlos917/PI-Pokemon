import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
	return (
		<div className={styles.container__landing}>
			<h1 className={styles.titleLandingPage}>PIKAPI</h1>
			<div>
				<Link to='/home'>
					<button className={styles.buttonLandingPage} type='button'>
						HOME
					</button>
				</Link>
			</div>
			<div className={styles.imageLandingPage}>
				<div className={styles.clindren__imageLandingPage}></div>
			</div>
		</div>
	);
}
