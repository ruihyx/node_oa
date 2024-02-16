import { Request } from "express";

export function paginate(
	array: any[],
	page_size: number,
	page_number: number
) {
	console.log(array[0]);
	const start = (page_number - 1) * page_size;
	const end = start + page_size;
	return array.slice(start, end);
}

export const getPageNumberAndSize = (
	req: Request
): { pageNumber: number; pageSize: number } => {
	let pageNumber = 1;
	let pageSize = 5;

	if (typeof req.query.page === "string") {
		const parsedPageNumber = parseInt(req.query.page, 10); // Always specify radix
		if (!isNaN(parsedPageNumber) && parsedPageNumber > 0) {
			pageNumber = parsedPageNumber;
		}
	}

	if (typeof req.query.size === "string") {
		const parsedPageSize = parseInt(req.query.size, 10);
		if (!isNaN(parsedPageSize) && parsedPageSize > 0) {
			pageSize = parsedPageSize;
		}
	}

	return { pageNumber, pageSize };
};
