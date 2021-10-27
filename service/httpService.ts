

//=============================================================
//IBM Confidential
//
//OCO Source Materials
//
//Copyright IBM Corp. 2021
//
//The source code for this program is not published or otherwise
//divested of its trade secrets, irrespective of what has been
//deposited with the U.S. Copyright Office.
//
//=============================================================

'use strict';

import { request as httpsrequest, RequestOptions } from 'https';

export class HttpService {
	
	private static httpService: HttpService = new HttpService();

	private constructor() { }

	static getInstance() {
		return this.httpService;
	}

	public async get(url: string): Promise<any> {
		let apiresponse: any = '';
		let start_time = new Date().getTime();
		let requestUrl: string = '';
		try {
			requestUrl = url;
			let match = requestUrl.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
			await this.performRequest(
				{
					protocol: match ? match[1] : '',
					host: match ? match[3] : '',
					path: match ? match[5] : '',
					method: 'GET',
					port: match ? match[4] : '',
				}
			)
				.then((response: any) => {
					console.log(`Request URL: ${requestUrl} Timetaken: ${new Date().getTime() - start_time}ms`);
					apiresponse = JSON.parse(response);
				})
				.catch(error => {
					console.log(`Error occured while getting data: ${requestUrl} ${error}`);
				});
			return apiresponse;
		} catch (ex) {
			console.log(`Error occured while getting data: ${requestUrl} ${ex}`);
			return apiresponse;
		}
	}

	public async getJSFile(url: string): Promise<any> {
		let apiresponse: any = '';
		let start_time = new Date().getTime();
		let requestUrl: string = '';
		try {
			requestUrl = url;
			let match = requestUrl.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
			await this.performRequest(
				{
					protocol: match ? match[1] : '',
					host: match ? match[3] : '',
					path: match ? match[5] : '',
					method: 'GET',
					port: match ? match[4] : '',
				}
			)
				.then((response: any) => {
					console.log(`Request URL: ${requestUrl} Timetaken: ${new Date().getTime() - start_time}ms`);
					apiresponse = response;
				})
				.catch(error => {
					console.log(`Error occured while getting data: ${requestUrl} ${error}`);
				});
			return apiresponse;
		} catch (ex) {
			console.log(`Error occured while getting data: ${requestUrl} ${ex}`);
			return apiresponse;
		}
	}

	async performRequest(options: RequestOptions) {
		return new Promise((resolve, reject) => {
			httpsrequest(
				options,
				function (response) {
					const statusCode: number | undefined = response.statusCode;
					if (statusCode != undefined && statusCode >= 300) {
						reject(
							new Error(response.statusMessage)
						)
					}
					const chunks: any = [];
					response.on('data', (chunk) => {
						chunks.push(chunk);
					});
					response.on('end', () => {
						const result = Buffer.concat(chunks).toString();
						resolve(result);
					});
				}
			).end();
		})
	}

}
