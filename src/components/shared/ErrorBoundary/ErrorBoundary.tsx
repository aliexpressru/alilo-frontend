import { Button } from '@mantine/core';
import React from 'react';

import type {
	ErrorBoundaryProps,
	ErrorBoundaryState,
} from './ErrorBoundary.typings';

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	override readonly state: ErrorBoundaryState = {
		error: null,
	};

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		const state: ErrorBoundaryState = { error };
		return state;
	}

	override componentDidMount(): void {
		//
	}

	override componentWillUnmount(): void {
		//
	}

	override componentDidCatch(error: Error): void {
		const state: ErrorBoundaryState = { error };

		if (this.props.onCaptureError) {
			this.props.onCaptureError(state);
		}

		this.setState(state);
	}

	override render(): React.ReactNode {
		const { error } = this.state;

		if (error) {
			const { fallback } = this.props;

			return (
				fallback ?? (
					<div>
						<h1>Oops, error!</h1>
						<Button onClick={() => window.location.reload()}>
							You can reload this page and try again
						</Button>
					</div>
				)
			);
		} else {
			const { children } = this.props;

			return children;
		}
	}
}

export { ErrorBoundary };
