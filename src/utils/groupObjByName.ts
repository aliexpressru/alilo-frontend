import { ScriptRun, ScriptRunType } from '../types/RunTypes';

export interface GroupedScriptRun {
	name: string;
	scripts: ScriptRun[];
}

export function groupScriptRunsByType(scripts: ScriptRun[]): GroupedScriptRun[] {
	const scriptMap = new Map<string, ScriptRun[]>();

	scripts.forEach((curr) => {
		const script = curr.type_script_run === ScriptRunType.TYPE_SCRIPT_RUN_EXTENDED_UNSPECIFIED
			? curr.script
			: curr.simple_script;

		if (script && 'name' in script) {
			const { name } = script;

			if (scriptMap.has(name)) {
				scriptMap.get(name)?.push(curr);
			} else {
				scriptMap.set(name, [curr]);
			}
		} else {
			// Handle the case where the script is null or doesn't have a name property
			console.warn('Script is null or does not have a name property:', script);
		}
	});

	return Array.from(scriptMap, ([name, scripts]) => ({ name, scripts }));
}
