import { http } from '../../axios';

export type AmmoUploadResponse = {
	status: boolean;
	message: string;
	ammo_file: {
		ammo_id: number;
		name: string;
		descrip: string;
		s3_url: string;
		ammo_file: string;
		bucket_name: string;
		size: string;
		content_type: string;
	};
};

export type Ammo = {
	name: string;
	description: string;
	bucket_name: string;
	project_title: string;
	scenario_title: string;
	ammo_file: string;
	content_type: string;
};

class AmmoService {
	async upload(ammo: Ammo): Promise<AmmoUploadResponse> {
		try {
			const { data } = await http.post<AmmoUploadResponse>(
				// alilo_v2
				'/v1/file/upload',
				// alilo_v1
				// '/v1/ammo/upload',
				ammo
			);

			return data;
		} catch (e) {
			throw new Error(e);
		}
	}
}

export const ammoService = new AmmoService();
