import jsonfile from 'jsonfile';

export enum ReadType {
	PATH = 'path',
	CONTENT = 'content'
}

export type IPkgInfo = {
	type: ReadType;
	content: string;
}

export type IPkgInputType = string | IPkgInfo;

export default function merge(
	packageFilePathArr: IPkgInputType[]
) {
	const result = {};
	packageFilePathArr.forEach((item: IPkgInputType) => {
		let json = {};
		if (
			typeof item === 'string'
			|| item.type === ReadType.PATH
		) {
			json = jsonfile.readFileSync(
				typeof item === 'string'
					? item
					: item.content
				);
		} else if (item.type === ReadType.CONTENT) {
			json = JSON.parse(item.content);
		}
		return Object.assign(result, json);
	});
	return result;
}