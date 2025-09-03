import { Project } from '../types/ProjectTypes';
import { Scenario } from '../types/ScenarioTypes';

const cyrillicToLatinMap: Map<string, string> = new Map([
	['А', 'A'], ['Б', 'B'], ['В', 'V'], ['Г', 'G'], ['Д', 'D'], ['Е', 'E'], ['Ё', 'YO'], ['Ж', 'ZH'],
	['З', 'Z'], ['И', 'I'], ['Й', 'Y'], ['К', 'K'], ['Л', 'L'], ['М', 'M'], ['Н', 'N'], ['О', 'O'],
	['П', 'P'], ['Р', 'R'], ['С', 'S'], ['Т', 'T'], ['У', 'U'], ['Ф', 'F'], ['Х', 'KH'], ['Ц', 'TS'],
	['Ч', 'CH'], ['Ш', 'SH'], ['Щ', 'SHCH'], ['Ъ', ''], ['Ы', 'Y'], ['Ь', ''], ['Э', 'E'], ['Ю', 'YU'],
	['Я', 'YA'],
	['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'], ['д', 'd'], ['е', 'e'], ['ё', 'yo'], ['ж', 'zh'],
	['з', 'z'], ['и', 'i'], ['й', 'y'], ['к', 'k'], ['л', 'l'], ['м', 'm'], ['н', 'n'], ['о', 'o'],
	['п', 'p'], ['р', 'r'], ['с', 's'], ['т', 't'], ['у', 'u'], ['ф', 'f'], ['х', 'kh'], ['ц', 'ts'],
	['ч', 'ch'], ['ш', 'sh'], ['щ', 'shch'], ['ъ', ''], ['ы', 'y'], ['ь', ''], ['э', 'e'], ['ю', 'yu'],
	['я', 'ya'],
	[' ', '_']
]);

export function prepareCyrillicToLatinFileName(text: string): string {
	return text.split('').map((char) => cyrillicToLatinMap.get(char) || char).join('');
}

export function validateString(stringUndefined: string | undefined): string {
	// eslint-disable-next-line no-undefined
	if (stringUndefined !== undefined) {
		return stringUndefined;
	}
	return 'undefined';
}

export function isNameExistInProjectsOrScenarios(
	name: string,
	a: (Project | Scenario)[]
) {
	const foundProjects = a.find(
		(e) => e.title.toLocaleLowerCase() === name.toLocaleLowerCase()
	);
	return !foundProjects;
}
