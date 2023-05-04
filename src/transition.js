import { useState, useEffect } from "react";

const usePageTransition = (duration) => {
	const [transitionStyles, setTransitionStyles] = useState({ opacity: 0 });

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setTransitionStyles({ opacity: 1, transition: `opacity ${duration}ms` });
		}, 0);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [duration]);

	return transitionStyles;
};

export default usePageTransition;
