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

	image1Resized: any = 'img/camera-icon-small.png';
	image2Resized: any = 'img/camera-icon-small.png';

	survey: Survey = new Survey();
}
