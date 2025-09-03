import { http } from '../../axios';
import { sortByKey } from '../../utils/sorters';

import {
	GetProjectResponse,
	GetAllProjectsResponse,
	CreateProjectResponse,
	DeleteProjectResponse,
	UpdateProjectResponse,
} from '../../types/ProjectTypes';
import axios from "axios";

class ProjectService {
	async getProject(projectId: string): Promise<GetProjectResponse> {
		try {
			const { data } = await http.post<GetProjectResponse>(
				// alilo_v2
				'/v1/project',
				// alilo_v1
				// '/v1/project/get',
				{ id: projectId }
			);
			return data;
		} catch (error) {
			const response: GetProjectResponse = {
				status: false,
				project: null,
				message: 'An unexpected error occurred',
			};
			return response;
		}
	}

	async getAllProjects(limit = 10_000, pageNumber = 0): Promise<GetAllProjectsResponse> {
		try {
			const response = await http.post(
				// alilo_v2
				'/v1/projects',
				// alilo_v1
				// '/v1/project/get-all',
				{
				limit,
				page_number: pageNumber,
			}, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			return {
				status: !response.status,
				projects: response.data.projects.sort(sortByKey('title')),
				totalPages: response.data.total_pages,
			};

		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Axios error:', error.message);
			} else {
				console.error('Unexpected error:', error);
			}

			return {
				status: false,
				projects: [],
				totalPages: 0,
			};
		}
	}

	async createProject(
		title: string,
		descrip: string
	): Promise<CreateProjectResponse> {
		try {
			const { data } = await http.post<CreateProjectResponse>(
				'/v1/project/create',
				{
					project: {
						title,
						descrip,
					},
				}
			);
			return data;
		} catch (error) {
			console.error(
				'error in scenario service, createNewScenario method: ',
				error
			);
			return {
				status: false,
				id: '',
				message: 'An unexpected error occurred',
			};
		}
	}

	async updateProject(
		projectId: string,
		newTitle: string,
		newDescrip: string
	) {
		try {
			const { data } = await http.post<UpdateProjectResponse>(
				'/v1/project/update',
				{
					project: {
						id: Number(projectId),
						title: newTitle,
						descrip: newDescrip,
					},
				}
			);

			return data;
		} catch (error) {
			return { status: false };
		}
	}

	async deleteProject(projectId: string) {
		const { data } = await http.post<DeleteProjectResponse>(
			'/v1/project/delete',
			{ id: projectId }
		);
		return data;
	}
}

export const projectService = new ProjectService();
