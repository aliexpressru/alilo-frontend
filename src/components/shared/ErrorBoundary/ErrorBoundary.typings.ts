export type ErrorBoundaryProps = {
	children?: React.ReactNode;
	fallback?: React.ReactNode;
	onCaptureError?: (state: ErrorBoundaryState) => void;
};

export type ErrorBoundaryState = {
	error?: unknown;
};
