import '../css/style.css';
import '../css/form.css';
import Head from 'next/head';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>SamReoprt</title>
			</Head>

			<div className='top-bar'>
				<div className='nav'>
					<Link href='/'>
						<a>Incidents Log</a>
					</Link>
					<Link href='/new'>
						<a>Add an Incident</a>
					</Link>
				</div>

				<Link href='/'>
					<a>
						<img
							id='title'
							src='https://media.istockphoto.com/vectors/accident-report-form-vector-id618343738?k=20&m=618343738&s=612x612&w=0&h=FZyekp1fyQuGO-FvnVWf-r2nrpkaNMJl6-PQA0rUv6U='
							alt='SamReport logo'
						></img>
					</a>
				</Link>
			</div>
			<div className='grid wrapper'>
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default MyApp;
