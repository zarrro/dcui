import { Injectable } from '@angular/core';

class Survey {
	//form fields
	itchy: string;
	hurts: string;
	description: string;
	duration: string;
	coldfeel: string;
	hotfeel: string;
	history: string;
	sex: string;
	age: string;
	previousTreatment: string;
	previousDiagnose: string;
}

@Injectable()
export class AnamnesisFormService {

	//files
	image1: File;
	image2: File;

	image1Resized: any = 'img/cam1.svg';
	image2Resized: any = 'img/cam1.svg';

	survey: Survey = new Survey();
}
