import { BadRequestException, PipeTransform  } from "@nestjs/common"
import { BoardStatus } from '../boards-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {

	readonly StatusOptions = [
		BoardStatus.PRIVATE,
		BoardStatus.PUBLIC
	]

	transform(value: any) {
		console.log(value);
		value = value.toUpperCase();

		if (!this.isStatusValid(value)) {
			throw new BadRequestException('${value} isnt right status');
		}
		return value;
	}

	private isStatusValid(status: any) {
		console.log(status);
		const index = this.StatusOptions.indexOf(status);
		return index !== -1;
	}


	// transform(value: any, metadata: ArgumentMetadata) {
	// 	return value;
	// }
}