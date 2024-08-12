import { ReactNode, useState } from 'react';

function New(props: { children: ReactNode }) {
	return (
		<div className='wrap-item wrap-item-new'>
			<span className='label'>New!</span>
			{props.children}
		</div>
	);
}

function Popular(props: { children: ReactNode }) {
	return (
		<div className='wrap-item wrap-item-popular'>
			<span className='label'>Popular!</span>
			{props.children}
		</div>
	);
}

function Article(props: {
	type: string;
	views: number;
	title?: string;
	url?: string;
}) {
	return (
		<div className='item item-article'>
			<h3>
				<a href='#'>{props.title}</a>
			</h3>
			<p className='views'>Прочтений: {props.views}</p>
		</div>
	);
}

function Video(props: {
	type: string;
	views: number;
	title?: string;
	url?: string;
}) {
	return (
		<div className='item item-video'>
			<iframe
				src={props.url}
				frameborder='0'
				allow='autoplay; encrypted-media'
				allowfullscreen
			></iframe>
			<p className='views'>Просмотров: {props.views}</p>
		</div>
	);
}

function withHighlight(
	Component: (props: {
		type: string;
		views: number;
		title?: string;
		url?: string;
	}) => JSX.Element,
	low: number,
	high: number
) {
	return function WrappedComponent(props: {
		type: string;
		views: number;
		title?: string;
		url?: string;
	}) {
		if (props.views < low) {
			return (
				<New>
					<Component {...props} />
				</New>
			);
		} else if (props.views >= high) {
			return (
				<Popular>
					<Component {...props} />
				</Popular>
			);
		}

		return <Component {...props} />;
	};
}

function List(props: {
	list: {
		type: string;
		views: number;
		title?: string;
		url?: string;
	}[];
}) {
	return props.list.map((item, index) => {
		const Component =
			item.type === 'video'
				? withHighlight(Video, 100, 1000)
				: withHighlight(Article, 100, 1000);
		return <Component key={index} {...item} />;
	});
}

export default function App() {
	const [list, setList] = useState([
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
			views: 50,
		},
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
			views: 12,
		},
		{
			type: 'article',
			title: 'Невероятные события в неизвестном поселке...',
			views: 175,
		},
		{
			type: 'article',
			title: 'Секретные данные были раскрыты!',
			views: 1532,
		},
		{
			type: 'video',
			url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
			views: 4253,
		},
		{
			type: 'article',
			title: 'Кот Бегемот обладает невероятной...',
			views: 12,
		},
	]);

	return <List list={list} />;
}
