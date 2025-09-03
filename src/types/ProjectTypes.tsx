export type GetProjectResponse = {
	status: boolean;
	project: Project | null;
	message: string;
};

export type GetAllProjectsResponse = {
	status: boolean;
	projects: Project[];
	totalPages: number;
};

export type Project = {
	id: string;
	title: string;
	descrip: string;
};

export const ProjectEmpty = {
	title: '',
	descrip: ''
};

export type CreateProjectResponse = {
	status: boolean;
	id: string;
	message: string;
};
export type UpdateProjectResponse = {
	status: boolean;
};
export type DeleteProjectResponse = {
	status: boolean;
};
