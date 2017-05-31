import { Injectable } from '@angular/core';

class Survey {
	//form fields
	itchy: string;
	hurts: string;
	hotfeel: string;
	coldfeel: string;
	duration: string;
	description: string;
	sex: string;
	age: string;
	email: string;
	confirmEmail: string;
	accept_terms: string;
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
