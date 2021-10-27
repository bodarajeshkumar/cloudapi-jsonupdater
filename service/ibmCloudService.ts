

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

import { HttpService } from "./httpService";
export class IBMCloudService {
	
	private static ibmCloudService: IBMCloudService = new IBMCloudService();

	private httpService: HttpService = HttpService.getInstance();

	private constructor() { }

	static getInstance() {
		return this.ibmCloudService;
	}

	public async getVPCAPIList()
	{
		return await this.httpService.get("https://raw.githubusercontent.com/IBM/Developer-Playground/development/ibm-cloud/vpc-api-list.json");
	}

	public async getNewVPCAPIList()
	{
		return await this.httpService.get("https://raw.githubusercontent.com/IBM/Developer-Playground/development/ibm-cloud/merged%20APIs/vpc.json");
	}

	public async getEnterpriseAPIList()
	{
		return await this.httpService.get("https://raw.githubusercontent.com/IBM/Developer-Playground/development/ibm-cloud/merged%20APIs/enterprise.json");
	}
	public async getSecretsManagerJson()
	{
		return await this.httpService.get("https://raw.githubusercontent.com/bodarajeshkumar/Developer-Playground/development/ibm-cloud/merged%20APIs/secrets-manager.json");
	}
	public async getDefaultAdapter()
	{
		return await this.httpService.getJSFile("https://raw.githubusercontent.com/bodarajeshkumar/cloudapi-adapter/main/defaault-adapter.js");
	}

}
